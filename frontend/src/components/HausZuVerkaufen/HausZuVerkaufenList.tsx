import axios from "axios";
import { useEffect, useState } from "react";
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get<HausZuVerkaufen[]>(
          "http://127.0.0.1:8000/api/hauser/"
        );
        setHausZuVerkaufens(res.data);
      } catch (err) {
        console.error("Erreur lors du chargement des hausZuVerkaufens :", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Immobilien Anzeigen</h2>

      {hausZuVerkaufens.map((p) => {
        const safeBilder: Bild[] = Array.isArray(p.bilder)
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
          />
        );
      })}
    </div>
  );
};

export default HausZuVerkaufenList;
