'use strict';

const express = require(`express`);
const request = require(`supertest`);

const search = require(`./search`);
const DataService = require(`../data-service/search`);
const {HttpCode} = require(`../../constants`);

const mockData = [
  {
    "id": `ZKJeaF`,
    "announce": `Помните небольшое количество ежедневных упражнений лучше чем один раз но много. Он написал больше 30 хитов. Игры и программирование разные вещи. Не стоит идти в программисты если вам нравятся только игры. Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем.`,
    "category": [
      `Деревья`
    ],
    "createdDate": `2021-05-15 06:11:25`,
    "title": `Рок — это протест`,
    "comments": [
      {
        "id": `Y7tNU4`,
        "text": `Хочу такую же футболку :-)`
      },
      {
        "id": `bTBtG3`,
        "text": `Мне не нравится ваш стиль. Ощущение, что вы меня поучаете. Мне кажется или я уже читал это где-то? Согласен с автором!`
      },
      {
        "id": `jZCXXV`,
        "text": `Совсем немного... Планируете записать видосик на эту тему?`
      }
    ]
  },
  {
    "id": `YjQ97o`,
    "announce": `Программировать не настолько сложно как об этом говорят. Собрать камни бесконечности легко если вы прирожденный герой. Золотое сечение — соотношение двух величин гармоническая пропорция. Этот смартфон — настоящая находка. Большой и яркий экран мощнейший процессор — всё это в небольшом гаджете.`,
    "category": [
      `Музыка`
    ],
    "createdDate": `2021-07-14 06:11:25`,
    "title": `Борьба с прокрастинацией`,
    "comments": [
      {
        "id": `zep5n1`,
        "text": `Согласен с автором! Хочу такую же футболку :-)`
      }
    ]
  },
  {
    "id": `XVwjZg`,
    "announce": `Как начать действовать? Для начала просто соберитесь. Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем. Достичь успеха помогут ежедневные повторения. Простые ежедневные упражнения помогут достичь успеха.`,
    "category": [
      `Деревья`
    ],
    "createdDate": `2021-06-01 06:11:25`,
    "title": `Борьба с прокрастинацией`,
    "comments": [
      {
        "id": `3ZY2Jz`,
        "text": `Мне не нравится ваш стиль. Ощущение, что вы меня поучаете.`
      },
      {
        "id": `PhdYpc`,
        "text": `Планируете записать видосик на эту тему? Давно не пользуюсь стационарными компьютерами. Ноутбуки победили.`
      },
      {
        "id": `-5aXRO`,
        "text": `Это где ж такие красоты?`
      }
    ]
  },
  {
    "id": `HWJ02F`,
    "announce": `Программировать не настолько сложно как об этом говорят. Вы можете достичь всего. Стоит только немного постараться и запастись книгами. Этот смартфон — настоящая находка. Большой и яркий экран мощнейший процессор — всё это в небольшом гаджете. Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле?`,
    "category": [
      `Музыка`
    ],
    "createdDate": `2021-05-09 06:11:25`,
    "title": `Как перестать беспокоиться и начать жить`,
    "comments": [
      {
        "id": `lOa8oV`,
        "text": `Мне кажется или я уже читал это где-то? Хочу такую же футболку :-)`
      }
    ]
  },
  {
    "id": `fOvhEI`,
    "announce": `Это один из лучших рок-музыкантов. Он написал больше 30 хитов. Программировать не настолько сложно как об этом говорят. Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем.`,
    "category": [
      `Безрамки`
    ],
    "createdDate": `2021-06-27 06:11:25`,
    "title": `Лучшие рок-музыканты 20-века`,
    "comments": [
      {
        "id": `eLVMoj`,
        "text": `Плюсую, но слишком много буквы! Это где ж такие красоты? Совсем немного...`
      },
      {
        "id": `H0_ssl`,
        "text": `Планируете записать видосик на эту тему? Мне не нравится ваш стиль. Ощущение, что вы меня поучаете.`
      },
      {
        "id": `Q2y2ub`,
        "text": `Мне кажется или я уже читал это где-то? Давно не пользуюсь стационарными компьютерами. Ноутбуки победили. Это где ж такие красоты?`
      },
      {
        "id": `tLAfvO`,
        "text": `Хочу такую же футболку :-) Мне кажется или я уже читал это где-то?`
      }
    ]
  }
];

const app = express();
app.use(express.json());
search(app, new DataService(mockData));

describe(`API returns article based on search query`, () => {

  let response;

  beforeAll(async () => {
    response = await request(app)
      .get(`/search`)
      .query({
        query: `Борьба`
      });
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));
  test(`2 article found`, () => expect(response.body.length).toBe(2));
  test(`Article has correct id`, () => expect(response.body[0].id).toBe(`YjQ97o`));

});

test(`API returns code 404 if nothing is found`,
    () => request(app)
      .get(`/search`)
      .query({
        query: `Продам свою почку`
      })
      .expect(HttpCode.NOT_FOUND)
);

test(`API returns 400 when query string is absent`,
    () => request(app)
      .get(`/search`)
      .expect(HttpCode.BAD_REQUEST)
);
