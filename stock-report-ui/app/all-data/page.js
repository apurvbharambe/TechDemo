"use client"; // This ensures that the component is rendered on the client side

import { useEffect, useState } from 'react';
import { fetchStockData } from '../services/api';
import '/app/styles/table.css';
import withAuth from '../hoc/withAuth'; // Adjust the path accordingly

const AllData = () => {
  const [allData, setAllData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchStockData();
        setAllData(data.all_data);
      } catch (error) {
        console.error('Failed to fetch stock data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>; // Show loading state while data is being fetched
  }

  return (
    <main>
      <h1>All Stock Data</h1>
      <table>
        <thead>
          <tr>
            <th>Ticker</th>
            <th>Date</th>
            <th>Open</th>
            <th>High</th>
            <th>Low</th>
            <th>Volume</th>
            <th>Daily Closing Price</th>
            <th>Price Change 24h</th>
            <th>Price Change 30d</th>
            <th>Price Change 1y</th>
          </tr>
        </thead>
        <tbody>
          {allData.map((stock) => (
            <tr key={stock.ticker + stock.date}>
              <td>{stock.ticker}</td>
              <td>{stock.date}</td>
              <td>{stock.open}</td>
              <td>{stock.high}</td>
              <td>{stock.low}</td>
              <td>{stock.volume}</td>
              <td>{stock.daily_closing_price}</td>
              <td>{stock.price_change_24h.toFixed(2)}</td>
              <td>{stock.price_change_30d.toFixed(2)}</td>
              <td>{stock.price_change_1y.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
};

export default withAuth(AllData);









