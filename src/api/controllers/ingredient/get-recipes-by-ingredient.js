import { getText } from '../../../utils/index.js';
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
      resultMassage: { en: getText('en', '00094') },
      resultCode: '00094',
      ...response,
    });
  } catch (error) {
    return next(error);
  }
};

export default getRecipesByIngredient;
