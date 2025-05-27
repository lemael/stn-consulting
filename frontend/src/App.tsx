import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AddHausZuVerkaufen from "./components/HausZuVerkaufen/AddHausZuVerkaufen";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AnmeldungAdminPage from "./pages/admin/AnmeldungAdminPage";
import ErstellungAdminPage from "./pages/admin/ErstellungAdminPage";
import Homepage from "./pages/HausZuVerkaufen/Homepage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/add" element={<AddHausZuVerkaufen />} />

        <Route path="/admin" element={<AnmeldungAdminPage />} />
        <Route path="/admin/register" element={<ErstellungAdminPage />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}
export default App;
