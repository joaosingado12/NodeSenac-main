const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors())
const axios = require('axios')
const consign=require('consign')
var porta = '3001'

//Variavel global que define a url do servidor da API
global.urlServer = 'http://localhost:3200'

// Configura o Express p/ usar o EJS como View engine
app.set('view engine','ejs')

app.use(express.urlencoded({extended:true}))
app.use(express.json())

//Define diretório para arquivos estaticos(css, imagens, js(front-end))
app.use(express.static('public'))

consign()
    .include('./controllers/rotas')
    .into(app)

app.get(`/`, async (req, res)=>{
    const rota = 'consultar/pets'
    let uri=`${urlServer}/${rota}`
    let dados = await axios.get(uri)
    dados = [...dados.data]
    res.render('index', {dados:dados})
})

app.listen(porta, ()=>console.log(`Servidor rodando em: http://localhost:${porta}`))