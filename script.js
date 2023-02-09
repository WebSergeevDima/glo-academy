'use strict';

const appData = {
  title: '',
  screens: '',
  screenPrice: 0,
  adaptive: true,
  rollback: 10,
  allServicePrices: 0,
  fullPrice: 0,
  servicePercentPrice: 0,
  service1: '',
  service2: '',
  start: function () {
    appData.asking();
    appData.allServicePrices = appData.getAllServicePrices();
    appData.fullPrice = appData.getFullPrice();
    appData.servicePercentPrice = appData.getServicePercentPrices();
    appData.title = appData.getTitle();
    appData.logger();
  },
  asking: function () {
    appData.title = prompt('Как называется ваш проект?');
    appData.screens = prompt('Какие типы экранов нужно разработать?');

    do {
      appData.screenPrice = prompt('Сколько будет стоить данная работа?');
    } while (!appData.isNumber(appData.screenPrice));

    appData.adaptive = confirm('Нужен ли адаптив на сайте?');
  },
  getAllServicePrices: function () {
    let sum = 0;
    let price;

    for (let i = 0; i < 2; i++) {

      if (i === 0) {
        appData.service1 = prompt('Какой дополнительный тип услуги нужен?');
      } else {
        appData.service2 = prompt('Какой дополнительный тип услуги нужен?');
      }

      do {
        price = prompt('Сколько это будет стоить?');
      } while (!appData.isNumber(price));

      sum += +price;

    }

    return sum;

  },
  isNumber: function (num) {
    return !isNaN(parseFloat(num)) && isFinite(num) && (String(num) === String(num).trim());
  },
  getServicePercentPrices: function () {
    return Math.ceil(appData.fullPrice - (appData.rollback * appData.fullPrice / 100));
  },
  getTitle: function () {
    return (appData.title.trim()[0]).toUpperCase() + appData.title.trim().slice(1).toLowerCase();
  },
  getFullPrice: function () {
    return +appData.screenPrice + appData.allServicePrices;
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

    for (let key in appData) {
      console.log(key);
    }

  }

};

appData.start();