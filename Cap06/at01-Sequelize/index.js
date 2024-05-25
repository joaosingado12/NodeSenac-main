const express = require('express')
const app = express()
const usuario = new require('./models/usuario')
var porta = '3200'

app.use(express.urlencoded({extended:false}))
app.use(express.json())

app.get('/', (req, res)=>res.send('API - Amigo do Pet'))

app.get('/consultar/usuarios/:id?', async (req, res)=>{
    let dados = req.params.id? await usuario.findOne({where:{id:req.params.id}}) : await usuario.findAll()
    res.json(dados)
})
app.post('/cadastrar/usuarios', async (req, res)=>{
    let dados = req.body
    let respBd = await usuario.create(dados)
    res.json(respBd)
})
app.put('/atualizar/usuarios/:id', async (req, res) => {
    let id = req.params.id
    let dados = req.body
    let respBd = await usuario.update(dados, {where:{id:id}})
    res.json(respBd)
})
app.delete('/excluir/usuarios/:id', async (req, res) => {
    let id = req.params.id
    let respBd = await usuario.destroy({where:{id:id}})
    res.json(respBd)
})

app.listen(porta, ()=>console.log(`Servidor rodando em: http://localhost:${porta}`))