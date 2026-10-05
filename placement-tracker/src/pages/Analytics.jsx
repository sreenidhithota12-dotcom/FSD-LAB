import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

function Analytics() {
  const problems =
    JSON.parse(localStorage.getItem("problems")) || [];

  const applications =
    JSON.parse(localStorage.getItem("applications")) || [];

  const COLORS = [
    "#0f766e",
    "#d97706",
    "#2563eb",
    "#16a34a",
    "#dc2626",
    "#7c3aed"
  ];

  const topics = [
    "Arrays",
    "Strings",
    "Linked List",
    "Trees",
    "Graphs",
    "Dynamic Programming"
  ];

  const dsaData = topics.map((topic) => ({
    topic,
    solved: problems.filter(
      (p) =>
        p.topic === topic &&
        p.status === "Solved"
    ).length
  }));

  const statusList = [
    "Interested",
    "Applied",
    "Online Assessment",
    "Interview",
    "Selected",
    "Rejected"
  ];

  const applicationData = statusList
    .map((status) => ({
      name: status,
      value: applications.filter(
        (app) => app.status === status
      ).length
    }))
    .filter((item) => item.value > 0);

  const totalSolved = problems.filter(
    (p) => p.status === "Solved"
  ).length;

  const totalApplications = applications.length;

  const interviewCount = applications.filter(
    (app) => app.status === "Interview"
  ).length;

  const selectedCount = applications.filter(
    (app) => app.status === "Selected"
  ).length;

  return (
    <div>
      <div className="page-heading">
        <h1>Analytics</h1>

        <p>
          Analyse your placement preparation and application progress.
        </p>
      </div>

      <div className="dsa-summary">
        <div className="summary-card">
          <h3>{totalSolved}</h3>
          <p>DSA Problems Solved</p>
        </div>

        <div className="summary-card">
          <h3>{totalApplications}</h3>
          <p>Total Applications</p>
        </div>

        <div className="summary-card">
          <h3>{interviewCount}</h3>
          <p>Interviews</p>
        </div>

        <div className="summary-card">
          <h3>{selectedCount}</h3>
          <p>Selections</p>
        </div>
      </div>

      <div className="chart-card">
        <h3>DSA Problems Solved by Topic</h3>

        <ResponsiveContainer
          width="100%"
          height={320}
        >
          <BarChart
            data={dsaData}
            margin={{
              top: 20,
              right: 20,
              left: 0,
              bottom: 20
            }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
            />

            <XAxis
              dataKey="topic"
              tick={{
                fontSize: 12
              }}
            />

            <YAxis
              allowDecimals={false}
            />

            <Tooltip />

            <Bar
              dataKey="solved"
              fill="#0f766e"
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-card">
        <h3>Application Status</h3>

        {applicationData.length > 0 ? (
          <ResponsiveContainer
            width="100%"
            height={330}
          >
            <PieChart>
              <Pie
                data={applicationData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="45%"
                innerRadius={55}
                outerRadius={100}
                paddingAngle={3}
              >
                {applicationData.map(
                  (entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        COLORS[
                          index %
                            COLORS.length
                        ]
                      }
                    />
                  )
                )}
              </Pie>

              <Tooltip />

              <Legend
                verticalAlign="bottom"
                iconType="circle"
              />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <p className="empty-message">
            Add company applications to view analytics.
          </p>
        )}
      </div>
    </div>
  );
}

export default Analytics;