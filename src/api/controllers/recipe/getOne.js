import { getRecipeByIdFromDb } from './helpers.js';

const getRecipeById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const recipe = await getRecipeByIdFromDb(id);
    return res.status(200).json({
      resultMassage: '',
      resultCode: '',
      recipe,
    });
  } catch (error) {
    return next(error);
  }
};

export { getRecipeById };
