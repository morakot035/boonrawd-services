import PalletStandard from "../models/PalletStandard.js";

// GET /api/pallet-standards
const getAll = async (req, res) => {
  try {
    const { plant, line, brand, size_ml, pack_type } = req.query;
    const filter = {};

    if (plant) filter.plant = plant;
    if (line) filter.line = line;
    if (brand) filter.brand = brand;
    if (size_ml) filter.size_ml = Number(size_ml);
    if (pack_type) filter.pack_type = pack_type;

    const data = await PalletStandard.find(filter).sort({
      plant: 1,
      line: 1,
      size_ml: 1,
    });
    res.json({ success: true, count: data.length, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET /api/pallet-standards/:id
const getById = async (req, res) => {
  try {
    const doc = await PalletStandard.findById(req.params.id);
    if (!doc)
      return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, data: doc });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET /api/pallet-standards/meta/plants
const getPlants = async (_req, res) => {
  try {
    const plants = await PalletStandard.distinct("plant");
    res.json({ success: true, data: plants.sort() });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET /api/pallet-standards/meta/lines?plant=CMB
const getLines = async (req, res) => {
  try {
    const filter = req.query.plant ? { plant: req.query.plant } : {};
    const lines = await PalletStandard.distinct("line", filter);
    res.json({ success: true, data: lines.sort() });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export { getAll, getById, getPlants, getLines };
