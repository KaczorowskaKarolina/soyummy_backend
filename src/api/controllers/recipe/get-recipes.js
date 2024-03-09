import { getText } from '../../../utils/index.js';
import { getRecipesFromDbQuery } from './helpers.js';

const getRecipesQuery = async (req, res, next) => {
  try {
    const { page, limit, query } = req.query;
    const response = await getRecipesFromDbQuery({ page, limit, query });
    return res.status(200).json({
      resultMassage: { en: getText('en', '00094') },
      resultCode: '00094',
      ...response,
    });
  } catch (error) {
    next(error.message);
  }
};

export default getRecipesQuery;
