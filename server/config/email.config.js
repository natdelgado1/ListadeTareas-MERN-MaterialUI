const nodemailer = require("nodemailer");
const handlebars = require("handlebars");
const fs = require("fs/promises");
const { promiseHooks } = require("v8");

const transporter = nodemailer.createTransport({

    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        // TODO: replace `user` and `pass` values from <https://forwardemail.net>
        user: "natdelgadodev@gmail.com",
        pass: process.env.EMAIL_SMTP_TOKEN
    },
});

    module.exports.sendConfirmationEmail = (toEmail) => {
        console.log(toEmail);
        return new Promise(async(resolve, reject) => {
                  
            try {
                const info = await transporter.sendMail({
                    from: '"Not Reply Lista de Tareas 👻" <natdelgadodev@gmail.com>', // sender address
                    to: toEmail, // list of receivers
                    subject: "Welcome to Lista de tareas", // Subject line
                    text: "user creation", // plain text body
                    html: "<b>Bienvenido a Lista de tareas</b>", // html body
                });
                resolve(info);
                console.log(info);           
            } catch (error) {
                console.log(error);
                reject(error)
            }
        }
            )
        }

        module.exports.sendPasswordToken = ({user,token}) => {

            return new Promise(async (resolve, reject) => {
                try {
                    const options = { ...user };
                    options.token = token;
        
                    const templateFile = await fs.readFile("./templates/forgot.hbs", "utf-8");
                    const template = handlebars.compile(templateFile);
                    const html = template(options);
        
                    const info = await transporter.sendMail({
                        from: '"Not Reply Lista de Tareas" <natdelgadodev@gmail.com>', // sender address
                        to: user.email, // list of receivers
                        subject: "Password Reset", // Subject line
                        text: "Password Reset", // plain text body
                        html: html, // html body
                    });
                    resolve(info);
                } catch (error) {
                    console.log(error);
                    reject(error);
                }
            });
        }