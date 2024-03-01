import { getRecipesFromDbCategory } from 'helpers.js';

const getRecipesByCategory = async (req, res, next) => {
  try {
    const { page, limit } = req.query;
    const { category } = req.params;
    const response = await getRecipesFromDbCategory({ page, limit, category });
    return res.status(200).json({
      resultMassage: '',
      resultCode: '',
      ...response,
    });
  } catch (error) {
    return next(error);
  }
};

export { getRecipesByCategory };
