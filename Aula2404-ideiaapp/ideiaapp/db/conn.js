//Sequelize = uma váriavel, importantando módulo por módulo de maneira separada
const { Sequelize } = require('sequelize')

//O que é um construtor: quando construimos um elemento para servir 
//para criar uma instancia do que estamos pedindo, no caso o sql(sequelize).

                                //paramentros: nome do database 
const sequelize = new Sequelize('ideias', 'root', '', {
    host: 'localhost', //objeto do banco de dados/endereço
    dialect: 'mysql', //dialeto que ele irá falar
})

//como vc não tem certeza se vai ter conexão ou não, utilizamos o try/catch para "tentar"
//fazer uma conexão
try {
    sequelize.authenticate() // o sequelize "tenta" autenticar
    console.log('Conectado ao servidor MySQL!') //caso ele entre ele retorna o console log
}catch (error) { //ele irá trazer um erro caso não consiga autenticar
    console.error(`Error MySQL ${error}`) // retorna o console error
}

module.exports = sequelize //exporta para os outros usarem
