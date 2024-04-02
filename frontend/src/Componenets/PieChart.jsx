import React, { useRef, useEffect } from 'react'; // Import React and necessary hooks
import Chart from 'chart.js/auto'; // Import Chart from 'chart.js/auto' to include all modules

function PieChart({ data }) {
  const chartRef = useRef(null); // Ref for the chart canvas element

  useEffect(() => {
    if (chartRef.current && data) {
      // Destroy the existing chart if it exists
      if (chartRef.current.chart) {
        chartRef.current.chart.destroy();
      }

      // Create a new chart
      const ctx = chartRef.current.getContext('2d');
      const chart = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: data.map(expense => expense.description),
          datasets: [{
            label: 'Expenses',
            data: data.map(expense => expense.amount),
            backgroundColor: [
              'rgba(255, 99, 132, 0.5)',
              'rgba(54, 162, 235, 0.5)',
              'rgba(255, 206, 86, 0.5)',
              'rgba(75, 192, 192, 0.5)',
              'rgba(153, 102, 255, 0.5)',
              'rgba(255, 159, 64, 0.5)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false
        }
      });

      // Save the chart instance to the ref
      chartRef.current.chart = chart;
    }
  }, [data]);

  return <canvas ref={chartRef}></canvas>; // Render the canvas element
}

export default PieChart;
