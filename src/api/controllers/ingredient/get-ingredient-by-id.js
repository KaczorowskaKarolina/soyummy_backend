import { getIngredientByIdFromDb } from './helpers.js';

const getIngredientById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const ingredient = await getIngredientByIdFromDb(id);
    return res.status(200).json({
      resultMassage: '',
      resultCode: '',
      ingredient,
    });
  } catch (error) {
    return next(error);
  }
};

export default getIngredientById;
