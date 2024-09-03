
const nodemailer = require('nodemailer');

async function sendEmail(to, subject, text) {
  // Create a transporter using SMTP
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // Use TLS
    auth: {
      user: 'rajvendrarahi126@gmail.com',
      pass: 'epiu pzku nbjo dimz'
    }
  });

  // Define email options
  let mailOptions = {
    from: '"Rajvendra Rahi" <rajvendrarahi126@gmail.com>',
    to: to,
    subject: subject,
    text: text
  };

  try {
    // Send email
    let info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.messageId);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
}




  exports.sendEmail = sendEmail
