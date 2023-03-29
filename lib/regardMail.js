const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  service:"gmail",
  secure: true,
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.EMAIL_PASSWORD,
  },
});

transporter.verify();

const sendmail = (mailOptions) => {
  return new Promise((resolve, reject) => {
    transporter.sendMail({...mailOptions}, (err, response) => {
      if (err) {
        return reject(err);
      }
      resolve(response);
    });
  });
};

module.exports = { sendmail };