import mongoose, { Schema } from 'mongoose';

const recipeSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    area: {
      type: String,
    },
    instructions: {
      type: String,
      required: true,
    },
    preview: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    youtube: {
      type: String,
    },
    tags: {
      type: Array,
    },
    favorites: {
      type: Array,
    },
    ingredients: {
      type: Array,
      required: true,
    },
    thumb: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

const Recipe = mongoose.model('recipe', recipeSchema);

export default Recipe;
