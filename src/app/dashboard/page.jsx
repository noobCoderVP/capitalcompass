'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [buyCostVsDaysData, setBuyCostVsDaysData] = useState({ labels: [], datasets: [] });
  const [sellCostVsDaysData, setSellCostVsDaysData] = useState({ labels: [], datasets: [] });
  const [totalTransactionValueVsDaysData, setTotalTransactionValueVsDaysData] = useState({ labels: [], datasets: [] });
  const [stockInvestmentData, setStockInvestmentData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch transactions
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BASEPATH}/api/transactions/by-email`,
          {
            email: localStorage.getItem("email"),
          }
        );
        const data = response.data.data;
        setTransactions(data);
        console.log('Fetched transactions:', data);

        // Compute performance data
        const performance = computePerformanceData(data);
        console.log('Computed performance data:', performance);

        // Update chart data states
        setBuyCostVsDaysData({
          labels: performance.buys.map(data => data.date),
          datasets: [{
            label: 'Buy Cost vs Days',
            data: performance.buys.map(data => data.value),
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          }],
        });

        setSellCostVsDaysData({
          labels: performance.sells.map(data => data.date),
          datasets: [{
            label: 'Sell Cost vs Days',
            data: performance.sells.map(data => data.value),
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
          }],
        });

        setTotalTransactionValueVsDaysData({
          labels: performance.totalTransactionValues.map(data => data.date),
          datasets: [{
            label: 'Total Transaction Value vs Days',
            data: performance.totalTransactionValues.map(data => data.value),
            backgroundColor: 'rgba(153, 102, 255, 0.2)',
            borderColor: 'rgba(153, 102, 255, 1)',
            borderWidth: 1,
          }],
        });

        setStockInvestmentData({
          labels: performance.stocks.map(stock => stock.symbol),
          datasets: [{
            label: 'Stock Investments',
            data: performance.stocks.map(stock => stock.percentage),
            backgroundColor: 'rgba(255, 159, 64, 0.2)',
            borderColor: 'rgba(255, 159, 64, 1)',
            borderWidth: 1,
          }],
        });
      } catch (error) {
        console.error('Error fetching transaction data', error);
      }
    };

    fetchData();
  }, []);

  const computePerformanceData = (txns) => {
    // Initialize data structures
    const buyData = [];
    const sellData = [];
    const totalTransactionData = [];
    const stockData = {};

    // Define date range
    const today = new Date();
    const startDate = new Date(today.setDate(today.getDate() - 90));
    const dateFormat = (date) => date.toISOString().split('T')[0];

    console.log("txns", txns);
    txns.forEach(transaction => {

      const { t_date, price, quantity, type, symbol } = transaction;
      console.log("T", transaction);
      const dateStr = dateFormat(new Date(t_date));

      if (!stockData[symbol]) {
        stockData[symbol] = { symbol, percentage: 0 };
      }

      const transactionValue = quantity * price;
      if (type === 'buy') {
        buyData.push({ date: dateStr, value: transactionValue });
        stockData[symbol].percentage += transactionValue;
      } else if (type === 'sell') {
        sellData.push({ date: dateStr, value: transactionValue });
      }
      totalTransactionData.push({ date: dateStr, value: transactionValue });
    });

    const stocks = Object.values(stockData).map(stock => ({
      symbol: stock.symbol,
      percentage: stock.percentage
    }));

    return {
      buys: aggregateData(buyData),
      sells: aggregateData(sellData),
      totalTransactionValues: aggregateData(totalTransactionData),
      stocks
    };
  };

  const aggregateData = (data) => {
    const result = [];
    data.forEach(({ date, value }) => {
      const existing = result.find(item => item.date === date);
      if (existing) {
        existing.value += value;
      } else {
        result.push({ date, value });
      }
    });
    return result;
  };

  return (
    <div>
      <h2 style={{ fontWeight: 'bold', fontSize: '2.5rem', marginBottom: '30px' }}>Dashboard</h2>
      <div className="chart-container" style={{ display: 'flex', flexWrap: 'wrap', gap: '30px' }}>
        <div className="chart" style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', flex: '1 1 45%', maxWidth: '600px', height: '400px' }}>
          <h3 style={{ fontWeight: 'bold' }}>Buy Cost vs Days</h3>
          <Bar data={buyCostVsDaysData} options={{ responsive: true, plugins: { legend: { position: 'top' }, title: { display: true, text: 'Buy Cost vs Days' } }, maintainAspectRatio: false }} />
        </div>
        <div className="chart" style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', flex: '1 1 45%', maxWidth: '600px', height: '400px' }}>
          <h3 style={{ fontWeight: 'bold' }}>Sell Cost vs Days</h3>
          <Bar data={sellCostVsDaysData} options={{ responsive: true, plugins: { legend: { position: 'top' }, title: { display: true, text: 'Sell Cost vs Days' } }, maintainAspectRatio: false }} />
        </div>
        <div className="chart" style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', flex: '1 1 45%', maxWidth: '600px', height: '400px' }}>
          <h3 style={{ fontWeight: 'bold' }}>Total Transaction Value vs Days</h3>
          <Bar data={totalTransactionValueVsDaysData} options={{ responsive: true, plugins: { legend: { position: 'top' }, title: { display: true, text: 'Total Transaction Value vs Days' } }, maintainAspectRatio: false }} />
        </div>
        <div className="chart" style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', flex: '1 1 45%', maxWidth: '600px', height: '400px' }}>
          <h3 style={{ fontWeight: 'bold' }}>Stock Investments</h3>
          <Pie data={stockInvestmentData} options={{ responsive: true, plugins: { legend: { position: 'top' }, title: { display: true, text: 'Stock Investments' } }, maintainAspectRatio: false }} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
