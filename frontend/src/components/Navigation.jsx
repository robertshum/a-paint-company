import { Outlet, Link } from "react-router-dom";
import './components.css';

function Navigation() {

  return (
    <>
      <nav className='topnav'>
        <h3 className="active">APC 🎨</h3>
        <Link to="/" className="active">Home</Link>
        <Link to="/editpaint" className="active">Edit Stock</Link>
        <Link to="/admin" className="active">Admin</Link>
      </nav>

      {/* For children elements */}
      <Outlet />
    </>
  );
}

export default Navigation;