import axios from "axios";
import { useEffect, useState } from "react";

// Définir l'interface des Maisons à vendre
interface HausZuVerkaufen {
  id: number;
  title: string;
  description: string;
  price: number;
  address: string;
  surface: number;
  rooms: number;
  image?: string;
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
      {hausZuVerkaufens.length === 0 ? (
        <div className="alert alert-info text-center">
          🏠 Es gibt momentan keine Immobilienangebote.
        </div>
      ) : (
        <div>
          <h2>Immobilien Anzeigen</h2>
          {hausZuVerkaufens.map((p) => {
            console.log("image:", p.image);
            return (
              <div key={p.id}>
                <h3>{p.title}</h3>
                <p>{p.price} €</p>

                {p.image && <img src={`${p.image}`} alt="test" />}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default HausZuVerkaufenList;
