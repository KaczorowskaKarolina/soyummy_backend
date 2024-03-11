import { getText } from '../../../utils/index.js';
import { getOnlyRecipes } from './helpers.js';
import { getRecipeByIdFromDb } from '../recipes/helpers.js';

async function getUsersRecipes(req, res, next) {
  try {
    const id = req.user._id;
    if (!id)
      return res.status(401).json({
        resultMassage: { en: getText('en', '00017') },
        resultCode: '00017',
      });
    const user = await getOnlyRecipes(id);
    if (!user) {
      return res.status(404).json({
        resultMassage: { en: getText('en', '00103') },
        resultCode: '00103',
      });
    }
    const recipes = [];
    for (const recipeId of user.createdRecipes) {
      const recipe = await getRecipeByIdFromDb(recipeId);
      recipes.push(recipe);
    }
    return res.status(200).json({
      resultMassage: { en: getText('en', '00094') },
      resultCode: '00094',
      recipes,
    });
  } catch (error) {
    return next(error);
  }
}

export default getUsersRecipes;
