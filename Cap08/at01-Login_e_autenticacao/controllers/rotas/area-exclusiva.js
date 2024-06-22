module.exports = (app)=>{
    app.get('/area-exclusiva', (req, res)=>{
        const token = req.headers.cookie.split('=')[1];
        if (token!==undefined){
            dados.autenticado=true
            dados.tonken=token
            res.render('area-exclusiva', {dados})
        }
    })
}