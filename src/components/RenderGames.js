import React from "react";
import { useState, useEffect } from "react";
import Pagination from "../pagination/Pagination";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { getGames } from "../Api";
import { joinGame } from "../Api";
import moment from "moment";
import NewGame from "../newgame/NewGame";
import FilterStatus from "./filterstatus/FilterStatus";
import "./RenderGames.css";

const RenderGames = () => {
  const [games, setGames] = useState([]);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPageLimit, setMaxPageLimit] = useState(10);
  const [minPageLimit, setMinPageLimit] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const pageNumberLimit = 10;
  const navigate = useNavigate();
  const loggedInUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await getGames(pageNumberLimit, currentPage, status);
        setGames(response.data.results);
        setTotalPages(Math.ceil(response.data.count / pageNumberLimit));
        setError(null);
      } catch (err) {
        setError(err.message);
        setGames(null);
      } finally {
        setLoading(false);
      }
    };
    fetchGames();
  }, [currentPage, status]);

  const gameJoin = async (game) => {
    try {
      const response = await joinGame(game.id);
      showGame(game);
    } catch (err) {
    } finally {
    }
  };

  const onStatusFilter = (e) => {
    setStatus(e.target.value);
    setCurrentPage(1);
  };
  const handleLogout = (e) => {
    localStorage.clear("userToken");
    navigate("/");
  };

  let showGame = (game) => {
    navigate("/rendergame", { state: { gameId: game.id } });
  };

  const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const onPrevClick = () => {
    if ((currentPage - 1) % pageNumberLimit === 0) {
      setMaxPageLimit(maxPageLimit - pageNumberLimit);
      setMinPageLimit(minPageLimit - pageNumberLimit);
    }
    setCurrentPage((prev) => prev - 1);
  };

  const onNextClick = () => {
    if (currentPage + 1 > maxPageLimit) {
      setMaxPageLimit(maxPageLimit + pageNumberLimit);
      setMinPageLimit(minPageLimit + pageNumberLimit);
    }
    setCurrentPage((prev) => prev + 1);
  };

  const paginationAttributes = {
    currentPage,
    maxPageLimit,
    minPageLimit,
    totalPages,
  };
  const statusClassName = {
    open: "status-green",
    progress: "status-yellow",
    finished: "status-red",
  };
  const renderActions = (game) => {
    if (game.second_player === null && game.first_player.id !== loggedInUser.id) {
      return (
        <>
          <svg
            onClick={() => gameJoin(game)}
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-joystick"
            viewBox="0 0 16 16"
          >
            <path d="M10 2a2 2 0 0 1-1.5 1.937v5.087c.863.083 1.5.377 1.5.726 0 .414-.895.75-2 .75s-2-.336-2-.75c0-.35.637-.643 1.5-.726V3.937A2 2 0 1 1 10 2z" />
            <path d="M0 9.665v1.717a1 1 0 0 0 .553.894l6.553 3.277a2 2 0 0 0 1.788 0l6.553-3.277a1 1 0 0 0 .553-.894V9.665c0-.1-.06-.19-.152-.23L9.5 6.715v.993l5.227 2.178a.125.125 0 0 1 .001.23l-5.94 2.546a2 2 0 0 1-1.576 0l-5.94-2.546a.125.125 0 0 1 .001-.23L6.5 7.708l-.013-.988L.152 9.435a.25.25 0 0 0-.152.23z" />
          </svg>
          <svg
            onClick={() => showGame(game)}
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-eye"
            viewBox="0 0 16 16"
          >
            <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
            <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
          </svg>
        </>
      );

    } else if((loggedInUser.id === game.first_player.id || loggedInUser.id === game.second_player.id) && game.status === 'progress'){
      return (
        <svg
        onClick={() => showGame(game)}
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        className="bi bi-joy"
        viewBox="0 0 16 16"
      >
        <path d="M10 2a2 2 0 0 1-1.5 1.937v5.087c.863.083 1.5.377 1.5.726 0 .414-.895.75-2 .75s-2-.336-2-.75c0-.35.637-.643 1.5-.726V3.937A2 2 0 1 1 10 2z" />
        <path d="M0 9.665v1.717a1 1 0 0 0 .553.894l6.553 3.277a2 2 0 0 0 1.788 0l6.553-3.277a1 1 0 0 0 .553-.894V9.665c0-.1-.06-.19-.152-.23L9.5 6.715v.993l5.227 2.178a.125.125 0 0 1 .001.23l-5.94 2.546a2 2 0 0 1-1.576 0l-5.94-2.546a.125.125 0 0 1 .001-.23L6.5 7.708l-.013-.988L.152 9.435a.25.25 0 0 0-.152.23z" />
      </svg>
    );
    } else {
      return (
      <svg
      onClick={() => showGame(game)}
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      className="bi bi-eye"
      viewBox="0 0 16 16"
    >
      <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
      <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
    </svg>
    );}
  };

  return (
    <div className="wrapper">
      {loading && <div>A moment please...</div>}
      {error && <div>{`Problem fetching the post data - ${error}`}</div>}
      <div className="game_list">
        <div className="header position-relative">
          <div className="position-relative d-flex justify-content-center align-items-center">
            <h1 className="title">GAMES</h1>
          </div>
          <div className="logout-btn d-flex">
            <Button
              onClick={handleLogout}
              type="submit"
              className="Btn btn-outline-secondary"
            >
              LOGOUT
            </Button>
          </div>
        </div>
        <div className="btn-ranking py-4">
          <Link to="/rankinglist">
            <Button>Ranking List</Button>
          </Link>
        </div>
        <div className="d-flex">
          <FilterStatus callback={onStatusFilter} />
        </div>
        <div className="tbl-content">
          <table className="table1 table-secondary table-hover w-auto">
            <thead className="table-primary">
              <tr>
                <th scope="col">#</th>
                <th scope="col">First Player</th>
                <th scope="col">Second Player</th>
                <th scope="col">Winner</th>
                <th scope="col">Status</th>
                <th scope="col">Created</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {games &&
                games.map((game) => {
                  return (
                    <tr key={game.id}>
                      <td>{game.id}</td>
                      <td>{game.first_player?.username}</td>
                      <td>{game.second_player?.username}</td>
                      <td>{game.winner?.username}</td>
                      <td className={statusClassName[game.status]}>
                        {game.status}
                      </td>
                      <td>{moment(game.created).format("llll")}</td>
                      <td>{renderActions(game)}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
        <div className="d-flex justify-content-center pt-5">
          <Pagination
            {...paginationAttributes}
            onPrevClick={onPrevClick}
            onNextClick={onNextClick}
            onPageChange={onPageChange}
          />
        </div>
        <NewGame />
      </div>
    </div>
  );
};

export default RenderGames;
