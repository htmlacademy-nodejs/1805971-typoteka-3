'use strict';

var chalk = require("chalk");

var packageJsonFile = require("../../../package.json");

module.exports = {
  name: "--version",
  run: function run() {
    var version = packageJsonFile.version;
    console.info(chalk.blue(version));
  }
};