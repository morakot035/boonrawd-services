import SkuMaster from "../models/SkuMaster.js";

// GET /api/sku-master
const getAll = async (req, res) => {
  try {
    const {
      plant,
      plant_code,
      line,
      group_product,
      product_type,
      line_type,
      size_ml,
      size_litre,
      search,
      is_active,
    } = req.query;

    const filter = {};

    if (plant) filter.plant = plant;
    if (plant_code) filter.plant_code = plant_code;
    if (line) filter.line = line;
    if (group_product) filter.group_product = group_product;
    if (product_type) filter.product_type = product_type;
    if (line_type) filter.line_type = line_type;

    if (size_ml) filter.size_ml = Number(size_ml);
    if (size_litre) filter.size_litre = Number(size_litre);

    if (is_active !== undefined) {
      filter.is_active = is_active === "true";
    }

    if (search) {
      filter.$or = [
        { sku_name: { $regex: search, $options: "i" } },
        { plant: { $regex: search, $options: "i" } },
        { plant_code: { $regex: search, $options: "i" } },
        { line: { $regex: search, $options: "i" } },
        { group_product: { $regex: search, $options: "i" } },
        { product_type: { $regex: search, $options: "i" } },
        { line_type: { $regex: search, $options: "i" } },
      ];
    }

    const data = await SkuMaster.find(filter).sort({
      plant_code: 1,
      line: 1,
      group_product: 1,
      sku_name: 1,
    });

    res.json({
      success: true,
      count: data.length,
      data,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// GET /api/sku-master/:id
const getById = async (req, res) => {
  try {
    const doc = await SkuMaster.findById(req.params.id);

    if (!doc) {
      return res.status(404).json({
        success: false,
        message: "Not found",
      });
    }

    res.json({
      success: true,
      data: doc,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// GET /api/sku-master/meta/plants
const getPlants = async (_req, res) => {
  try {
    const plants = await SkuMaster.distinct("plant");

    res.json({
      success: true,
      data: plants.filter(Boolean).sort(),
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// GET /api/sku-master/meta/plant-codes
const getPlantCodes = async (_req, res) => {
  try {
    const plantCodes = await SkuMaster.distinct("plant_code");

    res.json({
      success: true,
      data: plantCodes.filter(Boolean).sort(),
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// GET /api/sku-master/meta/lines?plant=BAB&group_product=PET
const getLines = async (req, res) => {
  try {
    const { plant, plant_code, group_product, product_type } = req.query;

    const filter = {};

    if (plant) filter.plant = plant;
    if (plant_code) filter.plant_code = plant_code;
    if (group_product) filter.group_product = group_product;
    if (product_type) filter.product_type = product_type;

    const lines = await SkuMaster.distinct("line", filter);

    res.json({
      success: true,
      data: lines.filter(Boolean).sort(),
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// GET /api/sku-master/meta/group-products
const getGroupProducts = async (_req, res) => {
  try {
    const groupProducts = await SkuMaster.distinct("group_product");

    res.json({
      success: true,
      data: groupProducts.filter(Boolean).sort(),
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// GET /api/sku-master/meta/product-types
const getProductTypes = async (_req, res) => {
  try {
    const types = await SkuMaster.distinct("product_type");

    res.json({
      success: true,
      data: types.filter(Boolean).sort(),
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// GET /api/sku-master/meta/line-types?group_product=PET
const getLineTypes = async (req, res) => {
  try {
    const filter = {};

    if (req.query.group_product) {
      filter.group_product = req.query.group_product;
    }

    if (req.query.product_type) {
      filter.product_type = req.query.product_type;
    }

    const lineTypes = await SkuMaster.distinct("line_type", filter);

    res.json({
      success: true,
      data: lineTypes.filter(Boolean).sort(),
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// GET /api/sku-master/meta/sizes
const getSizes = async (req, res) => {
  try {
    const filter = {};

    if (req.query.group_product) {
      filter.group_product = req.query.group_product;
    }

    if (req.query.product_type) {
      filter.product_type = req.query.product_type;
    }

    const sizes = await SkuMaster.distinct("size_ml", filter);

    res.json({
      success: true,
      data: sizes.filter(Boolean).sort((a, b) => a - b),
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export {
  getAll,
  getById,
  getPlants,
  getPlantCodes,
  getLines,
  getGroupProducts,
  getProductTypes,
  getLineTypes,
  getSizes,
};
