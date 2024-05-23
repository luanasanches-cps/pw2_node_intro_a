const User = require('../models/User')
const bcrypt = require('bcryptjs')

module.exports = class UserController {
    static login(req, res){
    res.render('auth/login')
    }
//assincrona != sincrona : assincrona é executada em blocos e precisa ser,
//chamada e sincrona executada em sequencia

    //precisa ser chamada para ser executada
    //req(requizição) = requirindo algo
    //res(resposta) = resposdendo algo
    static async loginPost(req, res){
        const { email, password } = req.body

        //await = esperar/aguardar resposta
        //quando o email chegar vai criar o objeto usuario e vai no
        //banco de dados
        const user = await User.findOne({
            where:{
                email: email
                }
            })
        if(!user){
            res.render('auth/login', {
                message: 'Usuário não encontrado'
            })
            return
        }
        //checar a senha
        //bcrypt = criptografado
        //verifica se a senha e a senha do user do banco de dados
        //são iguais
        const passwordMatch = bcrypt.compareSync(password, user.password)

        if(!passwordMatch){
            res.render('auth/login', {
                message: 'SEU BUNDA MOLE!'
            })
            return
        }
        //criando sessão caso de tudo certo
        req.session.userId = user.id

        //memoria flash = memoria RAM
        req.flash('message', 'Login realizado com sucesso!')

        //montando sessão
        //Se a pessoa voltar no navegador ela não executa dnv
        req.session.save(() =>{
            res.redirect('/') // "/" manda pra home do site
        })
    }

    static register(req, res){
        res.render('auth/register')
    }
    //função para criar usuario
    //chamar o cabeçalho http
    
    static async registerPost(req, res){
        //vai estar no body
         const {name, email, password, confirmPasword} = req.body

        if(password != confirmPasword){
            //message = armazenado na memoria ram
            req.flash('message:', 'As senhas não conferem seu burro, tente novamente!')
            res.render('auth/register')
            return
        }
        //preciso verificar se a pessoa não é retardada e não está
        //criando outra conta
        const checkIfUserExists =await User.findOne({where: {email: email}})

        if(checkIfUserExists){
            req.flash('message', 'O e-mail já esta registrado')
            res.render('auth/login')
            return
        }
        //ORM = Registro modelado orientado a objetos, inversão
        //de depêndencias

        //preparar o sal e gerar chave 

        const salt = bcrypt.genSaltSync()
        const hanshedPassword = bcrypt.hashSync(password, salt)

        const user = {
            name,
            email,
            password: hanshedPassword,
          //salt/salgar senha: proteção da senha, adição de letras aleatorias
          //na senha
        }
        User.create(user)
        .then((user) => {
            req.session.userId = user.id

            req.flash('message', 'Login realizado com sucesso!')
            req.session.save(() =>{
                res.redirect('/')
            })
        })
        .catch((err) => console.error(err)) 
    }

    static logout(req, res){
        req.session.destroy() //vai destruir a sessão
        red.redirection('/login') //redireciona o usuario de volta para o login
    }
}