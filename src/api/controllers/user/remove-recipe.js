import { getUserById } from './helpers.js';
import { deleteRecipeInDb } from './helpers.js';
import { Types } from 'mongoose';

async function removeRecipe(req, res, next) {
  try {
    const id = req.user.id;
    const { recipeId } = req.params;
    const user = await getUserById(id);
    if (!user) {
      return res.status(401).json({ message: 'Nope' });
    }
    const index = user.createdRecipes.findIndex(
      item => (item._id = new Types.ObjectId(recipeId))
    );
    if (index === -1) {
      return res.status(404).json({ data: { message: 'Not found' } });
    }
    user.createdRecipes.splice(index, 1);
    await deleteRecipeInDb(recipeId);
    await user.save();
    return res
      .status(204)
      .json({ resultMassage: '', resultCode: '', ...response });
  } catch (error) {
    return next(error);
  }
}

export default removeRecipe;
