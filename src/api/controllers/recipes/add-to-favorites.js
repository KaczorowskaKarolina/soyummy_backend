import { getText } from '../../../utils/index.js';
import { addToFavoritesInDb } from './helpers.js';

async function addToFavorites(req, res, next) {
  try {
    const id = req.user._id;
    const { recipeId } = req.params;
    await addToFavoritesInDb({ userId: id, recipeId });
    return res.status(204).json({
      resultMassage: { en: getText('en', '00096') },
      resultCode: '00096',
    });
  } catch (error) {
    return next(error);
  }
}

export default addToFavorites;

/**
 * @swagger
 * /recipes/favorites:
 *    post:
 *      summary: Add recipe to favorites
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
 *          description: Put recipe id
 *      tags:
 *        - Recipes
 *      responses:
 *        "200":
 *          description: You sucessfully added recipe to favorites.
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          resultMessage:
 *                              $ref: '#/components/schemas/ResultMessage'
 *                          resultCode:
 *                              $ref: '#/components/schemas/ResultCode'
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
