'use strict';

const {Router} = require(`express`);

const upload = require(`../middlewares/upload`);
const api = require(`../api`).getAPI();

const articlesRouter = new Router();

const createNewArticle = ({date, title, announcement, categories}) => (
  {
    createdDate: date,
    announce: announcement,
    title,
    categories: categories || []
  }
);

articlesRouter.get(`/add`, (req, res) => res.render(`articles/new-post`));
articlesRouter.get(`/category/:id`, (req, res) => res.render(`articles/articles-by-category`));

articlesRouter.get(`/edit/:id`, async (req, res) => {
  const {id} = req.params;
  const article = await api.getArticle({id});

  res.render(`articles/article-edit`, {article});
});

articlesRouter.get(`/:id`, async (req, res) => {
  const {id} = req.params;
  const article = await api.getArticle({id, withComments: true});

  res.render(`articles/post`, {article});
});

articlesRouter.post(`/add`, upload.single(`avatar`), async (req, res) => {
  const {body} = req;
  const articleData = await createNewArticle(body);

  try {
    await api.createArticles(articleData);

    res.redirect(`/my`);
  } catch (errors) {
    const categories = await api.getCategories();

    res.render(`articles/new-post-fill`, {article: articleData, categories});
  }
});

articlesRouter.post(`/edit/:id`, upload.single(`avatar`), async (req, res) => {
  const {body} = req;
  const {id} = req.params;
  const articleData = await createNewArticle(body);

  try {
    await api.editArticle({id, data: articleData});

    res.redirect(`/my`);
  } catch (errors) {
    const categories = await api.getCategories();
    articleData.id = id;

    res.render(`articles/article-edit`, {article: articleData, categories});
  }
});

module.exports = articlesRouter;
