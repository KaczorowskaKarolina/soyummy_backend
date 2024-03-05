import { getText } from '../../../utils/index.js';
import { getUserById } from './helpers.js';

async function getShoppingList(req, res, next) {
  try {
    const id = req.user.id;
    if (!id)
      return res.status(401).json({
        resultMassage: { en: getText('en', '00017') },
        resultCode: '00017',
      });
    const { shoppingList } = await getUserById(id);
    if (!shoppingList) {
      return res.status(404).json({
        resultMassage: { en: getText('en', '00102') },
        resultCode: '00102',
      });
    }
    return res.status(200).json({
      resultMassage: { en: getText('en', '00101') },
      resultCode: '00101',
      shoppingList,
    });
  } catch (error) {
    return next(error);
  }
}

export default getShoppingList;
