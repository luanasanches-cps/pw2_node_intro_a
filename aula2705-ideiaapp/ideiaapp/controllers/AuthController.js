const User = require('../models/User')
const bcrypt = require('bcryptjs')

module.exports = class UserController {
    static login(req, res) {
        res.render('auth/login')
    }

    static async loginPost(req, res) {
        const { email, password } = req.body

        const user = await User.findOne({ where: { email: email } })

        if (!user) {
            res.render('auth/login', {
                message: 'Usuário não encontrado'
            })
            return
        }

        const passwordMatch = bcrypt.compareSync(password, user.password)

        if (!passwordMatch) {
            res.render('auth/login', {
                message: 'Informações invalidas'
            })
            return
        }

        req.session.userid = user.id

        req.flash('message', 'Login realizado com sucesso!')

        req.session.save(() => {
            res.redirect('/')
        })
    }

    static register(req, res) {
        res.render('auth/register')
    }

    static async registerPost(req, res) {
        const { name, email, password, confirmpassword } = req.body

        if (password != confirmpassword) {
            req.flash('message', 'As senhas não conferem, tente novamente')
            res.render('auth/register')
            return
        }

        const checkIfUserExists = await User.findOne({ where: { email: email } })

        if (checkIfUserExists) {
            req.flash('message', 'O e-mail já esta registrado')
            res.render('auth/login')
            return
        }

        const salt = bcrypt.genSaltSync(10)
        const hashedPassword = bcrypt.hashSync(password, salt)

        const user = {
            name,
            email,
            password: hashedPassword,
        }

        User.create(user)
            .then((user) => {
                req.session.userid = user.id

                req.flash('message', 'Cadastro realizado com sucesso!')

                req.session.save(() => {
                    res.redirect('/')
                })
            })
            .catch((err) => console.error(err))
    }

    static logout(req, res){
        req.session.destroy()
        res.redirection('/login')
    }
}