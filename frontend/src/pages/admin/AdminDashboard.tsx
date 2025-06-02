import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import { Button } from "../../components/Button";
import { Card } from "../../components/Card";
import Logo from "../../components/Logo";

// --- Inline CSS ---
const GlobalStyle = createGlobalStyle`
  .custom-blue {
    background-color: #85C1E9; /* Bootstrap $blue-300 approximation */
  }

.card:hover {
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.15);
};
`;

// --- Dashboard Page ---
const Dashboard = () => {
  const cards = [
    {
      title: "Nachrichten",
      subtitle: "Senden und empfangen",
      badge: "Neu",
      link: "/admin/dashboard/nachrichten",
    },

    {
      title: "Immo hinzufügen",
      subtitle: "Add eine Immobilien",
      link: "/admin/dashboard/add",
    },
    {
      title: "Immobilien bewerten",
      subtitle: "In 3 Minuten",
      link: "/admin/dashboard/bewertung",
    },
    {
      title: "Anzeigen",
      subtitle: "Anzeigen verwalten",
      link: "/admin/dashboard/anzeigen",
    },
    {
      title: "Finanzierung",
      subtitle: "Schätze die Höhe deiner Hypothek",
      link: "/admin/dashboard/finanzierung",
    },

    {
      title: "Konto",
      subtitle: "Persönliche Daten und mehr",
      link: "/admin/dashboard/konto",
    },
  ];
  const navigate = useNavigate();
  return (
    <div className="min-vh-100 bg-light">
      <GlobalStyle />
      <header className="custom-blue text-dark p-4 d-flex align-items-center">
        <Logo width={120} height={100} />

        <div className="d-flex flex-column ms-3 gap-1">
          <span className="h3 mb-0">Hallo!</span>
          <span className="mb-0">Willkommen in dem Admin Bereich.</span>
        </div>
      </header>{" "}
      <main className="container py-4">
        <div className="row">
          {cards.map((card, index) => (
            <div key={index} className="col-12 col-sm-6 col-md-4">
              <Card
                onClick={() =>
                  navigate(card.link, { state: { isAdmin: true } })
                }
              >
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h5 className="card-title mb-0">{card.title}</h5>
                  {card.badge && (
                    <span className="badge bg-dark text-white">
                      {card.badge}
                    </span>
                  )}
                </div>
                <p className="card-text text-muted small">{card.subtitle}</p>
              </Card>
            </div>
          ))}
        </div>
      </main>
      <footer className="container text-end py-3">
        <Button
          variant="outline-secondary"
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/admin/login");
          }}
        >
          Abmelden
        </Button>
      </footer>
    </div>
  );
};

export default Dashboard;
