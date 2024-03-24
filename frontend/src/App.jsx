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
      <Navigation />
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<ShowPaint />} />
          <Route path="editpaint" element={<EditPaint />} />
          <Route path="admin" element={<Admin />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
