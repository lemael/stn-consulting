import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ImmobilienCard from "../../components/HausZuVerkaufen/ImmobilienCard";
import { HausZuVerkaufen } from "../../types/HausZuVerkaufen";

const HausZuVerkaufenList = () => {
  const [hausZuVerkaufens, setHausZuVerkaufens] = useState<HausZuVerkaufen[]>(
    []
  );
  const location = useLocation();
  const isAdmin = location.state?.isAdmin === true;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get<HausZuVerkaufen[]>(
          "http://127.0.0.1:8000/api/hauser/"
        );
        setHausZuVerkaufens(res.data);
      } catch (err) {
        console.error("Erreur lors du chargement :", err);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id: number) => {
    const confirm = window.confirm("Bist du sicher?");
    if (!confirm) return;

    try {
      await axios.delete(`http://127.0.0.1:8000/api/hauser/${id}/`);
      setHausZuVerkaufens((prev) => prev.filter((h) => h.id !== id));
    } catch (err) {
      console.error("Löschen fehlgeschlagen:", err);
    }
  };

  return (
    <div>
      <h2>Immobilien Anzeigen</h2>

      {hausZuVerkaufens.length === 0 ? (
        <div className="alert alert-info text-center mt-4">
          🏠 Es gibt momentan keine Immobilienangebote.
        </div>
      ) : (
        hausZuVerkaufens.map((p) => {
          return (
            <ImmobilienCard
              haus={p}
              isAdmin={isAdmin}
              onDelete={() => handleDelete(p.id)}
            />
          );
        })
      )}
    </div>
  );
};

export default HausZuVerkaufenList;
