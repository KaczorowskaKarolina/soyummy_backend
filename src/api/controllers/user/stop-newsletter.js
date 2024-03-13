import { User } from '../../../models/index.js';
import { errorHelper, getText } from '../../../utils/index.js';

export default async (req, res, next) => {
  try {
    const id = req.user._id;
    const user = await User.findById(id);
    if (!user) {
      return res.status(500).json(errorHelper('00088', req, err.message));
    }
    if (!user.newsletter) {
      return res.status(400).json({
        resultMassage: { en: getText('en', '00112') },
        resultCode: '00112',
      });
    }
    user.newsletter = false;
    await user.save();
    return res.status(200).json({
      resultMassage: { en: getText('en', '00111') },
      resultCode: '00111',
    });
  } catch (error) {
    return next(error);
  }
};

/**
 * @swagger
 * /user/subscribe:
 *    delete:
 *      summary: Unsubscribe from newsletter
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
 *          description: Successfully unsubscribed from newsletter.
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Result'
 *        "400":
 *          description: User already isn't subscribing.
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Result'
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
