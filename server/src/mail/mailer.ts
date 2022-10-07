import nodemailer from 'nodemailer'

export const sendMail = (email: string, token: string) => {
  let mail = nodemailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: {
      user: 'ec30c66ec75adb',
      pass: '137386faa4e8cb',
    },
  })

  let mailOptions = {
    from: 'hakuna@localhost.com',
    to: email,
    subject: 'Reset password',
    text: `http://localhost:3000/reset-password?token=${token}`,
    // text: `<p>You requested for reset password, kindly use this <a href="http://localhost:3000/reset-password?token=${token}">link</a> to reset your password</p>`,
  }

  mail.sendMail(mailOptions, (err, data) => {
    if (err) {
      console.log(err)
    } else {
      console.log('email sent')
    }
  })
}
