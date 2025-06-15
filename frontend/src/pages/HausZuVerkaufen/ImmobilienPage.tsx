import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ContactForm from "../../components/HausZuVerkaufen/ContactForm";
import PhotoGaleryImmobilien from "../../components/HausZuVerkaufen/PhotoGaleryImmobilien";
import { HausZuVerkaufen } from "../../types/HausZuVerkaufen";

const ImmobilienPage = () => {
  const { key } = useParams();
  const navigate = useNavigate();
  const [haus, setHaus] = useState<HausZuVerkaufen | null>(null);
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/hauser/${key}/`)
      .then((res) => setHaus(res.data))
      .catch((err) => console.error(err));
  }, [key]);
  console.log("id", key);
  if (!haus) return <p>Lade Daten...</p>;
  return (
    <div>
      {/* Barre de navigation en haut */}
      <div
        style={{
          backgroundColor: "#f8f9fa",
          padding: "1rem 2rem",
          borderBottom: "1px solid #dee2e6",
          display: "flex",
          alignItems: "center",
        }}
      >
        <button
          onClick={() => navigate("/")}
          style={{
            background: "none",
            border: "none",
            color: "#007bff",
            cursor: "pointer",
            fontSize: "1rem",
            display: "flex",
            alignItems: "center",
          }}
        >
          ← Zurück zur Anzeige
        </button>
      </div>

      <div
        style={{
          display: "flex",
          gap: "2rem",
          padding: "2rem",
          alignItems: "flex-start",
        }}
      >
        {/* Colonne gauche : galerie + détails */}
        <div style={{ flex: 2 }}>
          <PhotoGaleryImmobilien bilder={haus.bilder} />
          <div style={{ marginTop: "1rem" }}>
            <h2>{haus.title}</h2>
            <p>{haus.description}</p>
            <p>
              <strong>Preis:</strong> {haus.price} €
            </p>
            <p>
              <strong>Fläche:</strong> {haus.surface} m²
            </p>
            <p>
              <strong>Zimmer:</strong> {haus.rooms}
            </p>
            <p>
              <strong>Adresse:</strong> {haus.address}
            </p>
          </div>
        </div>

        {/* Colonne droite : formulaire */}
        <div style={{ flex: 1 }}>
          <ContactForm />
        </div>
      </div>
    </div>
  );
};

export default ImmobilienPage;
