import React from "react";
import "./FilterStatus.css";

const FilterStatus = () => {
  const onFilterValueChange = (e) => {
    console.log(e.target.value);
  };

  return (
    <div className="filter-status">
      <select
        className="form-select"
        name="gameStatus"
        onChange={onFilterValueChange}
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
