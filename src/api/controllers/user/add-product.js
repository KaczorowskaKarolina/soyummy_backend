import { getText } from '../../../utils/index.js';
import { getUserById } from './helpers.js';
import { Types } from 'mongoose';

async function addProduct(req, res, next) {
  try {
    const id = req.user.id;
    if (!id)
      return res.status(401).json({
        resultMassage: { en: getText('en', '00017') },
        resultCode: '00017',
      });
    const product = req.body;
    const user = await getUserById(id);
    if (!user) {
      return res
        .status(401)
        .json({
          resultMassage: { en: getText('en', '00052') },
          resultCode: '00052',
        });
    }
    user.shoppingList.push({
      _id: new Types.ObjectId(product.id),
      measure: product.measure,
    });
    await user.save();
    return res.status(204).json({
      resultMassage: { en: getText('en', '00098') },
      resultCode: '00098',
    });
  } catch (error) {
    return next(error);
  }
}

export default addProduct;
