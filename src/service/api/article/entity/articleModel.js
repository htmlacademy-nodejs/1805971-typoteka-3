"use strict";

const {DataTypes, Model} = require(`sequelize`);

class Article extends Model {}

const define = (sequelize) => Article.init({
  announce: {
    type: DataTypes.STRING(1000),
    allowNull: false
  },
  text: {
    // eslint-disable-next-line new-cap
    type: DataTypes.STRING(1000)
  },
  title: {
    type: DataTypes.STRING(1000),
    allowNull: false
  },
}, {
  sequelize,
  modelName: `Article`,
  tableName: `articles`
});

module.exports = define;
