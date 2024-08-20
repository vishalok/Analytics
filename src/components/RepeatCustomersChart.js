import React, { useEffect, useRef } from 'react';
import { Chart as ChartJS, BarElement, BarController, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(BarElement, BarController, CategoryScale, LinearScale, Title, Tooltip, Legend);

const RepeatCustomersChart = ({ data }) => {
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
                text: 'Repeat Customers Over Time',
            },
        },
    };

    return <Bar ref={chartRef} data={data} options={options} />;
};

export default RepeatCustomersChart;
