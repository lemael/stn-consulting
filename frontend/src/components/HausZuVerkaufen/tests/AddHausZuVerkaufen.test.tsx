import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import AddHausZuVerkaufen from "../AddHausZuVerkaufen";

// Mock axios
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("AddHausZuVerkaufen", () => {
  beforeEach(() => {
    mockedAxios.post.mockClear();
  });

  it("rend tous les champs du formulaire", () => {
    render(<AddHausZuVerkaufen />);

    expect(screen.getByPlaceholderText("Titel")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Beschreibung")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Preis")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Adresse")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Fläche in m²")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Anzahl der Zimmer")
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/veröffentlichen/i)).toBeInTheDocument();
  });

  it("envoie les données via axios.post lorsque le formulaire est soumis", async () => {
    mockedAxios.post.mockResolvedValue({ status: 201 });

    render(<AddHausZuVerkaufen />);

    // Renseigner les champs
    fireEvent.change(screen.getByPlaceholderText("Titel"), {
      target: { value: "Test Haus" },
    });
    fireEvent.change(screen.getByPlaceholderText("Beschreibung"), {
      target: { value: "Test Beschreibung" },
    });
    fireEvent.change(screen.getByPlaceholderText("Preis"), {
      target: { value: "999000" },
    });
    fireEvent.change(screen.getByPlaceholderText("Adresse"), {
      target: { value: "Teststraße 1" },
    });
    fireEvent.change(screen.getByPlaceholderText("Fläche in m²"), {
      target: { value: "120" },
    });
    fireEvent.change(screen.getByPlaceholderText("Anzahl der Zimmer"), {
      target: { value: "4" },
    });

    // Simuler un fichier
    const file = new File(["(image)"], "haus.jpg", { type: "image/jpeg" });
    const inputFile = screen.getByLabelText(/images/i);
    await userEvent.upload(inputFile, file);

    // Soumettre le formulaire
    const form = screen.getByTestId("form"); // Assure-toi que ton <form> a data-testid="form"
    fireEvent.submit(form);

    await waitFor(() => {
      expect(mockedAxios.post).toHaveBeenCalled();
    });

    const formDataArg = mockedAxios.post.mock.calls[0][1] as FormData;
    expect(formDataArg.get("title")).toBe("Test Haus");
    expect(formDataArg.get("price")).toBe("999000");
  });
});
