import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

import Dashboard from "./pages/Dashboard";
import DSA from "./pages/DSA";
import Aptitude from "./pages/Aptitude";
import Applications from "./pages/Applications";
import Resume from "./pages/Resume";
import Analytics from "./pages/Analytics";

import "./App.css";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <Navbar />

      <Sidebar
        open={sidebarOpen}
        setOpen={setSidebarOpen}
      />

      <main className="main-content full-width-content">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dsa" element={<DSA />} />
          <Route path="/aptitude" element={<Aptitude />} />
          <Route path="/applications" element={<Applications />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/analytics" element={<Analytics />} />
        </Routes>
      </main>
    </>
  );
}

export default App;