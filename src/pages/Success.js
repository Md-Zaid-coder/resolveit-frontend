import React from "react";
import { useParams } from "react-router-dom";

export default function Success() {
  const { id } = useParams();

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h1>Complaint Submitted Successfully!</h1>
      <h2>Your Complaint ID:</h2>
      <h3 style={{ color: "green" }}>{id}</h3>
      <p>Save this ID for future tracking.</p>
    </div>
  );
}
