const Ideia = require('../models/Ideia')
const User = require('../models/User')

const { Op } = require('sequelize')

module.exports = class IdeiaController {

    //método
    static async dashboard(req, res) {
        const iserId = req.session.userId

        const user = await User.findOne({
            where: { id: userId },
            include: Ideia,
            plain: true
        })

        const ideia = user.Ideia.map((result) => result.dataValue)

        let emptyIdeias = true
        if (ideia.lenght > 0) {
            emptyIdeias = false
        }

        console.log(ideias)
        console.log(emptyIdeias)

        res.render('ideias/dashboard')
    }

    static createIdeia(req, res) {
        res.render('ideias/create')
    }

    static createIdeiaSave(req, res) {
        const ideia = {
            //montando o que eu espero receber para o formulario
            title: req.body.tittle,
            UserId: req.session.userid //coloca o user q tiver ligado
        }

        Ideia.create(ideia) //salva no sql
            .then(() => {
                //vai na memoria ram e pergunta se tem memoria disponivel
                req.flash('message', 'Pensamento criado com sucesso!')
                req.session.save(() => {
                    //se o pensamento foi criado então direciona para a dashboard
                    //na dashboard tem todas as ideias que o user teve
                    res.redirect('/ideias/dashboard')
                })
            })
            .catch((error) => console.error(error))
    }

    static showIdeias(req, res) {
        console.log(req.query)

        let search = '' //preparo uma variável para receber o texto do user

        if (req.query.search) { //eu pergunto se ter algo na variavel search
            search = req.query.search //recebe o que foi digitado
        }

        let order = 'DESC' //crio uma varável local com let, e quando acabar
        //o método ela vai ser apagada, no caso não vai ficar
        //na memória

        if (req.query.order === 'old') { //se mandar um valor diferente ela muda
            order = 'ASC' //ascendente(nova)
        } else {
            order = 'DESC' //se não por padrão ela vai ser descendente(antiga)
        }

        Ideia.findAll({ //vai na tabela de ideias e da um select

            include: User, //trazer só as ideias do usuario
            where: {
                title: {
                    [Op.like]: `%${search}%` //qualquer coisa que estiver lá dentro
                    //vai ser encontrada de acordo com uma
                    //palavra chave
                }
            },
            order: [['createAt', order]], //por padrão ele vai trazer as ideias
            //mais antigas
        })
            .then((data) => { //manipular data
                let ideiasQts = data.length //saber quantidade de ideias q ele tem

                if (ideiasQts === 0) //se for 0 quer dizer q não tem ideias
                {
                    ideiasQts = false //é transformado em buliano para não exibir
                    //nada
                }

                const ideias = data.map((result) => result.get({ plain: true }))
                //vai percorrer os pensamentos um por um

                res.render('ideias/home', { ideias, ideiasQts, search })
                //renderizar as ideias
            })


    }

    static removeIdeia(req, res) {
        const id = req.body.id

        Ideia.destroy({ where: { id: id } })
            .then(() => {
                req.flash('message', 'Pensamento removido com sucesso!')
                req.session.save(() => {
                    res.redirect('/ideias/dashboard')
                })
            })
            .catch((error) => console.error(error))
    }

    static updateIdeia(req, res) { //atualizar/editar ideia
        const id = req.params.id

        Ideia.findOne({ where: { id: id }, raw: true })
            .then((ideia) => {
                res.render('ideias/edit', { ideia })
            })
            .catch((error) => console.error(error))
    }

    static updateIdeiaPost(req, res) { //o que vai realmente mudar a ideia/titulo
        const id = req.body.id

        const ideia = {
            title: req.body.title,
            description: req.body.description
        }

        Ideia.update(ideia, {where: {id: id}})
        .then (() => {
            req.flash('message', 'Pensamento editado com sucesso')
            req.session.save(() => {
                res.redirecti('/ideias/dashboard')
            })
        })
        .catch((error) => console.error(error))
    }
}