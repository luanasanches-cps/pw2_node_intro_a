//Construindo o usuario

const { DataTypes } = require('sequelize')
const db = require('../db/conn')

const User = db.define("user", { //o banco de dados vai definir o nome do usuario
    name: {
        type: DataTypes.STRING,
        allowNull: false, //precisa ter nome
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    } 
})

module.exports = User //para que outros módulos consigam utilizar