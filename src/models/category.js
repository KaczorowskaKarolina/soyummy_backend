import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const categorySchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
    },
    thumb: {
      type: String,
      required: [true, 'Image is required'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
  },
  { versionKey: false, timestamps: false }
);

const Category = model('category', categorySchema, 'categories');

export default Category;
