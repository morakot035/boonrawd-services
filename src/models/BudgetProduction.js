import mongoose from "mongoose";

const yearlyDataSchema = new mongoose.Schema(
  {
    year: { type: mongoose.Schema.Types.Mixed }, // number หรือ "2026_forecast"
    is_forecast: { type: Boolean, default: false },
    production_ml: { type: Number, default: null },
    capacity_ml: { type: Number, default: null },
    utilization_pct: { type: Number, default: null },
  },
  { _id: false },
);

const budgetProductionSchema = new mongoose.Schema(
  {
    _id: { type: String },
    plant: { type: String, required: true },
    line: { type: String, required: true },
    product: { type: String },
    type: { type: String },
    line_category: { type: String },
    yearly_data: [yearlyDataSchema],
    meta: {
      source_file: { type: String },
      sheet: { type: String },
      created_at: { type: String },
    },
  },
  { _id: false },
);

export default mongoose.model(
  "BudgetProduction",
  budgetProductionSchema,
  "budget_production",
);
