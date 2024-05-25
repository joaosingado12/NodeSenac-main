const model = new require('../../models/usuario')
const auth = require('../usuarioController/auth')
const validacao = require('../usuarioController/validacao')
const rota = 'usuarios'
module.exports = (app)=>{
    app.get(`/${rota}/:id?`, async (req, res)=>{
        try {
            let dados = req.params.id? await model.findByPk(req.params.id) : await model.findAll()
            res.json(dados).status(200)
        } catch (error) {
            res.json(error).status(400)
        }
    })
    app.post(`/${rota}`, async (req, res)=>{
        let dados = req.body
            let dadosLogin = await validacao.validarCadastro(dados, model)
            if (dadosLogin.validacao){
                dados.senha = await auth.criptografarSenha(dados.senha)
                let respBd = await model.create(dados)
                delete respBd.dataValues.senha
                res.json(respBd).status(201)
            } else {
                res.json(dadosLogin).status(200)
            }
        try {
            console.log(dados)
            
        } catch (error) {
            res.json(error).status(422)
        }
    })
    app.put(`/${rota}/:id`, auth.validarToken, async (req, res) => {
        try {
            let id = req.params.id
            let {nome, cpf, telefone, whatsapp} = req.body
            //Para evitar atualizaçção de dados de Login, atualizar estes dados exigem regras específicas de validação
            let dados = {nome:nome, cpf:cpf, telefone:telefone, whatsapp}
            console.log(dados)
            let respBd = await model.update(dados, {where:{id:id}})
            console.log(respBd)
            res.json(respBd).status(200)            
        } catch (error) {
            res.json(error).status(400)
        }
    })
    app.delete(`/${rota}/:id`, auth.validarToken, async (req, res) => {
        try {
            let id = req.params.id
            let respBd = await model.destroy({where:{id:id}})
            res.json(respBd)
        } catch (error) {
            res.json(error).status(400)
        }
    })
}