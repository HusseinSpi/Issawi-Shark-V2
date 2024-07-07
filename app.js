const express = require("express");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");
const userRoutes = require("./routes/userRoutes");
const projectRoutes = require("./routes/projectRoutes");
const commentRoutes = require("./routes/commentRoutes");
const recentActivityRoutes = require("./routes/recentActivityRoutes");

const app = express();

const corsOptions = {
  origin: [
    "http://localhost:5173",
    "https://main--issawi-shark.netlify.app/",
    "https://issawi-shark-v2.onrender.com",
  ],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(helmet());
app.use(cookieParser());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use(mongoSanitize());
app.use(xss());

app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
  req.requestTime = new Date().toISOString();
  next();
});

app.use("/uploads", express.static("uploads"));

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/projects", projectRoutes);
app.use("/api/v1/comments", commentRoutes);
app.use("/api/v1/recent-activities", recentActivityRoutes);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
