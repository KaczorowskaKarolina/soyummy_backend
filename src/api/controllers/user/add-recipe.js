import { getUserById } from './helpers.js';
import { createRecipeToDb } from './helpers.js';
import Jimp from 'jimp';
import { nanoid } from 'nanoid';

async function addRecipe(req, res, next) {
  try {
    const id = req.user.id;
    const recipe = JSON.parse(req.body.recipe);
    const user = await getUserById(id);
    if (!user) {
      return res.status(401).json({ message: 'Nope' });
    }
    if (!recipe) {
      return res.status(401).json({ message: 'Nope' });
    }
    const newRecipe = await createRecipeToDb({ recipe });
    if (!newRecipe) {
      return next({ message: 'Error' });
    }

    const fileName = req.file.originalname;
    const thumb = await Jimp.read(`src/server/tmp/${fileName}`);
    const randomName = nanoid();
    await thumb.writeAsync(`src/server/public/images/${randomName}${fileName}`);
    const preview = thumb.cover(250, 250);
    await preview.writeAsync(
      `src/server/public/images/${randomName}${fileName}_preview`
    );
    newRecipe.thumb = `http://localhost:5000/images/${randomName}${fileName}`;
    newRecipe.preview = `http://localhost:5000/images/${randomName}${fileName}_preview`;
    await newRecipe.save();
    user.createdRecipes.push(newRecipe);
    await user.save();
    return res
      .status(200)
      .json({ resultMassage: '', resultCode: '', newRecipe });
  } catch (error) {
    return next(error);
  }
}

export default addRecipe;
