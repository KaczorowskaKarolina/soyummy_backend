import sgMail from '@sendgrid/mail';
import errorHelper from './helpers/error-helper.js';
import { emailApiKey, usedEmail } from '../config/index.js';
sgMail.setApiKey(emailApiKey);

export default async (email, name, confirmCode, lang, type, req, res) => {
  try {
    if (!email || !confirmCode || (lang !== 'tr' && lang !== 'en')) {
      return res.status(400).send(errorHelper('00005', req)).end();
    }

    const emailInfo = {
      from: usedEmail,
      to: email,
      subject: 'SoYummy - newsletter',
      text: `Welcome ${name},\n Thank you for subscribing.`,
      html: `<div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                <h2 style="color: #333333;">Hi!</h2>
                <p style="color: #666666;">Thanks for subscribing to our newsletter!</p>
                <p>Enjoy our awesome news about newest recipes every week.</p>
                <p style="color: #666666;">If you this email got to you by mistake, please ignore this message.</p>
                <p style="color: #666666;">Thank you,<br>Team of Crypto</p>
            </div>`,
    };

    await sgMail.send(emailInfo);
    return;
  } catch (err) {
    return err;
  }
};
