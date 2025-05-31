import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AddHausZuVerkaufen from "./components/HausZuVerkaufen/AddHausZuVerkaufen";
import HausZuVerkaufenList from "./components/HausZuVerkaufen/HausZuVerkaufenList";
import PrivateLayout from "./components/PrivateLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AnmeldungAdminPage from "./pages/admin/AnmeldungAdminPage";
import ErstellungAdminPage from "./pages/admin/ErstellungAdminPage";
import Homepage from "./pages/HausZuVerkaufen/Homepage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />

        <Route path="/admin/login" element={<AnmeldungAdminPage />} />

        <Route path="/admin" element={<AnmeldungAdminPage />} />
        <Route path="/admin/register" element={<ErstellungAdminPage />} />
        {/* ✅ Section sécurisée */}
        <Route element={<PrivateLayout />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route
            path="/admin/dashboard/anzeigen"
            element={<HausZuVerkaufenList />}
          />
          <Route
            path="/admin/dashboard/konto"
            element={<div>Konto Page</div>}
          />
          <Route
            path="/admin/dashboard/nachrichten"
            element={<div>Nachrichten Page</div>}
          />
          <Route
            path="/admin/dashboard/bewertung"
            element={<div>Bewertung Page</div>}
          />
          <Route
            path="/admin/dashboard/finanzierung"
            element={<div>Finanzierung Page</div>}
          />
          <Route path="/admin/dashboard/add" element={<AddHausZuVerkaufen />} />
        </Route>
      </Routes>
    </Router>
  );
}
export default App;
