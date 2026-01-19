import React, { useState, useEffect } from "react";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import {
  Box,
  CssBaseline,
  Drawer,
  AppBar,
  Toolbar,
  Typography,
  Container,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  Card,
  CardContent,
  CardActions,
  Grid,
  Chip,
  Button,
  IconButton,
  TextField,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  CircularProgress,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Dashboard as DashboardIcon,
  AssignmentInd as ComplaintIcon,
  Feedback as FeedbackIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
  Menu as MenuIcon,
  MoreVert as MoreIcon,
  Add as AddIcon,
  Check as CheckIcon,
  AccessTime as ClockIcon,
  Warning as AlertIcon,
} from "@mui/icons-material";

import * as APIService from "./services/api";

// ============================================================================
// MUI THEME CONFIGURATION
// ============================================================================
const theme = createTheme({
  palette: {
    primary: {
      main: "#667eea",
    },
    secondary: {
      main: "#764ba2",
    },
    success: {
      main: "#55efc4",
    },
    warning: {
      main: "#fdcb6e",
    },
    error: {
      main: "#e74c3c",
    },
  },
  typography: {
    fontFamily: "'Segoe UI', 'Roboto', sans-serif",
    h4: {
      fontWeight: 700,
    },
    h5: {
      fontWeight: 600,
    },
  },
});

// ============================================================================
// SIDEBAR COMPONENT
// ============================================================================
function Sidebar({ open, onClose }) {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { label: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
    { label: "My Complaints", icon: <ComplaintIcon />, path: "/complaints" },
    { label: "Feedback", icon: <FeedbackIcon />, path: "/feedback" },
    { label: "Admin Panel", icon: <SettingsIcon />, path: "/admin" },
  ];

  const handleNavigate = (path) => {
    navigate(path);
    onClose();
  };

  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <Box sx={{ width: 280, pt: 3, px: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 3, color: "#667eea" }}>
          🔧 ResolveIT
        </Typography>
        <Divider />

        {menuItems.map((item, idx) => (
          <Box
            key={idx}
            onClick={() => handleNavigate(item.path)}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              p: 1.5,
              mb: 1,
              borderRadius: 1,
              cursor: "pointer",
              backgroundColor: location.pathname === item.path ? "#f0f0f0" : "transparent",
              color: location.pathname === item.path ? "#667eea" : "#333",
              fontWeight: location.pathname === item.path ? 600 : 400,
              transition: "all 0.3s",
              "&:hover": {
                backgroundColor: "#f0f0f0",
                color: "#667eea",
              },
            }}
          >
            {item.icon}
            <Typography>{item.label}</Typography>
          </Box>
        ))}
      </Box>
    </Drawer>
  );
}

// ============================================================================
// TOP NAVIGATION BAR
// ============================================================================
function TopBar({ onMenuOpen, onLogout }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (e) => setAnchorEl(e.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  return (
    <>
      <AppBar position="sticky" sx={{ backgroundColor: "#ffffff", boxShadow: 1, color: "#333" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <MenuIcon
              sx={{ cursor: "pointer", color: "#667eea", fontSize: 28 }}
              onClick={onMenuOpen}
            />
            <Typography
              variant="h6"
              sx={{ color: "#667eea", fontWeight: 700, display: { xs: "none", sm: "block" } }}
            >
              ResolveIT - Complaint Management
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Avatar sx={{ backgroundColor: "#667eea", cursor: "pointer" }} onClick={handleMenuOpen}>
              U
            </Avatar>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
              <MenuItem disabled>
                <Typography variant="caption" sx={{ fontWeight: 600 }}>
                  Employee
                </Typography>
              </MenuItem>
              <Divider />
              <MenuItem
                onClick={() => {
                  handleMenuClose();
                  onLogout();
                }}
                sx={{ color: "#e74c3c" }}
              >
                <LogoutIcon sx={{ mr: 1, fontSize: 18 }} />
                Logout
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}

// ============================================================================
// LOGIN PAGE - MUI
// ============================================================================
function MuiLoginPage({ onLogin, loading, error, setError }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError("Please enter email and password");
      return;
    }
    await onLogin(email, password);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 2,
      }}
    >
      <Card sx={{ maxWidth: 450, width: "100%", p: 4 }}>
        <CardContent>
          <Typography variant="h4" sx={{ textAlign: "center", mb: 1, color: "#667eea", fontWeight: 700 }}>
            ResolveIT
          </Typography>
          <Typography variant="body2" sx={{ textAlign: "center", mb: 4, color: "#7f8c8d" }}>
            Smart Grievance & Feedback Management System
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError("")}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              fullWidth
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />
            <Button
              fullWidth
              variant="contained"
              size="large"
              type="submit"
              sx={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                mt: 2,
              }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : "Login to ResolveIT"}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

// ============================================================================
// DASHBOARD PAGE - MUI
// ============================================================================
function MuiDashboardPage({ grievances, loading }) {
  const navigate = useNavigate();

  const stats = [
    {
      label: "Total Complaints",
      value: grievances.length,
      color: "#667eea",
      icon: <ComplaintIcon />,
    },
    {
      label: "New",
      value: grievances.filter((g) => g.status === "Pending").length,
      color: "#3498db",
      icon: <AlertIcon />,
    },
    {
      label: "Under Review",
      value: grievances.filter((g) => g.status === "In Progress").length,
      color: "#f39c12",
      icon: <ClockIcon />,
    },
    {
      label: "Resolved",
      value: grievances.filter((g) => g.status === "Resolved").length,
      color: "#27ae60",
      icon: <CheckIcon />,
    },
  ];

  return (
    <Box sx={{ pb: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
          Welcome Back!
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Here's your complaint management overview
        </Typography>
      </Box>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat, idx) => (
          <Grid item xs={12} sm={6} md={3} key={idx}>
            <Card sx={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", p: 2 }}>
              <Box>
                <Typography color="textSecondary" variant="body2" sx={{ mb: 1 }}>
                  {stat.label}
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 700, color: stat.color }}>
                  {stat.value}
                </Typography>
              </Box>
              <Box sx={{ color: stat.color, opacity: 0.3, fontSize: 40 }}>{stat.icon}</Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Recent Complaints
            </Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => navigate("/complaints")}
              sx={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}
            >
              New Complaint
            </Button>
          </Box>

          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
              <CircularProgress />
            </Box>
          ) : grievances.length === 0 ? (
            <Typography color="textSecondary" sx={{ textAlign: "center", py: 4 }}>
              No complaints yet. Click "New Complaint" to get started.
            </Typography>
          ) : (
            <Grid container spacing={2}>
              {grievances.slice(0, 3).map((complaint, idx) => (
                <Grid item xs={12} key={idx}>
                  <Paper sx={{ p: 2, border: "1px solid #ecf0f1", cursor: "pointer", transition: "all 0.3s", "&:hover": { boxShadow: 2 } }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                          {complaint.title || complaint.grievanceTitle}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                          {(complaint.description || complaint.grievanceDescription || "").substring(0, 80)}...
                        </Typography>
                        <Box sx={{ display: "flex", gap: 1 }}>
                          <Chip
                            label={complaint.category || complaint.grievanceCategory}
                            size="small"
                            variant="outlined"
                          />
                          <Chip
                            label={complaint.status || "Pending"}
                            size="small"
                            color={
                              complaint.status === "Resolved"
                                ? "success"
                                : complaint.status === "In Progress"
                                ? "warning"
                                : "default"
                            }
                          />
                        </Box>
                      </Box>
                      <IconButton size="small">
                        <MoreIcon />
                      </IconButton>
                    </Box>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          )}
        </CardContent>
        <CardActions>
          <Button
            fullWidth
            onClick={() => navigate("/complaints")}
            sx={{ color: "#667eea", fontWeight: 600 }}
          >
            View All Complaints →
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
}

// ============================================================================
// COMPLAINTS PAGE - MUI
// ============================================================================
function MuiComplaintsPage({ grievances, loading, onLoadGrievances, onRegister }) {
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState({ title: "", description: "", category: "" });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (grievances.length === 0 && !loading) {
      onLoadGrievances();
    }
  }, [grievances.length, loading, onLoadGrievances]);

  const handleSubmit = async () => {
    if (!formData.title.trim() || !formData.description.trim() || !formData.category) {
      setError("Please fill all fields");
      return;
    }

    try {
      setSubmitting(true);
      setError("");
      await onRegister(formData.title, formData.description, formData.category);
      setOpenDialog(false);
      setFormData({ title: "", description: "", category: "" });
      await onLoadGrievances();
    } catch (err) {
      setError(err.message || "Error submitting complaint");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box sx={{ pb: 4 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
        <div>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
            My Complaints
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Track and manage your complaints
          </Typography>
        </div>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenDialog(true)}
          sx={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}
        >
          New Complaint
        </Button>
      </Box>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
          <CircularProgress />
        </Box>
      ) : grievances.length === 0 ? (
        <Card>
          <CardContent sx={{ textAlign: "center", py: 6 }}>
            <Typography color="textSecondary" sx={{ mb: 2 }}>
              No complaints registered yet
            </Typography>
            <Button variant="contained" onClick={() => setOpenDialog(true)}>
              File Your First Complaint
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Grid container spacing={3}>
          {grievances.map((complaint, idx) => (
            <Grid item xs={12} md={6} key={idx}>
              <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
                <CardContent sx={{ flex: 1 }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "start", mb: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600, flex: 1 }}>
                      {complaint.title || complaint.grievanceTitle}
                    </Typography>
                    <Chip
                      label={complaint.status || "Pending"}
                      size="small"
                      color={
                        complaint.status === "Resolved"
                          ? "success"
                          : complaint.status === "In Progress"
                          ? "warning"
                          : "default"
                      }
                    />
                  </Box>

                  <Typography variant="body2" color="textSecondary" sx={{ mb: 2, minHeight: 40 }}>
                    {complaint.description || complaint.grievanceDescription}
                  </Typography>

                  <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                    <Chip
                      icon={<AlertIcon />}
                      label={complaint.category || complaint.grievanceCategory}
                      variant="outlined"
                      size="small"
                    />
                    <Chip label="Priority: Medium" size="small" variant="outlined" />
                  </Box>
                </CardContent>
                <Divider />
                <CardActions>
                  <Button size="small" color="primary">
                    View Details
                  </Button>
                  <Button size="small" color="primary">
                    Update Status
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>File New Complaint</DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          {error && <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError("")} />}
          <TextField
            fullWidth
            label="Complaint Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            margin="normal"
            disabled={submitting}
          />
          <TextField
            fullWidth
            label="Description"
            multiline
            rows={4}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            margin="normal"
            disabled={submitting}
          />
          <TextField
            fullWidth
            select
            label="Category"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            margin="normal"
            disabled={submitting}
            SelectProps={{
              native: true,
            }}
          >
            <option value="">Select Category</option>
            <option value="Technical">Technical</option>
            <option value="Academic">Academic</option>
            <option value="Infrastructure">Infrastructure</option>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" disabled={submitting}>
            {submitting ? "Submitting..." : "Submit"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

// ============================================================================
// FEEDBACK PAGE - MUI
// ============================================================================
function MuiFeedbackPage({ onSubmitFeedback }) {
  const [rating, setRating] = useState(0);
  const [feedbackText, setFeedbackText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async () => {
    if (rating === 0 || !feedbackText.trim()) {
      setError("Please provide rating and feedback");
      return;
    }

    try {
      setSubmitting(true);
      setError("");
      await onSubmitFeedback(rating, feedbackText);
      setSuccess(true);
      setRating(0);
      setFeedbackText("");
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err.message || "Error submitting feedback");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box sx={{ pb: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
        Share Your Feedback
      </Typography>
      <Typography variant="body2" color="textSecondary" sx={{ mb: 4 }}>
        Help us improve ResolveIT with your valuable feedback
      </Typography>

      <Card sx={{ maxWidth: 600 }}>
        <CardContent>
          {success && <Alert severity="success" sx={{ mb: 2 }}>Thank you for your feedback!</Alert>}
          {error && <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError("")} />}

          <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
            Rate Your Experience *
          </Typography>
          <Box sx={{ display: "flex", gap: 1, mb: 4, fontSize: 40 }}>
            {[1, 2, 3, 4, 5].map((star) => (
              <Box
                key={star}
                onClick={() => setRating(star)}
                sx={{
                  cursor: "pointer",
                  color: star <= rating ? "#f39c12" : "#bdc3c7",
                  transition: "color 0.2s",
                  "&:hover": { color: "#f39c12" },
                }}
              >
                ★
              </Box>
            ))}
          </Box>

          <TextField
            fullWidth
            label="Your Feedback *"
            multiline
            rows={5}
            placeholder="Tell us what you think about ResolveIT..."
            value={feedbackText}
            onChange={(e) => setFeedbackText(e.target.value)}
            disabled={submitting}
            sx={{ mb: 2 }}
          />
        </CardContent>
        <CardActions>
          <Button
            fullWidth
            variant="contained"
            onClick={handleSubmit}
            disabled={submitting}
            sx={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}
          >
            {submitting ? "Submitting..." : "Submit Feedback"}
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
}

// ============================================================================
// ADMIN PANEL - MUI
// ============================================================================
function MuiAdminPanel({ grievances }) {
  const stats = [
    { label: "Total Complaints", value: grievances.length, color: "#667eea" },
    { label: "Pending", value: grievances.filter((g) => g.status === "Pending").length, color: "#3498db" },
    { label: "In Progress", value: grievances.filter((g) => g.status === "In Progress").length, color: "#f39c12" },
    { label: "Resolved", value: grievances.filter((g) => g.status === "Resolved").length, color: "#27ae60" },
  ];

  return (
    <Box sx={{ pb: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 4 }}>
        Admin Dashboard
      </Typography>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat, idx) => (
          <Grid item xs={12} sm={6} md={3} key={idx}>
            <Card>
              <CardContent sx={{ textAlign: "center" }}>
                <Typography color="textSecondary" sx={{ mb: 1 }}>
                  {stat.label}
                </Typography>
                <Typography variant="h4" sx={{ color: stat.color, fontWeight: 700 }}>
                  {stat.value}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Card>
        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
            All Complaints
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#f5f7fa" }}>
                  <TableCell sx={{ fontWeight: 600 }}>Title</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Category</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Priority</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {grievances.slice(0, 10).map((complaint, idx) => (
                  <TableRow key={idx}>
                    <TableCell>{complaint.title || complaint.grievanceTitle}</TableCell>
                    <TableCell>{complaint.category || complaint.grievanceCategory}</TableCell>
                    <TableCell>
                      <Chip
                        label={complaint.status || "Pending"}
                        size="small"
                        color={
                          complaint.status === "Resolved"
                            ? "success"
                            : complaint.status === "In Progress"
                            ? "warning"
                            : "default"
                        }
                      />
                    </TableCell>
                    <TableCell>Medium</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
  );
}

// ============================================================================
// MAIN APP CONTENT WITH ROUTER & LAYOUT
// ============================================================================
function AppContent() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [grievances, setGrievances] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
  navigate("/login", { replace: true });
}, []);



 const handleLogin = async (email, password) => {
  setLoginLoading(true);
  setLoginError("");

  setTimeout(() => {
    localStorage.setItem("token", "demo-token");

    setGrievances([
      {
        id: 1,
        title: "Internet not working",
        description: "WiFi not working in computer lab",
        category: "Technical",
        status: "Pending",
      },
      {
        id: 2,
        title: "Broken chair",
        description: "Chair broken in classroom",
        category: "Infrastructure",
        status: "Resolved",
      },
    ]);

    navigate("/dashboard");
    setLoginLoading(false);
  }, 800);
};


  const handleLoadGrievances = async () => {
    try {
      setLoading(true);
      const res = await APIService.getGrievances();
      setGrievances(res.data || []);
    } catch (err) {
      console.error("Load error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterGrievance = async (title, desc, category) => {
  const newGrievance = {
    id: Date.now(),
    title,
    description: desc,
    category,
    status: "Pending",
  };

  setGrievances((prev) => [newGrievance, ...prev]);
};


  const handleSubmitFeedback = async (rating, feedbackText) => {
    const res = await APIService.submitFeedback(rating, feedbackText);
    if (res.status === 200 || res.status === 201) {
      console.log("Feedback submitted successfully");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const isLoginPage = location.pathname === "/login";

  if (isLoginPage) {
    return <MuiLoginPage onLogin={handleLogin} loading={loginLoading} error={loginError} setError={setLoginError} />;
  }

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", backgroundColor: "#f5f7fa" }}>
      <CssBaseline />
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <Box sx={{ flex: 1 }}>
        <TopBar onMenuOpen={() => setSidebarOpen(true)} onLogout={handleLogout} />
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Routes>
            <Route
              path="/dashboard"
              element={<MuiDashboardPage grievances={grievances} loading={loading} />}
            />
            <Route
              path="/complaints"
              element={
                <MuiComplaintsPage
                  grievances={grievances}
                  loading={loading}
                  onLoadGrievances={handleLoadGrievances}
                  onRegister={handleRegisterGrievance}
                />
              }
            />
            <Route
              path="/feedback"
              element={<MuiFeedbackPage onSubmitFeedback={handleSubmitFeedback} />}
            />
            <Route path="/admin" element={<MuiAdminPanel grievances={grievances} />} />
            <Route path="/login" element={<MuiLoginPage onLogin={handleLogin} loading={loginLoading} error={loginError} setError={setLoginError} />} />
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </Routes>
        </Container>
      </Box>
    </Box>
  );
}

// ============================================================================
// MAIN APP EXPORT WITH ROUTER & THEME
// ============================================================================
export default function App() {
  return (
    <ThemeProvider theme={theme}>
        <AppContent />
    </ThemeProvider>
  );
}
