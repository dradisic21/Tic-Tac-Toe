import React from "react";
import { useNavigate } from "react-router";
import { createNewGame } from "../Api";
import { Button } from "react-bootstrap";

const NewGame = () => {
  const navigate = useNavigate();
  let showGame = (game) => {
    navigate("/rendergame", { state: { gameId: game.id } });
  };

  const createGame = async () => {
    createNewGame()
      .then((response) => {
        showGame(response.data);
      })
      .catch((axiosError) => {
        // addToast({
        //   id: Math.random(),
        //   Component: ErrorToast,
        //   error: axiosError.response.message,
        // });
      });
  };

  return (
    <div className="d-flex justify-content-center pt-3">
      <Button onClick={() => createGame()}>New Game</Button>
    </div>
  );
};

export default NewGame;
