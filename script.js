'use strict';

const rollback = 80;
const title = prompt('Как называется ваш проект?');
const screens = prompt('Какие типы экранов нужно разработать?');
const screenPrice = getScreenPrice();
const adaptive = confirm('Нужен ли адаптив на сайте?');
const service1 = prompt('Какой дополнительный тип услуги нужен?');
const servicePrice1 = prompt('Сколько это будет стоить?');
const service2 = prompt('Какой дополнительный тип услуги нужен?');
const servicePrice2 = prompt('Сколько это будет стоить?');

function getTitle(title) {
  return title[0].toUpperCase() + title.slice(1);
}

function getFullPrice(screenPrice, allServicePrices) {
  return +screenPrice + allServicePrices;
};

function getServicePercentPrices(fullPrice, rollback) {
  return Math.ceil(fullPrice - (rollback * fullPrice / 100))
}

function showTypeOf() {
  return screens.toLowerCase();
}

function getRollbackMessage(price) {
  if (fullPrice >= 30000) {
    return 'Даем скидку в 10%';
  } else if (fullPrice >= 15000) {
    return 'Даем скидку в 5%';
  } else if (fullPrice < 15000) {
    return 'Скидка не предусмотрена';
  } else if (fullPrice < 0) {
    return 'Что то пошло не так';
  }
}

function getScreenPrice() {
  let screenPrice;
  do {
    screenPrice = prompt('Сколько будет стоить данная работа?');
  } while (false) {
    if (!isNumber(screenPrice)) {
      screenPrice = prompt('Сколько будет стоить данная работа?');
    }
  }
  return screenPrice;
}

function isNumber(num) {
  return !isNaN(parseFloat(num)) && isFinite(num);
}

const getAllServicePrices = function (servicePrice1, servicePrice2) {
  return +servicePrice1 + +servicePrice2;
}

const allServicePrices = getAllServicePrices(servicePrice1, servicePrice2);

const fullPrice = getFullPrice(screenPrice, allServicePrices);

const servicePercentPrice = getServicePercentPrices(fullPrice, rollback);

console.log('Типы экранов для разработки screens: ', showTypeOf());

console.log('Скидка пользователю: ', getRollbackMessage(fullPrice));

console.log('Стоимость за вычетом процента отката посреднику: ', servicePercentPrice);