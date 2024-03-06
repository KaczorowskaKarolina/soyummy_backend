import { getText } from '../../../utils/index.js';
import { getRecipeByIdFromDb } from './helpers.js';

const getRecipeById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const recipes = await getRecipeByIdFromDb(id);
    return res.status(200).json({
      resultMassage: { en: getText('en', '00094') },
      resultCode: '00094',
      recipes,
    });
  } catch (error) {
    return next(error);
  }
};

export default getRecipeById;
