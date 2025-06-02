import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ImmobilienCard from "../../components/HausZuVerkaufen/ImmobilienCard";

type Bild = {
  id: number;
  image: string;
};

interface HausZuVerkaufen {
  id: number;
  title: string;
  description: string;
  price: number;
  address: string;
  surface: number;
  rooms: number;
  bilder: Bild[];
}

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
      {hausZuVerkaufens.map((p) => {
        const safeBilder = Array.isArray(p.bilder)
          ? p.bilder.filter((b): b is Bild => !!b && !!b.image)
          : [];

        return (
          <ImmobilienCard
            key={p.id}
            title={p.title}
            price={`${p.price} €`}
            zimmer={`${p.rooms} Zimmer`}
            flaeche={`${p.surface} m²`}
            adresse={p.address}
            beschreibung={p.description}
            images={safeBilder}
            isAdmin={isAdmin}
            onDelete={handleDelete}
          />
        );
      })}
    </div>
  );
};

export default HausZuVerkaufenList;
