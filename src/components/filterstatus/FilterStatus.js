import React from "react";
import "./FilterStatus.css";
import "bootstrap/dist/css/bootstrap.min.css";

const FilterStatus = ({callback}) => {

  const handleCallback = (e) => callback(e)
 

  return (
    <div className="filter-status">
      <select
        className="form-select"
        name="gameStatus"
        onChange={handleCallback}
      >

        <option value="all">All</option>
        <option value="open">Open</option>
        <option value="progress">Progress</option>
        <option value="finished">Finished</option>
      </select>
      
    </div>
  );
};
export default FilterStatus;
