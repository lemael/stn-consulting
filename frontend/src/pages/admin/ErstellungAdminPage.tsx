import axios from "axios";
import React, { useState } from "react";

const ErstellungAdminPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    is_staff: false,
    is_superuser: false,
  });

  const [token, setToken] = useState(""); // 💡 ici tu colles ton token admin (à automatiser avec login plus tard)
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
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
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
      <label>
        <input type="checkbox" name="is_staff" onChange={handleChange} />
        is_staff
      </label>
      <br />
      <label>
        <input type="checkbox" name="is_superuser" onChange={handleChange} />
        is_superuser
      </label>
      <br />
      <textarea
        placeholder="Token admin"
        onChange={(e) => setToken(e.target.value)}
      />
      <br />
      <button onClick={handleSubmit}>Créer</button>
      <p>{message}</p>
    </div>
  );
};

export default ErstellungAdminPage;
