import React, { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const nav = useNavigate();

  const register = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/register", { name, email, password });
      alert(res.data);
      nav("/");
    } catch (err) {
      alert("Failed");
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>Register</h2>

      <form onSubmit={register}>
        <input placeholder="Full Name"
          value={name}
          onChange={e=>setName(e.target.value)} /><br /><br />

        <input placeholder="Email"
          value={email}
          onChange={e=>setEmail(e.target.value)} /><br /><br />

        <input placeholder="Password"
          type="password"
          value={password}
          onChange={e=>setPassword(e.target.value)} /><br /><br />

        <button type="submit">Register</button>
      </form>
    </div>
  );
}
