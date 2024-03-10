import { User } from '../../../models/index.js';
import { errorHelper, getText } from '../../../utils/index.js';

export default async (req, res, next) => {
  try {
    const id = req.user._id;
    const user = await User.findById(id);
    if (!user) {
      return res.status(500).json(errorHelper('00088', req, err.message));
    }
    if (!user.newsletter) {
      return res.status(400).json({
        resultMassage: { en: getText('en', '00112') },
        resultCode: '00112',
      });
    }
    user.newsletter = false;
    await user.save();
    return res.status(200).json({
      resultMassage: { en: getText('en', '00111') },
      resultCode: '00111',
    });
  } catch (error) {
    return next(error);
  }
};
