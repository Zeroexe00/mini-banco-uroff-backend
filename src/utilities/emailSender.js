const nodemailer = require('nodemailer');
import content from '../template/pdfTemplate'
const pdf = require('html-pdf');

export const sendEmail = (amount,email,sender,receiver) => {
  let date = new Date().toISOString().split('T')[0];
  pdf.create(content({amount,email,sender,receiver,date})).toBuffer(function(err, buffer){
    let message = {
      from: "miniBancoTest@email.com",
      to: email,
      subject: "Recibo de transferencia",
      html: `<h1>Estimado ${receiver.name}:</h1><p>Estas recibiendo este Email porque recibiste una transferencia por el monto de ${amount}</p><footer style="font-size: 11px;">*Importante: Este e-mail fue generado automaticamente, por favor no responda a este mensaje.
      Ante cualquier duda, contactese con su ejecutivo de cuentas o servicio al cliente</footer>`,
      attachments: [
        {
            filename: 'receipt.pdf',
            content: buffer,
            contentType: 'application/pdf'
        },
      ]
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
  });

}