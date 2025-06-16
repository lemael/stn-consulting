import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import CostumerButton from "../../components/CostumerButton";
import { HausZuVerkaufen } from "../../types/HausZuVerkaufen";

interface Props {
  haus: HausZuVerkaufen;
  isAdmin?: boolean;
  onDelete?: (id: number) => void;
}

const ImmobilienCard = ({ haus, isAdmin, onDelete }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const ChevronUp = FaChevronUp as unknown as React.FC;
  const ChevronDown = FaChevronDown as unknown as React.FC;
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/immobilie/${haus.id}`);
  };
  return (
    <div
      className="border rounded shadow p-3 mb-4 w-75 mx-auto"
      onClick={handleClick}
      style={{ cursor: "pointer" }}
    >
      {/* Top: Hauptbild + Galerie */}
      <div className="d-flex">
        <div style={{ display: "flex", gap: 12 }}>
          {/* Colonne gauche : image principale */}
          {haus.bilder[0] && (
            <img
              src={haus.bilder[0].image}
              alt=""
              style={{
                width: 550,
                height: 620,
                objectFit: "cover",
                borderRadius: 8,
                border: "1px solid #ccc",
              }}
            />
          )}

          {/* Colonne droite : les 2 miniatures */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {haus.bilder.slice(1, 3).map((img, i) => (
              <img
                key={img.id}
                src={img.image}
                alt=""
                style={{
                  width: 340,
                  height: 310,
                  objectFit: "cover",
                  borderRadius: 6,
                  border: "1px solid #ccc",
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Titel & Preis */}
      <div className="mt-3">
        <h5>{haus.title}</h5>
        <div className="fw-bold text-dark">{haus.price} €</div>
        <div className="text-muted">
          {haus.rooms} Zimmer · {haus.surface} m²
        </div>
        <div className="text-muted">{haus.address}</div>
      </div>

      {/* Toggle Description */}
      <div className="mt-2">
        <button
          className="btn btn-sm btn-light"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Beschreibung umschalten"
        >
          {isOpen ? <ChevronUp /> : <ChevronDown />}
        </button>

        {isOpen && (
          <div className="mt-2">
            <small className="text-secondary">{haus.description}</small>
          </div>
        )}
        {isAdmin && (
          <CostumerButton label="Löschen" onClick={() => onDelete?.(haus.id)} />
        )}
      </div>
    </div>
  );
};

export default ImmobilienCard;
