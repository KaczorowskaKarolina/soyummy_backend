import { addToFavoritesInDb } from './helpers.js';

async function addToFavorites(req, res, next) {
  try {
    const id = req.user.id;
    const { recipeId } = req.params;
    await addToFavoritesInDb({ userId: id, recipeId });
    return res.status(204).json({ resultMassage: '', resultCode: '' });
  } catch (error) {
    return next(error);
  }
}

export default addToFavorites;
