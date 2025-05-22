import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Signup() {
  const [form, setForm] = useState({
    username: "",
    password: "",
    role: "Employee", 
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      await API.post("/auth/signup", form);
      navigate("/login");
    } catch (err) {
      setError("Signup failed. Try a different username.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Sign Up</h2>

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

      <label>Role</label>
      <select
        value={form.role}
        onChange={(e) => setForm({ ...form, role: e.target.value })}
        required
      >
        <option value="Employee">Employee</option>
        <option value="Manager">Manager</option>
        <option value="Admin">Admin</option>
      </select>

      <button type="submit">Sign Up</button>
    </form>
  );
}

export default Signup;
