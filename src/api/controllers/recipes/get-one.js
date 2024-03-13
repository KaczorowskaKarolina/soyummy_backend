import { getText } from '../../../utils/index.js';
import { getRecipeByIdFromDb } from './helpers.js';

const getRecipeById = async (req, res, next) => {
  try {
    const { recipeId } = req.params;
    const recipes = await getRecipeByIdFromDb(recipeId);
    return res.status(200).json({
      resultMassage: { en: getText('en', '00094') },
      resultCode: '00094',
      recipes,
    });
  } catch (error) {
    return next(error);
  }
};

export default getRecipeById;

/**
 * @swagger
 * /recipes:
 *    get:
 *      summary: Fetch one recipe by id.
 *      parameters:
 *        - in: header
 *          name: Authorization
 *          schema:
 *            type: string
 *          description: Put access token here
 *        - in: query
 *          name: recipeId
 *          schema:
 *            type: string
 *          description: Put recipeId here
 *      tags:
 *        - Recipes
 *      responses:
 *        "200":
 *          description: You sucessfully fetched one recipe.
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
 *                              type: object
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
