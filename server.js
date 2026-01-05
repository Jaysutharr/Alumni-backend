const express = require("express");
const app = express();
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const env = require("dotenv");
env.config({ path: "./config/.env" });
const cors = require("cors");
const db = require("./config/db");

const fs = require("fs");
const path = require("path");
const PORT = process.env.PORT || 4000;

db();
app.use(express.json());
app.use(express.static("public"));
app.use('/uploads', express.static('uploads'));

app.use((req, res, next) => {
  console.log(`📨 Request: ${req.method} ${req.url}`);
  next();
});

app.use(cors({
  origin: [
    "http://localhost:3000",
    "http://localhost:3001",
    "https://useralumni-frontend.vercel.app",
    "https://adminalumni-frontend.vercel.app"
  ],
  credentials: true
}));

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Alumni-Association",
      version: "1.0.0",
      description: "A simple Express Library API",
    },
    servers: [
      {
        url: process.env.BASE_URL || `http://localhost:${PORT}`,
        description: "Alumni API Documentation",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const specs = swaggerJsDoc(options);
app.use("/api-docs-Alumni-Association", swaggerUI.serve, swaggerUI.setup(specs));


// Dynamically load all routes from the routes directory
const routesPath = path.join(__dirname, "routes");
console.log('📁 Loading routes from:', routesPath);
fs.readdirSync(routesPath).forEach((file) => {
  if (file.endsWith(".js")) {
    console.log('✅ Loading route file:', file);
    const routeModule = require(path.join(routesPath, file));
    app.use("/api/v1", routeModule);
  }
});
console.log('🎯 All routes loaded successfully');

app.get("/", (req, res) => {
  res.status(200).send("Alumni Backend is Running 🚀");
});


app.listen(PORT, () =>
  console.log(`Server running at: ${process.env.BASE_URL || `http://localhost:${PORT}`}`)
);
