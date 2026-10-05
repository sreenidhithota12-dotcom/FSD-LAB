import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaCode,
  FaBrain,
  FaBuilding,
  FaFileAlt,
  FaChartBar,
  FaBars,
  FaTimes
} from "react-icons/fa";

function Sidebar({ open, setOpen }) {
  return (
    <>
      <button
  className={`sidebar-toggle ${open ? "toggle-open" : "toggle-closed"}`}
  onClick={() => setOpen(!open)}
>
        {open ? <FaTimes /> : <FaBars />}
      </button>

      <aside className={`sidebar ${open ? "sidebar-open" : "sidebar-closed"}`}>
        <NavLink to="/" onClick={() => setOpen(false)}>
          <FaHome />
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/dsa" onClick={() => setOpen(false)}>
          <FaCode />
          <span>DSA Tracker</span>
        </NavLink>

        <NavLink to="/aptitude" onClick={() => setOpen(false)}>
          <FaBrain />
          <span>Aptitude</span>
        </NavLink>

        <NavLink to="/applications" onClick={() => setOpen(false)}>
          <FaBuilding />
          <span>Applications</span>
        </NavLink>

        <NavLink to="/resume" onClick={() => setOpen(false)}>
          <FaFileAlt />
          <span>Resume</span>
        </NavLink>

        <NavLink to="/analytics" onClick={() => setOpen(false)}>
          <FaChartBar />
          <span>Analytics</span>
        </NavLink>
      </aside>

      {open && (
        <div
          className="sidebar-overlay"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
}

export default Sidebar;