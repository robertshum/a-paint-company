import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from './components/Navigation';
import ShowPaint from './pages/ShowPaint';
import EditPaint from './pages/EditPaint';
import Admin from './pages/Admin';
import NoPage from './pages/NoPage';

function App() {

  return (
    <BrowserRouter>
      {/* nav bar */}
      <Navigation />
      <Routes>
        {/* Default homepage is the show paint stock screen */}
        <Route path="/" element={<ShowPaint />} />
        {/* for github pages only, the root page is set to path below */}
        <Route path="/a-paint-company" element={<ShowPaint />} />
        <Route path="editpaint" element={<EditPaint />} />
        <Route path="admin" element={<Admin />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
