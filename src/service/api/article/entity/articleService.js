'use strict';

const Aliase = require(`../../../models/aliase`);

class ArticleService {
  constructor(sequelize) {
    this._Articles = sequelize.models.Article;
    this._Comment = sequelize.models.Comment;
    this._Category = sequelize.models.Category;
  }

  async findAll(needComments) {
    const include = [Aliase.CATEGORIES];

    if (needComments) {
      include.push(Aliase.COMMENTS);
    }

    const articles = await this._Articles.findAll({
      include,
      order: [
        [`createdAt`, `DESC`]
      ]
    });

    return articles.map((item) => item.get());
  }

  async findOne({articleId, withComments}) {
    const options = {
      include: [
        Aliase.CATEGORIES
      ],
      where: [{
        id: articleId
      }]
    };

    if (withComments) {
      options.include.push({
        model: this._Comment,
        as: Aliase.COMMENTS,
      });

      options.order = [
        [{model: this._Comment, as: Aliase.COMMENTS}, `createdAt`, `DESC`]
      ];
    }

    return await this._Articles.findOne(options);
  }

  async create(articleData) {
    const article = await this._Articles.create(articleData);
    await article.addCategories(articleData.categories);
    return article.get();
  }

  async drop(id) {
    const deletedRows = await this._Articles.destroy({
      where: {id}
    });
    return !!deletedRows;
  }

  async update(id, article) {
    const [affectedRows] = await this._Articles.update(article, {
      where: {id}
    });
    return !!affectedRows;
  }
}

module.exports = ArticleService;
