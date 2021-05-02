const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (name, email) => {
    sgMail.send({
        to: email, // Change to your recipient
        from: 'franklenny258@gmail.com', // Change to your verified sender
        subject: 'Welcome to this task app',
        text: `Hello ${name}, please reach back to me if you have any questions.`
    });
}

const sendGoodbyeEmail = (name, email) => {
    sgMail.send({
        to: email, // Change to your recipient
        from: 'franklenny258@gmail.com', // Change to your verified sender
        subject: 'Goodbye',
        text: `Hello ${name}, is there something we can do for you to stay?`
    });
}

module.exports = {
    sendWelcomeEmail,
    sendGoodbyeEmail
}

