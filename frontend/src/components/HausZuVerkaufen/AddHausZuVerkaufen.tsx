import axios from "axios";
import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import CostumerButton from "../../components/CostumerButton";

interface HausZuVerkaufenForm {
  title: string;
  description: string;
  price: string;
  address: string;
  surface: string;
  rooms: string;
  image: File | null;
}

const AddHausZuVerkaufen = () => {
  const [formData, setFormData] = useState<HausZuVerkaufenForm>({
    title: "",
    description: "",
    price: "",
    address: "",
    surface: "",
    rooms: "",
    image: null,
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, files } = e.target as HTMLInputElement;

    if (name === "image" && files && files.length > 0) {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData();

    for (const key in formData) {
      const value = formData[key as keyof HausZuVerkaufenForm];
      if (value !== null) {
        data.append(key, value);
      }
    }

    axios
      .post("http://127.0.0.1:8000/api/hauser/", data)
      .then(() => alert("Annonce ajoutée !"))
      .catch((err) => console.error("Erreur lors de la soumission :", err));
  };
  const navigate = useNavigate();
  const handleCancel = () => {
    setFormData({
      title: "",
      description: "",
      price: "",
      address: "",
      surface: "",
      rooms: "",
      image: null,
    });
    navigate("/");
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-primary">Neue Immobilie veröffentlichen</h2>
      <form onSubmit={handleSubmit} className="container mt-4">
        <div className="mb-3">
          <input
            name="title"
            placeholder="Titel"
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <textarea
            name="description"
            placeholder="Beschreibung"
            onChange={handleChange}
            className="form-control"
            rows={3}
          />
        </div>

        <div className="mb-3">
          <input
            name="price"
            type="number"
            placeholder="Preis"
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <input
            name="address"
            placeholder="Adresse"
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <input
            name="surface"
            type="number"
            placeholder="Fläche in m²"
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <input
            name="rooms"
            type="number"
            placeholder="Anzahl der Zimmer"
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <input
            name="image"
            type="file"
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="d-flex justify-content-end gap-2">
          <CostumerButton label="Abbrechen" onClick={handleCancel} />
          <CostumerButton
            label="Veröffentlichen"
            onClick={handleCancel}
            type="submit"
          />
        </div>
      </form>
    </div>
  );
};

export default AddHausZuVerkaufen;
