import nodemailer from 'nodemailer';

const mailSender = async (email, title, body) => {
    try {
        // Create a Transporter to send emails
        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: 587, 
            secure: false, 
            auth: {
                user: process.env.MAIL_,
                pass: process.env.MAIL_PASS 
            }
        });

        // Send email
        let info = await transporter.sendMail({
            from: "Your Name",
            to: email, 
            subject: title, 
            html: body 
        });

        console.log("Email sent successfully:", info.messageId);
        return info;
    } catch (error) {
        console.error("Error occurred while sending email:", error.message);
        return null;
    }
};

export default mailSender;



        // Send emails to users
        // let info = await transporter.sendMail({
        //     from: 'www.sandeepdev.me - Sandeep Singh',
        //     to: email,
        //     subject: title,
        //     html: body,
        // });