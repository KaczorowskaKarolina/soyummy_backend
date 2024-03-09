import { getText } from '../../../utils/index.js';
import { getAllIngredientsFromDb } from './helpers.js';

const getAllIngredients = async (req, res, next) => {
  try {
    const ingredients = await getAllIngredientsFromDb();
    return res.status(200).json({
      resultMassage: { en: getText('en', '00095') },
      resultCode: '00095',
      ingredients,
    });
  } catch (error) {
    return next(error);
  }
};

export default getAllIngredients;
