import { Recipe } from '../../../models';
import { Category } from '../../../models';

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
