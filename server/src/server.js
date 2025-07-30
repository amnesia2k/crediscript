import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { logger } from "./utils/logger.js";
import { connectToDB } from "./db/mongo.js";
import morgan from "morgan";
import routes from "./routes/index.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;
// app.use(
//   cors({
//     origin: process.env.FRONTEND_URL,
//     credentials: true,
//     methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//   })
// );
app.use(
  cors({
    origin: process.env.FRONTEND_URL, // MUST BE EXACT
    credentials: true,
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
connectToDB();

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello World!" });
});

app.use("/api/v1", routes);

// error middleware
app.use((err, _req, res, _next) => {
  logger.error(err);
  res.status(500).json({
    error: err.message,
    success: false,
    message: "Internal Server Error",
  });
});

// not found middleware
app.use((_req, res, _next) => {
  res.status(404).json({ success: false, message: "Not Found" });
});

app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});

// __dirname in ESM
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// Core Middlewares
// app.set("trust proxy", 1);
// app.use(
//   cors({
//     origin: true,
//     credentials: true,
//   })
// );
// app.use(express.json());
// app.use(
//   compression({
//     threshold: 1024,
//     filter: (req, res) => {
//       if (req.headers["x-no-compression"]) return false;
//       req.headers["accept-encoding"] = "gzip";
//       return compression.filter(req, res);
//     },
//   })
// );

// Flat Route Loader
// async function loadRoutesFlat() {
//   const routesDir = path.join(__dirname, "routes");
//   if (!fs.existsSync(routesDir)) {
//     logger.warn("⚠️ No routes folder found at:", routesDir);
//     return;
//   }

//   const routeFiles = fs.readdirSync(routesDir).filter((f) => f.endsWith(".js"));

//   for (const file of routeFiles) {
//     try {
//       const filePath = path.join(routesDir, file);
//       const mod = await import(pathToFileURL(filePath).href);
//       const router = mod.default;

//       if (typeof router !== "function") {
//         logger.warn(`⚠️ Skipped ${file} (no default export router)`);
//         continue;
//       }

//       app.use("/api/v1", router);
//       logger.info(`✅ Mounted routes from ${file} at /api/v1`);
//     } catch (err) {
//       logger.error(`❌ Error loading ${file}:`, err);
//     }
//   }

// Fallback 404
// app.use((req, res) => {
//   res.status(404).json({
//     message: "Not Found",
//     url: req.originalUrl,
//   });
// });

// Global Error Handler
//   app.use((_err, _req, res) => {
//     logger.error("💥 Internal Server Error:");
//     res.status(500).json({
//       message: "Something broke!",
//       status: 500,
//     });
//   });
// }

// loadRoutesFlat().then(() => {
//   app.listen(PORT, () => {
//     logger.info(`🚀 Server running at http://localhost:${PORT}`);
//   });
// });
