const nodemailer = require("nodemailer");
const pug = require("pug");
const htmlToText = require("html-to-text");

module.exports = class Email {
  constructor(user, url) {
    if (user) {
      this.to = user.email;
      this.firstName = user.name.split(" ")[0];
    }

    if (url) {
      this.url = url;
    }
    
    this.from = `Victoria Kastanenka <${process.env.EMAIL_FROM}>`;
  }

  newTransport() {
    if (process.env.NODE_ENV === "production") {
      // Sendgrid
      return nodemailer.createTransport({
        service: "SendGrid",
        auth: {
          user: process.env.SENDGRID_USERNAME,
          pass: process.env.SENDGRID_PASSWORD,
        },
      });
    }

    // 1. Create a transporter
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  // Send the actual email (pug template will be passed in from views folder)
  async send(template, subject) {
    // 1. Render HTML based on a pug template
    const html = pug.renderFile(`${__dirname}/../views/${template}.pug`, {
      firstName: this.firstName,
      url: this.url,
      subject,
    });

    // 2. Define email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      // Want to include a text version of our email into the email => Important because better for email delivery rates, and also for spam folders (stripping out HTML, leaving only the content)
      text: htmlToText.fromString(html),
    };

    // 3. Create a transport and send email
    await this.newTransport().sendMail(mailOptions);
  }

  async sendContact(reqBody) {
    const html = pug.renderFile(`${__dirname}/../views/contact.pug`, {
      subject: "New Natours Contact Request",
      name: reqBody.name,
      email: reqBody.email,
      content: reqBody.emailBody,
    });

    const mailOptions = {
      from: `${reqBody.name}, ${reqBody.email}`,
      to: "vkastanenka@gmail.com",
      subject: "New Natours Contact Request",
      html,
      text: htmlToText.fromString(html),
    };

    await this.newTransport().sendMail(mailOptions);
  }

  async sendWelcome() {
    await this.send("welcome", "Welcome to the Natours Family!");
  }

  async sendPasswordReset() {
    await this.send(
      "passwordReset",
      "Your password reset token (valid for only 10 minutes!)"
    );
  }
};
