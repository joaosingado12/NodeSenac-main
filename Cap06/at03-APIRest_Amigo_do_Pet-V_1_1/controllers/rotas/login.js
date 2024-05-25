const model = new require('../../models/usuario')
const auth = require('../usuarioController/auth')
const validacao = require('../usuarioController/validacao')

module.exports =(app)=>{
    app.post(`/login`, async (req, res)=>{
        try {
            let dados = req.body
            let validaLogin = await validacao.validarLogin(dados, model)
            if(validaLogin.autenticado){//Verifica se email e senha são consistentes
                let {id, nome, email} = validaLogin.usuario.dataValues
                dados = {id, nome, email} //Desestruturação dos dados validados
                let token = await auth.gerarToken(dados) //Gera um token JWT
                return res.json({dados, token:token}).status(200)
            } else{
                return res.json(validaLogin).status(200)
            }
            
        } catch (error) {
            return res.json(error).status(400)
        }
    })
    //Teste para verificar autenticação

    app.get('/testeAuth', auth.validarToken, async(req, res)=>{
        const usuarioAtual = req.usuarioAtual
        const token = req.token
        res.json({usuarioAtual, token})
    })
/**/
}
