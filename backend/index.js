const express = require('express')
const app = express()
const cors = require('cors')

const conn = require('./db/conn')

const PORT = 3000
const hostname = 'localhost'

const authController = require('./controller/auth.controller')
const authMiddleware = require('./middleware/auth.middleware')
const clienteController = require('./controller/cliente.controller')
const equipamentoController = require('./controller/equipamento.controller')
const funcionarioController = require('./controller/funcionario.controller')
const vistoriaController = require('./controller/vistoria.controller')

app.use(express.urlencoded({extends: true}))
app.use(express.json())
app.use(cors())



// rotas publicas
app.post('/funcionario',funcionarioController.cadastrar)
app.post('/login',authController.login)


app.get(authMiddleware)

// rotas privadas

app.post('/cliente',clienteController.cadastrar)
app.post('/equipamento',equipamentoController.cadastrar)
app.post('/vistoria',vistoriaController.cadastrar)

conn.sync()
    .then(()=>{
        app.listen(PORT, hostname, ()=>{
            console.log(`Servidor rodando em http://${hostname}:${PORT}`)
        })
    })
    .catch((err)=>{
        console.error('Erro ao rodar o servidor',err)
})