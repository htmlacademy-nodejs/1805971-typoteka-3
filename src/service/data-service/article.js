'use strict';

const {nanoid} = require(`nanoid`);
const {getDateAgo} = require(`../../utils`);

const MAX_ID_LENGTH = 6;

class ArticleService {
  constructor(articles) {
    this._articles = articles;
  }

  async findAll() {
    return await this._articles;
  }

  async findOne(id) {
    return await this._articles.find((item) => item.id === id);
  }

  async create(article) {
    const newArticle = Object
      .assign({
        id: nanoid(MAX_ID_LENGTH),
        comments: [],
        createdDate: getDateAgo(0)
      },
      article);

    await this._articles.push(newArticle);

    return newArticle;
  }

  async drop(id) {
    const article = await this._articles.find((item) => item.id === id);

    if (!article) {
      return null;
    }

    this._articles = this._articles.filter((item) => item.id !== id);

    return article;
  }

  async update(id, article) {
    const oldArticle = await this._articles.find((item) => item.id === id);

    return Object.assign(oldArticle, article);
  }
}

module.exports = ArticleService;
