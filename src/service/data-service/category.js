'use strict';

class CategoryService {
  constructor(articles) {
    this._articles = articles;
  }

  async findAll() {
    const categories = await this._articles.reduce((acc, article) => {
      article.categories.forEach((category) => acc.add(category));
      return acc;
    }, new Set());

    return [...categories];
  }
}

module.exports = CategoryService;
