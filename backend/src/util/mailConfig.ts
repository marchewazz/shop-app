import nodemailer from 'nodemailer';

let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    auth: {
      user: process.env.SHOPAPP_EMAIL,
      pass: process.env.SHOPAPP_EMAIL_PASS, 
    },
  });

export default transporter;