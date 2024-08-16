import React from "react";
import { AppBar, Toolbar, Typography, Container, Card, CardMedia, CardContent, Grid, Box } from "@mui/material";

const Header = () => (
  <AppBar position="static" sx={{ bgcolor: 'black' }}>
    <Toolbar sx={{ justifyContent: 'center', textAlign: 'center' }}>
      <Typography variant="h6" component="div" color="white">
        Financial Portfolio Manager
      </Typography>
    </Toolbar>
  </AppBar>
);

const Footer = () => (
  <AppBar position="static" sx={{ bgcolor: 'black', mt: 6, top: 'auto', bottom: 0 }}>
    <Toolbar>
      <Container maxWidth="md p-12">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="white" gutterBottom>
              Quick Links
            </Typography>
            <Box color="white">
              <Typography variant="body2">
                <a href="/market" style={{ color: 'white', textDecoration: 'none' }}>Market</a>
              </Typography>
              <Typography variant="body2">
                <a href="/portfolio" style={{ color: 'white', textDecoration: 'none' }}>Portfolio</a>
              </Typography>
              <Typography variant="body2">
                <a href="/order" style={{ color: 'white', textDecoration: 'none' }}>Order</a>
              </Typography>
              <Typography variant="body2">
                <a href="/tradebook" style={{ color: 'white', textDecoration: 'none' }}>TradeBook</a>
              </Typography>
              <Typography variant="body2">
                <a href="/dashboard" style={{ color: 'white', textDecoration: 'none' }}>Dashboard</a>
              </Typography>
              <Typography variant="body2">
                <a href="/query" style={{ color: 'white', textDecoration: 'none' }}>Query</a>
              </Typography>
              <Typography variant="body2">
                <a href="/news" style={{ color: 'white', textDecoration: 'none' }}>News</a>
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="white" gutterBottom>
              Contact Us
            </Typography>
            <Typography variant="body2" color="white">
              Email: support@stockmanagement.com
            </Typography>
            <Typography variant="body2" color="white">
              Phone: +1-800-123-4567
            </Typography>
            <Typography variant="body2" color="white">
              Address: 123 Financial Street, Suite 400, New York, NY 10001
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="white" gutterBottom>
              Follow Us
            </Typography>
            <Box color="white">
              <Typography variant="body2">
                <a href="https://twitter.com/stockmanagement" target="_blank" rel="noopener noreferrer" style={{ color: 'white', textDecoration: 'none' }}>Twitter</a>
              </Typography>
              <Typography variant="body2">
                <a href="https://facebook.com/stockmanagement" target="_blank" rel="noopener noreferrer" style={{ color: 'white', textDecoration: 'none' }}>Facebook</a>
              </Typography>
              <Typography variant="body2">
                <a href="https://linkedin.com/company/stockmanagement" target="_blank" rel="noopener noreferrer" style={{ color: 'white', textDecoration: 'none' }}>LinkedIn</a>
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Typography variant="body2" color="white" align="center" sx={{ mt: 4 }}>
          &copy; 2024 Stock Management System. All rights reserved.
        </Typography>
      </Container>
    </Toolbar>
  </AppBar>
);

const Home = () => {
  return (
    <div>
      <Header />
      <Container maxWidth="lg" sx={{ px: 0, my: 6 }}>
        <Card sx={{ position: 'relative', overflow: 'hidden' }}>
          <CardMedia
            component="img"
            image="https://images.pexels.com/photos/4386370/pexels-photo-4386370.jpeg"
            alt="Stock Market"
            sx={{ width: '100%', height: 'auto', objectFit: 'cover', maxHeight: '400px' }} // Ensure image fills width and doesn't exceed layout
          />
          <CardContent
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              height: '100%',
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              px: 3,
              color: 'white', // Set text color to white
              backgroundColor: 'rgba(0, 0, 0, 0.5)', // Optional: semi-transparent background for better text readability
            }}
          >
            <Typography variant="h4" component="h2" gutterBottom>
              Stock Management System
            </Typography>
            <Typography variant="body1" paragraph>
              Welcome to Financial Portfolio Manager! This application is a financial portfolio management tool designed to manage and track asset classes, instruments, and transactions.
            </Typography>
          </CardContent>
        </Card>
      </Container>
      <Container maxWidth="lg" sx={{ my: 6 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          Key Features
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Market Insights
                </Typography>
                <Typography variant="body2">
                  Get real-time market data and trends to make informed investment decisions. Stay updated with the latest stock prices and market analysis.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Portfolio Management
                </Typography>
                <Typography variant="body2">
                  Manage and track your investments with ease. View detailed information about your holdings and track their performance over time.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Order Management
                </Typography>
                <Typography variant="body2">
                  Place and manage your buy and sell orders efficiently. Keep track of all your transactions and order history in one place.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  TradeBook
                </Typography>
                <Typography variant="body2">
                  View a comprehensive record of all your trades. Analyze your trading history and performance to refine your investment strategies.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Dashboard
                </Typography>
                <Typography variant="body2">
                  Access a snapshot of your financial portfolio with an easy-to-read dashboard. Monitor key metrics and performance indicators at a glance.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Query System
                </Typography>
                <Typography variant="body2">
                  Utilize the query system to get answers to specific questions about your investments and market conditions.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  News Updates
                </Typography>
                <Typography variant="body2">
                  Stay informed with the latest news related to the stock market and financial industry. Get updates on relevant events and developments.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </div>
  );
};

export default Home;
