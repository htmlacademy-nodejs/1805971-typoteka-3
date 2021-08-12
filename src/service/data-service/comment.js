'use strict';

const {nanoid} = require(`nanoid`);

const MAX_ID_LENGTH = 6;

class CommentService {
  constructor(articles) {
    this._articles = articles;
  }

  findAll(articleId) {
    if (articleId) {
      const article = this._articles.find((item) => item.id === articleId);
      const articleComments = article.comments.reduce((acc, item) => {
        acc.push(item.text);
        return acc;
      }, []);

      return articleComments;
    }

    return this._articles.map((item)=> item.comments);
  }

  findOne(articleId, commentId) {
    const article = this._articles.find((item) => item.id === articleId);
    return article.comments.find((item) => item.id === commentId);
  }

  create(articleId, {text}) {
    const newComment = Object
      .assign({id: nanoid(MAX_ID_LENGTH), text});
    const article = this._articles.find((item) => item.id === articleId);

    article.comments.push(newComment);

    return newComment;
  }

  drop(articleId, commentId) {
    const article = this._articles.find((item) => item.id === articleId);

    if (!article) {
      return null;
    }

    const comment = article.comments.find((item) => item.id === commentId);

    if (!comment) {
      return null;
    }

    article.comments = article.comments.filter((item)=> item.id !== commentId);

    return comment;
  }
}

module.exports = CommentService;
