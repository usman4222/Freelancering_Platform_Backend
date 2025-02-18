import nodemailer from 'nodemailer';

const mailSender = async (email, title, body) => {
    try {
        // Create a Transporter to send emails
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587, // Changed to 587 (more reliable)
            secure: false, // Use false for port 587
            auth: {
                user: 'usman4243ch@gmail.com',
                pass: 'xnoydhcwfveafren' // Use an App Password instead of real password
            }
        });

        // Send email
        let info = await transporter.sendMail({
            from: '"Your Name" <usman4243ch@gmail.com>', // Sender email
            to: email, // Receiver email
            subject: title, // Email subject
            html: body // Email body (supports HTML)
        });

        console.log("✅ Email sent successfully:", info.messageId);
        return info;
    } catch (error) {
        console.error("❌ Error occurred while sending email:", error.message);
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