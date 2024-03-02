import { getRecipesFromDbQuery } from './helpers.js';

const getRecipesQuery = async (req, res, next) => {
  try {
    const { page, limit, query } = req.query;
    const response = await getRecipesFromDbQuery({ page, limit, query });
    return res.status(200).json({
      resultMassage: '',
      resultCode: '',
      ...response,
    });
  } catch (error) {
    next(error.message);
  }
};

export { getRecipesQuery };
