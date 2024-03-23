import { Outlet, Link } from "react-router-dom";
import './components.css';

function Navigation() {

  return (
    <nav className='topnav'>
      <Link to="/" className="active">Home</Link>
      <Link to="/" className="active">Edit Stock</Link>
    </nav>
  );
}

export default Navigation;