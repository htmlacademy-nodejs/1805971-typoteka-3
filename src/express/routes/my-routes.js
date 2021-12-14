'use strict';

const {Router} = require(`express`);
const api = require(`../api`).getAPI();

const myRouter = new Router();

myRouter.get(`/`, async (req, res) => {
  const articles = await api.getArticles({withComments: true});

  res.render(`admin/my`, {articles});
});

myRouter.get(`/comments`, async (req, res) => {
  const articles = await api.getArticles({withComments: true});

  res.render(`admin/comments`, {articles, myRouter});
});

module.exports = myRouter;
