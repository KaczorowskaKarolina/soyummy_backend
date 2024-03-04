// import { createTransport } from 'nodemailer';
import sgMail from '@sendgrid/mail';
// import getText from './lang/get-text.js';
import errorHelper from './helpers/error-helper.js';
import {
  awsAccessKey,
  awsSecretAccessKey,
  awsRegion,
  emailApiKey,
} from '../config/index.js';
// import pkg from 'aws-sdk';
// const { config, SES } = pkg;

// config.update({
//   accessKeyId: awsAccessKey,
//   secretAccessKey: awsSecretAccessKey,
//   region: awsRegion,
// });

sgMail.setApiKey(emailApiKey);

export default async (email, name, confirmCode, lang, type, req, res) => {
  new Promise(async (resolve, reject) => {
    if (!email || !confirmCode || (lang !== 'tr' && lang !== 'en')) {
      return res.status(400).send(errorHelper('00005', req)).end();
    }

    // const emailTransfer = createTransport({
    //   SES: new SES({
    //     apiVersion: '2010-12-01',
    //   }),
    // });

    // let body = '';
    //NOTE: You can customize the message that will be sent to the newly registered users according to your pleasure.
    // if (type == 'register') {
    //   body = `${getText(lang, 'welcomeCode')} ${name}!\r\n\r\n${getText(
    //     lang,
    //     'verificationCodeBody'
    //   )} ${confirmCode}`;
    // } else {
    //   body = `${getText(lang, 'verificationCodeBody')} ${confirmCode}`;
    // }

    const emailInfo = {
      from: 'smalec1236@gmail.com',
      to: email,
      subject: 'SoYummy - verify email',
      text: `Welcome ${name},\n Thank you for joining us. To verify email please click the link below.`,
      html: `<a href="http:localhost:3001/api/user/verify/${confirmCode}">Confirm email</a>`,
    };

    try {
      await sgMail.send(emailInfo);
      return resolve('Success');
    } catch (err) {
      return reject(err);
    }
  });
};
