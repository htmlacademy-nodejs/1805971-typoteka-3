'use strict';

const chalk = require(`chalk`);
const fs = require(`fs`).promises;
const path = require(`path`);
const {getLogger} = require(`../lib/logger`);

const sequelize = require(`../lib/sequelize`);
const initDatabase = require(`../lib/init-db`);

const {
  getRandomInt,
  shuffle,
} = require(`../../utils`);

const MAX_COMMENTS = 4;
const DEFAULT_COUNT = 1;

const FILE_SENTENCES_PATH = `../../data/sentences.txt`;
const FILE_TEXT_PATH = `../../data/text.txt`;
const FILE_TITLES_PATH = `../../data/titles.txt`;
const FILE_CATEGORIES_PATH = `../../data/categories.txt`;
const FILE_COMMENTS_PATH = `../../data/comments.txt`;

const logger = getLogger({});

const readContent = async (filePath) => {
  const absolutePath = path.join(__dirname, filePath);

  try {
    const content = await fs.readFile(absolutePath, `utf8`);
    return content.split(`\n`);
  } catch (err) {
    console.error(chalk.red(err));
    throw Error(`Failed to read file`);
  }
};


const generateComments = (count, comments) => (
  Array(count).fill({}).map(() => ({
    text: shuffle(comments)
      .slice(0, getRandomInt(1, 3))
      .join(` `),
  }))
);

const generateArticles = ({count, text, titles, categoriesCount, sentences, comments}) => (
  Array(count).fill({}).map(() => ({
    announce: shuffle(sentences).slice(1, 5).join(` `),
    categories: [getRandomInt(1, categoriesCount)],
    title: titles[getRandomInt(0, titles.length - 1)],
    text: text[getRandomInt(0, text.length - 1)],
    comments: generateComments(getRandomInt(1, MAX_COMMENTS), comments)
  }))
);

module.exports = {
  name: `--filldb`,
  async run(args) {
    try {
      logger.info(`Trying to connect to database...`);
      await sequelize.authenticate();
    } catch (err) {
      logger.error(`An error occurred: ${err.message}`);
      process.exit(1);
    }

    logger.info(`Connection to database established`);

    const [count] = args;
    const countArticle = Number.parseInt(count, 10) || DEFAULT_COUNT;

    if (countArticle > 1000) {
      logger.info(chalk.red(`Не больше 1000 публикаций`));
      throw Error(`Error: No more than 1000 publications`);
    }

    const [sentences, text, titles, categories, comments] = await Promise.all([
      readContent(FILE_SENTENCES_PATH),
      readContent(FILE_TEXT_PATH),
      readContent(FILE_TITLES_PATH),
      readContent(FILE_CATEGORIES_PATH),
      readContent(FILE_COMMENTS_PATH)
    ]);

    const articles = generateArticles({count: countArticle, text, titles, categoriesCount: categories.length, sentences, comments});

    return initDatabase(sequelize, {articles, categories});
  }
};
