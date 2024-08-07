"use client"; // This ensures that the component is rendered on the client side

import { useEffect, useState } from 'react';
import { fetchStockData } from '../services/api';
import '/app/styles/table.css';
import withAuth from '../hoc/withAuth'; // Adjust the path accordingly

const Losers = () => {
  const [losers, setLosers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchStockData();
        setLosers(data.losers);
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
      <h1>Top Losers</h1>
      <table>
        <thead>
          <tr>
            <th>Ticker</th>
            <th>Date</th>
            <th>Open</th>
            <th>Close</th>
            <th>Price Change Percentage</th>
          </tr>
        </thead>
        <tbody>
          {losers.map((loser) => (
            <tr key={loser.ticker + loser.date}>
              <td>{loser.ticker}</td>
              <td>{loser.date}</td>
              <td>{loser.open}</td>
              <td>{loser.close}</td>
              <td>{loser.price_change_percentage.toFixed(2)}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
};

export default withAuth(Losers);


