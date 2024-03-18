const inquirer = require('inquirer') //Coleta informações
const chalk =  require('chalk') //Serve para colorir
const fs = require('fs'); //Modulo interno do Node
const { error } = require('console');

console.log("--||Iniciamos o Accounts||--")

//Vamos criar uma função
function operation(){
    //Toda vez que vamos criar uma sequencia vamos criar dentro dela uma estrutura vetorial(Vetor)
    //Vetores são estruturar de dados, é um conjunto de dados do mesmo tipo, queremos que os vetores sejam exibidos na tela.,
    inquirer.prompt([
        //Abaixo foi criado uma lista
        {
            type: 'list',
            name: 'action',
            message: 'O que você deseja fazer?',
            choices: ['Criar Conta', 'Consultar Saldo', 'Depositar', 'Sacar', 'Sair']
        }
    ]).then(
        (answer) => {
        const action = answer['action']

        if (action === 'Criar Conta')
            console.log('Criando a conta')
            //createAccount()

        else if(action === 'Consultar Saldo')
            console.log('Consultando Saldo')
            //getAccountBalance()

        else if(action === 'Depositar')
            console.log('Depositando na sua conta')
            //deposit()

        else if(action === 'Sacar')
            console.log('Sacando da conta')
            //withdraw()

        else if(action === 'Sair')
            console.log(chalk.bgBlue.black('Obrigado por usar o Accounts App!'))
            //process.exit()

        })
    .catch(err => console.log (error));
}

//Chamamos a função
operation()