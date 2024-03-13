import { getText } from '../../../utils/index.js';
import { getRecipesFromDbIngredient } from './helpers.js';

const getRecipesByIngredient = async (req, res, next) => {
  try {
    const { page, limit } = req.query;
    const { ingredientId } = req.params;
    const response = await getRecipesFromDbIngredient({
      page,
      limit,
      ingredientId,
    });
    return res.status(200).json({
      resultMassage: { en: getText('en', '00094') },
      resultCode: '00094',
      ...response,
    });
  } catch (error) {
    return next(error);
  }
};

export default getRecipesByIngredient;

/**
 * @swagger
 * /recipes/ingredients:
 *    get:
 *      summary: Fetch favorites recipes.
 *      parameters:
 *        - in: header
 *          name: Authorization
 *          schema:
 *            type: string
 *          description: Put access token here
 *        - in: query
 *          name: ingredientId
 *          schema:
 *            type: string
 *          description: Put ingredient id here
 *      tags:
 *        - Recipes
 *        - Ingredients
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
