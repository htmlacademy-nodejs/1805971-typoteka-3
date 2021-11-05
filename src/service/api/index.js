'use strict';

const {Router} = require(`express`);

const category = require(`./category/category`);
const search = require(`./search/search`);
const article = require(`./article/article`);
const comment = require(`./comment/comment`);

const getMockData = require(`../lib/get-mock-data`);

const ArticleService = require(`./article/entity/article`);
const CategoryService = require(`./category/entity/category`);
const CommentService = require(`./comment/entity/comment`);
const SearchService = require(`./search/entity/search`);

const app = new Router();

(async () => {
  const mockData = await getMockData();

  category(app, new CategoryService(mockData));
  search(app, new SearchService(mockData));
  comment(app, new CommentService(mockData));
  article(app, new ArticleService(mockData), new CommentService(mockData));
})();

module.exports = app;
