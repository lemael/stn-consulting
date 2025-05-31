import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FormInput from "../../components/admin/FormInput";
import CostumerButton from "../../components/CostumerButton";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    console.log({ username, email, password });
    await axios
      .post("http://127.0.0.1:8000/api/login/", {
        email,
        username,
        password,
      })
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        navigate("/admin/dashboard");
      })

      .catch((err) => {
        alert("Échec de la connexion.");
        console.error(err.res?.data);
      });
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <h2 className="text-xl font-bold mb-6">Anmeldung Administrator</h2>
      <FormInput
        label="Nom d'utilisateur"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="username"
      />
      <FormInput
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="admin@example.com"
      />
      <FormInput
        label="Mot de passe"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="••••••••"
      />
      <CostumerButton label="Einloggen" onClick={handleLogin} />
      <p className="mt-4">
        Pas encore de compte ?{" "}
        <Link to="/admin/register" className="text-blue-600 underline">
          Créer un compte
        </Link>
      </p>
    </div>
  );
};

export default AdminLogin;
