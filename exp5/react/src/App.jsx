import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";

function Home() {
  return (
    <section>
      <small>WELCOME</small>
      <h1>CodeLog</h1>
      <p>
        A simple programming blog where you can explore web development,
        JavaScript, React and other technology topics.
      </p>
      <button>Explore Articles →</button>
    </section>
  );
}

function About() {
  return (
    <section>
      <small>ABOUT US</small>
      <h1>About CodeLog</h1>
      <p>
        CodeLog is a technology blog created to share simple and useful
        programming knowledge with students and developers.
      </p>
      <p>
        Our goal is to make web development concepts easier to understand
        through practical examples and tutorials.
      </p>
    </section>
  );
}

function Contact() {
  return (
    <section>
      <small>GET IN TOUCH</small>
      <h1>Contact Us</h1>
      <p>Have a question or suggestion? We'd love to hear from you.</p>

      <div className="contact">
        <p>📧 codelog@example.com</p>
        <p>📍 Hyderabad, India</p>
      </div>
    </section>
  );
}

function App() {
  return (
    <BrowserRouter>
      <nav>
        <h2>CodeLog</h2>

        <div>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </div>
      </nav>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;