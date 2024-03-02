import { getAllIngredientsFromDb } from './helpers.js';

const getAllIngredients = async (req, res, next) => {
  try {
    const ingredients = await getAllIngredientsFromDb();
    return res.status(200).json({
      resultMassage: '',
      resultCode: '',
      ingredients,
    });
  } catch (error) {
    return next(error);
  }
};

export default getAllIngredients;
