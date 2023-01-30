'use strict';

let title = 'Проект Урок 2',
  screens = 'Простые, Сложные, Интерактивные',
  screenPrice = 550,
  rollback = 80,
  fullPrice = 4000,
  adaptive = true;

alert('Hello!');

console.log('Hello in console!');

console.log(`type title: ${typeof title}, type fullPrice: ${typeof fullPrice}, type adaptive: ${typeof adaptive}`);

console.log('screens length: ', screens.length);

console.log(`Стоимость верстки экранов ${screenPrice} долларов`);

console.log(`Стоимость разработки сайта ${fullPrice} долларов`);

console.log(screens.toLowerCase().split(', '));

console.log('Процент отката посреднику за работу: ', fullPrice * (rollback / 100));

title = prompt('Как называется ваш проект?');
screens = prompt('Какие типы экранов нужно разработать?');
screenPrice = prompt('Сколько будет стоить данная работа?');
adaptive = confirm('Нужен ли адаптив на сайте?');

const service1 = prompt('Какой дополнительный тип услуги нужен?');
const servicePrice1 = prompt('Сколько это будет стоить?');
const service2 = prompt('Какой дополнительный тип услуги нужен?');
const servicePrice2 = prompt('Сколько это будет стоить?');

fullPrice = +screenPrice + +servicePrice1 + +servicePrice2;

const servicePercentPrice = Math.ceil(fullPrice - rollback);

console.log('servicePercentPrice = ', servicePercentPrice);

if (fullPrice >= 30000) { // поставил >= т.к. не учитывается стоимость 30000 (ровно)
  console.log('Даем скидку в 10%');
} else if (fullPrice >= 15000 && fullPrice < 30000) {
  console.log('Даем скидку в 5%');
} else if (fullPrice < 15000 && fullPrice > 0) {
  console.log('Скидка не предусмотрена');
}