'use strict';

const axios = require(`axios`);

class API {
  constructor(baseURL, timeout) {
    this._http = axios.create({
      baseURL,
      timeout
    });
  }

  async getArticles({withComments} = {}) {
    return await this._load(`/articles`, {params: {withComments}});
  }

  async getArticle({id, withComments}) {
    return await this._load(`/articles/${id}`, {params: {withComments}});
  }

  search(query) {
    return this._load(`/search`, {params: {query}});
  }

  async getCategories(withCount) {
    return this._load(`/categories`, {params: {withCount}});
  }

  async getComment() {
    return this._load(`/comments`);
  }

  async createArticles(data) {
    return this._load(`/articles`, {
      method: `POST`,
      data
    });
  }

  editArticle({id, data}) {
    return this._load(`/articles/${id}`, {
      method: `PUT`,
      data
    });
  }

  async _load(url, options) {
    const response = await this._http.request({url, ...options});
    return response.data;
  }
}

const TIMEOUT = 1000;
const port = process.env.API_PORT || 3001;
const defaultUrl = `http://localhost:${port}/api/`;

const defaultAPI = new API(defaultUrl, TIMEOUT);

module.exports = {
  API,
  getAPI: () => defaultAPI
};
