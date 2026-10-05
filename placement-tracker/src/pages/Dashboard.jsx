import StatCard from "../components/StatCard";
import { Link } from "react-router-dom";
function Dashboard() {
  const problems = JSON.parse(localStorage.getItem("problems")) || [];
  const applications = JSON.parse(localStorage.getItem("applications")) || [];
  const aptitude = JSON.parse(localStorage.getItem("aptitude")) || [];

  const solved = problems.filter((p) => p.status === "Solved").length;

  const completedAptitude = aptitude.filter(
    (a) => a.status === "Completed"
  ).length;

  const selected = applications.filter(
    (a) => a.status === "Selected"
  ).length;

  return (
    <div>
      <div className="page-heading">
        <h1>Dashboard</h1>
        <p>Track your complete placement preparation journey.</p>
      </div>

      <div className="stats-grid">
  <Link to="/dsa" className="dashboard-card-link">
    <StatCard
      title="DSA Problems"
      value={solved}
      description="Problems solved"
    />
  </Link>

  <Link to="/aptitude" className="dashboard-card-link">
    <StatCard
      title="Aptitude"
      value={completedAptitude}
      description="Topics completed"
    />
  </Link>

  <Link to="/applications" className="dashboard-card-link">
    <StatCard
      title="Applications"
      value={applications.length}
      description="Companies applied"
    />
  </Link>

  <Link to="/applications" className="dashboard-card-link">
    <StatCard
      title="Offers"
      value={selected}
      description="Companies selected"
    />
  </Link>
</div>

      <div className="dashboard-section">
        <h3>Placement Preparation Checklist</h3>

        <div className="checklist">
          <div>
            <span>DSA Practice</span>
            <strong>{solved} Problems</strong>
          </div>

          <div>
            <span>Aptitude Preparation</span>
            <strong>{completedAptitude} Topics</strong>
          </div>

          <div>
            <span>Company Applications</span>
            <strong>{applications.length}</strong>
          </div>
        </div>
      </div>

      <div className="quote-card">
        <h4>🔥 Keep Going!</h4>
        <p>
          Consistency matters more than solving hundreds of problems in one day.
        </p>
      </div>
    </div>
  );
}

export default Dashboard;