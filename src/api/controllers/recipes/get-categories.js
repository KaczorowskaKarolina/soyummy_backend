import { getText } from '../../../utils/index.js';
import { getCategoriesFromDb } from './helpers.js';

const getCategories = async (req, res, next) => {
  const categories = await getCategoriesFromDb();
  return res.status(200).json({
    resultMassage: { en: getText('en', '00093') },
    resultCode: '00093',
    categories,
  });
};

export default getCategories;
