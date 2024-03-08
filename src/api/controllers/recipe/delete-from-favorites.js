import { getText } from '../../../utils/index.js';
import { deleteFromFavoritesInDb } from './helpers.js';

async function deleteFromFavorites(req, res, next) {
  try {
    const id = req.user._id;
    const { recipeId } = req.params;
    await deleteFromFavoritesInDb({ userId: id, recipeId });
    return res.status(204).json({
      resultMassage: { en: getText('en', '00097') },
      resultCode: '00097',
      recipeId,
    });
  } catch (error) {
    return next(error);
  }
}

export default deleteFromFavorites;
