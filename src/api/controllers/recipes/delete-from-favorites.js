import { getText } from '../../../utils/index.js';
import { deleteFromFavoritesInDb } from './helpers.js';

async function deleteFromFavorites(req, res, next) {
  try {
    const id = req.user._id;
    const { recipeId } = req.params;
    await deleteFromFavoritesInDb({ userId: id, recipeId });
    return res.status(204).json({
      resultMassage: { en: getText('en', '00097') },
      resultCode: '00097',
      recipeId,
    });
  } catch (error) {
    return next(error);
  }
}

export default deleteFromFavorites;

/**
 * @swagger
 * /recipes/favorites:
 *    delete:
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
 *          description: You sucessfully removed recipe from favorites.
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          resultMessage:
 *                              $ref: '#/components/schemas/ResultMessage'
 *                          resultCode:
 *                              $ref: '#/components/schemas/ResultCode'
 *                          recipeId:
 *                              type: string
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
