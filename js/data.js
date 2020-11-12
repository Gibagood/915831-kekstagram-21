'use strict';

(function () {

  const getRandomItem = function (array) {
    const randomNum = Math.floor(Math.random() * array.length);
    const randomNumIndex = array[randomNum];
    return randomNumIndex;
  };
  const getRandomNumber = function (min, max) {
    const randomNum = Math.floor(min + Math.random() * (max + 1 - min));
    return randomNum;
  };

  window.data = {
    getRandomItem,
    getRandomNumber,
  };
})();
