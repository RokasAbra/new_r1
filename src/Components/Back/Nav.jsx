import { NavLink } from "react-router-dom";

function Nav() {
  return (
    <nav className="nav">
      <NavLink
        to="/admin/"
        className="nav-link"
        style={({ isActive }) => (isActive ? { color: "crimson" } : null)}
      >
        Admin
      </NavLink>

      <NavLink
        to="/admin/cats"
        className="nav-link"
        style={({ isActive }) => (isActive ? { color: "crimson" } : null)}
      >
        Categories
      </NavLink>

      <NavLink
        to="/admin/products"
        className="nav-link"
        style={({ isActive }) => (isActive ? { color: "crimson" } : null)}
      >
        Products
      </NavLink>
    </nav>
  );
}
export default Nav;
