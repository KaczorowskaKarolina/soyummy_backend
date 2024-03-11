import { getText } from '../../../utils/index.js';
import { getIngredientByIdFromDb } from './helpers.js';

const getIngredientById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const ingredients = await getIngredientByIdFromDb(id);
    return res.status(200).json({
      resultMassage: { en: getText('en', '00095') },
      resultCode: '00095',
      ingredients,
    });
  } catch (error) {
    return next(error);
  }
};

export default getIngredientById;
