import { getCategoriesFromDb } from 'helpers.js';

const getCategories = async (req, res, next) => {
  const categories = await getCategoriesFromDb();
  return res.status(200).json({
    resultMassage: '',
    resultCode: '',
    categories,
  });
};

export { getCategories };
