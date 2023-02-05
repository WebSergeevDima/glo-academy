'use strict';

const rollback = 80;
const title = prompt('Как называется ваш проект?');
const screens = prompt('Какие типы экранов нужно разработать?');
const screenPrice = getScreenPrice();
const adaptive = confirm('Нужен ли адаптив на сайте?');
let service1;
let service2;

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
  } while (!isNumber(screenPrice)) {
    console.log(!isNumber(screenPrice), screenPrice);
    screenPrice = prompt('Сколько будет стоить данная работа?');
  }
  return screenPrice;
}

function isNumber(num) {
  return !isNaN(parseFloat(num)) && isFinite(num);
}

const getAllServicePrices = function () {

  let sum = 0;
  let servicePrice = null;

  for (let i = 0; i < 2; i++) {

    if (i === 0) {
      service1 = prompt('Какой дополнительный тип услуги нужен?');
    } else {
      service2 = prompt('Какой дополнительный тип услуги нужен?');
    }

    while (!isNumber(servicePrice)) {
      servicePrice = prompt('Сколько это будет стоить?');
    }

    sum += servicePrice;
    servicePrice = null;

  }

  return sum;
}

const allServicePrices = getAllServicePrices();

const fullPrice = getFullPrice(screenPrice, allServicePrices);

const servicePercentPrice = getServicePercentPrices(fullPrice, rollback);

console.log('Типы экранов для разработки screens: ', showTypeOf());

console.log('Скидка пользователю: ', getRollbackMessage(fullPrice));

console.log('Стоимость за вычетом процента отката посреднику: ', servicePercentPrice);