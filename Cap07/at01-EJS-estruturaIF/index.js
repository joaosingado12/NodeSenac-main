const express = require('express')
const app = express()

var porta = '3000'
app.use(express.urlencoded({extended:true}))
app.use(express.json())

// Configura o Express p/ usar o EJS como View engine
app.set('view engine','ejs')

//Define diretório para arquivos estaticos(css, imagens, js(front-end))
app.use(express.static('public'))

//Rota padrão com parâmetros opcionais
app.get(`/:nome?/:especie?`, async (req, res)=>{
    let {nome, especie} = req.params
    
    //Responde uma view com um objeto contendo dados a serem renderizados  
    res.render('index', {nome, especie}) 
})

app.listen(porta, ()=>console.log(`Servidor rodando em: http://localhost:${porta}`))