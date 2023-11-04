import React, { useRef, useEffect, memo } from "react";
import {
  Chart,
  PieController,
  ArcElement,
  CategoryScale,
  Tooltip,
  Legend,
} from "chart.js";

Chart.register(PieController, ArcElement, CategoryScale, Tooltip, Legend);

function PieChart(props) {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    if (chartRef && chartRef.current) {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }

      const ctx = chartRef.current.getContext("2d");
      chartInstanceRef.current = new Chart(ctx, {
        type: "pie",
        data: {
          labels: props.labels,
          datasets: [
            {
              data: props.data,
              backgroundColor: props.backgroundColor,
              borderColor: props.borderColor,
              borderWidth: 1,
            },
          ],
        },
        options: props.options || {},
      });
    }

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [props]);

  return (
    <>
      <div className="canvas-container">
        <canvas ref={chartRef} />
      </div>
    </>
  );
}

export default  memo(PieChart);
