'use strict';

const express = require(`express`);
const request = require(`supertest`);

const article = require(`./article`);
const DataService = require(`../data-service/article`);
const CommentService = require(`../data-service/comment`);

const {HttpCode} = require(`../../constants`);

const mockData = [
  {
    "id": `j2E3Sl`,
    "announce": `Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать. Это один из лучших рок-музыкантов. Достичь успеха помогут ежедневные повторения. Из под его пера вышло 8 платиновых альбомов.`,
    "category": [
      `Музыка`
    ],
    "createdDate": `2021-05-12 06:19:21`,
    "title": `Как достигнуть успеха не вставая с кресла`,
    "comments": [
      {
        "id": `yPfpsK`,
        "text": `Согласен с автором!`
      },
      {
        "id": `qElDnP`,
        "text": `Давно не пользуюсь стационарными компьютерами. Ноутбуки победили. Мне не нравится ваш стиль. Ощущение, что вы меня поучаете.`
      },
      {
        "id": `V06BjT`,
        "text": `Планируете записать видосик на эту тему?`
      },
      {
        "id": `uEXy-M`,
        "text": `Мне не нравится ваш стиль. Ощущение, что вы меня поучаете. Согласен с автором!`
      }
    ]
  },
  {
    "id": `TxjMjj`,
    "announce": `Игры и программирование разные вещи. Не стоит идти в программисты если вам нравятся только игры. Он написал больше 30 хитов. Простые ежедневные упражнения помогут достичь успеха. Достичь успеха помогут ежедневные повторения.`,
    "category": [
      `Деревья`
    ],
    "createdDate": `2021-07-18 06:19:21`,
    "title": `Что такое золотое сечение`,
    "comments": [
      {
        "id": `uzDODQ`,
        "text": `Давно не пользуюсь стационарными компьютерами. Ноутбуки победили. Совсем немного...`
      },
      {
        "id": `vtfdBv`,
        "text": `Плюсую, но слишком много буквы! Мне не нравится ваш стиль. Ощущение, что вы меня поучаете. Давно не пользуюсь стационарными компьютерами. Ноутбуки победили.`
      },
      {
        "id": `O3AlCl`,
        "text": `Мне кажется или я уже читал это где-то? Давно не пользуюсь стационарными компьютерами. Ноутбуки победили. Совсем немного...`
      },
      {
        "id": `AuZwqD`,
        "text": `Мне не нравится ваш стиль. Ощущение, что вы меня поучаете. Плюсую, но слишком много буквы! Это где ж такие красоты?`
      }
    ]
  },
  {
    "id": `4gAPkz`,
    "announce": `Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами. Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле? Золотое сечение — соотношение двух величин гармоническая пропорция. Собрать камни бесконечности легко если вы прирожденный герой.`,
    "category": [
      `Деревья`
    ],
    "createdDate": `2021-06-21 06:19:21`,
    "title": `Что такое золотое сечение`,
    "comments": [
      {
        "id": `jK6tBy`,
        "text": `Это где ж такие красоты? Давно не пользуюсь стационарными компьютерами. Ноутбуки победили.`
      },
      {
        "id": `2VhRcm`,
        "text": `Давно не пользуюсь стационарными компьютерами. Ноутбуки победили. Согласен с автором!`
      },
      {
        "id": `FPjSk8`,
        "text": `Мне кажется или я уже читал это где-то?`
      }
    ]
  },
  {
    "id": `miymvY`,
    "announce": `Собрать камни бесконечности легко если вы прирожденный герой. Простые ежедневные упражнения помогут достичь успеха. Как начать действовать? Для начала просто соберитесь. Золотое сечение — соотношение двух величин гармоническая пропорция.`,
    "category": [
      `Деревья`
    ],
    "createdDate": `2021-05-09 06:19:21`,
    "title": `Борьба с прокрастинацией`,
    "comments": [
      {
        "id": `WstEhu`,
        "text": `Согласен с автором! Это где ж такие красоты?`
      }
    ]
  },
  {
    "id": `FQB5eX`,
    "announce": `Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике. Из под его пера вышло 8 платиновых альбомов. Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем. Помните небольшое количество ежедневных упражнений лучше чем один раз но много.`,
    "category": [
      `Кино`
    ],
    "createdDate": `2021-06-07 06:19:21`,
    "title": `Самый лучший музыкальный альбом этого года`,
    "comments": [
      {
        "id": `wbEEd7`,
        "text": `Мне кажется или я уже читал это где-то? Давно не пользуюсь стационарными компьютерами. Ноутбуки победили. Планируете записать видосик на эту тему?`
      }
    ]
  }
];

const createAPI = () => {
  const app = express();
  const cloneData = JSON.parse(JSON.stringify(mockData));
  app.use(express.json());
  article(app, new DataService(cloneData), new CommentService());
  return app;
};

describe(`API returns a list of all articles`, () => {

  const app = createAPI();

  let response;

  beforeAll(async () => {
    response = await request(app)
      .get(`/articles`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Returns a list of 5 articles`, () => expect(response.body.length).toBe(5));

  test(`Second article's id equals "TxjMjj"`, () => expect(response.body[1].id).toBe(`TxjMjj`));

});

describe(`API returns an article with given id`, () => {

  const app = createAPI();

  let response;

  beforeAll(async () => {
    response = await request(app)
      .get(`/articles/4gAPkz`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Article's title is "Что такое золотое сечение"`, () => expect(response.body.title).toBe(`Что такое золотое сечение`));

});

describe(`API creates an article if data is valid`, () => {

  const newArticle = {
    category: `Ежики`,
    title: `Дам погладить ежика`,
    announce: `Как перестать переставать. Когда насутпит лето в декабре`
    // description: `Дам погладить ежика. Лейкопластырь беслпатно, зеленка платно`,
    // picture: `hedgehog.jpg`,
    // type: `Ф`,
    // sum: 100500
  };
  const app = createAPI();
  let response;

  beforeAll(async () => {
    response = await request(app)
      .post(`/articles`)
      .send(newArticle);
  });

  test(`Status code 201`, () => expect(response.statusCode).toBe(HttpCode.CREATED));


  test(`Returns article created`, () => expect(response.body).toEqual(expect.objectContaining(newArticle)));

  test(`Article count is changed`, () => request(app)
    .get(`/articles`)
    .expect((res) => expect(res.body.length).toBe(6))
  );

});

describe(`API refuses to create an article if data is invalid`, () => {

  const newArticle = {
    category: `Животики`,
    title: `Дам погладить животик`,
  };

  const app = createAPI();

  test(`Without any required property response code is 400`, async () => {
    for (const key of Object.keys(newArticle)) {
      const badArticle = {...newArticle};
      delete badArticle[key];
      await request(app)
        .post(`/articles`)
        .send(badArticle)
        .expect(HttpCode.BAD_REQUEST);
    }
  });

});

describe(`API changes existent article`, () => {

  const newArticle = {
    category: `Планета`,
    title: `Что такое этакое`,
    announce: `Ананас `
  };
  const app = createAPI();
  let response;

  beforeAll(async () => {
    response = await request(app)
      .put(`/articles/4gAPkz`)
      .send(newArticle);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Returns changed arrticle`, () => expect(response.body).toEqual(expect.objectContaining(newArticle)));

  test(`Article is really changed`, () => request(app)
    .get(`/articles/4gAPkz`)
    .expect((res) => expect(res.body.title).toBe(`Что такое этакое`))
  );

});

test(`API returns status code 404 when trying to change non-existent article`, () => {

  const app = createAPI();

  const validArticle = {
    category: `Это Категория`,
    title: `валидный`,
    announce: `тататам`
  };

  return request(app)
    .put(`/articles/NOEXST`)
    .send(validArticle)
    .expect(HttpCode.NOT_FOUND);
});

test(`API returns status code 400 when trying to change an article with invalid data`, () => {

  const app = createAPI();

  const invalidArticle = {
    category: `Это`,
    title: `нет поля announce`
  };

  return request(app)
    .put(`/articles/NOEXST`)
    .send(invalidArticle)
    .expect(HttpCode.BAD_REQUEST);
});

describe(`API correctly deletes an article`, () => {

  const app = createAPI();

  let response;

  beforeAll(async () => {
    response = await request(app)
      .delete(`/articles/4gAPkz`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Returns deleted article`, () => expect(response.body.id).toBe(`4gAPkz`));

  test(`Article count is 5 now`, () => request(app)
    .get(`/articles`)
    .expect((res) => expect(res.body.length).toBe(5))
  );

});

test(`API refuses to delete non-existent article`, () => {

  const app = createAPI();

  return request(app)
    .delete(`/articles/NOEXST`)
    .expect(HttpCode.NOT_FOUND);

});

test(`API refuses to create a comment to non-existent article and returns status code 404`, () => {

  const app = createAPI();

  return request(app)
    .post(`/articles/NOEXST/comments`)
    .send({
      text: `Неважно`
    })
    .expect(HttpCode.NOT_FOUND);

});

test(`API refuses to delete non-existent comment`, () => {

  const app = createAPI();

  return request(app)
    .delete(`/article/j2E3Sl/comments/NOEXST`)
    .expect(HttpCode.NOT_FOUND);

});
