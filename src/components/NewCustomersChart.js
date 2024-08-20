import React from 'react';
import { Line } from 'react-chartjs-2';

const NewCustomersChart = ({ data }) => {
    return <Line data={data} />;
};

export default NewCustomersChart;
