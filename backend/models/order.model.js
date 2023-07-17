const mongoose = require("mongoose");
const Schema = mongoose.Schema;
OrderSchema = new Schema(
  {
    date: { type: Date, required: true },
    vendorName: { type: String, required: true },
    modelNumber: { type: String },
    unitPrice: { type: Number },
    quantity: { type: Number },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

module.exports = mongoose.model("order", OrderSchema);
