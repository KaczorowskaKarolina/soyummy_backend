import { getPopularRecipesFromDb } from './helpers.js';

const getPopularRecipes = async (req, res, next) => {
  try {
    const { page, limit } = req.query;
    const response = await getPopularRecipesFromDb({ page, limit });
    return res.status(200).json({
      resultMassage: '',
      resultCode: '',
      ...response,
    });
  } catch (error) {
    return next(error);
  }
};

export { getPopularRecipes };
