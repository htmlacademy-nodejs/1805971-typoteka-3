'use strict';

const {nanoid} = require(`nanoid`);
const {getDateAgo} = require(`../../utils`);

const MAX_ID_LENGTH = 6;

class ArticleService {
  constructor(articles) {
    this._articles = articles;
  }

  findAll() {
    return this._articles;
  }

  findOne(id) {
    return this._articles.find((item) => item.id === id);
  }

  create(article) {
    const newArticle = Object
      .assign({
        id: nanoid(MAX_ID_LENGTH),
        comments: [],
        createdDate: getDateAgo(0)
      },
      article);

    this._articles.push(newArticle);

    return newArticle;
  }

  drop(id) {
    const article = this._articles.find((item) => item.id === id);

    if (!article) {
      return null;
    }

    this._articles = this._articles.filter((item) => item.id !== id);
    return article;
  }

  update(id, article) {
    const oldArticle = this._articles.find((item) => item.id === id);

    return Object.assign(oldArticle, article);
  }
}

module.exports = ArticleService;
