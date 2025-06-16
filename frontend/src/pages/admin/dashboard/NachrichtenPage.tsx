import axios from "axios";
import { useEffect, useState } from "react";

type Kontaktanfrage = {
  id: number;
  gender: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  adresse: string;
  timestamp: string;
};

const NachrichtenPage = () => {
  const [anfragen, setAnfragen] = useState<Kontaktanfrage[]>([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/kontaktanfragen/").then((res) => {
      setAnfragen(res.data);
    });
  }, []);

  return (
    <div className="container mt-4">
      <h3>Kontaktanfragen</h3>
      {anfragen.map((a) => (
        <div key={a.id} className="card mb-3">
          <div className="card-body">
            <h5>
              {a.first_name} {a.last_name} ({a.gender})
            </h5>
            <p>
              <strong>Email:</strong> {a.email}
            </p>
            <p>
              <strong>Telefon:</strong> {a.phone || "Nicht angegeben"}
            </p>
            <p>
              <strong>Adresse:</strong> {a.adresse}
            </p>
            <p className="text-muted">
              <small>{new Date(a.timestamp).toLocaleString()}</small>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NachrichtenPage;
