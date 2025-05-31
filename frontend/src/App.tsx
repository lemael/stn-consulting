import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AddHausZuVerkaufen from "./components/HausZuVerkaufen/AddHausZuVerkaufen";
import HausZuVerkaufenList from "./components/HausZuVerkaufen/HausZuVerkaufenList";
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
        <Route
          path="/admin/nachrichten"
          element={<div>Nachrichten Page</div>}
        />
        <Route path="/admin/bewertung" element={<div>Bewertung Page</div>} />
        <Route
          path="/admin/finanzierung"
          element={<div>Finanzierung Page</div>}
        />
        <Route path="/admin/konto" element={<div>Konto Page</div>} />
        <Route path="/admin/login" element={<AnmeldungAdminPage />} />
        <Route path="/admin/anzeigen" element={<HausZuVerkaufenList />} />

        <Route path="/admin" element={<AnmeldungAdminPage />} />
        <Route path="/admin/register" element={<ErstellungAdminPage />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}
export default App;
