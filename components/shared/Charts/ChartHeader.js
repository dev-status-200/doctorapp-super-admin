import React,{memo} from "react";

import { FunnelPlotOutlined } from "@ant-design/icons/lib/icons";

const ChartHeader = (props) => {
  return (
    <div className="header-container ">
      <div className="appointments-count">
        <h5>{props.title}</h5>
      </div>
      <div className="controls-container">
        <div className="sort-container">
          <select className="px-4">
            <option value="name">Sort By</option>
            <option value="time">Time</option>
            <option value="location">Location</option>
          </select>
          <div className="">
            <FunnelPlotOutlined className="sort-icon" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default  memo(ChartHeader);
