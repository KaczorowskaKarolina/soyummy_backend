import { getText } from '../../../utils/index.js';
import { getOnlyRecipes } from './helpers.js';
import { createRecipeToDb } from './helpers.js';
import { imageApiKey } from '../../../config/index.js';
import fs from 'fs/promises';
import { tmpDir } from '../../middlewares/index.js';
import imgbbUploader from 'imgbb-uploader';
import { Types } from 'mongoose';

async function addRecipe(req, res, next) {
  try {
    const id = req.user._id;
    if (!id)
      return res.status(401).json({
        resultMassage: { en: getText('en', '00017') },
        resultCode: '00017',
      });
    const recipe = JSON.parse(req.body.recipe);
    const user = await getOnlyRecipes(id);
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

    const fileName = req.file.originalname;

    const image = await imgbbUploader(
      imageApiKey,
      `${tmpDir}${fileName}`
    ).catch(error =>
      res.status(400).json({
        resultMassage: 'Something went wrong',
        resultCode: '00000',
        error: error.message,
      })
    );

    if (image) {
      newRecipe.thumb = image.url;
      newRecipe.preview = image.display_url;
    }

    await newRecipe.save();
    user.createdRecipes.push(new Types.ObjectId(newRecipe.id));
    await user.save();
    return res.status(200).json({
      resultMassage: { en: getText('en', '00100') },
      resultCode: '00100',
      recipes: newRecipe,
    });
  } catch (error) {
    return next(error);
  } finally {
    fs.unlink(`${req.file.path}`);
  }
}

export default addRecipe;
