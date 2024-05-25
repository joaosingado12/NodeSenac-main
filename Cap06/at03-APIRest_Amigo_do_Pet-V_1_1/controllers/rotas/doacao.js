const model = new require('../../models/doacao')
const usuario = new require('../../models/usuario')
const pet = new require('../../models/pet')
const rota = 'doacoes'
module.exports = (app)=>{
    app.get(`/consultar/${rota}/:id?`, async (req, res)=>{
            let dados = req.params.id? 
                await model.findOne({include:[{model:usuario}, {model:pet}]}, {where:{id:req.params.id}}) : 
                await model.findAll({include:[{model:usuario}, {model:pet}]}, {raw: true, order:[['id','DESC']]})
            res.json(dados).status(200)
    })
    app.post(`/cadastar/${rota}`, async (req, res)=>{
            let dados = req.body
            let respBd = await model.create(dados)
            res.json(respBd).status(200)
    })
    app.put(`/atualizar/${rota}/:id`, async (req, res) => {
            let id = req.params.id
            let dados = req.body
            let respBd = await model.update(dados, {where:{id:id}})
            res.json(respBd)
    })
    app.delete(`/excluir/${rota}/:id`, async (req, res) => {
            let id = req.params.id
            let respBd = await model.destroy({where:{id:id}})
            res.json(respBd)
    })
}