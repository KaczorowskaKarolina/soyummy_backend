import { getText } from '../../../utils/index.js';
import { getRecipesFromDbQuery } from './helpers.js';

const getRecipesQuery = async (req, res, next) => {
  try {
    const { page, limit, query } = req.query;
    const response = await getRecipesFromDbQuery({ page, limit, query });
    return res.status(200).json({
      resultMassage: { en: getText('en', '00094') },
      resultCode: '00094',
      ...response,
    });
  } catch (error) {
    next(error.message);
  }
};

export default getRecipesQuery;

/**
 * @swagger
 * /recipes/search:
 *    get:
 *      summary: Fetch recipes with query.
 *      parameters:
 *        - in: header
 *          name: Authorization
 *          schema:
 *            type: string
 *          description: Put access token here
 *        - in: query
 *          name: query
 *          schema:
 *            type: string
 *          description: Put your query here
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
