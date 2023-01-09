import React, { useState } from "react";
import Toast from "react-bootstrap/Toast";

const ToastMessage = (props) => {
  const [showToast, setToast] = useState(false);

  const { key } = props;

  const toastMessages = {
    allreadyPlayed: {
      id: Math.floor(Math.random() * 101 + 1),
      title: "Warning",
      description: "Not your turn to play",
      backgroundColor: "#5cb85c",
    },
    notYourTurn: {
      id: Math.floor(Math.random() * 101 + 1),
      title: "Warning",
      description: "Cell already played",
      backgroundColor: "#d9534f",
    },
    noSecondPlayer: {
      id: Math.floor(Math.random() * 101 + 1),
      title: "Warning",
      description: "Second player didn't join the game",
      backgroundColor: "#5bc0de",
    },
  };

  return (
    <>
      <Toast
        onClose={() => setToast(false)}
        autohide
        show={showToast}
        delay={2200}
      >
        <Toast.Header>{toastMessages[key].title}</Toast.Header>
        <Toast.Body>{toastMessages[key].description}</Toast.Body>
      </Toast>
    </>
  );
};
export default ToastMessage;
