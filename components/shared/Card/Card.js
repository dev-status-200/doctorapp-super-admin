"use client"
import React, { memo } from "react";

import CardHeader from "./CardHeader";


const Card = (props) => {
  return (
    <div className="custom-card border rounded shadow">
      <CardHeader length={props.length} title={props.title} />

      <>{props.children}</>
      <div className="text-center  p-3">
        {/* <h5 className=" p-3 " onClick>View All</h5> */}
      </div>
    </div>
  );
};

export default memo(Card);


