import nodemailer from "nodemailer";
// Nodemaile config for Gmail SMTP

// console.log("username :- ", process.env.SMTP_USERNAME);
// console.log("password :- ", process.env.SMTP_PASSWORD);


const transporter = nodemailer.createTransport({
  port: 465, // true for 465, false for other ports
  host: "smtp.gmail.com",
  auth: {
    user: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_PASSWORD,
  },
  secure: true,
});

export function sendMail({ to, subject, text }) {
  const mailOptions = {
    from: process.env.SMTP_USERNAME,
    to,
    subject,
    text,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email: ", error);

      throw new Error("Failed Sending Email");
    } else {
      console.log("Email sent: ", info.response);
      return true;
    }
  });
}
