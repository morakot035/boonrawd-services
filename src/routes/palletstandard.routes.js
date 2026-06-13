import express from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import {
  getAll,
  getById,
  getPlants,
  getLines,
} from "../controllers/palletstandard.controller.js";

const router = express.Router();

router.get("/meta/plants", verifyToken, getPlants);
router.get("/meta/lines", verifyToken, getLines);

router.get("/", verifyToken, getAll);
router.get("/:id", verifyToken, getById);

export default router;
