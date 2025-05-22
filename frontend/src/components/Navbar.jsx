import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (!user) return null;

  return (
    <nav>
      <span>Welcome, {user.role}</span>
      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
}

export default Navbar;
