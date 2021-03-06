INSERT INTO categories(name) VALUES
('Животные'),
('Игры'),
('Разное');

INSERT INTO users(email, password_hash, first_name, last_name, avatar) VALUES
('ivanov@example.com', '5f4dcc3b5aa765d61d8327deb882cf99', 'Иван', 'Иванов', 'avatar1.jpg'),
('petrov@example.com', '5f4dcc3b5aa765d61d8327deb882cf99', 'Петр', 'Петров', 'avatar2.jpg'),
('ivanov-petrov@example.com', '5f4dcc3b5aa765d61d8327deb882cf99', 'Иван', 'Петров', 'avatar3.jpg'),
('chudakod@example.com', '5f4dcc3b5aa765d61d8327deb882cf99', 'Гений', 'Чудаков', 'avatar4.jpg'),
('myskin@example.com', '5f4dcc3b5aa765d61d8327deb882cf99', 'Кошка', 'Мышкина', 'avatar5.jpg');

ALTER TABLE articles DISABLE TRIGGER ALL;
INSERT INTO articles(title, picture, created_at, announce, full_text, user_id) VALUES
('Ёлки. История деревьев', 'image1.jpg', '2021-10-16T10:30:27.797Z', 'Ох уж эти елки', 'В этом году мне исполнилось, ребята, сорок лет. Значит, выходит, что я сорок раз видел новогоднюю ёлку. Это много!Ну, первые три года жизни и, наверное, не понимал, что такое ёлка. Манерно, мама выносила меня на ручках. И наверно, я своими чёрными глазёнками без интереса смотрел на разукрашенное дерево.А когда мне, дети, ударило пять лет, то я уже отлично понимал, что такое ёлка.И я с нетерпением ожидал этого весёлого праздника. И даже в щёлочку двери подглядывал, как моя мама украшает ёлку.', 1),
('Как перестать беспокоиться и начать жить', 'image2.jpg', '2021-10-16T10:31:27.797Z', 'Воу воу Карнеги','Тридцать пять лет назад я считал себя одним из самых несчастливых парней в Нью-Йорке.Я продавал грузовики и таким образом зарабатывал себе на жизнь. Я совершенно не разбирался в механизмах, управляющих движением грузовиков, да я и не стремился в этом разобраться, поскольку ненавидел свою работу. Мне было противно жить в дешевой меблированной комнате на 56-й Западной улице – в комнате, где кишели тараканы. Я до сих пор помню, что на стенах комнаты висели мои галстуки, и, когда утром я брал чистый галстук, тараканы разбегались в разные стороны. Я с отвращением питался в дешевых грязных кафе, в которых, вероятно, также было полным-полно тараканов.' , 2),
('Как достигнуть успеха не вставая с кресла', 'image2.jpg', '2021-10-16T10:32:27.797Z', 'Можно аообще ничего не делать и ничего не будет','сли вам быстро нужны деньги, а все карманы зимних курток вы уже опустошили, можно легко заработать по несколько долларов на различных сайтах, выполняя простые действия. Вот несколько действенных способов, как получить $265 за 30 минут, даже не выходя из дома.
Источник: https://rubic.us/kak-zarabotat-265-ne-vstavaya-s-krovati
"Рубик" - о жизни в США и иммиграции' , 3),
('Лучшие рок-музыканты 20-века',  'image4.jpg', '2021-10-16T10:35:27.797Z', 'Кроме русских рокеров - их нет..ыыыы', '
THE WHO, UNS N ROSES, NIRVANA, METALLICA, AC/DC, THE ROLLING STONES, QUEEN, PINK FLOYD, LED ZEPPELIN, THE BEATLES, За всю историю рок-музыки было столько достойных групп, что выделить лучших очень сложно. Многие исполнители выпускали крутые альбомы, записывали популярные песни и давали огромные концерты, но в этом топе те, кто пошёл дальше и изменил жанр.' , 4),
('Как начать программировать', 'image5.jpg', '2021-10-16T10:37:27.797Z', 'Короче было так', 'Закончилось рабство в РЖД, я отдохнул в институте типа специалистом, но понял либо я здесь остаюсь и покупаю свитер с обвисшими рукввами либо, либо надо чемуто научиться, попыхтел целый месяц узнал что такое HTML и больше ничего образовалась большая каша в голове от огромной разбросанной информации, короче нашел курсы взял в долг денег оплатил и через девять месяцев я типа откинулся с курсов, в голове бордак node, web, промисы и массивы объекты. Но время шло, прошел собес аж 3 раза, даже постажироваться успел, но остался в институте в отделе прогеров. Вот там ребятки были шо надо, каждый день я просил их что-нибудь рассказать мне по теме разработки. И через три месяца я уволился от туда, так как пригласили в частную контору разработчиком, и тут то все понеслось.', 5);
ALTER TABLE articles ENABLE TRIGGER ALL

ALTER TABLE comments  DISABLE TRIGGER ALL;
INSERT INTO COMMENTS(text, user_id, article_id) VALUES
('Это где ж такие красоты?', 2, 1),
('Купи, кому говорю', 5, 2),
('Плохой гараж', 3, 2),
('Не куплю', 4, 2),
('Купи крокодила', 2, 3),
('Отличный крокодил', 2, 3),
('Не куплю крокодила', 1, 4),
('Дрянной крокодил', 3, 4),
('Пожалей крокодила', 5, 5),
('Держать негде', 1, 5);
ALTER TABLE comments ENABLE TRIGGER ALL;

ALTER TABLE article_categories DISABLE TRIGGER ALL;
INSERT INTO article_categories(article_id, category_id) VALUES
(1, 1),
(1, 2),
(2, 1),
(2, 2),
(3, 1),
(4, 1),
(5, 3);
ALTER TABLE article_categories ENABLE TRIGGER ALL;
