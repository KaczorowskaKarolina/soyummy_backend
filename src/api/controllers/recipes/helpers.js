import { Recipe, Category, Ingredient } from '../../../models/index.js';
import { Types } from 'mongoose';

const getRecipeByIdFromDb = async recipeId => {
  return await Recipe.findById(recipeId);
};

const getRecipesFromDbQuery = async ({ page = 0, limit = 6, query = '' }) => {
  const recipes = await Recipe.find({
    title: { $regex: `.*${query}.*`, $options: 'i' },
  })
    .skip(page * limit)
    .limit(limit);
  const docNumbers = await Recipe.find({
    title: { $regex: `.*${query}.*`, $options: 'i' },
  }).countDocuments();
  return { recipes, pageAmount: Math.ceil(docNumbers / limit) };
};

const getFavoritesRecipes = async ({ userId, page = 0, limit = 4 }) => {
  console.log(userId);
  const recipes = await Recipe.find({
    favorites: new Types.ObjectId(userId),
  })
    .skip(page * limit)
    .limit(limit);
  const docNumbers = await Recipe.find({
    favorites: new Types.ObjectId(userId),
  }).countDocuments();
  return { recipes, pageAmount: Math.ceil(docNumbers / limit) };
};

const getPopularRecipesFromDb = async ({ page = 0, limit = 5 }) => {
  const recipes = await Recipe.find({})
    .sort({ favorites: 1 })
    .skip(page * limit)
    .limit(limit);
  const docNumbers = await Recipe.find({}).countDocuments();
  return { recipes, pageAmount: Math.ceil(docNumbers / limit) };
};

const addToFavoritesInDb = async ({ userId, recipeId }) => {
  const recipe = await Recipe.findById(recipeId);
  recipe.favorites.push(new Types.ObjectId(userId));
  await recipe.save();
  return;
};

const deleteFromFavoritesInDb = async ({ userId, recipeId }) => {
  const recipe = await Recipe.findById(recipeId);
  recipe.favorites.pull(new Types.ObjectId(userId));
  await recipe.save();
  return;
};

const getRecipesFromDbCategory = async ({
  page = 0,
  limit = 8,
  category = '',
}) => {
  const recipes = await Recipe.find({
    category: { $regex: `.*${category}.*`, $options: 'i' },
  })
    .skip(page * limit)
    .limit(limit);
  const docNumbers = await Recipe.find({
    category: { $regex: `.*${category}.*`, $options: 'i' },
  }).countDocuments();
  return { recipes, pageAmount: Math.ceil(docNumbers / limit) };
};

const getCategoriesFromDb = async () => {
  return await Category.find({}).sort({ title: 1 });
};

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
  getRecipeByIdFromDb,
  getRecipesFromDbQuery,
  getFavoritesRecipes,
  getPopularRecipesFromDb,
  addToFavoritesInDb,
  deleteFromFavoritesInDb,
  getRecipesFromDbCategory,
  getCategoriesFromDb,
  getAllIngredientsFromDb,
  getIngredientByIdFromDb,
  getRecipesFromDbIngredient,
};
