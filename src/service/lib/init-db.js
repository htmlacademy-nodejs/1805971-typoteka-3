"use strict";

const defineModels = require(`../models`);
const Aliase = require(`../models/aliase`);

module.exports = async (sequelize, {articles, categories}) => {
  const {Category, Article} = defineModels(sequelize);

  await sequelize.sync({force: true});

  await Category.bulkCreate(
      categories.map((item) => ({name: item}))
  );

  const articlesPromises = articles.map(async (article) => {
    const articleModel = await Article.create(article, {include: [Aliase.COMMENTS]});

    await articleModel.addCategories(article.categories);
  });

  await Promise.all(articlesPromises);
};
