import Recipe from '../../../models/recipe.js';
import Category from '../../../models/category.js';

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

export { getCategoriesFromDb, getRecipesFromDbCategory };
