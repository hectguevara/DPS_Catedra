// utils/mail.js
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail", // También puede ser Outlook, etc.
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendPasswordResetEmail = async (to, token) => {
  await transporter.sendMail({
    from: `"Salud Mental App" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Recuperación de contraseña",
    html: `
      <p>Hola,</p>
      <p>Recibimos una solicitud para restablecer tu contraseña.</p>
      <p>Tu código para restablecer la contraseña es:</p>
      <h2>${token}</h2>
      <p>Ingresa este código en la app para continuar.</p>
      <p>Si no hiciste esta solicitud, ignora este correo.</p>
    `,
  });
};

module.exports = sendPasswordResetEmail;
