import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from '../services/api';

function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await API.post("/auth/login", form);
      localStorage.setItem("user", JSON.stringify(res.data));

      if (res.data.role === "Admin") navigate("/create-software");
      else if (res.data.role === "Employee") navigate("/request-access");
      else if (res.data.role === "Manager") navigate("/pending-requests");
      else console.log("Unrecognized role:", res.data.role);
    } catch (err) {
      setError("Invalid username or password.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

      <label>Username</label>
      <input
        type="text"
        placeholder="Enter username"
        value={form.username}
        onChange={(e) => setForm({ ...form, username: e.target.value })}
        required
      />

      <label>Password</label>
      <input
        type="password"
        placeholder="Enter password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        required
      />

      <button type="submit">Login</button>
    </form>
  );
}

export default Login;
