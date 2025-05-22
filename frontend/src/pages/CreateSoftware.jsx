import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function CreateSoftware() {
  const [form, setForm] = useState({
    name: "",
    description: "",
    accessLevels: [],
  });
  const [message, setMessage] = useState("");
  const navigate=useNavigate();


  useEffect(()=>{
    const user=JSON.parse(localStorage.getItem("user"));
    if(!user|| user.role!=="Admin")
    {
      navigate("/login");
    }
  },[]);

  const handleCheckbox = (e) => {
    const value = e.target.value;
    setForm((prev) => {
      const alreadyChecked = prev.accessLevels.includes(value);
      return {
        ...prev,
        accessLevels: alreadyChecked
          ? prev.accessLevels.filter((v) => v !== value)
          : [...prev.accessLevels, value],
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/software", form);
      setMessage(" Software created successfully!");
      setForm({ name: "", description: "", accessLevels: [] });
    } catch (err) {
      setMessage("Failed to create software.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Software</h2>

      {message && <p style={{ color: message.includes("success") ? "green" : "red" }}>{message}</p>}

      <label>Software Name</label>
      <input
        type="text"
        placeholder="Software Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        required
      />
      <label>Description</label>
      <textarea
        placeholder="Description"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
        required
      ></textarea>
      <label>
        <input
          type="checkbox"
          value="Read"
          checked={form.accessLevels.includes("Read")}
          onChange={handleCheckbox}
        />
        Read
      </label>
      <label>
        <input
          type="checkbox"
          value="Write"
          checked={form.accessLevels.includes("Write")}
          onChange={handleCheckbox}
        />
        Write
      </label>
      <label>
        <input
          type="checkbox"
          value="Admin"
          checked={form.accessLevels.includes("Admin")}
          onChange={handleCheckbox}
        />
        Admin
      </label>

      <button type="submit">Create Software</button>
    </form>
  );
}


export default CreateSoftware;
