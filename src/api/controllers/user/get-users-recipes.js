import { getText } from '../../../utils/index.js';
import { getUserById } from './helpers.js';

async function getUsersRecipes(req, res, next) {
  try {
    const id = req.user._id;
    if (!id)
      return res.status(401).json({
        resultMassage: { en: getText('en', '00017') },
        resultCode: '00017',
      });
    const { createdRecipes } = await getUserById(id);
    if (!createdRecipes) {
      return res.status(404).json({
        resultMassage: { en: getText('en', '00103') },
        resultCode: '00103',
      });
    }
    return res.status(200).json({
      resultMassage: { en: getText('en', '00094') },
      resultCode: '00094',
      createdRecipes,
    });
  } catch (error) {
    return next(error);
  }
}

export default getUsersRecipes;
