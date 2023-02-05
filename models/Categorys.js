const { Schema, model } = require("mongoose");
const schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    unique: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = model("Categorys", schema);
