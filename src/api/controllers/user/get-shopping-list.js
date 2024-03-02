import { getUserById } from './helpers.js';

async function getShoppingList(req, res, next) {
  try {
    const id = req.user.id;
    const { shoppingList } = await getUserById(id);
    if (!shoppingList) {
      return res.status(401).json({ message: 'No recipes' });
    }
    return res.status(200).json({
      resultMassage: '',
      resultCode: '',
      shoppingList,
    });
  } catch (error) {
    return next(error);
  }
}

export default getShoppingList;
