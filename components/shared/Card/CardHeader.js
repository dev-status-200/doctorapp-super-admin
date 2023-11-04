"use client"
import React from 'react'

const CardHeader = (props) => {
    return (
        <div className="header-container ">
          <div className="appointments-count">
            <span className="number">{props.length}</span>
            <h5 className="mt-2">{props.title}</h5>
          </div>
          <div className="controls-container">
            <div className="search-container">
            
            </div>
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
}

export default CardHeader
