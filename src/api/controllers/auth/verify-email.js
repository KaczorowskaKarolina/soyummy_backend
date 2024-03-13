import { User, Token } from '../../../models/index.js';
import { validateVerifyEmail } from '../../validators/user.validator.js';
import {
  errorHelper,
  getText,
  logger,
  signAccessToken,
  signRefreshToken,
} from '../../../utils/index.js';
import ipHelper from '../../../utils/helpers/ip-helper.js';
import { jwtSecretKey } from '../../../config/index.js';
import pkg from 'jsonwebtoken';
const { verify } = pkg;

export default async (req, res) => {
  // const { error } = validateVerifyEmail(req.body);
  // if (error)
  //   return res
  //     .status(400)
  //     .json(errorHelper('00053', req, error.details[0].message));
  const { confirmCodeToken } = req.params;

  try {
    req.user = verify(confirmCodeToken, jwtSecretKey);
  } catch (err) {
    // return res.status(400).json(errorHelper('00055', req, err.message));
    return res.redirect('http://localhost:3000/verifyEmail/?status=400');
  }

  const exists = await User.exists({
    _id: req.user._id,
    isActivated: true,
  }).catch(err => {
    // return res.status(500).json(errorHelper('00051', req, err.message));
    return res.redirect('http://localhost:3000/verifyEmail/?status=404');
  });

  if (!exists) return res.status(400).json(errorHelper('00052', req));

  // if (req.body.code !== req.user.code)
  //   return res.status(400).json(errorHelper('00054', req));

  await User.updateOne(
    { _id: req.user._id },
    { $set: { isVerified: true } }
  ).catch(err => {
    // return res.status(500).json(errorHelper('00056', req, err.message));
    return res.redirect('http://localhost:3000/verifyEmail/?status=500');
  });

  const accessToken = signAccessToken(req.user._id);
  const refreshToken = signRefreshToken(req.user._id);
  try {
    const token = new Token({
      userId: req.user._id,
      refreshToken: refreshToken,
      status: true,
      expiresIn: Date.now() + 604800000,
      createdAt: Date.now(),
      createdByIp: ipHelper(req),
    });
    await token.save();
  } catch (err) {
    // return res.status(500).json(errorHelper('00057', req, err.message));
    return res.redirect('http://localhost:3000/verifyEmail/?status=500');
  }

  logger('00058', req.user._id, getText('en', '00058'), 'Info', req);
  // return res.render('viewMessage', { message: getText('en', '00058') });
  return res
    .status(200)
    .json({ message: getText('en', '00058') })
    .redirect('http://localhost:3000/verifyEmail/?status=200');
};

/**
 * @swagger
 * /auth/verify-email:
 *    post:
 *      summary: Verifies the email address of the user.
 *      requestBody:
 *        description: Confirm code and confirm token.
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                token:
 *                  type: string
 *                code:
 *                  type: string
 *      tags:
 *        - Auth
 *      responses:
 *        "200":
 *          description: Your email address was verified successfully.
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          resultMessage:
 *                              $ref: '#/components/schemas/ResultMessage'
 *                          resultCode:
 *                              $ref: '#/components/schemas/ResultCode'
 *                          accessToken:
 *                              type: string
 *                          refreshToken:
 *                              type: string
 *        "400":
 *          description: Please send a verification code.
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
