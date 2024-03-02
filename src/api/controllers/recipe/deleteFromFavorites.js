import { deleteFromFavoritesInDb } from './helpers.js';

async function deleteFromFavorites(req, res, next) {
  try {
    const id = req.user.id;
    const { recipeId } = req.params;
    await deleteFromFavoritesInDb({ userId: id, recipeId });
    return res.status(204).json({
      resultMassage: '',
      resultCode: '',
    });
  } catch (error) {
    return next(error);
  }
}

export { deleteFromFavorites };
