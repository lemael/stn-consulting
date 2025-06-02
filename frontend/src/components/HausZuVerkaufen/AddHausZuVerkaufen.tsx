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
  images: File[];
}

const AddHausZuVerkaufen = () => {
  const [formData, setFormData] = useState<HausZuVerkaufenForm>({
    title: "",
    description: "",
    price: "",
    address: "",
    surface: "",
    rooms: "",
    images: [],
  });

  const navigate = useNavigate();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, files } = e.target as HTMLInputElement;

    if (name === "images" && files) {
      setFormData((prev) => ({ ...prev, images: Array.from(files) }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("price", formData.price);
    data.append("address", formData.address);
    data.append("surface", formData.surface);
    data.append("rooms", formData.rooms);
    formData.images.forEach((img) => {
      data.append("images", img);
    });

    axios
      .post("http://127.0.0.1:8000/api/hauser/", data)
      .then(() => {
        alert("Annonce publiée avec succès !");
        navigate("/admin/dashboard");
      })
      .catch((err) => {
        console.error("Erreur lors de l'envoi :", err);
        alert("Erreur lors de l'envoi de l'annonce.");
        navigate("/admin/dashboard/add");
      });
  };

  const handleCancel = () => {
    setFormData({
      title: "",
      description: "",
      price: "",
      address: "",
      surface: "",
      rooms: "",
      images: [],
    });
    navigate("/admin/dashboard");
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
            name="images"
            type="file"
            multiple
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="d-flex justify-content-end gap-2">
          <CostumerButton label="Abbrechen" onClick={handleCancel} />
          <CostumerButton label="Veröffentlichen" asSubmit={true} />
        </div>
      </form>
    </div>
  );
};

export default AddHausZuVerkaufen;
