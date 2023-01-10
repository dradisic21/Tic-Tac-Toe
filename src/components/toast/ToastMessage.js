import React from "react";
import Toast from "react-bootstrap/Toast";
import "./ToastMessage.css";
import { useEffect, useState } from "react";


const ToastMessage = ({ handleRemove, message, type }) => {
    const [show, setShow] = useState(false);
    useEffect(() => {
      setShow(true);
    }, []);

    const TOAST_TYPE_MAP = {
        error: {
            header: "Error",
            className: "error-toast"
        },
        warn: {
            header: "Warning",
            className: "warn-toast"
        },
        info: {
            header: "Info",
            className: "info-toast"
        },
        success: {
          header: "Success",
          className: "success-toast"
      }
    };
    
    return (
      <Toast
        className={TOAST_TYPE_MAP[type].className}
        delay={2000}
        autohide
        show={show}
        onClose={() => {
          handleRemove();
          setShow(false);
        }}
      >
        <Toast.Header className={TOAST_TYPE_MAP[type].className}>
          <strong className="me-auto">{TOAST_TYPE_MAP[type].header}</strong>
        </Toast.Header>
        <Toast.Body>{message}</Toast.Body>
      </Toast>
    );
  };

  export default ToastMessage;