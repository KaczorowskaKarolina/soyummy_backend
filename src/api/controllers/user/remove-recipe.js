import { getText } from '../../../utils/index.js';
import { getOnlyRecipes } from './helpers.js';
import { deleteRecipeInDb } from './helpers.js';
import { Types } from 'mongoose';

async function removeRecipe(req, res, next) {
  try {
    const id = req.user._id;
    if (!id)
      return res.status(401).json({
        resultMassage: { en: getText('en', '00017') },
        resultCode: '00017',
      });
    const { recipeId } = req.params;
    const user = await getOnlyRecipes(id);
    if (!user) {
      return res.status(401).json({
        resultMassage: { en: getText('en', '00052') },
        resultCode: '00052',
      });
    }
    user.createdRecipes.pull(new Types.ObjectId(recipeId));
    await deleteRecipeInDb(recipeId);
    await user.save();
    return res.status(204).json({
      resultMassage: { en: getText('en', '00107') },
      resultCode: '00107',
      recipeId,
    });
  } catch (error) {
    return next(error);
  }
}

export default removeRecipe;

/**
 * @swagger
 * /user/ownRecipe:
 *    delete:
 *      summary: Remove created recipe.
 *      parameters:
 *        - in: header
 *          name: Authorization
 *          schema:
 *            type: string
 *          description: Put access token here
 *       requestBody:
 *        description: An id of recipe
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                id:
 *                  type: string
 *      tags:
 *        - User
 *        - Recipes
 *      responses:
 *        "200":
 *          description: Successfully removed product.
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
