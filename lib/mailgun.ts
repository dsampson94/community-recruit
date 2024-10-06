import formData from 'form-data';
import Mailgun from 'mailgun.js';

const mailgun = new Mailgun(formData);
const mg = mailgun.client({ username: 'api', key: process.env.MAILGUN_SENDING_API_KEY as string });

export async function sendMailgunEmail(to: string, subject: string, text: string, html: string) {
    try {
        return await mg.messages.create(
            process.env.MAILGUN_DOMAIN as string,
            {
                from: `Excited User <${process.env.MAILGUN_FROM_EMAIL}>`,
                to: [to],
                subject: subject,
                text: text,
                html: html,
            }
        );
    } catch (error) {
        throw new Error(`Failed to send email: ${error.message}`);
    }
}
