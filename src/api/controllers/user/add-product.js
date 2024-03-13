import { getText } from '../../../utils/index.js';
import { getOnlyShopping } from './helpers.js';
import { Types } from 'mongoose';

async function addProduct(req, res, next) {
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
    const newProduct = {
      _id: new Types.ObjectId(product.id),
      measure: product.measure,
    };
    user.shoppingList.push(newProduct);
    await user.save();
    return res.status(204).json({
      resultMassage: { en: getText('en', '00098') },
      resultCode: '00098',
      newProduct,
    });
  } catch (error) {
    return next(error);
  }
}

export default addProduct;

/**
 * @swagger
 * /user/shopping:
 *    post:
 *      summary: Add product
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
 *          description: Successfully created product.
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          resultMessage:
 *                              $ref: '#/components/schemas/ResultMessage'
 *                          resultCode:
 *                              $ref: '#/components/schemas/ResultCode'
 *                          newProduct:
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
