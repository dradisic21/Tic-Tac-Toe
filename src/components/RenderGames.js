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
    if (game.second_player === null && game.first_player !== loggedInUser) {
      return (
        <>
          <div onClick={() => gameJoin(game)}>JOIN</div>
          <div onClick={() => showGame(game)}>VIEW</div>
        </>
      );
    }else{
      return <div onClick={() => showGame(game)}>VIEW</div>
    }
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
