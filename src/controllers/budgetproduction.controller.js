import BudgetProduction from "../models/BudgetProduction.js";

// GET /api/budget-production
// query: plant, line, line_category, level, year, is_forecast
const getAll = async (req, res) => {
  try {
    const { plant, line, line_category, level, year, is_forecast } = req.query;
    const filter = {};

    if (plant) filter.plant = plant;
    if (line) filter.line = line;
    if (line_category) filter.line_category = line_category;
    if (level) filter.level = level;

    if (year) {
      filter["yearly_data.year"] = Number(year);
    }

    if (is_forecast !== undefined) {
      filter["yearly_data.is_forecast"] = is_forecast === "true";
    }

    const data = await BudgetProduction.find(filter).sort({ plant: 1, line: 1 });
    res.json({ success: true, count: data.length, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET /api/budget-production/:id
const getById = async (req, res) => {
  try {
    const doc = await BudgetProduction.findById(req.params.id);
    if (!doc)
      return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, data: doc });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET /api/budget-production/meta/plants
const getPlants = async (_req, res) => {
  try {
    const plants = await BudgetProduction.distinct("plant");
    res.json({ success: true, data: plants.sort() });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET /api/budget-production/meta/lines?plant=PTB&line_category=Brew
const getLines = async (req, res) => {
  try {
    const filter = { level: "line" };
    if (req.query.plant) filter.plant = req.query.plant;
    if (req.query.line_category) filter.line_category = req.query.line_category;
    const lines = await BudgetProduction.distinct("line", filter);
    res.json({ success: true, data: lines.sort() });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET /api/budget-production/meta/line-categories?plant=PTB
const getLineCategories = async (req, res) => {
  try {
    const filter = { level: "line_category" };
    if (req.query.plant) filter.plant = req.query.plant;
    const categories = await BudgetProduction.distinct("line_category", filter);
    res.json({ success: true, data: categories.filter(Boolean).sort() });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET /api/budget-production/meta/products?plant=PTB&line=Line+1
const getProducts = async (req, res) => {
  try {
    const filter = { level: "product" };
    if (req.query.plant) filter.plant = req.query.plant;
    if (req.query.line) filter.line = req.query.line;
    if (req.query.line_category) filter.line_category = req.query.line_category;
    const products = await BudgetProduction.distinct("product", filter);
    res.json({ success: true, data: products.filter(Boolean).sort() });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export { getAll, getById, getPlants, getLines, getLineCategories, getProducts };
