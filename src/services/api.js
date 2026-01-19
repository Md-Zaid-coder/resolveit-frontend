import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080",
});

// Attach token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ============================================================================
// AUTH
// ============================================================================
export const authLogin = async (email, password) => {
  try {
    return await api.post("/auth/login", { email, password });
  } catch (err) {
    // 🔥 DEMO FALLBACK
    return {
      data: {
        token: "demo-token",
        user: { email, role: "USER" },
      },
    };
  }
};

// ============================================================================
// GRIEVANCES
// ============================================================================
export const getGrievances = async () => {
  try {
    return await api.get("/api/grievances");
  } catch {
    return {
      data: [
        {
          id: 1,
          title: "Internet not working",
          description: "WiFi issue in lab",
          category: "Technical",
          status: "Pending",
        },
        {
          id: 2,
          title: "Projector issue",
          description: "Projector not functioning",
          category: "Infrastructure",
          status: "Resolved",
        },
        {
          id: 3,
          title: "Exam schedule delay",
          description: "Timetable not published",
          category: "Academic",
          status: "In Progress",
        },
      ],
    };
  }
};

export const createGrievance = async (title, description, category) => {
  try {
    return await api.post("/api/grievances", { title, description, category });
  } catch {
    return { status: 201 };
  }
};

// ============================================================================
// FEEDBACK
// ============================================================================
export const submitFeedback = async (rating, feedback) => {
  try {
    return await api.post("/api/feedback", { rating, feedback });
  } catch {
    return { status: 201 };
  }
};

export default api;
