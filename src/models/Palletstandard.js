import mongoose from "mongoose";

const palletStandardSchema = new mongoose.Schema(
  {
    _id: { type: String },
    plant: { type: String, required: true },
    line: { type: String, required: true },
    brand: { type: String, required: true },
    sku_name: { type: String, required: true },
    size_ml: { type: Number },
    pack_type: { type: String, default: null },
    production: {
      hr_per_day_std: { type: Number },
      speed_bph: { type: Number },
    },
    pallet_config: {
      bottle_per_pack: { type: Number },
      pack_per_layer: { type: Number },
      layer_per_pallet: { type: Number },
      bottles_per_pallet: { type: Number },
    },
    throughput: {
      pallet_per_hour: { type: Number },
      pallet_per_hour_roundup: { type: Number },
      pallet_per_day_std: { type: Number },
    },
    meta: {
      source_file: { type: String },
      created_at: { type: String },
    },
  },
  { _id: false },
);

export default mongoose.model(
  "PalletStandard",
  palletStandardSchema,
  "pallet_standards",
);
