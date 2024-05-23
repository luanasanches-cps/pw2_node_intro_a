const express = require('express') //serve para fazer requisição via internet, renderiza as rotas html, faz com que os caminhos da url
//funcionem via internet(biblioteca http)

const exphbs = require ('express-handlebars') //renderizar html na tela (engine/motor), pega os html e conforme chamamos ele monta no navegador
//engine visual

const session = require ('express-session') //manter sessões abertas(quando for mexer com banco de dados), quando queremos determinar quando
//a pessoa pode ou não acessar uma url

const FileStore = require ('session-file-store')(session) //uma entidade do "session", vamos mexer com banco dados

const flash = require('express-flash') //manipular a memória ram, apagar a memoria do servidor

const conn = require('./db/conn')

//iniciar o aplicativo
//variável
const app = express()
const Ideia = require('./models/Ideia')

const ideiaRoutes = require('./router/ideiaRoutes')
const authRoutes = require('./routes/authRoutes')

//controlador de ideias
const IdeiasController = require('./controllers/IdeiaController')

//nossa engine
app.engine('handlebars', exphbs())
app.set('view engine', 'handlebars') //motor de visualização
app.use(express.static('public')) //desvio, quer dizer que antes de continuar executando vai passar por aqui e depois continua
//ele vai pegar o que está publico e transformar em uma pasta "estática"

app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(session({
    name: 'session',
    secret: 'nosso_secreto',
    resave: false,
    saveUninitialized: false,
    store: new FileStore({
        logFn: function(){},
            path: require('path').join(require('os').tmpdir(), 'session'),
    }),
    cookie: {
        secure: false,
        maxAge: 3600000,
        expires: new Date(Date.now() + 3600000),
        httpOnly: true,
        },
    })
) 
//quando eu colocar uma url ele vai entender que vai ser chamado via json
app.use(express.json())

app.use(flash())

app.use(express.static('public'))

app.use((req, res, next) =>{
    console.log(req.session.userid)

    if(req.session.userid){ //faz um check para ver se tem usuario
        req.locals.session = rq.session //salva as informações do usuario
                                        //sem que ele precise ir no banco de dados
    }

    next() //volta na próxima linha
})
app.use('/ideias', ideiaRoutes)
app.use('/', authRoutes)
app.get('/', IdeiasController.showIdeias)


//app.get('/',(req, res) => { //ter algo para visualizar; "/" chamando a primeira página do home; "req" -> requision, "res" -> tipo uma resposta
//   res.render('layouts/main') //responder com a página "main"
//})

conn 
.sync({force: true})
.then(() => {
    app.listen(3000, () => {
        console.log('Servidor:http://localhost:3000/')
        //queremos que ela escute a porta 3000
    })
}).catch((err) => {
    console.error(`Erro do MySQL / Sequelize: ${err}`)   
});


