import { getText } from '../../../utils/index.js';
import { getOnlyRecipes } from './helpers.js';
import { deleteRecipeInDb } from './helpers.js';
import { Types } from 'mongoose';

async function removeRecipe(req, res, next) {
  try {
    const id = req.user._id;
    if (!id)
      return res.status(401).json({
        resultMassage: { en: getText('en', '00017') },
        resultCode: '00017',
      });
    const { recipeId } = req.params;
    const user = await getOnlyRecipes(id);
    if (!user) {
      return res.status(401).json({
        resultMassage: { en: getText('en', '00052') },
        resultCode: '00052',
      });
    }
    user.createdRecipes.pull(new Types.ObjectId(recipeId));
    await deleteRecipeInDb(recipeId);
    await user.save();
    return res.status(204).json({
      resultMassage: { en: getText('en', '00107') },
      resultCode: '00107',
      recipeId,
    });
  } catch (error) {
    return next(error);
  }
}

export default removeRecipe;
