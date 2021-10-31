'use strict';

class SearchService {
  constructor(articles) {
    this._articles = articles;
  }

  async findAll(searchText) {
    return await this._articles.filter((item) => item.title.toLowerCase().includes(searchText.toLowerCase()));
  }
}

module.exports = SearchService;
