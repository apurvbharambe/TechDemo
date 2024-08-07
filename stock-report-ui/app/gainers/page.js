"use client"; // Ensures client-side rendering

import { useEffect, useState } from 'react';
import { fetchStockData } from '../services/api';
import '/app/styles/table.css';
import withAuth from '../hoc/withAuth'; // Adjust the path accordingly

const Gainers = () => {
  const [gainers, setGainers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchStockData();
        setGainers(data.gainers);
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
      <h1>Top Gainers</h1>
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
          {gainers.map((gainer) => (
            <tr key={gainer.ticker + gainer.date}>
              <td>{gainer.ticker}</td>
              <td>{gainer.date}</td>
              <td>{gainer.open}</td>
              <td>{gainer.close}</td>
              <td>{gainer.price_change_percentage.toFixed(2)}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
};

export default withAuth(Gainers);

