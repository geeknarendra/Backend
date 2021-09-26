const { DataTypes } = require('sequelize')
const sequelize = require ('../database')


const User = sequelize.define('users', {
    fullName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false
    },
    role:{
        type: DataTypes.STRING,
        default: 'user'
    }
})

module.exports = User