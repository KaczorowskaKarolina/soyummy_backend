import { User } from '../../../models/index.js';
import { Recipe } from '../../../models/index.js';

const createRecipeToDb = async ({ recipe }) => {
  for (const item of recipe.ingredients) {
    const ingredientId = new Types.ObjectId(item.id);
    item.id = ingredientId;
  }
  const response = await new Recipe({ ...recipe });
  return response;
};

const deleteRecipeInDb = async id => {
  const response = await Recipe.findByIdAndDelete(id);
  return response;
};

async function getUserById(id) {
  const user = await User.findById(id);
  return user;
}

export { getUserById, createRecipeToDb, deleteRecipeInDb };
