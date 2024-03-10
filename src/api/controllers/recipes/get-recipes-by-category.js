import { getText } from '../../../utils/index.js';
import { getRecipesFromDbCategory } from '../category/helpers.js';

const getRecipesByCategory = async (req, res, next) => {
  try {
    const { page, limit } = req.query;
    const { category } = req.params;
    const response = await getRecipesFromDbCategory({ page, limit, category });
    return res.status(200).json({
      resultMassage: { en: getText('en', '00094') },
      resultCode: '00094',
      ...response,
    });
  } catch (error) {
    return next(error);
  }
};

export default getRecipesByCategory;
