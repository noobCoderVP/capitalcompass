"use client";
import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import {
    Typography,
    Container,
    Paper,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import axios from "axios";

// Dummy data
const dummyTradeBook = [
    {
        id: 1,
        date: "2024-08-01",
        symbol: "AAPL",
        quantity: 10,
        price: 175.5,
        type: "Buy",
    },
    {
        id: 2,
        date: "2024-08-05",
        symbol: "MSFT",
        quantity: 5,
        price: 350.0,
        type: "Sell",
    },
    {
        id: 3,
        date: "2024-08-07",
        symbol: "GOOGL",
        quantity: 8,
        price: 2800.0,
        type: "Buy",
    },
];

const dummyCashflowBook = [
    {
        id: 1,
        date: "2024-08-02",
        amount: 1500.0,
        description: "Dividend from AAPL",
    },
    {
        id: 2,
        date: "2024-08-06",
        amount: 2500.0,
        description: "Sale proceeds from MSFT",
    },
    {
        id: 3,
        date: "2024-08-08",
        amount: 500.0,
        description: "Interest on Bonds",
    },
];

// Styled components
const StyledContainer = styled(Container)(({ theme }) => ({
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[3],
    borderRadius: theme.shape.borderRadius,
    marginBottom: theme.spacing(4),
}));

const TradeCashflow = () => {
    const [selectedTable, setSelectedTable] = useState("tradeBook");
    const [tradeBook, setTradeBook] = useState([]);
    const [cashflowBook, setCashflowBook] = useState([]);

    const fetchTrades = async () => {
        localStorage.setItem("email", "vaibhavpatel02892@gmail.com");
        console.log(localStorage.getItem("email"));
        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_BASEPATH}/api/transactions/by-email`,
            {
                email: localStorage.getItem("email"),
            }
        );
        setTradeBook(response.data.data);
        console.log(response.data.data);
    };

    useEffect(() => {
        // Simulate fetching data
        fetchTrades();
        setTradeBook(dummyTradeBook);
        setCashflowBook(dummyCashflowBook);
    }, []);

    const handleTableChange = (event) => {
        setSelectedTable(event.target.value);
    };

    const commonColumns = [
        {
            field: "id",
            headerName: "ID",
            width: 70,
            headerClassName: "header-style",
            sortable: true,
        },
    ];

    const tradeColumns = [
        ...commonColumns,
        {
            field: "symbol",
            headerName: "Symbol",
            flex: 1,
            headerClassName: "header-style",
            sortable: true,
        },
        {
            field: "quantity",
            headerName: "Quantity",
            flex: 1,
            headerClassName: "header-style",
            sortable: true,
        },
        {
            field: "price",
            headerName: "Price",
            flex: 1,
            headerClassName: "header-style",
            sortable: true,
        },
        {
            field: "type",
            headerName: "Type",
            flex: 1,
            headerClassName: "header-style",
            sortable: true,
        },
        {
            field: "t_date",
            headerName: "Date",
            flex: 1,
            headerClassName: "header-style",
            sortable: true,
        },
    ];

    const cashflowColumns = [
        ...commonColumns,
        {
            field: "amount",
            headerName: "Amount",
            flex: 1,
            headerClassName: "header-style",
            sortable: true,
        },
        {
            field: "description",
            headerName: "Description",
            flex: 2,
            headerClassName: "header-style",
            sortable: true,
        },
    ];

    useEffect(() => {});

    return (
        <StyledContainer maxWidth="lg">
            {/* <FormControl fullWidth sx={{ marginBottom: 2 }}>
        <InputLabel id="table-select-label">Select Table</InputLabel>
        <Select
          labelId="table-select-label"
          id="table-select"
          value={selectedTable}
          label="Select Table"
          onChange={handleTableChange}
        >
          <MenuItem value="tradeBook">Trade Book</MenuItem>
          <MenuItem value="cashflowBook">Cash Flow Book</MenuItem>
        </Select>
      </FormControl> */}

            {selectedTable === "tradeBook" && (
                <>
                    <Typography variant="h4" gutterBottom>
                        Trade Book
                    </Typography>
                    <StyledPaper elevation={3}>
                        <Box sx={{ height: "80dvh", width: "100%" }}>
                            <DataGrid
                                rows={tradeBook}
                                columns={tradeColumns}
                                pageSize={5}
                                disableColumnMenu
                                disableRowSelectionOnClick
                                sx={{
                                    "& .header-style": {
                                        backgroundColor: "black",
                                        color: "white",
                                        fontWeight: "bold",
                                    },
                                    "& .MuiDataGrid-columnHeaders": {
                                        backgroundColor: "black",
                                    },
                                    "& .MuiDataGrid-columnHeaderTitle": {
                                        fontWeight: "bold",
                                    },
                                }}
                            />
                        </Box>
                    </StyledPaper>
                </>
            )}

            {selectedTable === "cashflowBook" && (
                <>
                    <Typography variant="h4" gutterBottom>
                        Cash Flow Book
                    </Typography>
                    <StyledPaper elevation={3}>
                        <Box sx={{ height: 400, width: "100%" }}>
                            <DataGrid
                                rows={cashflowBook}
                                columns={cashflowColumns}
                                pageSize={5}
                                rowsPerPageOptions={[5]}
                                disableColumnMenu
                                disableRowSelectionOnClick
                                sx={{
                                    "& .header-style": {
                                        backgroundColor: "black",
                                        color: "white",
                                        fontWeight: "bold",
                                    },
                                    "& .MuiDataGrid-columnHeaders": {
                                        backgroundColor: "black",
                                    },
                                    "& .MuiDataGrid-columnHeaderTitle": {
                                        fontWeight: "bold",
                                    },
                                }}
                            />
                        </Box>
                    </StyledPaper>
                </>
            )}
        </StyledContainer>
    );
};

export default TradeCashflow;
