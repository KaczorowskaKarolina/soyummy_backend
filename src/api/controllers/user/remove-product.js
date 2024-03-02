import { getUserById } from './helpers.js';
import { Types } from 'mongoose';

async function removeProduct(req, res, next) {
  try {
    const id = req.user.id;
    const { idProduct } = req.params;
    const user = await getUserById(id);
    if (!user) {
      return res.status(401).json({ message: 'Nope' });
    }
    const index = user.shoppingList.findIndex(
      item => (item._id = new Types.ObjectId(idProduct))
    );
    if (index === -1) {
      return res.status(404).json({ data: { message: 'Not found' } });
    }
    user.shoppingList.splice(index, 1);
    await user.save();
    return res.status(204).json({ resultMassage: '', resultCode: '' });
  } catch (error) {
    return next(error);
  }
}

export default removeProduct;
