// src/pages/HomePage.tsx
import { useNavigate } from "react-router-dom";
import HausZuVerkaufenList from "../../components/HausZuVerkaufen/HausZuVerkaufenList";

const HomePage = () => {
  const navigate = useNavigate();

  const handleAddClick = () => {
    navigate("/add");
  };
  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="text-primary">Willkommen auf der Immobilienplattform</h1>

        <button className="btn btn-success" onClick={handleAddClick}>
          + Haus hinzufügen
        </button>
      </div>
      <hr />
      <h4 className="mb-4">Immobilien Anzeigen</h4>
      <HausZuVerkaufenList />
    </div>
  );
};

export default HomePage;
