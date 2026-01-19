import React, { useState, useContext } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login: saveAuth } = useContext(AuthContext);
  const nav = useNavigate();

  const login = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", { email, password });

      if (res.data.status === "success") {
        saveAuth(res.data.token, res.data.user);
         console.log("Stored Token:", localStorage.getItem("token"));
      console.log("Stored User:", localStorage.getItem("user"));
        alert("Login Success");
        nav("/complaint");
      } else {
        alert(res.data.message);
      }

    } catch (err) {
      alert("Login Failed");
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>Login</h2>
      <form onSubmit={login}>
        <input placeholder="Email" value={email}
          onChange={e => setEmail(e.target.value)} /><br /><br />
        <input placeholder="Password" type="password"
          value={password} onChange={e => setPassword(e.target.value)} /><br /><br />
        <button type="submit">Login</button>
      </form>

      <br />
      <button onClick={() => nav("/register")}>Register</button>
    </div>
  );
}
