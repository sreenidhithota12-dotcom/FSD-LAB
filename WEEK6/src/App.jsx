import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [task, setTask] = useState("");
  const [editId, setEditId] = useState(null);

  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  function addOrUpdateTodo() {
    if (!task.trim()) {
      alert("Please enter a task");
      return;
    }

    if (editId !== null) {
      setTodos(
        todos.map(todo =>
          todo.id === editId
            ? { ...todo, text: task.trim() }
            : todo
        )
      );

      setEditId(null);
      setTask("");
      return;
    }

    const newTodo = {
      id: Date.now(),
      text: task.trim(),
      completed: false
    };

    setTodos([...todos, newTodo]);
    setTask("");
  }

  function editTodo(id) {
    const todo = todos.find(todo => todo.id === id);

    setTask(todo.text);
    setEditId(id);
  }

  function deleteTodo(id) {
    setTodos(todos.filter(todo => todo.id !== id));

    if (editId === id) {
      setEditId(null);
      setTask("");
    }
  }

  function toggleTodo(id) {
    setTodos(
      todos.map(todo =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  }

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      addOrUpdateTodo();
    }
  }

  return (
    <div className="container">

      <h1>ToDo App</h1>

      <div className="input-box">

        <input
          type="text"
          placeholder="Enter a task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        <button onClick={addOrUpdateTodo}>
          {editId !== null ? "Update" : "Add"}
        </button>

      </div>

      {todos.length === 0 ? (
        <p className="empty">No tasks available</p>
      ) : (
        <ul>

          {todos.map(todo => (

            <li key={todo.id}>

              <span
                className={todo.completed ? "completed" : ""}
                onClick={() => toggleTodo(todo.id)}
              >
                {todo.text}
              </span>

              <div className="actions">

                <button
                  className="edit"
                  onClick={() => editTodo(todo.id)}
                >
                  Edit
                </button>

                <button
                  className="delete"
                  onClick={() => deleteTodo(todo.id)}
                >
                  Delete
                </button>

              </div>

            </li>

          ))}

        </ul>
      )}

    </div>
  );
}

export default App;