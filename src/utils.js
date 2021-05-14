'use strict';

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const shuffle = (someArray) => {
  for (let i = someArray.length - 1; i > 0; i--) {
    const randomPosition = Math.floor(Math.random() * i);
    [someArray[i], someArray[randomPosition]] = [someArray[randomPosition], someArray[i]];
  }

  return someArray;
};

const getDateAgo = (daysAgo = 0) => {
  let date = new Date();

  date.setDate(date.getDate() - daysAgo);

  const dataIsoString = date.toISOString();
  const dateSlice = dataIsoString.slice(0, dataIsoString.indexOf(`T`));
  const timeSlice = dataIsoString.slice(dataIsoString.indexOf(`T`) + 1, dataIsoString.indexOf(`.`));

  return `${dateSlice} ${timeSlice}`;
};

module.exports = {
  getRandomInt, shuffle, getDateAgo
};

