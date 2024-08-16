"use client";

import React, { useContext, useState } from 'react';
import { Container, Grid, Paper, Typography, TextField, Button, CircularProgress, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { DataGrid } from '@mui/x-data-grid';
import { StockContext } from '../context/StockContext'; // Import StockContext

// Styled components
const Title = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  color: 'black', // Set the title color to black
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[3],
  borderRadius: theme.shape.borderRadius,
}));

const SearchInput = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  width: '250px',
}));

const FilterButton = styled(Button)(({ active }) => ({
  marginRight: '10px',
  backgroundColor: active ? '#1976d2' : '#e0e0e0',
  color: active ? '#fff' : '#000',
  '&:hover': {
    backgroundColor: active ? '#1565c0' : '#bdbdbd',
  },
}));

const AssetClasses = () => {
  const { stockDetails, loading, error } = useContext(StockContext); // Access stockDetails from context
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All'); // Added state for filter type

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">Error: {error}</Typography>;

  // Filter stocks based on search term and filter type
  const filteredStocks = stockDetails
    .filter(stock => stock.T.toUpperCase().includes(searchTerm.toUpperCase()))
    .filter(stock => {
      if (filterType === 'Gainers') return stock.c > stock.o;
      if (filterType === 'Losers') return stock.c < stock.o;
      return true; // No filter applied
    });

  const rows = filteredStocks.map(stock => ({
    id: stock.T, // Unique id for each row
    symbol: stock.T,
    open: stock.o,
    close: stock.c,
    high: stock.h,
    low: stock.l,
    volume: stock.v,
    timestamp: new Date(stock.t).toLocaleString(),
    gain: stock.c - stock.o // Calculate gain or loss
  }));

  const columns = [
    {
      field: 'symbol',
      headerName: 'Symbol',
      width: 150,
      renderCell: (params) => (
        <div style={{
          backgroundColor: params.row.gain > 0 ? 'lightgreen' : 'lightcoral',
          padding: '5px',
          borderRadius: '4px'
        }}>
          {params.value}
        </div>
      ),
    },
    { field: 'open', headerName: 'Open', width: 130 },
    { field: 'close', headerName: 'Close', width: 130 },
    { field: 'high', headerName: 'High', width: 130 },
    { field: 'low', headerName: 'Low', width: 130 },
    { field: 'volume', headerName: 'Volume', width: 130 },
    { field: 'timestamp', headerName: 'Timestamp', width: 180 }
  ];

  return (
    <Container maxWidth="lg" sx={{ paddingY: 4 }}>
      <Title variant="h2" component="h1" align="center" gutterBottom>
        Market Overview
      </Title>
      
      <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
        {/* Search bar */}
        <SearchInput
          label="Search by Symbol"
          style={{marginTop: '2px'}}
          variant="outlined"
          size="small"
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* Filter buttons */}
        <Box sx={{ marginLeft: 2}}>
          <FilterButton
            variant="contained"
            active={filterType === 'Gainers'}
            onClick={() => setFilterType('Gainers')}
          >
            Gainers
          </FilterButton>
          <FilterButton
            variant="contained"
            active={filterType === 'Losers'}
            onClick={() => setFilterType('Losers')}
          >
            Losers
          </FilterButton>
          <FilterButton
            variant="contained"
            active={filterType === 'All'}
            onClick={() => setFilterType('All')}
          >
            All
          </FilterButton>
        </Box>
      </Box>

      <StyledPaper elevation={3}>
        <div style={{ height: 600, width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={20}
            rowsPerPageOptions={[20]}
            disableSelectionOnClick
            componentsProps={{
              columnHeaders: {
                sx: { fontWeight: 'bold' }
              }
            }}
          />
        </div>
      </StyledPaper>
    </Container>
  );
};

export default AssetClasses;
