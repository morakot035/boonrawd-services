import mongoose from "mongoose";

const skuMasterSchema = new mongoose.Schema(
  {
    _id: { type: String },
    plant: { type: String, required: true },
    plant_code: { type: String },
    line: { type: String, required: true },
    line_type: { type: String },
    product_type: { type: String },
    sku_name: { type: String, required: true },
    size_ml: { type: Number },
    speed_bph: { type: Number },
    remark: { type: String, default: null },
    meta: {
      source_file: { type: String },
      created_at: { type: String },
    },
  },
  { _id: false },
);

export default mongoose.model("SkuMaster", skuMasterSchema, "sku_master");
