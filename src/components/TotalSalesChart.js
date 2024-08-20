import React, { useEffect, useRef } from 'react';
import { Chart as ChartJS, LineElement, PointElement, LineController, CategoryScale, LinearScale, Title, Tooltip, Legend, Filler } from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(LineElement, PointElement, LineController, CategoryScale, LinearScale, Title, Tooltip, Legend, Filler);

const TotalSalesChart = ({ data }) => {
    const chartRef = useRef(null);

    useEffect(() => {
        const chartInstance = chartRef.current;

        return () => {
            if (chartInstance) {
                chartInstance.destroy();
            }
        };
    }, []);

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
            },
            title: {
                display: true,
                text: 'Total Sales Over Time',
            },
        },
    };

    return <Line ref={chartRef} data={data} options={options} />;
};

export default TotalSalesChart;
