import { getText } from '../../../utils/index.js';
import { getOnlyShopping } from './helpers.js';
import { Types } from 'mongoose';

async function removeProduct(req, res, next) {
  try {
    const id = req.user._id;
    if (!id)
      return res.status(401).json({
        resultMassage: { en: getText('en', '00017') },
        resultCode: '00017',
      });
    const product = req.body;
    const user = await getOnlyShopping(id);
    if (!user) {
      return res.status(401).json({
        resultMassage: { en: getText('en', '00052') },
        resultCode: '00052',
      });
    }
    const index = user.shoppingList.findIndex(
      item =>
        (item = {
          _id: new Types.ObjectId(product.id),
          measure: product.measure,
        })
    );
    if (index === -1) {
      return res.status(404).json({
        resultMassage: { en: getText('en', '00104') },
        resultCode: '00104',
      });
    }
    user.shoppingList.splice(index, 1);
    await user.save();
    return res.status(204).json({
      resultMassage: { en: getText('en', '00105') },
      resultCode: '00105',
      idProduct: product.id,
    });
  } catch (error) {
    return next(error);
  }
}

export default removeProduct;
