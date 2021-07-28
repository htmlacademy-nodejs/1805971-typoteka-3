'use strict';

const {HttpCode} = require(`../../constants`);

module.exports = (service) => async (req, res, next) => {
  const {articleId, commentId} = req.params;
  const comment = await service.findOne(articleId, commentId);

  if (!comment) {
    return res.status(HttpCode.NOT_FOUND)
      .send(`Comment with ${commentId} not found`);
  }

  return next();
};
