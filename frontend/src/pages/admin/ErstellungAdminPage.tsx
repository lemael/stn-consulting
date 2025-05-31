import axios from "axios";
import React, { useState } from "react";

const ErstellungAdminPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

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
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/register/",
        formData
      );
      setMessage("Utilisateur créé avec succès ✅");
    } catch (error: any) {
      console.error(error);
      setMessage("Erreur ❌");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "0 auto" }}>
      <h2>Créer un utilisateur</h2>
      <input
        type="text"
        name="username"
        placeholder="Nom d'utilisateur"
        onChange={handleChange}
      />
      <br />
      <input
        type="email"
        name="email"
        placeholder="Email"
        onChange={handleChange}
      />
      <br />
      <input
        type="password"
        name="password"
        placeholder="Mot de passe"
        onChange={handleChange}
      />
      <br />

      <button onClick={handleSubmit}>Créer</button>
      <p>{message}</p>
    </div>
  );
};

export default ErstellungAdminPage;
