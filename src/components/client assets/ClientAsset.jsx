import React, { useState } from 'react';
import './App.css'; // Import CSS file

const initialAssets = [
  { name: 'Stock A', date: '2023-01-01', volume: 100, boughtPrice: 150, currentPrice: 200 },
  { name: 'Stock B', date: '2023-02-15', volume: 50, boughtPrice: 300, currentPrice: 250 },
  { name: 'Stock C', date: '2023-05-10', volume: 75, boughtPrice: 100, currentPrice: 150 },
  // Add more assets here
];

function calculatePNL(boughtPrice, currentPrice, volume) {
  const pnl = (currentPrice - boughtPrice) * volume;
  const pnlPercent = ((currentPrice - boughtPrice) / boughtPrice) * 100;
  return { pnl, pnlPercent };
}

function App() {
  const [assets, setAssets] = useState(initialAssets);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  const sortedAssets = [...assets];

  if (sortConfig.key) {
    sortedAssets.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
  }

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const handleSortChange = (e) => {
    const key = e.target.value;
    requestSort(key);
  };

  return (
    <div className="main-container">
      <div className="main-content">
        <div className="asset-classes">
          <div className="table-header">
            <h2>Your Assets</h2>
            <select onChange={handleSortChange}>
              <option value="name">Instrument Name</option>
              <option value="date">Date of Purchase</option>
              <option value="volume">Volume</option>
              <option value="boughtPrice">Bought Price</option>
              <option value="currentPrice">Current Market Price</option>
              <option value="pnl">PNL</option>
              <option value="pnlPercent">PNL%</option>
            </select>
          </div>
          <table>
            <thead>
              <tr>
                <th>Instrument Name</th>
                <th>Date of Purchase</th>
                <th>Volume</th>
                <th>Bought Price</th>
                <th>Current Market Price</th>
                <th>Current Market Value</th>
                <th>PNL</th>
                <th>PNL%</th>
              </tr>
            </thead>
            <tbody>
              {sortedAssets.map((asset, index) => {
                const { pnl, pnlPercent } = calculatePNL(asset.boughtPrice, asset.currentPrice, asset.volume);
                return (
                  <tr key={index}>
                    <td>{asset.name}</td>
                    <td>{asset.date}</td>
                    <td>{asset.volume}</td>
                    <td>${asset.boughtPrice}</td>
                    <td>${asset.currentPrice}</td>
                    <td>${(asset.currentPrice * asset.volume).toFixed(2)}</td>
                    <td>${pnl.toFixed(2)}</td>
                    <td>{pnlPercent.toFixed(2)}%</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="user-info">
          <img src="path-to-user-image.jpg" alt="User" />
          <div className="details">
            <h2>John Doe</h2>
            <p>Age: 30</p>
            {/* Add more user details here */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;