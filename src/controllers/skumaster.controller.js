import SkuMaster from "../models/SkuMaster.js";

// GET /api/sku-master
const getAll = async (req, res) => {
  try {
    const { plant, line, product_type, line_type, size_ml } = req.query;
    const filter = {};

    if (plant) filter.plant = plant;
    if (line) filter.line = line;
    if (product_type) filter.product_type = product_type;
    if (line_type) filter.line_type = line_type;
    if (size_ml) filter.size_ml = Number(size_ml);

    const data = await SkuMaster.find(filter).sort({
      plant: 1,
      line: 1,
      sku_name: 1,
    });
    res.json({ success: true, count: data.length, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET /api/sku-master/:id
const getById = async (req, res) => {
  try {
    const doc = await SkuMaster.findById(req.params.id);
    if (!doc)
      return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, data: doc });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET /api/sku-master/meta/plants
const getPlants = async (_req, res) => {
  try {
    const plants = await SkuMaster.distinct("plant");
    res.json({ success: true, data: plants.sort() });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET /api/sku-master/meta/lines?plant=BAB
const getLines = async (req, res) => {
  try {
    const filter = req.query.plant ? { plant: req.query.plant } : {};
    const lines = await SkuMaster.distinct("line", filter);
    res.json({ success: true, data: lines.sort() });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET /api/sku-master/meta/product-types
const getProductTypes = async (_req, res) => {
  try {
    const types = await SkuMaster.distinct("product_type");
    res.json({ success: true, data: types.sort() });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export { getAll, getById, getPlants, getLines, getProductTypes };
