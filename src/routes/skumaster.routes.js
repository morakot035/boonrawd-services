import express from "express";
import { verifyToken } from "../middlewares/verifyToken.js";

import {
  getAll,
  getById,
  getPlants,
  getPlantCodes,
  getLines,
  getGroupProducts,
  getProductTypes,
  getLineTypes,
  getSizes,
} from "../controllers/skumaster.controller.js";

const router = express.Router();

/*
|--------------------------------------------------------------------------
| Meta Data
|--------------------------------------------------------------------------
*/

router.get("/meta/plants", verifyToken, getPlants);

router.get(
  "/meta/plant-codes",
  verifyToken,
  getPlantCodes,
);

router.get("/meta/lines", verifyToken, getLines);

router.get(
  "/meta/group-products",
  verifyToken,
  getGroupProducts,
);

router.get(
  "/meta/product-types",
  verifyToken,
  getProductTypes,
);

router.get(
  "/meta/line-types",
  verifyToken,
  getLineTypes,
);

router.get(
  "/meta/sizes",
  verifyToken,
  getSizes,
);

/*
|--------------------------------------------------------------------------
| SKU Master
|--------------------------------------------------------------------------
*/

router.get("/", verifyToken, getAll);

router.get("/:id", verifyToken, getById);

export default router;
