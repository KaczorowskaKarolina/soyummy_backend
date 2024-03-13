import { User } from '../../../models/index.js';
import { errorHelper, getText } from '../../../utils/index.js';

export default async (req, res, next) => {
  try {
    const id = req.user._id;
    const user = await User.findById(id);
    if (!user) {
      return res.status(500).json(errorHelper('00088', req, err.message));
    }
    if (user.newsletter) {
      return res.status(400).json({
        resultMassage: { en: getText('en', '00109') },
        resultCode: '00109',
      });
    }
    user.newsletter = true;
    await user.save();
    return res.status(200).json({
      resultMassage: { en: getText('en', '00110') },
      resultCode: '00110',
    });
  } catch (error) {
    return next(error);
  }
};

/**
 * @swagger
 * /user/subscribe:
 *    post:
 *      summary: Subscribe to newsletter
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
 *          description: Successfully signed to newsletter.
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Result'
 *        "400":
 *          description: User already subscribes to newsletter.
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
