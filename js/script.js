'use strict';

const title = document.getElementsByTagName('h1')[0];
const btnStart = document.getElementsByClassName('handler_btn')[0];
const btnReset = document.getElementsByClassName('handler_btn')[1];
const btnPlus = document.querySelector('.screen-btn');
const otherItemsPercent = document.querySelectorAll('.other-items.percent');
const otherItemsNumber = document.querySelectorAll('.other-items.number');
const inputRange = document.querySelector('.rollback input[type=range]');
const rangeValue = document.querySelector('.rollback span.range-value');
const [total, totalCount, totalCountOther, totalFullCount, totalCountRollback] = document.getElementsByClassName('total-input');
let screenBlocks = document.querySelectorAll('.screen');

const appData = {
  title: '',
  screens: [],
  screenPrice: 0,
  adaptive: true,
  rollback: 10,
  allServicePrices: 0,
  fullPrice: 0,
  servicePercentPrice: 0,
  services: {},
  start: function () {
    appData.asking();
    appData.addPrice();
    appData.getFullPrice();
    appData.getServicePercentPrices();
    appData.getTitle();
    appData.logger();
  },
  asking: function () {

    do {
      appData.title = String(prompt('Как называется ваш проект?'));
    } while (!appData.isString(appData.title));

    for (let i = 0; i < 2; i++) {
      let name = '';
      let price = 0;

      do {
        name = prompt('Какие типы экранов нужно разработать?');
      } while (!appData.isString(name));

      do {
        price = prompt('Сколько будет стоить данная работа?');
      } while (!appData.isNumber(price));

      appData.screens.push({
        id: i,
        name,
        price
      });
    }

    for (let i = 0; i < 2; i++) {

      let price = 0;
      let name = '';

      do {
        name = prompt('Какой дополнительный тип услуги нужен?');
      } while (!appData.isString(name));

      do {
        price = prompt('Сколько это будет стоить?');
      } while (!appData.isNumber(price));

      appData.services[name] = +price;

    }

    appData.adaptive = confirm('Нужен ли адаптив на сайте?');
  },
  addPrice: function () {
    appData.screenPrice = appData.screens.reduce(function (acc, item) {
      return acc += +item.price;
    }, 0);

    for (let key in appData.services) {
      appData.allServicePrices += appData.services[key];
    }
  },
  isNumber: function (num) {
    return !isNaN(parseFloat(num)) && isFinite(num) && (String(num) === String(num).trim());
  },
  isString: function (str) {
    return str !== 'null' && isNaN(str) && str.trim() === str && str !== '' && !(parseInt(str) == str);
  },
  getServicePercentPrices: function () {
    appData.servicePercentPrice = Math.ceil(appData.fullPrice - (appData.rollback * appData.fullPrice / 100));
  },
  getTitle: function () {
    appData.title = (appData.title.trim()[0]).toUpperCase() + appData.title.trim().slice(1).toLowerCase();
  },
  getFullPrice: function () {
    appData.fullPrice = +appData.screenPrice + appData.allServicePrices;
  },
  showTypeOf: function (data) {
    return data + ': ' + typeof data;
  },
  getRollbackMessage: function (price) {
    if (price >= 30000) {
      return 'Даем скидку в 10%';
    } else if (price >= 15000) {
      return 'Даем скидку в 5%';
    } else if (price < 15000) {
      return 'Скидка не предусмотрена';
    } else if (price < 0) {
      return 'Что то пошло не так';
    }
  },
  logger: function () {
    console.log(appData.fullPrice);
    console.log(appData.servicePercentPrice);
    console.log(appData.screens);
    console.log(appData.services);

    for (let key in appData) {
      console.log(key);
    }

  }

};

appData.start();