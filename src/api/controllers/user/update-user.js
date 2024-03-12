import { getText, errorHelper } from '../../../utils/index.js';
import { imageApiKey } from '../../../config/index.js';
import fs from 'fs/promises';
import { tmpDir } from '../../middlewares/index.js';
import imgbbUploader from 'imgbb-uploader';
import { User } from '../../../models/index.js';
import { getUserById } from './helpers.js';

async function updateUser(req, res, next) {
  try {
    const id = req.user._id;
    if (!id)
      return res.status(401).json({
        resultMassage: { en: getText('en', '00017') },
        resultCode: '00017',
      });

    const user = await getUserById(id);
    if (!user) {
      return res.status(401).json({
        resultMassage: { en: getText('en', '00052') },
        resultCode: '00052',
      });
    }

    let body = req.body;

    if (req.file) {
      const fileName = req.file.originalname;

      const image = await imgbbUploader(
        imageApiKey,
        `${tmpDir}${fileName}`
      ).catch(error =>
        res.status(400).json({
          resultMassage: 'Something went wrong',
          resultCode: '00000',
          error: error.message,
        })
      );
      user.photoUrl = image.url;
      if (req.body.update) body = JSON.parse(req.body.update);
    }

    if (body.name) user.name = body.name;
    if (body.gender) user.gender = body.gender;
    if (body.birthDate) user.birthDate = body.birthDate;
    if (body.language) user.language = body.language;
    if (body.username && body.username !== user.username) {
      const exist = await User.exists({ username: body.username }).catch(
        err => {
          return res.status(500).json(errorHelper('00083', req, err.message));
        }
      );
      if (exist) return res.status(400).json(errorHelper('00084', req));

      user.username = body.username;
    }
    await user.save();
    return res.status(200).json({
      resultMassage: { en: getText('en', '00113') },
      resultCode: '00113',
      user,
    });
  } catch (error) {
    return next(error);
  } finally {
    fs.unlink(`${req.file.path}`);
  }
}

export default updateUser;
