import { getRecipesFromDbIngredient } from './helpers.js';

const getRecipesByIngredient = async (req, res, next) => {
  try {
    const { page, limit } = req.query;
    const { ingredientId } = req.params;
    const response = await getRecipesFromDbIngredient({
      page,
      limit,
      ingredientId,
    });
    return res.status(200).json({
      resultMassage: '',
      resultCode: '',
      ...response,
    });
  } catch (error) {
    return next(error);
  }
};

export default getRecipesByIngredient;
