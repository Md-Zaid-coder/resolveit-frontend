import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const nav = useNavigate();

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h1>Online Complaint & Grievance Portal</h1>

      <button onClick={() => nav("/login")} style={{ margin: "10px" }}>
        Login
      </button>

      <button onClick={() => nav("/complaint")} style={{ margin: "10px" }}>
        Submit Complaint (Anonymous)
      </button>
    </div>
  );
}
