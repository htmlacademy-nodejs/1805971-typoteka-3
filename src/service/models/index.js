'use strict';

const Aliase = require(`./aliase`);
const {Model} = require(`sequelize`);

const defineCategory = require(`../api/category/entity/categoryModel`);
const defineComment = require(`../api/comment/entity/commentModel`);
const defineArticle = require(`../api/article/entity/articleModel`);

class ArticleCategory extends Model {}

const define = (sequelize) => {
  const Category = defineCategory(sequelize);
  const Comment = defineComment(sequelize);
  const Article = defineArticle(sequelize);

  Article.hasMany(Comment, {as: Aliase.COMMENTS, foreignKey: `ArticleId`, onDelete: `cascade`});
  Comment.belongsTo(Article, {foreignKey: `articleId`});

  ArticleCategory.init({}, {sequelize});


  Article.belongsToMany(Category, {through: ArticleCategory, as: Aliase.CATEGORIES});
  Category.belongsToMany(Article, {through: ArticleCategory, as: Aliase.ARTICLES});
  Category.hasMany(ArticleCategory, {as: Aliase.ARTICLE_CATEGORIES});

  return {Category, Comment, Article, ArticleCategory};
};

module.exports = define;
