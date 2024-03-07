import { getText } from '../../../utils/index.js';
import { getUserById } from './helpers.js';
import { createRecipeToDb } from './helpers.js';
import { imageApiKey } from '../../../config/index.js';
// import Jimp from 'jimp';
// import { nanoid } from 'nanoid';
import fs from 'fs/promises';

async function addRecipe(req, res, next) {
  try {
    const id = req.user._id;
    if (!id)
      return res.status(401).json({
        resultMassage: { en: getText('en', '00017') },
        resultCode: '00017',
      });
    const recipe = JSON.parse(req.body.recipe);
    const user = await getUserById(id);
    if (!user) {
      return res.status(401).json({
        resultMassage: { en: getText('en', '00052') },
        resultCode: '00052',
      });
    }
    if (!recipe) {
      return res.status(401).json({
        resultMassage: { en: getText('en', '00099') },
        resultCode: '00099',
      });
    }
    const newRecipe = await createRecipeToDb({ recipe });
    if (!newRecipe) {
      return next({
        resultMassage: { en: getText('en', '00108') },
        resultCode: '00108',
      });
    }

    // const fileName = req.file.originalname;
    // const thumb = await Jimp.read(`src/server/tmp/${fileName}`);
    // const randomName = nanoid();
    // await thumb.writeAsync(`src/server/public/images/${randomName}${fileName}`);
    // const preview = thumb.cover(250, 250);
    // await preview.writeAsync(
    //   `src/server/public/images/${randomName}${fileName}_preview`
    // );
    console.log(req.file);
    const form = new FormData();
    const reader = fs.readFile(req.file, 'base64url');
    form.append('image', reader);

    const image = await fetch(
      `https://api.imgbb.com/1/upload/?key=${imageApiKey}`,
      { method: 'POST', body: form }
    );

    if (image) {
      newRecipe.thumb = image.url;
      newRecipe.preview = image.display_url;
    } else {
      newRecipe.thumb = '';
      newRecipe.preview = '';
    }

    await newRecipe.save();
    user.createdRecipes.push(newRecipe);
    await user.save();
    return res.status(200).json({
      resultMassage: { en: getText('en', '00100') },
      resultCode: '00100',
      recipes: newRecipe,
    });
  } catch (error) {
    return next(error);
  }
}

export default addRecipe;
