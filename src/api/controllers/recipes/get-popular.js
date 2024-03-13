import { getText } from '../../../utils/index.js';
import { getPopularRecipesFromDb } from './helpers.js';

const getPopularRecipes = async (req, res, next) => {
  try {
    const { page, limit } = req.query;
    const response = await getPopularRecipesFromDb({ page, limit });
    return res.status(200).json({
      resultMassage: { en: getText('en', '00094') },
      resultCode: '00094',
      ...response,
    });
  } catch (error) {
    return next(error);
  }
};

export default getPopularRecipes;

/**
 * @swagger
 * /recipes/popular-recipe:
 *    get:
 *      summary: Fetch popular recipes.
 *      parameters:
 *        - in: header
 *          name: Authorization
 *          schema:
 *            type: string
 *          description: Put access token here
 *      tags:
 *        - Recipes
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
