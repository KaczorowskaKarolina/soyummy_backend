import { getText } from '../../../utils/index.js';
import { getCategoriesFromDb } from './helpers.js';

const getCategories = async (req, res, next) => {
  const categories = await getCategoriesFromDb();
  return res.status(200).json({
    resultMassage: { en: getText('en', '00093') },
    resultCode: '00093',
    categories,
  });
};

export default getCategories;

/**
 * @swagger
 * /recipes/category-list:
 *    get:
 *      summary: Fetch category list.
 *      parameters:
 *        - in: header
 *          name: Authorization
 *          schema:
 *            type: string
 *          description: Put access token here
 *      tags:
 *        - Categories
 *      responses:
 *        "200":
 *          description: You sucessfully fetchedcategories.
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          resultMessage:
 *                              $ref: '#/components/schemas/ResultMessage'
 *                          resultCode:
 *                              $ref: '#/components/schemas/ResultCode'
 *                          categories:
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
