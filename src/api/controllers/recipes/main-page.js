import { getText } from '../../../utils/index.js';
import { getRecipesFromDbCategory } from './helpers.js';

const getRecipesMainPage = async (req, res, next) => {
  try {
    const categories = ['Breakfast', 'Miscellaneous', 'Chicken', 'Dessert'];
    const responseArray = [];
    for (const category of categories) {
      const response = await getRecipesFromDbCategory({ limit: 4, category });
      responseArray.push({ category, recipes: response });
    }
    return res.status(200).json({
      resultMassage: { en: getText('en', '00094') },
      resultCode: '00094',
      recipes: responseArray,
    });
  } catch (error) {
    return next(error);
  }
};

export default getRecipesMainPage;
