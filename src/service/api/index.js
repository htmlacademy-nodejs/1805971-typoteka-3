'use strict';

const {Router} = require(`express`);

const category = require(`./category`);
const search = require(`./search`);
const article = require(`./article`);
const comment = require(`../api/comment`);

const getMockData = require(`../lib/get-mock-data`);

const {
  CategoryService,
  SearchService,
  ArticleService,
  CommentService,
} = require(`../data-service`);

const app = new Router();

(async () => {
  const mockData = await getMockData();

  category(app, new CategoryService(mockData));
  search(app, new SearchService(mockData));
  comment(app, new CommentService(mockData));
  article(app, new ArticleService(mockData), new CommentService(mockData));
})();

module.exports = app;
