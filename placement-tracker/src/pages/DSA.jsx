import { useEffect, useState } from "react";

const demoProblems = [
  {
    id: 1,
    name: "Two Sum",
    platform: "LeetCode",
    link: "https://leetcode.com/problems/two-sum/",
    topic: "Arrays",
    difficulty: "Easy",
    status: "Solved",
    dateSolved: "2026-09-10",
    revision: "No",
    notes: "Solved using HashMap"
  },
  {
    id: 2,
    name: "Dijkstra Algorithm",
    platform: "GeeksforGeeks",
    link: "https://www.geeksforgeeks.org/dijkstras-shortest-path-algorithm-greedy-algo-7/",
    topic: "Graphs",
    difficulty: "Medium",
    status: "Solved",
    dateSolved: "2026-09-11",
    revision: "Yes",
    notes: "Revise priority queue implementation"
  },
  {
    id: 3,
    name: "Longest Common Subsequence",
    platform: "LeetCode",
    link: "https://leetcode.com/problems/longest-common-subsequence/",
    topic: "Dynamic Programming",
    difficulty: "Medium",
    status: "Pending",
    dateSolved: "",
    revision: "Yes",
    notes: "Need to practice tabulation"
  }
];

function DSA() {
  const [problems, setProblems] = useState(() => {
    const saved = JSON.parse(localStorage.getItem("problems"));

    return saved && saved.length > 0
      ? saved
      : demoProblems;
  });

  const [form, setForm] = useState({
    name: "",
    platform: "LeetCode",
    link: "",
    topic: "Arrays",
    difficulty: "Easy",
    status: "Pending",
    dateSolved: "",
    revision: "No",
    notes: ""
  });

  const [filter, setFilter] = useState("All");

  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    localStorage.setItem(
      "problems",
      JSON.stringify(problems)
    );
  }, [problems]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name.trim()) {
      alert("Please enter problem name");
      return;
    }

    if (editingId) {
      setProblems(
        problems.map((problem) =>
          problem.id === editingId
            ? {
                ...problem,
                ...form
              }
            : problem
        )
      );

      setEditingId(null);
    } else {
      const newProblem = {
        id: Date.now(),
        ...form
      };

      setProblems([
        ...problems,
        newProblem
      ]);
    }

    resetForm();
  };

  const resetForm = () => {
    setForm({
      name: "",
      platform: "LeetCode",
      link: "",
      topic: "Arrays",
      difficulty: "Easy",
      status: "Pending",
      dateSolved: "",
      revision: "No",
      notes: ""
    });
  };

  const deleteProblem = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this problem?"
    );

    if (!confirmDelete) return;

    setProblems(
      problems.filter(
        (problem) => problem.id !== id
      )
    );
  };

  const editProblem = (problem) => {
    setForm({
      name: problem.name,
      platform: problem.platform,
      link: problem.link,
      topic: problem.topic,
      difficulty: problem.difficulty,
      status: problem.status,
      dateSolved: problem.dateSolved,
      revision: problem.revision,
      notes: problem.notes
    });

    setEditingId(problem.id);

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const toggleStatus = (id) => {
    setProblems(
      problems.map((problem) =>
        problem.id === id
          ? {
              ...problem,
              status:
                problem.status === "Solved"
                  ? "Pending"
                  : "Solved",

              dateSolved:
                problem.status === "Solved"
                  ? ""
                  : new Date()
                      .toISOString()
                      .split("T")[0]
            }
          : problem
      )
    );
  };

  const filteredProblems =
    filter === "All"
      ? problems
      : problems.filter(
          (problem) =>
            problem.difficulty === filter ||
            problem.status === filter ||
            problem.topic === filter ||
            problem.platform === filter ||
            problem.revision === filter
        );

  const solvedCount =
    problems.filter(
      (problem) =>
        problem.status === "Solved"
    ).length;

  const revisionCount =
    problems.filter(
      (problem) =>
        problem.revision === "Yes"
    ).length;

  return (
    <div>

      <div className="page-heading">
        <h1>DSA Tracker</h1>

        <p>
          Track coding problems,
          platforms, revision and
          preparation progress.
        </p>
      </div>

      <div className="dsa-summary">

        <div className="summary-card">
          <h3>
            {problems.length}
          </h3>

          <p>Total Problems</p>
        </div>

        <div className="summary-card">
          <h3>
            {solvedCount}
          </h3>

          <p>Solved</p>
        </div>

        <div className="summary-card">
          <h3>
            {problems.length -
              solvedCount}
          </h3>

          <p>Pending</p>
        </div>

        <div className="summary-card">
          <h3>
            {revisionCount}
          </h3>

          <p>Need Revision</p>
        </div>

      </div>

      <form
        className="dsa-form"
        onSubmit={handleSubmit}
      >

        <div className="form-group">
          <label>
            Problem Name
          </label>

          <input
            type="text"
            name="name"
            placeholder="Example: Two Sum"
            value={form.name}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">

          <label>
            Platform
          </label>

          <select
            name="platform"
            value={form.platform}
            onChange={handleChange}
          >
            <option>
              LeetCode
            </option>

            <option>
              GeeksforGeeks
            </option>

            <option>
              HackerRank
            </option>

            <option>
              CodeChef
            </option>

            <option>
              Coding Ninjas
            </option>

            <option>
              InterviewBit
            </option>

            <option>
              Other
            </option>
          </select>

        </div>

        <div className="form-group">

          <label>
            Problem Link
          </label>

          <input
            type="url"
            name="link"
            placeholder="https://..."
            value={form.link}
            onChange={handleChange}
          />

        </div>

        <div className="form-group">

          <label>
            Topic
          </label>

          <select
            name="topic"
            value={form.topic}
            onChange={handleChange}
          >

            <option>
              Arrays
            </option>

            <option>
              Strings
            </option>

            <option>
              Linked List
            </option>

            <option>
              Stack
            </option>

            <option>
              Queue
            </option>

            <option>
              Trees
            </option>

            <option>
              Graphs
            </option>

            <option>
              Recursion
            </option>

            <option>
              Backtracking
            </option>

            <option>
              Greedy
            </option>

            <option>
              Binary Search
            </option>

            <option>
              Dynamic Programming
            </option>

          </select>

        </div>

        <div className="form-group">

          <label>
            Difficulty
          </label>

          <select
            name="difficulty"
            value={form.difficulty}
            onChange={handleChange}
          >

            <option>
              Easy
            </option>

            <option>
              Medium
            </option>

            <option>
              Hard
            </option>

          </select>

        </div>

        <div className="form-group">

          <label>
            Status
          </label>

          <select
            name="status"
            value={form.status}
            onChange={handleChange}
          >

            <option>
              Pending
            </option>

            <option>
              Solved
            </option>

          </select>

        </div>

        <div className="form-group">

          <label>
            Date Solved
          </label>

          <input
            type="date"
            name="dateSolved"
            value={form.dateSolved}
            onChange={handleChange}
          />

        </div>

        <div className="form-group">

          <label>
            Revision Required
          </label>

          <select
            name="revision"
            value={form.revision}
            onChange={handleChange}
          >

            <option>
              No
            </option>

            <option>
              Yes
            </option>

          </select>

        </div>

        <div className="form-group notes-field">

          <label>
            Notes
          </label>

          <textarea
            name="notes"
            placeholder="Add notes about approach, complexity or revision..."
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
              ? "Update Problem"
              : "Add Problem"}
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
          "Solved",
          "Pending"
        ].map((item) => (

          <button
            key={item}
            onClick={() =>
              setFilter(item)
            }
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

              <th>
                Problem
              </th>

              <th>
                Platform
              </th>

              <th>
                Topic
              </th>

              <th>
                Difficulty
              </th>

              <th>
                Status
              </th>

              <th>
                Revision
              </th>

              <th>
                Date
              </th>

              <th>
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {filteredProblems.map(
              (problem) => (

                <tr key={problem.id}>

                  <td>

                    <strong>
                      {problem.name}
                    </strong>

                    {problem.link && (

                      <div>

                        <a
                          href={problem.link}
                          target="_blank"
                          rel="noreferrer"
                          className="problem-link"
                        >
                          Open Problem
                        </a>

                      </div>

                    )}

                    {problem.notes && (

                      <small className="problem-notes">
                        {problem.notes}
                      </small>

                    )}

                  </td>

                  <td>
                    {problem.platform}
                  </td>

                  <td>
                    {problem.topic}
                  </td>

                  <td>

                    <span
                      className={`difficulty-badge ${problem.difficulty.toLowerCase()}`}
                    >
                      {problem.difficulty}
                    </span>

                  </td>

                  <td>

                    <span
                      className={
                        problem.status ===
                        "Solved"
                          ? "status solved"
                          : "status pending"
                      }
                    >
                      {problem.status}
                    </span>

                  </td>

                  <td>

                    <span
                      className={
                        problem.revision ===
                        "Yes"
                          ? "revision-yes"
                          : "revision-no"
                      }
                    >
                      {problem.revision}
                    </span>

                  </td>

                  <td>
                    {problem.dateSolved ||
                      "-"}
                  </td>

                  <td>

                    <div className="action-buttons">

                      <button
                        className="small-btn"
                        onClick={() =>
                          toggleStatus(
                            problem.id
                          )
                        }
                      >

                        {problem.status ===
                        "Solved"
                          ? "Mark Pending"
                          : "Mark Solved"}

                      </button>

                      <button
                        className="edit-btn"
                        onClick={() =>
                          editProblem(
                            problem
                          )
                        }
                      >
                        Edit
                      </button>

                      <button
                        className="delete-btn"
                        onClick={() =>
                          deleteProblem(
                            problem.id
                          )
                        }
                      >
                        Delete
                      </button>

                    </div>

                  </td>

                </tr>

              )
            )}

            {filteredProblems.length ===
              0 && (

              <tr>

                <td
                  colSpan="8"
                  className="empty-message"
                >
                  No problems found.
                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default DSA;