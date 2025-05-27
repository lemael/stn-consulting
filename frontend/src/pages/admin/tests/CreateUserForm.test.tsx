import { fireEvent, render, screen } from "@testing-library/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import ErstellungAdminPage from "../ErstellungAdminPage";

const mock = new MockAdapter(axios);

describe("ErstellungAdminPage", () => {
  beforeEach(() => {
    mock.reset(); // Nettoie les mocks avant chaque test
  });

  it("crée un utilisateur avec succès", async () => {
    mock.onPost("http://127.0.0.1:8000/admin-register/").reply(201, {
      message: "Utilisateur créé avec succès ✅",
    });

    render(<ErstellungAdminPage />);

    fireEvent.change(screen.getByPlaceholderText("Nom d'utilisateur"), {
      target: { value: "mael" },
    });
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "mael@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Mot de passe"), {
      target: { value: "password123" },
    });
    fireEvent.click(screen.getByLabelText("is_staff"));
    fireEvent.click(screen.getByLabelText("is_superuser"));

    // Simule un token
    fireEvent.change(screen.getByPlaceholderText("Token admin"), {
      target: { value: "valid.jwt.token" },
    });

    fireEvent.click(screen.getByText("Créer"));

    const message = await screen.findByText("Utilisateur créé avec succès ✅");
    expect(message).toBeInTheDocument();
  });

  it("affiche une erreur si la requête échoue", async () => {
    mock.onPost("http://127.0.0.1:8000/admin-register/").reply(400, {
      message: "Erreur",
    });

    render(<ErstellungAdminPage />);

    fireEvent.change(screen.getByPlaceholderText("Nom d'utilisateur"), {
      target: { value: "mael" },
    });
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "mael@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Mot de passe"), {
      target: { value: "password123" },
    });
    fireEvent.change(screen.getByPlaceholderText("Token admin"), {
      target: { value: "fake.token" },
    });

    fireEvent.click(screen.getByText("Créer"));

    const message = await screen.findByText("Erreur ❌");
    expect(message).toBeInTheDocument();
  });
});
