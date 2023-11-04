"use client"
import React from "react";

import { Select } from 'antd';
import { HiSearch } from "react-icons/hi";

const TableHeader = ({ length, title, setSearchTerm }) => {
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  return (
    <div className="header-container ">
      <div className="appointments-count">
        <span className="number">{length}</span>
        <h5 className="mt-2">{title}</h5>
      </div>
      <div className="controls-container">
        <div className="search-container">
          <input
            onChange={(e) => setSearchTerm(e.target.value)}
            type="text"
            placeholder="Search"
          />
          <HiSearch className="search-icon" />
        </div>
         <Select
      defaultValue="lucy"
      style={{
        width: 120,
      }}
      onChange={handleChange}
      options={[
        {
          value: 'jack',
          label: 'Jack',
        },
        {
          value: 'lucy',
          label: 'Lucy',
        },
        {
          value: 'Yiminghe',
          label: 'yiminghe',
        },
        {
          value: 'disabled',
          label: 'Disabled',
          disabled: true,
        },
      ]}
    />
        {/* <div className="sort-container">
          <label >Sort By</label>
          <select>
            <option value="name">Sort By</option>
            <option value="time">Time</option>
            <option value="location">Location</option>
          </select>
          <FunnelPlotOutlined className="sort-icon" />
        </div> */}
      </div>
    </div>
  );
};

export default TableHeader;
