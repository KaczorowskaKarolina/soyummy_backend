import { Types } from 'mongoose';
import { Recipe } from '../../../models/index.js';
import { Ingredient } from '../../../models/index.js';

const getAllIngredientsFromDb = async () => {
  return await Ingredient.find({});
};

const getIngredientByIdFromDb = async id => {
  return await Ingredient.findById(id);
};

const getRecipesFromDbIngredient = async ({
  page = 0,
  limit = 8,
  ingredientId = '',
}) => {
  const recipes = await Recipe.find({
    'ingredients.id': new Types.ObjectId(ingredientId),
  })
    .skip(page * limit)
    .limit(limit);
  const docNumbers = await Recipe.find({
    'ingredients.id': new Types.ObjectId(ingredientId),
  }).countDocuments();
  return { recipes, pageAmount: Math.ceil(docNumbers / limit) };
};

export {
  getAllIngredientsFromDb,
  getIngredientByIdFromDb,
  getRecipesFromDbIngredient,
};
