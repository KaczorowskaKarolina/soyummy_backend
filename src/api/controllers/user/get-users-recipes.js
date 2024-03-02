import { getUserById } from './helpers.js';

async function getUsersRecipes(req, res, next) {
  try {
    const id = req.user.id;
    const { createdRecipes } = await getUserById(id);
    if (!createdRecipes) {
      return res.status(401).json({ message: 'No recipes' });
    }
    return res.status(200).json({
      resultMassage: '',
      resultCode: '',
      createdRecipes,
    });
  } catch (error) {
    return next(error);
  }
}

export default getUsersRecipes;
