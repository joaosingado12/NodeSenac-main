const {Sequelize, Model, DataTypes} = require("sequelize")
const con = require("../bdConexao")
module.exports = (app)=>{
    const usuarios = con.define('usuarios', {
        id:{
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        nome:{
            allowNull: false,
            type: Sequelize.TEXT,
            defaultValue: null, 
        },
        email:{
            allowNull: false,
            type: Sequelize.TEXT,
            defaultValue: null, 
        },
        cpf:{
            allowNull: false,
            type: Sequelize.TEXT,
            defaultValue: null, 
        },
        telefone:{
            allowNull: false,
            type: Sequelize.TEXT,
            defaultValue: null, 
        },
        whatsapp:{
            allowNull: false,
            type: Sequelize.TEXT,
            defaultValue: null, 
        }
    })
    usuarios.sync()
    return usuarios
}

//Relacionamentos
//hasOne (tem um) 1 para 1
//belongsTo (pertence a) 1 para 1
//hasMany (tem muitos) 1 para N
//belongsToMany (pertence a muitos) N para N