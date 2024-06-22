const model = new require('../../models/doacao')
const usuario = new require('../../models/usuario')
const pet = new require('../../models/pet')
const rota = 'doacoes'
module.exports = (app)=>{
    app.get(`/consultar/${rota}/:id?`, async (req, res)=>{
        try {
            let dados = req.params.id? 
                await model.findOne({include:[{model:usuario}, {model:pet}]}, {where:{id:req.params.id}}) : 
                await model.findAll({include:[{model:usuario}, {model:pet}]}, {raw: true, order:[['id','DESC']]})
            res.json(dados).status(200)
        } catch (error) {
            res.json(error).status(400)
        }
    })
    app.post(`/cadastar/${rota}`, async (req, res)=>{
        try {
            let dados = req.body
            let respBd = await model.create(dados)
            res.json(respBd).status(200)
        } catch (error) {
            res.json(error).status(400)
        }
    })
    app.put(`/atualizar/${rota}/:id`, async (req, res) => {
        try {
            let id = req.params.id
            let dados = req.body
            let respBd = await model.update(dados, {where:{id:id}})
            res.json(respBd)
        } catch (error) {
            res.json(error).status(400)
        }
    })
    app.delete(`/excluir/${rota}/:id`, async (req, res) => {
        try {
            let id = req.params.id
            let respBd = await model.destroy({where:{id:id}})
            res.json(respBd)
        } catch (error) {
            res.json(error).status(400)
        }
    })
}