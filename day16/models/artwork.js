const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const ArtWork = sequelize.define('ArtWork', {
    Title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Date: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Medium: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Dimensions: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = ArtWork