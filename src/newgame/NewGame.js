// provjera da li je igra u statusu ->
// u tijeku (provjeriti onaj tko gleda da li je jedan od igraca user.id first_player.id second_player.id)
// otvorena
// zatvorena(read only for everyone )
// kako znati tko je na potezu?
// pseudo kod algoritam:
// 1. prebrojati koliko polja u matrici je popunjeno sa vrijednostima ( !== null )
// 2. ako je taj broj paran na potezu je first_player, ako je neparan onda je second_player
// napisati metodu isFirstPlayerTurn() koja prima matricu i vraca nazad true ako je frist_player ako je fals onda je second_player na potezu
// u tablici igara dodati u kojem je statusu igra
// igre gdje mogu igrati oznaciti nekom bojom ako sam ja igrac u toj igri 

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
