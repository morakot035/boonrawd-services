import BudgetProduction from "../models/BudgetProduction.js";

// GET /api/budget-production
// query: plant, line, type, line_category, year, is_forecast
const getAll = async (req, res) => {
  try {
    const { plant, line, type, line_category, year, is_forecast } = req.query;
    const filter = {};

    if (plant) filter.plant = plant;
    if (line) filter.line = line;
    if (type) filter.type = type;
    if (line_category) filter.line_category = line_category;

    // กรองตาม year ใน yearly_data array
    if (year) {
      const yearValue = isNaN(year) ? year : Number(year);
      filter["yearly_data.year"] = yearValue;
    }

    // กรองเฉพาะ forecast หรือ actual
    if (is_forecast !== undefined) {
      filter["yearly_data.is_forecast"] = is_forecast === "true";
    }

    const data = await BudgetProduction.find(filter).sort({
      plant: 1,
      line: 1,
    });
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

// GET /api/budget-production/meta/lines?plant=PTB
const getLines = async (req, res) => {
  try {
    const filter = req.query.plant ? { plant: req.query.plant } : {};
    const lines = await BudgetProduction.distinct("line", filter);
    res.json({ success: true, data: lines.sort() });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET /api/budget-production/meta/types
const getTypes = async (_req, res) => {
  try {
    const types = await BudgetProduction.distinct("type");
    res.json({ success: true, data: types.sort() });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export { getAll, getById, getPlants, getLines, getTypes };
