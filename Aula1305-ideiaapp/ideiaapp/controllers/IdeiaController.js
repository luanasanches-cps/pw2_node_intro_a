const Ideia = require('../models/Ideia')
const User = require('../models/User')

const { Op } = require('sequelize')

module.exports = class IdeiaController{
    static async dashboard(req, res){
        const iserId = req.session.userId

        const user = await User.findOne({
            where:{id: userId},
            include: Ideia,
            plain: true
        })

        const ideia = user.Ideia.map((result) => result.dataValue)

        let emptyIdeias = true
        if(ideia.lenght > 0){
            emptyIdeias = false
        }

        console.log(ideias)
        console.log(emptyIdeias)

        res.render('ideias/dashboard')
    }
}