const inquirer = require('inquirer') //Coleta informações
const chalk =  require('chalk') //Serve para colorir
const fs = require('fs'); //Modulo interno do Node
const { error } = require('console');

console.log("--||Iniciamos o Accounts||--")

operation()

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
        {
            createAccount()
        }

        else if(action === 'Consultar Saldo')
        {
            console.log('Consultando Saldo')
            //getAccountBalance()
        }

        else if(action === 'Depositar')
        {
            deposit()
        }

        else if(action === 'Sacar')
        {
            console.log('Sacando da conta')
            //withdraw()
        }

        else if(action === 'Sair')
        {
            console.log(chalk.bgBlue.black('Obrigado por usar o Accounts App!'))
            //process.exit()
        }
        })
    .catch(err => console.log (error));
    }

function createAccount()
{
    console.log(chalk.bgGreen.white('Obrigado por utilizar o Accounts Bank!'))
    console.log(chalk.green('Vamos definicir as opções da sua conta?'))

    buildAccount()
}

function buildAccount()
{
    inquirer.prompt([
        {
            name: 'accountName',
            message: 'Forneça o nome para sua conta no Accounts Bank.'
        }
    
    //O usuario pode ou não responder
    ]).then((answer) => {
        const accountName = answer['accountName']
        
        //Se o fire system detectar que a pasta accounts não existir
        //o existssync checa a existencia
        if(!fs.existsSync('accounts'))
        {
            //Diretório
            fs.mkdirSync('accounts')
        }

        //template string para usar variavel ali dentro
        //estou checando se a conta.json da pessoa existe
        if(fs.existsSync(`accounts/${accountName}.json`))
        {
            console.info(chalk.bgRed.black(`A conta: ${accountName} já existe.`))
            console.info(chalk.bgRed.black(`Escolha outro nome: `))

            //vai voltar lá para cima para refazer com outro nome
            buildAccount(accountName)
        }
        
        fs.writeFileSync(
            `accounts/${accountName}.json`,
            `{"balance": 0}`,
            function(err){
                console.error(err)
            }
        )
            console.info(chalk.bgGreen.white('Bem vindo(a) ao Accounts Bank: ' + accountName))
            console.info(chalk.green('Obrigado pela preferência!'))

        operation()
    }) 
}

function deposit(){
    inquirer.prompt([
        {
            name: 'accountName',
            message: 'Qual conta deseja depositar?'
        }
    ]).then((answer) => {
        const accountName = answer['accountName']

        if(!checkAccount(accountName))
        {
            return deposit()
        }

        inquirer.prompt([
            {
                name: 'amount',
                message: 'Quanto deseja depositar: '
            }
        ]).then((answer) => {
            const amount = answer['amount']

            addAmount(accountName, amount)
            operation()
        })
    })
}

function checkAccount(accountName){
    if(!fs.existsSync(`accounts/${accountName}.json`)){
        console.error(chalk.bgRed.black(`A conta ${accountName} não existe! Tente outro nome`))
        return false
    }
    return true
}

function addAmount(accountName, amount){
    const accountData = getAccount(accountName)

    if(!amount){
        console.error(chalk.bgRed.black('Valor Inválido'))
        deposit()
    }
    accountData.balance = parseFloat(amount) + parseFloat(accountData.balance)

    fs.writeFileSync(
        `accounts/${accountName}.json`,
        JSON.stringify(accountData),
        
        function (err){
            console.error(err)
        }
    )

    console.info(chalk.bgGreen.white(`O valor: ${amount}, foi depositado.`))
}

function getAccount(accountName){
    const accountJson = fs.readFileSync(`accounts/${accountName}.json`, {
        encoding: 'utf-8',
        flag: 'r'
    })
    return JSON.parse(accountJson)
}