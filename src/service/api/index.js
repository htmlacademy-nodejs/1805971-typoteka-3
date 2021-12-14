'use strict';

const {Router} = require(`express`);

const sequelize = require(`../lib/sequelize`);
const defineModels = require(`../models`);

const category = require(`./category/category`);
const search = require(`./search/search`);
const article = require(`./article/article`);
const comment = require(`./comment/comment`);

const ArticleService = require(`./article/entity/articleService`);
const CategoryService = require(`./category/entity/categoryService`);
const CommentService = require(`./comment/entity/commentService`);
const SearchService = require(`./search/entity/searchService`);

const app = new Router();

defineModels(sequelize);

(async () => {
  category(app, new CategoryService(sequelize));
  search(app, new SearchService(sequelize));
  comment(app, new CommentService(sequelize));
  article(app, new ArticleService(sequelize), new CommentService(sequelize));
})();

module.exports = app;
