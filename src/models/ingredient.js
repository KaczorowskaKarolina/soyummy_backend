import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const ingredientSchema = new Schema(
  {
    _id: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    ttl: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    t: {
      type: String,
      required: false,
    },
    thb: {
      type: String,
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

const Ingredient = model('ingredient', ingredientSchema);

export default Ingredient;
