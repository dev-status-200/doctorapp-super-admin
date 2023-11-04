import React, { useRef, useEffect, memo } from "react";
import { Chart } from "chart.js/auto";

function BarChart(props) {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    if (chartRef && chartRef.current) {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }

      const ctx = chartRef.current.getContext("2d");
      chartInstanceRef.current = new Chart(ctx, {
        type: "bar",
        data: {
          labels: props.labels,
          datasets: [
            {
              label: props.title,
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
      <div className="bar-container">
        <canvas ref={chartRef} />
      </div>
    </>
  );
}

export default memo(BarChart);
