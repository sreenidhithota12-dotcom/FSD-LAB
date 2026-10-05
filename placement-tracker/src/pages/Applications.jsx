import { useEffect, useState } from "react";

const demoApplications = [
  {
    id: 1,
    company: "JPMorgan Chase",
    role: "Software Engineer Intern",
    jobType: "Internship",
    location: "Hyderabad",
    package: "₹12 LPA",
    applicationDate: "2026-09-01",
    deadline: "2026-09-20",
    status: "Interview",
    interviewDate: "2026-09-18",
    link: "https://www.jpmorganchase.com/careers",
    notes: "Revise DSA, DBMS and Operating Systems"
  },
  {
    id: 2,
    company: "Microsoft",
    role: "Software Engineering Intern",
    jobType: "Internship",
    location: "Bengaluru",
    package: "₹15 LPA",
    applicationDate: "2026-09-05",
    deadline: "2026-09-25",
    status: "Online Assessment",
    interviewDate: "",
    link: "https://careers.microsoft.com/",
    notes: "Focus on arrays, strings and problem solving"
  },
  {
    id: 3,
    company: "Amazon",
    role: "SDE Intern",
    jobType: "Internship",
    location: "Hyderabad",
    package: "₹14 LPA",
    applicationDate: "2026-09-08",
    deadline: "2026-09-28",
    status: "Applied",
    interviewDate: "",
    link: "https://www.amazon.jobs/",
    notes: "Application submitted"
  }
];

function Applications() {
  const [applications, setApplications] = useState(() => {
    const saved = JSON.parse(localStorage.getItem("applications"));

    if (
      saved &&
      saved.length > 0 &&
      saved.every(
        (item) =>
          item.company &&
          item.role &&
          item.status
      )
    ) {
      return saved;
    }

    return demoApplications;
  });

  const [form, setForm] = useState({
    company: "",
    role: "",
    jobType: "Internship",
    location: "",
    package: "",
    applicationDate: "",
    deadline: "",
    status: "Interested",
    interviewDate: "",
    link: "",
    notes: ""
  });

  const [editingId, setEditingId] = useState(null);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  useEffect(() => {
    localStorage.setItem(
      "applications",
      JSON.stringify(applications)
    );
  }, [applications]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value
    });
  };

  const resetForm = () => {
    setForm({
      company: "",
      role: "",
      jobType: "Internship",
      location: "",
      package: "",
      applicationDate: "",
      deadline: "",
      status: "Interested",
      interviewDate: "",
      link: "",
      notes: ""
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.company.trim()) {
      alert("Please enter company name");
      return;
    }

    if (!form.role.trim()) {
      alert("Please enter role");
      return;
    }

    if (editingId) {
      setApplications(
        applications.map((app) =>
          app.id === editingId
            ? {
                ...app,
                ...form
              }
            : app
        )
      );

      setEditingId(null);
    } else {
      setApplications([
        ...applications,
        {
          id: Date.now(),
          ...form
        }
      ]);
    }

    resetForm();
  };

  const editApplication = (app) => {
    setForm({
      company: app.company || "",
      role: app.role || "",
      jobType: app.jobType || "Internship",
      location: app.location || "",
      package: app.package || "",
      applicationDate: app.applicationDate || "",
      deadline: app.deadline || "",
      status: app.status || "Interested",
      interviewDate: app.interviewDate || "",
      link: app.link || "",
      notes: app.notes || ""
    });

    setEditingId(app.id);

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const deleteApplication = (id) => {
    if (!window.confirm("Delete this application?")) {
      return;
    }

    setApplications(
      applications.filter(
        (app) => app.id !== id
      )
    );
  };

  const updateStatus = (id, status) => {
    setApplications(
      applications.map((app) =>
        app.id === id
          ? {
              ...app,
              status
            }
          : app
      )
    );
  };

  const appliedCount = applications.filter(
    (app) => app.status !== "Interested"
  ).length;

  const interviewCount = applications.filter(
    (app) => app.status === "Interview"
  ).length;

  const selectedCount = applications.filter(
    (app) => app.status === "Selected"
  ).length;

  const filteredApplications = applications.filter((app) => {
    const matchesFilter =
      filter === "All" ||
      app.status === filter;

    const matchesSearch =
      app.company
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      app.role
        .toLowerCase()
        .includes(search.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  return (
    <div>
      <div className="page-heading">
        <h1>Application Tracker</h1>

        <p>
          Track internship and placement applications from
          interest to selection.
        </p>
      </div>

      <div className="dsa-summary">
        <div className="summary-card">
          <h3>{applications.length}</h3>
          <p>Total Companies</p>
        </div>

        <div className="summary-card">
          <h3>{appliedCount}</h3>
          <p>Applied</p>
        </div>

        <div className="summary-card">
          <h3>{interviewCount}</h3>
          <p>Interviews</p>
        </div>

        <div className="summary-card">
          <h3>{selectedCount}</h3>
          <p>Selected</p>
        </div>
      </div>

      <form
        className="dsa-form"
        onSubmit={handleSubmit}
      >
        <div className="form-group">
          <label>Company Name</label>

          <input
            type="text"
            name="company"
            placeholder="Example: JPMorgan Chase"
            value={form.company}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Role</label>

          <input
            type="text"
            name="role"
            placeholder="Example: Software Engineer Intern"
            value={form.role}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Job Type</label>

          <select
            name="jobType"
            value={form.jobType}
            onChange={handleChange}
          >
            <option>Internship</option>
            <option>Full Time</option>
            <option>Part Time</option>
            <option>Contract</option>
          </select>
        </div>

        <div className="form-group">
          <label>Location</label>

          <input
            type="text"
            name="location"
            placeholder="Example: Hyderabad"
            value={form.location}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Package / Stipend</label>

          <input
            type="text"
            name="package"
            placeholder="Example: ₹12 LPA"
            value={form.package}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Status</label>

          <select
            name="status"
            value={form.status}
            onChange={handleChange}
          >
            <option>Interested</option>
            <option>Applied</option>
            <option>Online Assessment</option>
            <option>Interview</option>
            <option>Selected</option>
            <option>Rejected</option>
          </select>
        </div>

        <div className="form-group">
          <label>Application Date</label>

          <input
            type="date"
            name="applicationDate"
            value={form.applicationDate}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Deadline</label>

          <input
            type="date"
            name="deadline"
            value={form.deadline}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Interview Date</label>

          <input
            type="date"
            name="interviewDate"
            value={form.interviewDate}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Application Link</label>

          <input
            type="url"
            name="link"
            placeholder="https://..."
            value={form.link}
            onChange={handleChange}
          />
        </div>

        <div className="form-group notes-field">
          <label>Notes</label>

          <textarea
            name="notes"
            placeholder="Interview topics, preparation notes, next steps..."
            value={form.notes}
            onChange={handleChange}
          />
        </div>

        <div className="form-buttons">
          <button
            type="submit"
            className="primary-btn"
          >
            {editingId
              ? "Update Application"
              : "Add Application"}
          </button>

          {editingId && (
            <button
              type="button"
              className="cancel-btn"
              onClick={() => {
                setEditingId(null);
                resetForm();
              }}
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div
        style={{
          display: "flex",
          gap: "12px",
          marginBottom: "18px",
          flexWrap: "wrap"
        }}
      >
        <input
          type="text"
          placeholder="Search company or role..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          style={{
            maxWidth: "300px"
          }}
        />

        <div className="filter-buttons">
          {[
            "All",
            "Interested",
            "Applied",
            "Online Assessment",
            "Interview",
            "Selected",
            "Rejected"
          ].map((item) => (
            <button
              key={item}
              onClick={() => setFilter(item)}
              className={
                filter === item
                  ? "active-filter"
                  : ""
              }
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Company</th>
              <th>Role</th>
              <th>Type</th>
              <th>Location</th>
              <th>Package</th>
              <th>Status</th>
              <th>Applied</th>
              <th>Deadline</th>
              <th>Interview</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredApplications.map((app) => (
              <tr key={app.id}>
                <td>
                  <strong>{app.company}</strong>

                  {app.link && (
                    <a
                      href={app.link}
                      target="_blank"
                      rel="noreferrer"
                      className="problem-link"
                    >
                      Open Career Page
                    </a>
                  )}

                  {app.notes && (
                    <small className="problem-notes">
                      {app.notes}
                    </small>
                  )}
                </td>

                <td>{app.role}</td>

                <td>{app.jobType}</td>

                <td>
                  {app.location || "-"}
                </td>

                <td>
                  {app.package || "-"}
                </td>

                <td>
                  <select
                    value={app.status}
                    onChange={(e) =>
                      updateStatus(
                        app.id,
                        e.target.value
                      )
                    }
                  >
                    <option>Interested</option>
                    <option>Applied</option>
                    <option>
                      Online Assessment
                    </option>
                    <option>Interview</option>
                    <option>Selected</option>
                    <option>Rejected</option>
                  </select>
                </td>

                <td>
                  {app.applicationDate || "-"}
                </td>

                <td>
                  {app.deadline || "-"}
                </td>

                <td>
                  {app.interviewDate || "-"}
                </td>

                <td>
                  <div className="action-buttons">
                    <button
                      className="edit-btn"
                      onClick={() =>
                        editApplication(app)
                      }
                    >
                      Edit
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() =>
                        deleteApplication(app.id)
                      }
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {filteredApplications.length === 0 && (
              <tr>
                <td
                  colSpan="10"
                  className="empty-message"
                >
                  No applications found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Applications;