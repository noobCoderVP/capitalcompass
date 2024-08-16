import './NavBar.css'; // Import CSS file

function NavBar() {
  return (
    <div className="top-section">
      <header>CapitalCompass</header>
      <nav>
        <ul>
          <li><a href="#">Dashboard</a></li>
          <li><a href="#">Asset Classes</a></li>
          <li><a href="#">Order Booking</a></li>
          <li><a href="#">Client&apos;s Assets</a></li>
          <li><a href="#">Trade Cashflow Book</a></li>
          <li><a href="#">News</a></li>

        </ul>
      </nav>
    </div>
  );
}

export default NavBar;
