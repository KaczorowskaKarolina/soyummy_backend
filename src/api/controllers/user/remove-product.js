import { getText } from '../../../utils/index.js';
import { getUserById } from './helpers.js';
import { Types } from 'mongoose';

async function removeProduct(req, res, next) {
  try {
    const id = req.user.id;
    if (!id)
      return res.status(401).json({
        resultMassage: { en: getText('en', '00017') },
        resultCode: '00017',
      });
    const { idProduct } = req.params;
    const user = await getUserById(id);
    if (!user) {
      return res.status(401).json({
        resultMassage: { en: getText('en', '00052') },
        resultCode: '00052',
      });
    }
    const index = user.shoppingList.findIndex(
      item => (item._id = new Types.ObjectId(idProduct))
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
    });
  } catch (error) {
    return next(error);
  }
}

export default removeProduct;
