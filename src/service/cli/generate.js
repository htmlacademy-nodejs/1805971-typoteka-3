'use strict';

const chalk = require(`chalk`);
const fs = require(`fs`).promises;
const path = require(`path`);
const {nanoid} = require(`nanoid`);

const {
  getRandomInt,
  shuffle,
  getDateAgo
} = require(`../../utils`);

const MAX_ID_LENGTH = 6;
const MAX_COMMENTS = 4;
const DEFAULT_COUNT = 1;
const MAX_DAYS_AGO = 90;

const FILE_NAME = `mocks.json`;
const FILE_SENTENCES_PATH = `../../data/sentences.txt`;
const FILE_TITLES_PATH = `../../data/titles.txt`;
const FILE_CATEGORIES_PATH = `../../data/categories.txt`;
const FILE_COMMENTS_PATH = `../../data/comments.txt`;

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

const writeJsonFile = async (fileName, content) => {
  try {
    await fs.writeFile(fileName, JSON.stringify(content));
  } catch (err) {
    console.error(chalk.red(err));
    throw Error(`Failed to write json file`);
  }
};

const generateComments = (count, comments) => (
  Array(count).fill({}).map(() => ({
    id: nanoid(MAX_ID_LENGTH),
    text: shuffle(comments)
      .slice(0, getRandomInt(1, 3))
      .join(` `),
  }))
);

const generateArticles = ({count, titles, categories, sentences, comments}) => (
  Array(count).fill({}).map(() => ({
    id: nanoid(MAX_ID_LENGTH),
    announce: shuffle(sentences).slice(1, 5).join(` `),
    categories: [categories[getRandomInt(0, categories.length - 1)]],
    createdDate: getDateAgo(getRandomInt(0, MAX_DAYS_AGO)),
    title: titles[getRandomInt(0, titles.length - 1)],
    comments: generateComments(getRandomInt(1, MAX_COMMENTS), comments)
  }))
);

module.exports = {
  name: `--generate`,
  async run(args) {
    const [count] = args;
    const countArticle = Number.parseInt(count, 10) || DEFAULT_COUNT;

    if (countArticle > 1000) {
      console.info(chalk.red(`Не больше 1000 публикаций`));
      throw Error(`Error: No more than 1000 publications`);
    }

    const [sentences, titles, categories, comments] = await Promise.all([
      readContent(FILE_SENTENCES_PATH),
      readContent(FILE_TITLES_PATH),
      readContent(FILE_CATEGORIES_PATH),
      readContent(FILE_COMMENTS_PATH)
    ]);

    const content = generateArticles({count: countArticle, titles, categories, sentences, comments});

    try {
      await writeJsonFile(FILE_NAME, content);

      console.info(chalk.green(`Operation success. File created.`));
    } catch (error) {
      const errorMesageReadFile = `Can't write data to file...`;

      console.error(chalk.red(errorMesageReadFile));
      throw Error(errorMesageReadFile);
    }
  }
};
