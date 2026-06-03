const transporter = require('../config/mail.config');

const sendTestMail = async () => {

    await transporter.sendMail({

        from: process.env.MAIL_USER,

        to: process.env.MAIL_USER,

        subject: 'Prueba Mesa de Partes',

        html: `
            <h2>Correo de prueba</h2>
            <p>Si recibes este correo, Nodemailer funciona correctamente.</p>
        `
    });

    console.log(
        'Correo enviado correctamente'
    );
};

module.exports = sendTestMail;