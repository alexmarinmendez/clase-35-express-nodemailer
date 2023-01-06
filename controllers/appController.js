const nodemailer = require('nodemailer')
const Mailgen = require('mailgen')

const signup = async (req, res) => {
    let testAccount = await nodemailer.createTestAccount()
    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
            user: testAccount.user,
            pass: testAccount.pass
        }
    })
    let message = {
        from: "Leo Messi <leo@messi.com>",
        to: "alexmarinmendez@gmail.com",
        subject: "Hello World!!!",
        html: "<b>Hello World</b>"
    }

    transporter.sendMail(message)
        .then(info => {
            res.status(201).json({
                msg: "Revisa tu inbox... tiene sun mensaje",
                info: info.messageId,
                preview: nodemailer.getTestMessageUrl(info)
            })
        })
        .catch(err => res.status(500).json({err}))
   
}

const getbill = (req, res) => {
    const { userEmail } = req.body
    let config = {
        service: 'gmail',
        port: 587,
        auth: {
            user: 'alexmarinmendez@gmail.com',
            pass: 'fytrebseksqgwtjn'
        }
    }
    let transporter = nodemailer.createTransport(config)
    let Mailgenerator = new Mailgen({
        theme: "default",
        product: {
            name: "Mailgen",
            link: "https://mailgen.js"
        }
    })

    let response = {
        body: {
            name: "Order created!",
            intro: "Your bill has arrived!",
            table: {
                data: [{
                    item: "Bicicleta de carrera",
                    description: "Awasome bicicleta",
                    price: "$56000"
                }]
            },
            outro: "Looking forward for more business"
        }
    }
    let mail = Mailgenerator.generate(response)

    let message = {
        from: 'alexmarinmendez@gmail.com',
        to: userEmail,
        subject: "Order created!",
        html: mail
    }

    transporter.sendMail(message)
        .then(() => res.status(201).json({ msg: "Mira tu buzon... "}))
}

module.exports = {
    signup,
    getbill
}