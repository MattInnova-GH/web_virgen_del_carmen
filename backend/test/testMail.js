const transporter = require('../config/mail.config');

const testMailConnection = async () => {
    try {

        await transporter.verify();

        console.log(
            'Conexión SMTP exitosa'
        );

    } catch (error) {

        console.error(
            'Error SMTP:',
            error
        );

    }
};

module.exports = testMailConnection;