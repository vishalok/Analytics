import React from 'react';
import { Line } from 'react-chartjs-2';

const CustomerLifetimeValueChart = ({ data }) => {
    return <Line data={data} />;
};

export default CustomerLifetimeValueChart;
