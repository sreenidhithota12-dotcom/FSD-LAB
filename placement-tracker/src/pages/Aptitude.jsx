import { useEffect, useState } from "react";

const demoTopics = [
  {
    id: 1,
    topic: "Percentages",
    subtopic: "Percentage Increase / Decrease",
    difficulty: "Easy",
    attempted: 20,
    correct: 17,
    status: "Completed",
    practiceDate: "2026-09-10",
    notes: "Revise shortcut formulas"
  },
  {
    id: 2,
    topic: "Profit and Loss",
    subtopic: "Discount and Marked Price",
    difficulty: "Medium",
    attempted: 15,
    correct: 10,
    status: "Practicing",
    practiceDate: "2026-09-11",
    notes: "Need more practice"
  },
  {
    id: 3,
    topic: "Probability",
    subtopic: "Basic Probability",
    difficulty: "Medium",
    attempted: 10,
    correct: 6,
    status: "Learning",
    practiceDate: "2026-09-12",
    notes: "Revise formulas"
  }
];

function Aptitude() {
  const [topics, setTopics] = useState(() => {
  const saved = JSON.parse(localStorage.getItem("aptitude"));

  if (
    saved &&
    saved.length > 0 &&
    saved.every(
      (item) =>
        item.topic &&
        item.difficulty &&
        item.status
    )
  ) {
    return saved;
  }

  return demoTopics;
});

  const [form, setForm] = useState({
    topic: "Percentages",
    subtopic: "",
    difficulty: "Easy",
    attempted: "",
    correct: "",
    status: "Not Started",
    practiceDate: "",
    notes: ""
  });

  const [editingId, setEditingId] = useState(null);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    localStorage.setItem(
      "aptitude",
      JSON.stringify(topics)
    );
  }, [topics]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.subtopic.trim()) {
      alert("Please enter subtopic");
      return;
    }

    const attempted = Number(form.attempted);
    const correct = Number(form.correct);

    if (correct > attempted) {
      alert("Correct answers cannot be more than attempted questions");
      return;
    }

    if (editingId) {
      setTopics(
        topics.map((item) =>
          item.id === editingId
            ? {
                ...item,
                ...form,
                attempted,
                correct
              }
            : item
        )
      );

      setEditingId(null);
    } else {
      setTopics([
        ...topics,
        {
          id: Date.now(),
          ...form,
          attempted,
          correct
        }
      ]);
    }

    resetForm();
  };

  const resetForm = () => {
    setForm({
      topic: "Percentages",
      subtopic: "",
      difficulty: "Easy",
      attempted: "",
      correct: "",
      status: "Not Started",
      practiceDate: "",
      notes: ""
    });
  };

  const deleteTopic = (id) => {
    if (!window.confirm("Delete this aptitude record?")) {
      return;
    }

    setTopics(
      topics.filter((item) => item.id !== id)
    );
  };

  const editTopic = (item) => {
    setForm({
      topic: item.topic,
      subtopic: item.subtopic,
      difficulty: item.difficulty,
      attempted: item.attempted,
      correct: item.correct,
      status: item.status,
      practiceDate: item.practiceDate,
      notes: item.notes
    });

    setEditingId(item.id);

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const calculateAccuracy = (item) => {
    if (!item.attempted) return 0;

    return Math.round(
      (item.correct / item.attempted) * 100
    );
  };

  const getStatusProgress = (status) => {
    if (status === "Not Started") return 0;
    if (status === "Learning") return 33;
    if (status === "Practicing") return 66;
    if (status === "Completed") return 100;

    return 0;
  };

  const overallProgress =
    topics.length === 0
      ? 0
      : Math.round(
          topics.reduce(
            (sum, item) =>
              sum + getStatusProgress(item.status),
            0
          ) / topics.length
        );

  const totalAttempted = topics.reduce(
    (sum, item) => sum + Number(item.attempted || 0),
    0
  );

  const totalCorrect = topics.reduce(
    (sum, item) => sum + Number(item.correct || 0),
    0
  );

  const overallAccuracy =
    totalAttempted === 0
      ? 0
      : Math.round(
          (totalCorrect / totalAttempted) * 100
        );

  const completedCount = topics.filter(
    (item) => item.status === "Completed"
  ).length;

  const filteredTopics =
    filter === "All"
      ? topics
      : topics.filter(
          (item) =>
            item.status === filter ||
            item.difficulty === filter
        );

  return (
    <div>
      <div className="page-heading">
        <h1>Aptitude Tracker</h1>

        <p>
          Track aptitude practice, accuracy and preparation progress.
        </p>
      </div>

      <div className="dsa-summary">
        <div className="summary-card">
          <h3>{topics.length}</h3>
          <p>Total Topics</p>
        </div>

        <div className="summary-card">
          <h3>{completedCount}</h3>
          <p>Completed</p>
        </div>

        <div className="summary-card">
          <h3>{totalAttempted}</h3>
          <p>Questions Attempted</p>
        </div>

        <div className="summary-card">
          <h3>{overallAccuracy}%</h3>
          <p>Overall Accuracy</p>
        </div>
      </div>

      <div className="progress-section">
        <div>
          <h4>Overall Preparation Progress</h4>
          <strong>{overallProgress}%</strong>
        </div>

        <div className="progress-bar-custom">
          <div
            style={{
              width: `${overallProgress}%`
            }}
          ></div>
        </div>
      </div>

      <form
        className="dsa-form"
        onSubmit={handleSubmit}
      >
        <div className="form-group">
          <label>Topic</label>

          <select
            name="topic"
            value={form.topic}
            onChange={handleChange}
          >
            <option>Percentages</option>
            <option>Profit and Loss</option>
            <option>Time and Work</option>
            <option>Time Speed Distance</option>
            <option>Probability</option>
            <option>Permutations</option>
            <option>Ratio and Proportion</option>
            <option>Averages</option>
            <option>Number System</option>
            <option>Logical Reasoning</option>
            <option>Verbal Ability</option>
          </select>
        </div>

        <div className="form-group">
          <label>Subtopic</label>

          <input
            type="text"
            name="subtopic"
            placeholder="Example: Compound Percentage"
            value={form.subtopic}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Difficulty</label>

          <select
            name="difficulty"
            value={form.difficulty}
            onChange={handleChange}
          >
            <option>Easy</option>
            <option>Medium</option>
            <option>Hard</option>
          </select>
        </div>

        <div className="form-group">
          <label>Questions Attempted</label>

          <input
            type="number"
            name="attempted"
            min="0"
            value={form.attempted}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Correct Answers</label>

          <input
            type="number"
            name="correct"
            min="0"
            value={form.correct}
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
            <option>Not Started</option>
            <option>Learning</option>
            <option>Practicing</option>
            <option>Completed</option>
          </select>
        </div>

        <div className="form-group">
          <label>Practice Date</label>

          <input
            type="date"
            name="practiceDate"
            value={form.practiceDate}
            onChange={handleChange}
          />
        </div>

        <div className="form-group notes-field">
          <label>Notes</label>

          <textarea
            name="notes"
            placeholder="Add formulas, mistakes or revision notes..."
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
              ? "Update Record"
              : "Add Record"}
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

      <div className="filter-buttons">
        {[
          "All",
          "Easy",
          "Medium",
          "Hard",
          "Learning",
          "Practicing",
          "Completed"
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

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Topic</th>
              <th>Subtopic</th>
              <th>Difficulty</th>
              <th>Attempted</th>
              <th>Correct</th>
              <th>Accuracy</th>
              <th>Status</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredTopics.map((item) => (
              <tr key={item.id}>
                <td>
                  <strong>{item.topic}</strong>

                  {item.notes && (
                    <small className="problem-notes">
                      {item.notes}
                    </small>
                  )}
                </td>

                <td>{item.subtopic}</td>

                <td>
                  <span
                    className={`difficulty-badge ${(item.difficulty || "Easy").toLowerCase()}`}
                  >
                    {item.difficulty || "Easy"}
                  </span>
                </td>

                <td>{item.attempted}</td>

                <td>{item.correct}</td>

                <td>
                  <strong>
                    {calculateAccuracy(item)}%
                  </strong>
                </td>

                <td>
                  <span className="status">
                    {item.status}
                  </span>
                </td>

                <td>
                  {item.practiceDate || "-"}
                </td>

                <td>
                  <div className="action-buttons">
                    <button
                      className="edit-btn"
                      onClick={() =>
                        editTopic(item)
                      }
                    >
                      Edit
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() =>
                        deleteTopic(item.id)
                      }
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {filteredTopics.length === 0 && (
              <tr>
                <td
                  colSpan="9"
                  className="empty-message"
                >
                  No aptitude records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Aptitude;