import express from "express";
import cors from "cors";
import helmet from "helmet";
import { config } from "dotenv";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import palletStandardRoutes from "./routes/palletstandard.routes.js";
import skuMasterRoutes from "./routes/skumaster.routes.js";
import budgetProductionRoutes from "./routes/budgetproduction.routes.js";

config();
connectDB();

const app = express();
app.use(express.json());

// ✅ CORS config เดียว ครอบทุก origin + method + header
const corsOptions = {
  origin: [
    "http://localhost:3000",
    "https://lotto-special-app.vercel.app",
    "https://lotto-special-services.onrender.com",
  ],
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  exposedHeaders: ["Content-Disposition"],
  credentials: true,
};

app.use(cors(corsOptions));

// ✅ preflight ทุก route ใช้ config เดียวกัน
app.options(/(.*)/, cors(corsOptions));

app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginResourcePolicy: false,
  }),
);

app.use((req, res, next) => {
  console.log(`📥 Request: ${req.method} ${req.url}`);
  next();
});

app.use("/api/auth", authRoutes);
app.use("/api/pallet-standards", palletStandardRoutes);
app.use("/api/sku-master", skuMasterRoutes);
app.use("/api/budget-production", budgetProductionRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));

// 983b1d92-e0156118
// 0d67c6c7-294bec1c
// 972ccfca-896468bc
// 6a3223b8-3d6a208b
// bbf66bf8-aefa88c0
// 8a95afac-703a1fad
