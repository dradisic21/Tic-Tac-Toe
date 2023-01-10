import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { login } from "../Api";
import ToastMessage from "./toast/ToastMessage";

const schema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

const Login = (props) => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();


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
          props.addToast({ id: Math.random(), Component: ToastMessage, message: error.message, type: "error" })
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
    </div>
  );
}
export default Login;
