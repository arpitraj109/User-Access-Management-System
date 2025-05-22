import { useState, useEffect } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function RequestAccess() {
  const [software, setSoftware] = useState([]);
  const [form, setForm] = useState({
    softwareId: "",
    accessType: "Read",
    reason: "",
  });
  const [message, setMessage] = useState("");
  const navigate=useNavigate();

  useEffect(()=>{
    const user=JSON.parse(localStorage.getItem("user"));
    if(!user || user.role!=="Employee")
    {
      navigate("/login");
    }
  },[]);

  useEffect(() => {
    const fetchSoftware = async () => {
      try {
        const res = await API.get("/software");
        setSoftware(res.data);
      } catch (err) {
        setMessage("Failed to load software list.");
      }
    };
    fetchSoftware();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/requests", form); 
      setMessage("Access request submitted!");
      setForm({ softwareId: "", accessType: "Read", reason: "" });
    } catch (err) {
      setMessage("Failed to submit request.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Request Access (Employee Only)</h2>

      {message && <p style={{ color: message.includes("red") ? "green" : "red" }}>{message}</p>}

      <label>Select Software</label>
      <select
        value={form.softwareId}
        required
        onChange={(e) => setForm({ ...form, softwareId: e.target.value })}
      >
        <option value="">-- Select Software --</option>
        {software.map((s) => (
          <option key={s.id} value={s.id}>
            {s.name}
          </option>
        ))}
      </select>

      <label>Access Type</label>
      <select
        value={form.accessType}
        onChange={(e) => setForm({ ...form, accessType: e.target.value })}
      >
        <option value="Read">Read</option>
        <option value="Write">Write</option>
        <option value="Admin">Admin</option> 
      </select>

      <label>Reason</label>
      <textarea
        placeholder="Why do you need access?"
        value={form.reason}
        required
        onChange={(e) => setForm({ ...form, reason: e.target.value })}
      ></textarea>

      <button type="submit">Request Access</button>
    </form>
  );
}

export default RequestAccess;
