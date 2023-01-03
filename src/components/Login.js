import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Button } from "react-bootstrap";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import { login } from "../Api";

const schema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

const ErrorToast = ({ handleRemove, error }) => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    setShow(true);
  }, []);
  return (
    <Toast
      className="toast-err"
      delay={2000}
      autohide
      show={show}
      onClose={() => {
        handleRemove();
        setShow(false);
      }}
    >
      <Toast.Header className="toast-err">
        <strong className="me-auto">Login Failed</strong>
        <small className="text-muted">just now</small>
      </Toast.Header>
      <Toast.Body>{error?.message}</Toast.Body>
    </Toast>
  );
};

function Login() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  //Toast
  const [toasts, setToasts] = useState([]);
  const addToast = (newToast) => {
    console.log("New Toast", newToast);
    setToasts((toasts) => [...toasts, newToast]);
  };
  const removeToast = (id) =>
    setToasts((toasts) => toasts.filter((e) => e.id !== id));

  //validation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  //submit forms and response api, errors
  const submitForm = (e, data) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    login(username, password)
      .then((response) => {
        setUserName(username);
        navigate("/rendergames");
      })
      .catch((axiosError) => {
        axiosError.response.data.errors.map((error) =>
          addToast({ id: Math.random(), Component: ErrorToast, error: error })
        );
      });
  };

  return (
    <div className="row justify-content-center align-items-center h-100">
      <div className="form z-1">
        <Form onSubmit={handleSubmit(submitForm)}>
          <div className="avatar text-center pt-4 pb-4">
            <img src="images/avatar.png" alt="avatar" />
          </div>
          <Form.Group className="col-12">
            <Form.Label className="form__label" htmlFor="userName">
              User name
            </Form.Label>
            <Form.Control
              {...register("username")}
              className="form__input"
              type="text"
              id="username"
              name="username"
              placeholder="User Name" 
              value={username}
              onChange={(e) => setUserName(e.target.value)}
            />
            {errors.username?.message && (
              <p className="text-danger">{errors.username?.message}</p>
            )}
          </Form.Group>
          <Form.Group>
            <Form.Label className="form__label" htmlFor="password">
              Password
            </Form.Label>
            <Form.Control
              {...register("password")}
              className="form__input"
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password?.message && (
              <p className="text-danger">{errors.password?.message}</p>
            )}
          </Form.Group>
          <div className="text-center pt-3 pb-4 ">
            <Button type="submit" className="btn btn-primary">
              Submit
            </Button>
          </div>
          <div className="space border-bottom pb-3">
            <span className="or">OR</span>
          </div>
          <div>
            <p className="text-center pt-4 pb-4">
              Not registered? <Link to="registration">Create an account</Link>
            </p>
          </div>
        </Form>
      </div>
      <Container className="error-toast position-absolute p-3">
        <ToastContainer>
          {toasts.map(({ id, Component, error }, index) => (
            <div className="pt-2">
              <Component
                key={id}
                handleRemove={() => removeToast(id)}
                error={error}
              />
            </div>
          ))}
        </ToastContainer>
      </Container>
    </div>
  );
}
export default Login;
