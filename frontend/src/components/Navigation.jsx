import { Outlet, Link } from "react-router-dom";
import './components.css';

function Navigation() {

  return (
    <>
      <nav className='topnav'>
        <Link to="/" className="active">Home</Link>
        <Link to="/editpaint" className="active">Edit Stock</Link>
        <Link to="/admin" className="active">Admin</Link>
      </nav>
      <Outlet />
    </>

  );
}

export default Navigation;