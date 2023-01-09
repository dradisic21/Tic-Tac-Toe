import React from "react";
import Pagination from "../pagination/Pagination";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUsers } from "../Api";
import "./RankingList.css";
import { Button } from "react-bootstrap";

function RankingList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPageLimit, setMaxPageLimit] = useState(10);
  const [minPageLimit, setMinPageLimit] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const pageNumberLimit = 10;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getUsers(pageNumberLimit, currentPage);
    
        setUsers(
          response.data.results.sort((a, b) => {
            return b.win_rate - a.win_rate;  //sortiramo po win rate-u, kad sam dodao paginaciju ne vrati sortiranu listu 
            
          })
        );
        setTotalPages(Math.ceil(response.data.count / pageNumberLimit));
        setError(null);
      } catch (err) {
        setError(err.message);
        setUsers(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [currentPage]);

  const handleLogout = (e) => {
    localStorage.clear("userToken");
    navigate("/");
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
    totalPages
  };

  return (
    <div className="container">
      <div className="header position-relative">
        <div className="position-relative d-flex justify-content-center align-items-center">
          <h1 className="title">RANKING LIST</h1>
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
      <div className="tbl-content table-responsive-sm">
        <table className="table table-secondary table-hover">
          <thead className="table-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">User</th>
              <th scope="col">Played Games</th>
              <th scope="col">Winner Rate</th>
            </tr>
          </thead>
          <tbody>
            {users.map((val) => {
              return (
                <tr key={val.id}>
                  <td>{val.id}</td>
                  <td>{val.username}</td>
                  <td>{val.game_count}</td>
                  <td>{val.win_rate.toFixed(2)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="d-flex justify-content-center">
        <Pagination
          {...paginationAttributes}
          onPrevClick={onPrevClick}
          onNextClick={onNextClick}
          onPageChange={onPageChange}
        />
      </div>
      <div className="d-flex justify-content-center pt-5">
      <Button
            onClick={() => navigate(-1)}
            type="submit"
            className="btn btn-primary"
          >
            Back
          </Button>
      </div>
    </div>
  );
}

export default RankingList;
