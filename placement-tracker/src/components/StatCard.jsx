function StatCard({ title, value, description }) {
  return (
    <div className="stat-card">
      <h6>{title}</h6>
      <h2>{value}</h2>
      <p>{description}</p>
    </div>
  );
}

export default StatCard;