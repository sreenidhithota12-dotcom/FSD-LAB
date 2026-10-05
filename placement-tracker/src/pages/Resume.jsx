import { useEffect, useState } from "react";

const resumeItems = [
  "Personal Details",
  "Education",
  "Technical Skills",
  "Projects",
  "Internships / Experience",
  "Achievements",
  "Certifications",
  "GitHub Profile",
  "LinkedIn Profile",
  "Grammar Check",
  "ATS Check",
];

function Resume() {
  const [completed, setCompleted] = useState(() => {
    return JSON.parse(localStorage.getItem("resumeChecklist")) || [];
  });

  useEffect(() => {
    localStorage.setItem(
      "resumeChecklist",
      JSON.stringify(completed)
    );
  }, [completed]);

  const toggleItem = (item) => {
    if (completed.includes(item)) {
      setCompleted(completed.filter((x) => x !== item));
    } else {
      setCompleted([...completed, item]);
    }
  };

  const progress = Math.round(
    (completed.length / resumeItems.length) * 100
  );

  return (
    <div>
      <div className="page-heading">
        <h1>Resume Readiness</h1>
        <p>Complete the checklist before applying to companies.</p>
      </div>

      <div className="resume-score">
        <h1>{progress}%</h1>
        <p>Resume Readiness Score</p>

        <div className="progress-bar-custom">
          <div style={{ width: `${progress}%` }}></div>
        </div>
      </div>

      <div className="resume-checklist">
        {resumeItems.map((item) => (
          <label key={item}>
            <input
              type="checkbox"
              checked={completed.includes(item)}
              onChange={() => toggleItem(item)}
            />

            <span>{item}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

export default Resume;