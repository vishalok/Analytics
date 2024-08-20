import React, { useState, useEffect } from 'react';
import TotalSalesChart from '../components/TotalSalesChart';
import SalesGrowthRateChart from '../components/SalesGrowthRateChart';
import NewCustomersChart from '../components/NewCustomersChart';
import RepeatCustomersChart from '../components/RepeatCustomersChart';
import GeographicalDistributionMap from '../components/GeographicalDistributionMap';
import CustomerLifetimeValueChart from '../components/CustomerLifetimeValueChart';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { 
    fetchNewCustomers, 
    fetchRepeatCustomers, 
    fetchGeographicalDistribution, 
    fetchCustomerLifetimeValue, 
    fetchTotalSalesOverTime, 
    fetchSalesGrowthRate 
} from '../services/api';

const Dashboard = () => {
    const [totalSalesData, setTotalSalesData] = useState(null);
    const [salesGrowthRateData, setSalesGrowthRateData] = useState(null);
    const [newCustomersData, setNewCustomersData] = useState(null);
    const [repeatCustomersData, setRepeatCustomersData] = useState(null);
    const [geographicalData, setGeographicalData] = useState(null);
    const [customerLifetimeValueData, setCustomerLifetimeValueData] = useState(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                const [
                    totalSales, 
                    salesGrowthRate, 
                    newCustomers, 
                    repeatCustomers, 
                    geographicalDistribution, 
                    customerLifetimeValue
                ] = await Promise.all([
                    fetchTotalSalesOverTime(),
                    fetchSalesGrowthRate(),
                    fetchNewCustomers(),
                    fetchRepeatCustomers(),
                    fetchGeographicalDistribution(),
                    fetchCustomerLifetimeValue()
                ]);

                setTotalSalesData({
                    labels: totalSales.map(sale => sale._id),
                    datasets: [{
                        label: 'Total Sales',
                        data: totalSales.map(sale => sale.totalSales),
                        borderColor: 'rgb(75, 192, 192)',
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        fill: true,
                    }],
                });

                setSalesGrowthRateData({
                    labels: salesGrowthRate.map(rate => rate.month),
                    datasets: [{
                        label: 'Sales Growth Rate',
                        data: salesGrowthRate.map(rate => rate.growthRate !== null ? rate.growthRate : 0),
                        borderColor: 'rgb(255, 99, 132)',
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        fill: true,
                    }],
                });

                setNewCustomersData({
                    labels: newCustomers.map(customer => customer._id),  // Assuming _id is the date
                    datasets: [{
                        label: 'New Customers',
                        data: newCustomers.map(customer => customer.newCustomers),
                        borderColor: 'rgb(54, 162, 235)',
                        backgroundColor: 'rgba(54, 162, 235, 0.2)',
                        fill: true,
                    }],
                });

             
                setRepeatCustomersData({
                    labels: repeatCustomers.map(customer => `${customer._id.high}-${customer._id.low}`), // Combine low and high parts
                    datasets: [{
                        label: 'Repeat Customers',
                        data: repeatCustomers.map(customer => customer.orderCount), // Use orderCount directly
                        backgroundColor: 'rgb(255, 159, 64)',
                    }],
                });
    
                setGeographicalData(geographicalDistribution);

                // setCustomerLifetimeValueData({
                //     labels: customerLifetimeValue.map(item => item.cohortMonth),
                //     datasets: [{
                //         label: 'Lifetime Value',
                //         data: customerLifetimeValue.map(item => item.totalLifetimeValue),
                //         borderColor: 'rgb(75, 192, 192)',
                //         backgroundColor: 'rgba(75, 192, 192, 0.2)',
                //         fill: true,
                //     }],
                // });

                const aggregatedData = customerLifetimeValue.map(cohort => {
                    const totalLifetimeValue = cohort.cohorts.reduce((sum, customer) => sum + customer.lifetimeValue, 0);
                    return {
                        cohortMonth: cohort._id,
                        totalLifetimeValue
                    };
                });
    
                // Prepare the data for the chart
                setCustomerLifetimeValueData({
                    labels: aggregatedData.map(item => item.cohortMonth),
                    datasets: [{
                        label: 'Lifetime Value',
                        data: aggregatedData.map(item => item.totalLifetimeValue),
                        borderColor: 'rgb(75, 192, 192)',
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        fill: true,
                    }],
                });

            } catch (error) {
                console.error('Failed to fetch data:', error);
            }
        };

        loadData();
    }, []);

    // return (
    //     <div>
    //         <h1>Dashboard</h1>
    //         {totalSalesData && <TotalSalesChart data={totalSalesData} />}
    //         {salesGrowthRateData && <SalesGrowthRateChart data={salesGrowthRateData} />}
    //         {newCustomersData && <NewCustomersChart data={newCustomersData} />}
    //         {repeatCustomersData && <RepeatCustomersChart data={repeatCustomersData} />}
    //         {geographicalData && <GeographicalDistributionMap data={geographicalData} />}
    //         {customerLifetimeValueData && <CustomerLifetimeValueChart data={customerLifetimeValueData} />}
    //     </div>
    // );
    //};

    const settings = {
        dots: true,
        infinite: true,
        speed: 100,
        slidesToShow: 1,
        slidesToScroll: 1
      };
    
      return (
        <div>
          <h1>Dashboard</h1>
          <Slider {...settings}>
            {totalSalesData && <div><TotalSalesChart data={totalSalesData} /></div>}
            {salesGrowthRateData && <div><SalesGrowthRateChart data={salesGrowthRateData} /></div>}
            {newCustomersData && <div><NewCustomersChart data={newCustomersData} /></div>}
            {repeatCustomersData && <div><RepeatCustomersChart data={repeatCustomersData} /></div>}
            {geographicalData && <div><GeographicalDistributionMap data={geographicalData} /></div>}
            {customerLifetimeValueData && <div><CustomerLifetimeValueChart data={customerLifetimeValueData} /></div>}
          </Slider>
        </div>
      );
    };


export default Dashboard;
