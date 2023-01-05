import React from "react";
import { useState, useEffect } from "react";
import "./RenderGame.css";
import { Button } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { getGame } from "../Api";

const RenderGame = () => {
  const [game, setGame] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { state } = useLocation();

  const renderSquares = (board) => {
    return board?.map((row) =>
      row.map((cell) => {
        if (game.first_player.id === cell) {
          return <div className="square text-primary">X</div>;
        } else if (game.second_player?.id === cell) {
          return <div className="square text-danger">O</div>;
        } else {
          return <div className="square"></div>;
        }
      })
    );
  };

  useEffect(() => {
    const fetchGame = async (gameId) => {
      try {
        const response = await getGame(gameId);
        setGame(response.data);
        setError(null);
      } catch (err) {
        setError(err.message);
        setGame(null);
      } finally {
        setLoading(false);
      }
    };
    fetchGame(state.gameId);
  }, []);

  return (
    <div className="wrapper">
      <div className="game_list">
        <div className="header position-relative">
          <div className="position-relative d-flex justify-content-center align-items-center">
            <h1 className="title">TIC TAC TOE GAME</h1>
          </div>
        </div>

        <div>
          <div className="players">
            <h3 className="d-flex">
              <u>FIRST PLAYER:</u>
              <p className="px-5">{game.first_player?.username}</p>
            </h3>
            <h3 className="d-flex">
              <u>SECOND PLAYER:</u>{" "}
              <p className="px-3">{game.second_player?.username}</p>
            </h3>
            <h3 className="d-flex">
              <u>WINNER:</u>{" "}
              <p className="px-5 text-success">{game.winner?.username}</p>
            </h3>
          </div>
          <div className="tic-tac-toe-game">
            <div className="game postition-relative">
              {/*<p>
                {winner
                  ? "Winner: " + winner
                  : "Next Player: " + (xIsNext ? "X" : "O")}
                </p>*/}
              {renderSquares(game?.board)}
            </div>
            <div className="d-flex btn-group-vertical position-absolute bottom-0 translate-middle-y">
              <div className="pt-2">
                <Button
                  onClick={() => navigate(-1)}
                  type="submit"
                  className="btn btn-primary "
                >
                  Back
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RenderGame;
