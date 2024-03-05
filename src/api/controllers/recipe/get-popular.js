import { getText } from '../../../utils/index.js';
import { getPopularRecipesFromDb } from './helpers.js';

const getPopularRecipes = async (req, res, next) => {
  try {
    const { page, limit } = req.query;
    const response = await getPopularRecipesFromDb({ page, limit });
    return res.status(200).json({
      resultMassage: { en: getText('en', '00094') },
      resultCode: '00094',
      ...response,
    });
  } catch (error) {
    return next(error);
  }
};

export default getPopularRecipes;
