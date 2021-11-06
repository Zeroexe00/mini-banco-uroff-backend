const nodemailer = require('nodemailer');


export const sendEmail = (amount) => {
  let message = {
    from: "from@email.com",
    to: "to@email.com",
    subject: "Subject",
    html: `<h1>Hola</h1><p>Estas recibiendo este Email porque recibiste una transferencia por el monto de ${amount}</p>`
  }
  const transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: process.env.MAIL_TRAP_USER,
        pass: process.env.MAIL_TRAP_PASS
    }
  });
  transporter.sendMail(message,(err,info) => {
    if(err) {
      console.log(err)
    }else {
      console.log('exito',info)
    }
  })
}