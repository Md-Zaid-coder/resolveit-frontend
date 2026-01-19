import React, { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function ComplaintForm() {
  const nav = useNavigate();

  const [data, setData] = useState({
    category: "",   // Subject
    description: "",
    anonymous: false,  // default Public
    userId: null,
  });

  const [files, setFiles] = useState([]);

  const submit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("data", new Blob([JSON.stringify(data)], { type: "application/json" }));

    for (let f of files) {
      formData.append("files", f);
    }

    try {
      const res = await api.post("/complaints/submit", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      nav(`/success/${res.data}`);
    } catch (err) {
      alert("Failed to submit complaint");
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>Submit Complaint</h2>

      <form onSubmit={submit}>

        {/* Public / Anonymous Choice */}
        <div>
          <label>
            <input
              type="radio"
              name="mode"
              value="public"
              checked={!data.anonymous}
              onChange={() => setData({ ...data, anonymous: false })}
            />
            Public
          </label>
          <label style={{ marginLeft: "15px" }}>
            <input
              type="radio"
              name="mode"
              value="anonymous"
              checked={data.anonymous}
              onChange={() => setData({ ...data, anonymous: true })}
            />
            Anonymous
          </label>
        </div>
        <br />

        {/* Subject */}
        <input
          type="text"
          placeholder="Subject"
          value={data.category}
          onChange={e => setData({ ...data, category: e.target.value })}
        />
        <br /><br />

        {/* Description */}
        <textarea
          placeholder="Complaint Description"
          value={data.description}
          onChange={e => setData({ ...data, description: e.target.value })}
        />
        <br /><br />

        {/* File Upload */}
        <input
          multiple
          type="file"
          onChange={e => setFiles([...e.target.files])}
        />
        <br /><br />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
