import { useState, useEffect } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";


function PendingRequests() {
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState(null);
  const navigate=useNavigate();


  useEffect(()=>{
    const user=JSON.parse(localStorage.getItem("user"));
    if(!user || user.role!=="Manager")
    {
      navigate("/login");
    }
  },[]);

  const fetchRequests = async () => {
    try {
      const res = await API.get("/requests");
      setRequests(res.data.filter((r) => r.status === "Pending"));
    } catch (err) {
      setError("Failed to load requests.");
    }
  };

  const handleAction = async (id, status) => {
    try {
      await API.patch(`/requests/${id}`, { status });
      fetchRequests(); 
    } catch (err) {
      setError(`Failed to update request #${id}`);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div>
      <h2>Pending Access Requests</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {requests.length === 0 ? (
        <p>No pending requests</p>
      ) : (
        <ul>
          {requests.map((r) => (
            <li key={r.id} style={{ borderBottom: "1px solid #ddd", marginBottom: "1rem", paddingBottom: "1rem" }}>
              <p><b>User:</b> {r.user.username}</p>
              <p><b>Software:</b> {r.software.name}</p>
              <p><b>Access Type:</b> {r.accessType}</p>
              <p><b>Reason:</b> {r.reason}</p>
              <div style={{ display: "flex", gap: "10px" }}>
                <button onClick={() => handleAction(r.id, "Approved")}>Approve</button>
                <button onClick={() => handleAction(r.id, "Rejected")}>Reject</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default PendingRequests;
