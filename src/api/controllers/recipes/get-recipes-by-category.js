import { getText } from '../../../utils/index.js';
import { getRecipesFromDbCategory } from './helpers.js';

const getRecipesByCategory = async (req, res, next) => {
  try {
    const { page, limit } = req.query;
    const { category } = req.params;
    const response = await getRecipesFromDbCategory({ page, limit, category });
    return res.status(200).json({
      resultMassage: { en: getText('en', '00094') },
      resultCode: '00094',
      ...response,
    });
  } catch (error) {
    return next(error);
  }
};

export default getRecipesByCategory;

/**
 * @swagger
 * /recipes/category:
 *    get:
 *      summary: Fetch recipes by category.
 *      parameters:
 *        - in: header
 *          name: Authorization
 *          schema:
 *            type: string
 *          description: Put access token here
 *        - in: query
 *          name: category
 *          schema:
 *            type: string
 *          description: Put category here
 *      tags:
 *        - Recipes
 *        - Categories
 *      responses:
 *        "200":
 *          description: You sucessfully fetched recipes.
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          resultMessage:
 *                              $ref: '#/components/schemas/ResultMessage'
 *                          resultCode:
 *                              $ref: '#/components/schemas/ResultCode'
 *                          recipes:
 *                              type: array
 *        "401":
 *          description: Invalid token.
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Result'
 *        "500":
 *          description: An internal server error occurred, please try again.
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Result'
 */
