import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import FormInput from "../../components/admin/FormInput";
import CostumerButton from "../../components/CostumerButton";

const ErstellungAdminPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [confirmEmail, setConfirmEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.email !== confirmEmail) {
      setMessage("⚠️ Die E-Mail-Adressen stimmen nicht überein.");
      return;
    }
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/register/",
        formData
      );
      setMessage(
        "Utilisateur {" + response.data.username + "} créé avec succès ✅ "
      );
    } catch (error: any) {
      console.error(error);
      setMessage("Erreur ❌");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div style={{ maxWidth: 400, margin: "0 auto" }}>
        <h2 className="text-center text-primary fw-bold mb-4">
          Administrator erstellen
        </h2>
        <FormInput
          label="Nom d'utilisateur"
          onChange={handleChange}
          placeholder="username"
        />
        <FormInput
          label="Email"
          onChange={handleChange}
          placeholder="admin@example.com"
        />
        <FormInput
          label="Email bestätigen"
          value={confirmEmail}
          onChange={(e) => setConfirmEmail(e.target.value)}
          placeholder="bestätige deine E-Mail"
        />
        <FormInput
          label="Mot de passe"
          type="password"
          onChange={handleChange}
          placeholder="••••••••"
        />

        <br />

        <CostumerButton
          label="Erstellen"
          onClick={handleSubmit}
          asSubmit={true}
        />
        <p className="text-center text-sm">
          Schon registriert!{" "}
          <Link
            to="/admin/login"
            className="text-primary text-decoration-underline"
          >
            sich anmelden
          </Link>
        </p>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default ErstellungAdminPage;
