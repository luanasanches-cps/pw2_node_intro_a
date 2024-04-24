const express = require('express') //serve para fazer requisição via internet, renderiza as rotas html, faz com que os caminhos da url
//funcionem via internet(biblioteca http)

const exphbs = require ('express-handlebars') //renderizar html na tela (engine/motor), pega os html e conforme chamamos ele monta no navegador
//engine visual

const session = require ('express-session') //manter sessões abertas(quando for mexer com banco de dados), quando queremos determinar quando
//a pessoa pode ou não acessar uma url

const FileStore = require ('session-file-store')(session) //uma entidade do "session", vamos mexer com banco dados

const fals = require('express-flash') //manipular a memória ram, apagar a memoria do servidor

//iniciar o aplicativo
//variável
const app = express()

//nossa engine
app.engine('handlebars', exphbs())
app.set('view engine', 'handlebars') //motor de visualização
app.use(express.static('public')) //desvio, quer dizer que antes de continuar executando vai passar por aqui e depois continua
//ele vai pegar o que está publico e transformar em uma pasta "estática"
app.get('/',(req, res) => { //ter algo para visualizar; "/" chamando a primeira página do home; "req" -> requision, "res" -> tipo uma resposta
    res.render('layouts/main') //responder com a página "main"
})

//queremos que ela escute a porta 3000
app.listen(3000, () => {
    console.log('Servidor:http://localhost:3000/')
})

