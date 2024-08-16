"use client";
import { useState, useEffect } from "react";
import { GrMoney } from "react-icons/gr";
import { RiStockLine } from "react-icons/ri";
import SearchIcon from "@mui/icons-material/Search";
import { Box, Button, TextField, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";

const ManagerStocks = () => {
    const [userStocks, setUserStocks] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [totalAmountSpent, setTotalAmountSpent] = useState(0);
    const [recentlyBoughtStock, setRecentlyBoughtStock] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredStocks, setFilteredStocks] = useState([]);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        // Fetch transactions and then process them to create userStocks
        const fetchTrades = async () => {
            try {
                localStorage.setItem("email", "vaibhavpatel02892@gmail.com");
                const response = await axios.post(
                    `${process.env.NEXT_PUBLIC_BASEPATH}/api/transactions/by-email`,
                    {
                        email: localStorage.getItem("email"),
                    }
                );
                const fetchedTransactions = response.data.data;

                // Process transactions to create userStocks
                const stockMap = {};
                let totalAmount = 0;
                let highestPrice = 0;
                let recentlyBought = null;

                fetchedTransactions.forEach((transaction) => {
                    const { symbol, quantity, type, price } = transaction;
                    if (!stockMap[symbol]) {
                        stockMap[symbol] = {
                            id: symbol,
                            symbol: symbol,
                            name: `${symbol} Inc.`, // Dummy name, replace with real company names if available
                            quantity: 0,
                            currentPrice: null, // Current price is left blank
                            purchasePrice: price,
                        };
                    }

                    if (type === "buy") {
                        stockMap[symbol].quantity += quantity;
                        totalAmount += quantity * price;
                    } else if (type === "sell") {
                        stockMap[symbol].quantity -= quantity;
                    }

                    if (!recentlyBought || price > highestPrice) {
                        recentlyBought = stockMap[symbol];
                        highestPrice = price;
                    }
                });

                // Convert stockMap to array
                const userStocksArray = Object.values(stockMap).filter(
                    (stock) => stock.quantity > 0
                );

                setUserStocks(userStocksArray);
                setTransactions(fetchedTransactions);
                setTotalAmountSpent(totalAmount);
                setRecentlyBoughtStock(recentlyBought);
            } catch (error) {
                console.error("Error fetching transactions:", error);
            }
        };

        fetchTrades();
    }, []);

    useEffect(() => {
        const lowercasedSearchTerm = searchTerm.toLowerCase();
        const filtered = userStocks.filter(stock =>
            stock.symbol.toLowerCase().includes(lowercasedSearchTerm) &&
            (filter === 'all' ||
             (filter === 'gainers' && stock.currentPrice > stock.purchasePrice) ||
             (filter === 'losers' && stock.currentPrice < stock.purchasePrice))
        );
        setFilteredStocks(filtered);
    }, [searchTerm, userStocks, filter]);

    const columns = [
        { field: 'symbol', headerName: 'Symbol', width: 150, renderCell: (params) => (
            <Box
                sx={{
                    backgroundColor: params.row.currentPrice > params.row.purchasePrice ? 'lightgreen' : 'lightcoral',
                    color: 'black',
                    padding: '4px',
                    borderRadius: '4px',
                }}
            >
                {params.value}
            </Box>
        ) },
        { field: 'name', headerName: 'Company Name', width: 200 },
        { field: 'quantity', headerName: 'Quantity', width: 150 },
        { field: 'currentPrice', headerName: 'Current Price', width: 150, renderCell: (params) => `$${params.value?.toFixed(2) || 'N/A'}` },
        { field: 'purchasePrice', headerName: 'Purchase Price', width: 150, renderCell: (params) => `$${params.value.toFixed(2)}` },
        { field: 'totalValue', headerName: 'Total Value', width: 150, renderCell: (params) => `$${(params.row.quantity * params.row.currentPrice).toFixed(2)}` },
        { field: 'gainLoss', headerName: 'Gain/Loss', width: 150, renderCell: (params) => (
            <Box sx={{ color: params.row.currentPrice > params.row.purchasePrice ? 'green' : 'red' }}>
                ${((params.row.quantity * params.row.currentPrice) - (params.row.quantity * params.row.purchasePrice)).toFixed(2)}
            </Box>
        ) },
    ];

    return (
        <div className="w-full">
            <Box sx={{ p: 4, display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                    label="Search by Symbol"
                    variant="outlined"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    InputProps={{
                        endAdornment: <SearchIcon />,
                    }}
                    sx={{ mb: 2 }}
                />
                <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button
                        variant={filter === 'gainers' ? 'contained' : 'outlined'}
                        onClick={() => setFilter('gainers')}
                        sx={{ flexGrow: 1 }}
                    >
                        Gainers
                    </Button>
                    <Button
                        variant={filter === 'losers' ? 'contained' : 'outlined'}
                        onClick={() => setFilter('losers')}
                        sx={{ flexGrow: 1 }}
                    >
                        Losers
                    </Button>
                    <Button
                        variant={filter === 'all' ? 'contained' : 'outlined'}
                        onClick={() => setFilter('all')}
                        sx={{ flexGrow: 1 }}
                    >
                        All
                    </Button>
                </Box>
            </Box>

            <Box sx={{ p: 4, backgroundColor: 'white', borderRadius: '8px', boxShadow: 3 }}>
                <Typography variant="h4" gutterBottom sx={{ mb: 2, backgroundColor: '#f5f5f5', p: 2, borderRadius: '4px', fontWeight: 'bold' }}>
                    Portfolio
                </Typography>

                <Box sx={{ height: 600, width: '100%', backgroundColor: 'white', borderRadius: '8px', boxShadow: 1 }}>
                    <DataGrid
                        rows={filteredStocks}
                        columns={columns}
                        pageSize={20}
                        rowsPerPageOptions={[20]}
                        checkboxSelection
                        sx={{ border: 'none' }}
                    />
                </Box>

                <Box sx={{ p: 4, backgroundColor: 'white', borderRadius: '8px', boxShadow: 1, mt: 4 }}>
                    <Typography variant="h5" gutterBottom sx={{ mb: 2, backgroundColor: '#f5f5f5', p: 2, borderRadius: '4px', fontWeight: 'bold' }}>
                        Total Amount Spent
                    </Typography>
                    <Typography variant="h6">
                        The total amount spent on stocks since joining: <span style={{ color: 'orange' }}>${totalAmountSpent.toFixed(2)}</span>
                    </Typography>
                </Box>

                <Box sx={{ p: 4, backgroundColor: 'white', borderRadius: '8px', boxShadow: 1, mt: 4 }}>
                    <Typography variant="h5" gutterBottom sx={{ mb: 2, backgroundColor: '#f5f5f5', p: 2, borderRadius: '4px', fontWeight: 'bold' }}>
                        Recently Bought Stock
                    </Typography>
                    {recentlyBoughtStock ? (
                        <Box sx={{ p: 2, borderRadius: '4px', backgroundColor: '#e0f7fa', border: '1px solid #00acc1' }}>
                            <Typography variant="body1" sx={{ mb: 1 }}>
                                <strong>Stock Symbol:</strong> {recentlyBoughtStock.symbol}
                            </Typography>
                            <Typography variant="body1" sx={{ mb: 1 }}>
                                <strong>Company Name:</strong> {recentlyBoughtStock.name}
                            </Typography>
                            <Typography variant="body1">
                                <strong>Purchase Price:</strong> ${recentlyBoughtStock.purchasePrice.toFixed(2)}
                            </Typography>
                        </Box>
                    ) : (
                        <Typography variant="body1" color="error">
                            No recent stock purchases
                        </Typography>
                    )}
                </Box>

                <Box sx={{ p: 4, backgroundColor: 'white', borderRadius: '8px', boxShadow: 1, mt: 4 }}>
                    <Typography variant="h5" gutterBottom sx={{ mb: 2, backgroundColor: '#f5f5f5', p: 2, borderRadius: '4px', fontWeight: 'bold' }}>
                        Transaction History
                    </Typography>
                    <Box sx={{ backgroundColor: '#fafafa', p: 2, borderRadius: '4px', boxShadow: 1 }}>
                        {transactions.length > 0 ? (
                            transactions.map((transaction) => (
                                <Box
                                    key={transaction.id}
                                    sx={{
                                        mb: 1,
                                        p: 2,
                                        borderRadius: '4px',
                                        backgroundColor: '#ffffff',
                                        boxShadow: 1,
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Typography variant="body2">
                                        {transaction.type} {transaction.quantity} shares of {transaction.symbol} on {transaction.date}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                        ${transaction.price.toFixed(2)}
                                    </Typography>
                                </Box>
                            ))
                        ) : (
                            <Typography variant="body1" color="text.secondary">
                                No transactions found.
                            </Typography>
                        )}
                    </Box>
                </Box>
            </Box>
        </div>
    );
};

export default ManagerStocks;
