import React from "react";
import { useState, useEffect } from "react";
import "./RenderGame.css";
import { Button } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { getGame } from "../Api";
import { makeGameMove } from "../Api";

const RenderGame = () => {
  const [game, setGame] = useState({});
  const [canPlay, setCanPlay] = useState(false);
  const [nextPlayer, setNextPlayer] = useState(null);
  const [counter, setCounter] = useState(0)
  const navigate = useNavigate();
  const { state } = useLocation();
  const loggedInUser = JSON.parse(localStorage.getItem("user"));

  const renderSquares = (board) => {
    return board?.map((row, rowIndex) =>
      row.map((cell, colIndex) => {
        if (game.first_player?.id === cell) {
          return (
            <div
              row={rowIndex}
              col={colIndex}
              onClick={squareClickHandler}
              className="square text-primary"
              refresh={counter}
            >
              X
            </div>
          );
        } else if (game.second_player?.id === cell) {
          return (
            <div
              row={rowIndex}
              col={colIndex}
              onClick={squareClickHandler}
              className="square text-danger"
            >
              O
            </div>
          );
        } else {
          return (
            <div
              row={rowIndex}
              col={colIndex}
              onClick={squareClickHandler}
              className="square"
            ></div>
          );
        }
      })
    );
  };
  const squareClickHandler = (e) => {
    if (!isPlayerTurn(game)) {
      alert("Not your turn to play");
      return false;
    }

    const square = e.target;
    const row = square.getAttribute("row");
    const col = square.getAttribute("col");
    if (game.board[row][col] !== null) {
      alert("cell already played");
      return false;
    }
    const move = { row: row, col: col };
    const gameMove = async (move) => {
      try {
        const response = await makeGameMove(game.id, move);
        setCanPlay(false);
        switchPlayer();
        game.board[row][col] = loggedInUser.id;
      } catch (err) {
        setGame(null);
      } finally {
      }
    };
    gameMove(move);
  };

  const isPlayerTurn = (currentGame) => {
    if(game.second_player === null) {
      alert("Second player didn't join the game");
      return false;
    }
    if (
      loggedInUser.id !== currentGame.first_player.id &&
      loggedInUser.id !== currentGame.second_player.id
    ) {
      return false;
    }
    const numMoves = currentGame.board
      .flat()
      .filter((playerId) => playerId !== null).length;
    if (numMoves % 2 === 0 && loggedInUser.id === currentGame.first_player.id) {
      return true;
    } else if (
      numMoves % 2 !== 0 &&
      loggedInUser.id === currentGame.second_player.id
    ) {
      return true;
    }
    return false;
  };

  const findNextPlayer = (game) => {
    const numMoves = game.board
      .flat()
      .filter((playerId) => playerId !== null).length;
    if (numMoves % 2 === 0) {
      return game.first_player;
    } else {
      return game.second_player;
    }
  };
  const switchPlayer = () => {
    if(game.first_player === nextPlayer) {
      setNextPlayer(game.second_player);
    }else{
      setNextPlayer(game.first_player);
    }
  }

  useEffect(() => {
    const fetchGame = async (gameId) => {
      try {
        const response = await getGame(gameId);
        setGame(response.data);
        setNextPlayer(findNextPlayer(response.data));
        setCanPlay(isPlayerTurn(response.data));
      } catch (err) {
        setGame(null);
      } finally {
      }
    };
    fetchGame(state.gameId);
    const interval = setInterval(() => {
      fetchGame(state.gameId);
    }, 2000)
    return () => {
      clearInterval(interval) 
    }
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
              <u>LOGGEDIN USER:</u>
              <p className="px-5">{JSON.parse(localStorage.getItem("user")).username}</p>
            </h3>
            <h3 className="d-flex">
              <u>FIRST PLAYER:</u>
              <p className="px-5">{game?.first_player?.username}</p>
            </h3>
            <h3 className="d-flex">
              <u>SECOND PLAYER:</u>{" "}
             <p className="px-3">{game?.second_player?.username}</p>
            </h3>
            <h3 className="d-flex">
              <u>WINNER:</u>{" "}
              <p className="px-5 text-success">{game?.winner?.username}</p>
            </h3>
          </div>
          <div className="tic-tac-toe-game">
            <div>
              <div className="game postition-relative">
                {renderSquares(game?.board)}
              </div>

              <div className="postion-absolute d-flex justify-content-center pt-5">
                NEXT PLAYER{" "}
                <p className="px-3 text-success">{nextPlayer?.username }</p>
              </div>
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
