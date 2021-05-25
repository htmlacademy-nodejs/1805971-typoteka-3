'use strict';

var chalk = require("chalk");

var textCommandHelp = "\u041F\u0440\u043E\u0433\u0440\u0430\u043C\u043C\u0430 \u0437\u0430\u043F\u0443\u0441\u043A\u0430\u0435\u0442 http-\u0441\u0435\u0440\u0432\u0435\u0440 \u0438 \u0444\u043E\u0440\u043C\u0438\u0440\u0443\u0435\u0442 \u0444\u0430\u0439\u043B \u0441 \u0434\u0430\u043D\u043D\u044B\u043C\u0438 \u0434\u043B\u044F API.\n\n    \u0413\u0430\u0439\u0434:\n    service.js <command>\n\n    \u041A\u043E\u043C\u0430\u043D\u0434\u044B:\n    --version:            \u0432\u044B\u0432\u043E\u0434\u0438\u0442 \u043D\u043E\u043C\u0435\u0440 \u0432\u0435\u0440\u0441\u0438\u0438\n    --help:               \u043F\u0435\u0447\u0430\u0442\u0430\u0435\u0442 \u044D\u0442\u043E\u0442 \u0442\u0435\u043A\u0441\u0442\n    --generate <count>    \u0444\u043E\u0440\u043C\u0438\u0440\u0443\u0435\u0442 \u0444\u0430\u0439\u043B mocks.json";
module.exports = {
  name: "--help",
  run: function run() {
    console.info(chalk.gray(textCommandHelp));
  }
};