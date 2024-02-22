import nodemailer from "nodemailer";
const sendEmail = async ({ from = process.env.EMAIL, to, subject, text, html, cc, bcc, attachments } = {}) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {

            user: process.env.EMAIL,
            pass: process.env.PASSWORD,
        },
    });

    const info = await transporter.sendMail({
        from: `"Fred Foo 👻" <${from}>`, // sender address
        to, // list of receivers
        subject, // Subject line
        text, // plain text body
        html, // html body
        cc,
        bcc,
        attachments
    });
    console.log("Message sent: %s", info);
}

export default sendEmail