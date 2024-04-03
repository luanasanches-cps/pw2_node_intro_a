const inquirer = require('inquirer') //Coleta informações
const chalk =  require('chalk') //Serve para colorir
const fs = require('fs'); //Modulo interno do Node
const { error } = require('console');

console.log("--||Iniciamos o Accounts||--")

operation()

//operação
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
            getAccountBalance()
        }

        else if(action === 'Depositar')
        {
            deposit()
        }

        else if(action === 'Sacar')
        {
            withdraw()
        }

        else if(action === 'Sair')
        {
            console.log(chalk.bgBlue.black('Obrigado por usar o Accounts App!'))
            //process.exit()
        }
        })
    .catch(err => console.log (error));
}

//criando a conta
function createAccount()
{
    console.log(chalk.bgGreen.white('Obrigado por utilizar o Accounts Bank!'))
    console.log(chalk.green('Vamos definicir as opções da sua conta?'))

    buildAccount()
}

//Construindo a conta
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
        fs.writeFileSync(
            `cheque/${accountName}.json`,
            `{"balance": 2000}`,
            function(err){
                console.error(err)
            }
        )
        
            console.info(chalk.bgGreen.white('Bem vindo(a) ao Accounts Bank: ' + accountName))
            console.info(chalk.bgGreen.white('Você acabou de ganhar R$2.000,00 de cheque especial!'))
            console.info(chalk.green('Obrigado pela preferência!'))

        operation()
    }) 
}

//Depositar
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

//Checa a existencia da conta
function checkAccount(accountName){
    if(!fs.existsSync(`accounts/${accountName}.json`)){
        console.error(chalk.bgRed.black(`A conta ${accountName} não existe! Tente outro nome`))
        return false
    }
    return true
}

//Depositar dinheiro na conta
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

//Pegar o valor da conta
function getAccount(accountName){
    const accountJson = fs.readFileSync(`accounts/${accountName}.json`, {
        encoding: 'utf-8',
        flag: 'r'
    })
    return JSON.parse(accountJson)
}

//Pegar o valor do cheque
function getCheque(accountName){
    const chequeJson = fs.readFileSync(`cheque/${accountName}.json`, {
        encoding: 'utf-8',
        flag: 'r'
    })
    return JSON.parse(chequeJson)
}

//criando a função de saque
function withdraw(){
    inquirer.prompt([{
            name: 'accountName',
            message: 'De qual conta deseja realizar o saque: ',
        }
    ]).then((answer) => {
        const accountName = answer['accountName']
        
        if(!checkAccount(accountName)){
            console.error(chalk.bgRed.white('Está conta não existe!'))

            return withdraw()
        }

        inquirer.prompt([{
                name: 'amount',
                message: 'Qual valor deseja retirar da conta?',
            }
        ]).then((answer) => {
            //as variaveis sao locais, então depois de ser utilizada ela é apagada, então não existe problema em usar ela dnv
            const amount = answer['amount']

            removeAmount(accountName, amount)
            operation()
        })
    })
}

//Remover dinheiro da conta e desconto do cheque
function removeAmount(accountName, amount){
    const accountData = getAccount(accountName)
    const chequeData = getCheque(accountName)

    if(!amount){
        console.log(chalk.bgRed.white('Um erro ocorreu, tente mais tarde.'))
        return withdraw()
    }

    if(accountData.balance < amount){
        
    accountData.balance = parseFloat(accountData.balance) + parseFloat(chequeData.balance) - parseFloat(amount)

    fs.writeFileSync(
        `cheque/${accountName}.json`,
        JSON.stringify(chequeData),
        function (err){
            console.error(err)
        }
    )

        if(accountData.balance < amount){
            console.error(chalk.bgRed.white('O valor não está disponível pois é menor do que o valor que você possui!'))
             return withdraw()
        }
    }

    accountData.balance = parseFloat(accountData.balance) - parseFloat(amount)

    fs.writeFileSync(
        `accounts/${accountName}.json`,
        JSON.stringify(accountData),
        function (err){
            console.error(err)
        }
    )

    console.info(chalk.bgBlueBright.blue(`O valor: ${amount} foi retirado da conta: ${accountName}`))
    console.info(chalk.bgRed.white(`Foi percebido que o valor retirado era menor que o saldo que o usuário possuía!`))
    console.info(chalk.bgRed.white(`Foi descontado do seu Cheque Especial! Valor do Cheque atual: ${chequeData.balance}`))
}

//validar saldo da conta e do cheque
function getAccountBalance(){
    inquirer.prompt([
        {
            name: 'accountName',
            message: 'Qual conta deseja validar o saldo: ',
        }
    ]).then((answer) => {
        const accountName = answer['accountName']

        if(!checkAccount(accountName)){
            return getAccountBalance()
        }

        const accountData = getAccount(accountName)
        const chequeData = getCheque(accountName)

        console.info(chalk.bgGreen.white(`A conta: ${accountName}, tem saldo de: ${accountData.balance}`))
        console.info(chalk.bgBlue.green(`E de saldo de cheque especial de: ${chequeData.balance}`))

        operation()
    })
}