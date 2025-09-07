// // server/services/emailService.js
// const sgMail = require('@sendgrid/mail');

// sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// const sendInvitationEmail = async (recipientEmail, setupLink) => {
//   const msg = {
//     to: recipientEmail,
//     from: process.env.SENDER_EMAIL, // Your verified sender email
//     subject: 'You have been invited to join VisaCoach!',
//     html: `
//       <div style="font-family: sans-serif; text-align: center; padding: 20px;">
//         <h1 style="color: #333;">Welcome to VisaCoach!</h1>
//         <p style="font-size: 16px; color: #555;">
//           You have been invited to join the platform. Please set up your account by clicking the link below.
//         </p>
//         <a href="${setupLink}" style="display: inline-block; background-color: #4f46e5; color: white; padding: 12px 20px; margin: 20px 0; text-decoration: none; border-radius: 5px; font-size: 16px;">
//           Set Up Your Account
//         </a>
//         <p style="font-size: 12px; color: #888;">This link is valid for 24 hours.</p>
//       </div>
//     `,
//   };

//   try {
//     await sgMail.send(msg);
//     console.log(`Production invitation email sent successfully to ${recipientEmail}`);
//   } catch (error) {
//     console.error('Error sending email via SendGrid:', error);
//     if (error.response) {
//       console.error(error.response.body)
//     }
//   }
// };

// module.exports = { sendInvitationEmail };

// server/services/emailService.js
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendInvitationEmail = async (recipientEmail, setupLink) => {
  const msg = {
    to: recipientEmail,
    from: process.env.SENDER_EMAIL, // Your verified sender email
    subject: 'You have been invited to join VisaCoach!',
    html: `
      <div style="font-family: sans-serif; text-align: center; padding: 20px;">
        <h1 style="color: #333;">Welcome to VisaCoach!</h1>
        <p style="font-size: 16px; color: #555;">
          You have been invited to the platform. Please set up your account by clicking the link below.
        </p>
        <a href="${setupLink}" style="display: inline-block; background-color: #4f46e5; color: white; padding: 12px 20px; margin: 20px 0; text-decoration: none; border-radius: 5px; font-size: 16px;">
          Set Up Your Account
        </a>
        <p style="font-size: 12px; color: #888;">This link is valid for 24 hours.</p>
      </div>
    `,
  };

  try {
    await sgMail.send(msg);
    console.log(`Production invitation email sent successfully to ${recipientEmail}`);
  } catch (error) {
    console.error('Error sending email via SendGrid:', error);
    if (error.response) {
      console.error(error.response.body)
    }
  }
};

module.exports = { sendInvitationEmail };