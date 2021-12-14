'use strict';

const {Router} = require(`express`);

const {HttpCode} = require(`../../../constants`);
const {
  articleValidator,
  articleExist,
  commentValidator,
  commentExist
} = require(`./validators`);

const route = new Router();

module.exports = (app, articleService, commentService) => {
  app.use(`/articles`, route);

  route.get(`/`, async (req, res) => {
    const articles = await articleService.findAll();

    res.status(HttpCode.OK)
      .json(articles);
  });

  route.post(`/`, articleValidator, async (req, res) => {
    const article = await articleService.create(req.body);

    return res.status(HttpCode.CREATED)
      .json(article);
  });

  route.put(`/:articleId`, [articleValidator, articleExist(articleService)], async (req, res) => {
    const {articleId} = req.params;
    const article = await articleService.update(articleId, req.body);

    return res.status(HttpCode.OK)
      .json(article);
  });

  route.delete(`/:articleId`, articleExist(articleService), async (req, res) => {
    const {articleId} = req.params;
    const article = await articleService.drop(articleId);

    return res.status(HttpCode.OK)
      .json(article);
  });

  route.get(`/:articleId`, articleExist(articleService), async (req, res) => {

    const {articleId} = req.params;
    const {withComments} = req.query;
    const article = await articleService.findOne({articleId, withComments});

    if (!article) {
      return res.status(HttpCode.NOT_FOUND)
        .send(`Not found with ${articleId}`);
    }

    return res.status(HttpCode.OK)
        .json(article);
  });

  route.get(`/:articleId/comments`, articleExist(articleService), async (req, res) => {
    const {articleId} = req.params;
    const comment = await commentService.findAll(articleId);

    return res.status(HttpCode.OK)
    .json(comment);
  });


  route.post(`/:articleId/comments`, [articleExist(articleService), commentValidator], async (req, res) => {
    const {articleId} = req.params;
    const comment = await commentService.create(articleId, req.body);

    return res.status(HttpCode.CREATED)
    .json(comment);
  });

  route.delete(`/:articleId/comments/:commentId`, [articleExist(articleService), commentExist(commentService), commentValidator], async (req, res) => {
    const {articleId, commentId} = req.params;
    const comment = await commentService.drop(articleId, commentId);

    return res.status(HttpCode.OK)
    .json(comment);
  });
};
