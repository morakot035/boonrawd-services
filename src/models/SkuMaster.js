import mongoose from "mongoose";

const skuMasterSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
    },

    // Plant
    plant: {
      type: String,
      required: true,
      index: true,
    },

    plant_code: {
      type: String,
      index: true,
    },

    // Line
    line: {
      type: String,
      required: true,
      index: true,
    },

    line_type: {
      type: String,
      default: null,
    },

    // Product Group
    group_product: {
      type: String,
      enum: ["PET", "S&W", "Beer Bottle", "Beer Can", "Beer KEG"],
      default: null,
      index: true,
    },

    product_type: {
      type: String,
      default: null,
      index: true,
    },

    // SKU
    sku_name: {
      type: String,
      required: true,
      index: true,
    },

    // Size
    size_litre: {
      type: Number,
      default: null,
    },

    size_ml: {
      type: Number,
      default: null,
    },

    // Capacity
    speed_bph: {
      type: Number,
      default: null,
    },

    remark: {
      type: String,
      default: null,
    },

    meta: {
      source_file: {
        type: String,
      },

      created_at: {
        type: String,
      },

      updated_at: {
        type: String,
      },
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Compound Index
skuMasterSchema.index({
  plant_code: 1,
  line: 1,
  sku_name: 1,
});

export default mongoose.model(
  "SkuMaster",
  skuMasterSchema,
  "sku_master"
);
