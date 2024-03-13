import { getText } from '../../../utils/index.js';
import { getOnlyShopping } from './helpers.js';

async function getShoppingList(req, res, next) {
  try {
    const id = req.user._id;
    if (!id)
      return res.status(401).json({
        resultMassage: { en: getText('en', '00017') },
        resultCode: '00017',
      });
    const { shoppingList } = await getOnlyShopping(id);
    if (!shoppingList) {
      return res.status(404).json({
        resultMassage: { en: getText('en', '00102') },
        resultCode: '00102',
      });
    }
    return res.status(200).json({
      resultMassage: { en: getText('en', '00101') },
      resultCode: '00101',
      shoppingList,
    });
  } catch (error) {
    return next(error);
  }
}

export default getShoppingList;

/**
 * @swagger
 * /user/shopping:
 *    get:
 *      summary: Fetch users shopping list
 *      parameters:
 *        - in: header
 *          name: Authorization
 *          schema:
 *            type: string
 *          description: Put access token here
 *      tags:
 *        - User
 *      responses:
 *        "200":
 *          description: Successfully fetched shopping list.
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          resultMessage:
 *                              $ref: '#/components/schemas/ResultMessage'
 *                          resultCode:
 *                              $ref: '#/components/schemas/ResultCode'
 *                          shoppingList:
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
