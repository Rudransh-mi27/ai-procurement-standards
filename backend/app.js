const express = require("express");
const cors = require("cors");
const projectroutes=require("./src/routes/project_routes")
const documentRoutes=require("./src/routes/document_routes")
const errorHandler=require("./src/middleware/error_middleware")

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Backend server is running"
  });
});
// 404 handler
app.use("/api/projects", projectroutes);
app.use("/api/documents", documentRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: {
      message: "Route not found"
    }
  });
});

// error handler
app.use(errorHandler)

module.exports = app;