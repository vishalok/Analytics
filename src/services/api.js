import axios from 'axios';

const API_BASE_URL = 'https://analytics-api-zqoe.onrender.com/api/analytics';

export const fetchTotalSalesOverTime = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/total-sales`);
        return response.data;
    } catch (error) {
        console.error('Error fetching total sales data:', error);
        throw error;
    }
};

export const fetchSalesGrowthRate = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/sales-growth-rate`);
        return response.data;
    } catch (error) {
        console.error('Error fetching sales growth rate data:', error);
        throw error;
    }
};

export const fetchNewCustomers = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/new-customers`);
        return response.data;
    } catch (error) {
        console.error('Error fetching new customers:', error);
        return [];
    }
};

export const fetchRepeatCustomers = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/repeat-customers`);
        return response.data;
    } catch (error) {
        console.error('Error fetching repeat customers:', error);
        return [];
    }
};

export const fetchGeographicalDistribution = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/geographical-distribution`);
        return response.data;
    } catch (error) {
        console.error('Error fetching geographical distribution:', error);
        return [];
    }
};

export const fetchCustomerLifetimeValue = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/customer-lifetime-value`);
        console.log(response.data)
        return response.data;
       
    } catch (error) {
        console.error('Error fetching customer lifetime value:', error);
        return [];
    }
};
