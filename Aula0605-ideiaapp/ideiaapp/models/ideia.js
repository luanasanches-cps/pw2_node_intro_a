const { DataTypes } = require('sequelize') //sequelize = conector que conecta com o banco de dados "ORM"?
const db = require('../db/conn') //ele vai ir no db e rodar o conn, que no caso vai rodar o banco de dados e vai rodar o root e conectar no servidor
//vai usar o arquivo conn para conectar no servidor

//nossa entidade
const User = require('../models/user')

const Ideia = db.define('ideia', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    }
})

Ideia.belongsTo(User) //cada ideia tem um usuario - belongsto(pertence a) - 1
User.hasMany(Ideia) //cada usuario tem muitas ideias - hasmany (possui muitas) - N

module.exports = Ideia //para outros modulos poderem usa-lo