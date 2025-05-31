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
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="w-100" style={{ maxWidth: "500px" }}>
        <div className="p-4 border rounded shadow bg-white">
          <h2 className="text-center text-primary fw-bold mb-4">
            Anmeldung Administrator
          </h2>

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

          <div className="d-flex justify-content-center mt-3 mb-4">
            <CostumerButton label="Einloggen" onClick={handleLogin} />
          </div>

          <p className="text-center text-sm">
            Noch kein Konto?{" "}
            <Link
              to="/admin/register"
              className="text-primary text-decoration-underline"
            >
              Konto erstellen
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
