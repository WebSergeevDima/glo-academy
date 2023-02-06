'use strict';


let title;
let screens;
let screenPrice;
let adaptive;
let rollback = 80;
let allServicePrices;
let fullPrice;
let servicePercentPrice;
let service1
let service2

const isNumber = function (num) {
  return !isNaN(parseFloat(num)) && isFinite(num) && (String(num) === String(num).trim());
}

const asking = function () {
  title = prompt('Как называется ваш проект?');
  screens = prompt('Какие типы экранов нужно разработать?');

  do {
    screenPrice = prompt('Сколько будет стоить данная работа?');
  } while (!isNumber(screenPrice));

  adaptive = confirm('Нужен ли адаптив на сайте?');
}

const getServicePercentPrices = function () {
  return Math.ceil(fullPrice - (rollback * fullPrice / 100));
}

function getTitle() {
  return (title.trim()[0]).toUpperCase() + title.trim().slice(1).toLowerCase();
}

function getFullPrice() {
  return +screenPrice + allServicePrices;
};

function showTypeOf(data) {
  return data + ': ' + typeof data;
}

function getRollbackMessage(price) {
  if (price >= 30000) {
    return 'Даем скидку в 10%';
  } else if (price >= 15000) {
    return 'Даем скидку в 5%';
  } else if (price < 15000) {
    return 'Скидка не предусмотрена';
  } else if (price < 0) {
    return 'Что то пошло не так';
  }
}

const getAllServicePrices = function () {
  let sum = 0;
  let price;

  for (let i = 0; i < 2; i++) {

    if (i === 0) {
      service1 = prompt('Какой дополнительный тип услуги нужен?');
    } else {
      service2 = prompt('Какой дополнительный тип услуги нужен?');
    }

    do {
      price = prompt('Сколько это будет стоить?');
    } while (!isNumber(price));

    sum += +price;

  }

  return sum;

}

asking();
allServicePrices = getAllServicePrices();
fullPrice = getFullPrice();
servicePercentPrice = getServicePercentPrices();
title = getTitle();

console.log(showTypeOf(title));
console.log(showTypeOf(fullPrice));
console.log(showTypeOf(adaptive));

console.log('Типы экранов для разработки screens: ', screens.toLowerCase());
console.log('Скидка пользователю: ', getRollbackMessage(fullPrice));
console.log('Стоимость за вычетом процента отката посреднику: ', servicePercentPrice);