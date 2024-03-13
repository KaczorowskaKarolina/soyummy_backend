import { getText } from '../../../utils/index.js';
import { getOnlyShopping } from './helpers.js';
import { Types } from 'mongoose';

async function removeProduct(req, res, next) {
  try {
    const id = req.user._id;
    if (!id)
      return res.status(401).json({
        resultMassage: { en: getText('en', '00017') },
        resultCode: '00017',
      });
    const product = req.body;
    const user = await getOnlyShopping(id);
    if (!user) {
      return res.status(401).json({
        resultMassage: { en: getText('en', '00052') },
        resultCode: '00052',
      });
    }
    const index = user.shoppingList.findIndex(
      item =>
        (item = {
          _id: new Types.ObjectId(product.id),
          measure: product.measure,
        })
    );
    if (index === -1) {
      return res.status(404).json({
        resultMassage: { en: getText('en', '00104') },
        resultCode: '00104',
      });
    }
    user.shoppingList.splice(index, 1);
    await user.save();
    return res.status(204).json({
      resultMassage: { en: getText('en', '00105') },
      resultCode: '00105',
      idProduct: product.id,
    });
  } catch (error) {
    return next(error);
  }
}

export default removeProduct;

/**
 * @swagger
 * /user/shopping:
 *    delete:
 *      summary: Remove product from shopping list
 *      parameters:
 *        - in: header
 *          name: Authorization
 *          schema:
 *            type: string
 *          description: Put access token here
 *       requestBody:
 *        description: An object of a product that is nedded to be removed
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                id:
 *                  type: string
 *                measure:
 *                  type: string
 *      tags:
 *        - User
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
 *                          idProduct:
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
