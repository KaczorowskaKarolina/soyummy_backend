import { getText } from '../../../utils/index.js';
import { addToFavoritesInDb } from './helpers.js';

async function addToFavorites(req, res, next) {
  try {
    const id = req.user.id;
    const { recipeId } = req.params;
    await addToFavoritesInDb({ userId: id, recipeId });
    return res
      .status(204)
      .json({
        resultMassage: { en: getText('en', '00096') },
        resultCode: '00096',
      });
  } catch (error) {
    return next(error);
  }
}

export default addToFavorites;
