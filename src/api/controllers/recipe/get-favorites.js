import { getText } from '../../../utils/index.js';
import { getFavoritesRecipes } from './helpers.js';

const getFavorites = async (req, res, next) => {
  try {
    const id = req.user._id;
    const { page, limit } = req.query;
    const response = await getFavoritesRecipes({ userId: id, page, limit });
    return res.status(200).json({
      resultMassage: { en: getText('en', '00094') },
      resultCode: '00094',
      ...response,
    });
  } catch (error) {
    return next(error);
  }
};

export default getFavorites;
