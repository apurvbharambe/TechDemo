// services/api.js
const API_URL = "http://192.168.49.2:30001/kpis/";

export async function fetchStockData() {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error("Failed to fetch stock data");
  }
  const data = await response.json();
  return data.data;
}
