import React, { useState } from 'react';
import './App.css'; // Import CSS file


const assetClasses = [
  {
    type: 'Equities',
    instruments: [
      { 
        Ticker: 'AAPL', 
        CompanyName: 'Apple Inc.', 
        Price: 150, 
        HighLow: '200/100', 
        AvgVolume: 5000000, 
        Industry: 'Technology', 
        Exchange: 'NASDAQ' 
      },
      { 
        Ticker: 'TSLA', 
        CompanyName: 'Tesla Inc.', 
        Price: 700, 
        HighLow: '900/500', 
        AvgVolume: 10000000, 
        Industry: 'Automobile', 
        Exchange: 'NASDAQ' 
      }
      // Add more stocks here
    ]
  },
  {
    type: 'Money Market',
    instruments: [
      { 
        Ticker: 'GOVBOND', 
        Issuer: 'US Government', 
        CouponRate: '3%', 
        FaceValue: 1000, 
        MaturityDate: '2030-01-01', 
        CreditRating: 'AAA', 
        BondPrice: 1050 
      },
      { 
        Ticker: 'CORPBOND', 
        Issuer: 'ABC Corp.', 
        CouponRate: '5%', 
        FaceValue: 1000, 
        MaturityDate: '2025-06-30', 
        CreditRating: 'BBB', 
        BondPrice: 980 
      }
      // Add more bonds here
    ]
  }
];

function App() {
  const [selectedClass, setSelectedClass] = useState(assetClasses[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  const handleClassChange = (type) => {
    const selected = assetClasses.find(assetClass => assetClass.type === type);
    setSelectedClass(selected);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filteredInstruments = selectedClass.instruments.filter(instrument =>
    Object.values(instrument).some(value =>
      String(value).toLowerCase().includes(searchTerm)
    )
  );


  return (
    <div className={`main-container ${darkMode ? 'dark-mode' : ''}`}>
      <div className="main-content">
        <div className="asset-classes">
          <div className="class-header">
            <h2>Asset Classes</h2>
            <input 
              type="text" 
              placeholder="Search..." 
              onChange={handleSearchChange} 
            />
            <select onChange={(e) => handleClassChange(e.target.value)}>
              {assetClasses.map((assetClass, index) => (
                <option key={index} value={assetClass.type}>{assetClass.type}</option>
              ))}
            </select>
          </div>
          <table>
            <thead>
              <tr>
                {Object.keys(selectedClass.instruments[0]).map((key, index) => (
                  <th key={index}>{key.replace(/([A-Z])/g, ' $1').trim()}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredInstruments.map((instrument, index) => (
                <tr key={index}>
                  {Object.values(instrument).map((value, idx) => (
                    <td key={idx}>
                      {typeof value === 'string' && value.includes('Ticker') ? (
                        <span className={`indicator ${value.toLowerCase()}`}>{value}</span>
                      ) : (
                        value
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;

