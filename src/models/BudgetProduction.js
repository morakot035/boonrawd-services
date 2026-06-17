import mongoose from "mongoose";

const yearlyDataSchema = new mongoose.Schema(
  {
    year: { type: Number, required: true },
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
    level: {
      type: String,
      required: true,
      enum: ["plant", "line_category", "line", "product"],
    },
    plant: { type: String, required: true },
    line_category: { type: String, default: null },
    line: { type: String, default: null },
    product: { type: String, default: null },
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
