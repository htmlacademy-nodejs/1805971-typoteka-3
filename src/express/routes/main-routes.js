'use strict';

const {Router} = require(`express`);
const api = require(`../api`).getAPI();

const mainRouter = new Router();

mainRouter.get(`/`, async (req, res) => {
  const articles = await api.getArticles();

  res.render(`main/main`, {articles});
});

mainRouter.get(`/register`, (req, res) => res.render(`main/sign-up`));
mainRouter.get(`/login`, (req, res) => res.render(`main/login`));
mainRouter.get(`/categories`, (req, res) => res.render(`admin/all-categories`));

mainRouter.get(`/search`, async (req, res) => {
  const {query} = req;

  try {
    let articlesResult = ``;

    if (query.hasOwnProperty(`search`)) {
      articlesResult = await api.search(query.search);
    }

    res.render(`main/search`, {articlesResult, query: query.search});
  } catch (errors) {
    res.render(`main/search`, {articlesResult: [], query: query.search});
  }
});

module.exports = mainRouter;
