'use strict';

class CommentService {
  constructor(sequelize) {
    this._Articles = sequelize.models.Article;
    this._Comment = sequelize.models.Comment;
  }

  async findAll(articleId) {
    return this._Comment.findAll({
      where: {articleId},
      raw: true
    });
  }

  async create(articleId, comment) {
    return this._Comment.create({
      articleId,
      ...comment
    });
  }

  drop(id) {
    const deletedRows = this._Comment.destroy({
      where: {id}
    });
    return !!deletedRows;
  }
}

module.exports = CommentService;
