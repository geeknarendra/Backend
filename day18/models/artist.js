const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const Artist = sequelize.define(
  "Artist",
  {
    Name: {
      field: "Name",
      type: DataTypes.STRING,
      allowNull: false,
    },
    Nationality: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Gender: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    "Birth Year": {
      type: DataTypes.STRING,
      allowNull: false,
    },
    "Death Year": {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    indexes: [
      {
        name: "Artist_trigrm",
        concurrently: true,
        using: "GIN",
        fields: [sequelize.literal('"Name" gin_trgm_ops')],
      },
    ],
  }
);

module.exports = Artist;
