'use strict';

const rollback = 80;
const title = prompt('Как называется ваш проект?');
const screens = prompt('Какие типы экранов нужно разработать?');
const screenPrice = prompt('Сколько будет стоить данная работа?');
const adaptive = confirm('Нужен ли адаптив на сайте?');
const service1 = prompt('Какой дополнительный тип услуги нужен?');
const servicePrice1 = prompt('Сколько это будет стоить?');
const service2 = prompt('Какой дополнительный тип услуги нужен?');
const servicePrice2 = prompt('Сколько это будет стоить?');
const fullPrice = +screenPrice + +servicePrice1 + +servicePrice2;

const servicePercentPrice = Math.ceil(fullPrice - (rollback * fullPrice / 100));

console.log(`type title: ${typeof title}, type fullPrice: ${typeof fullPrice}, type adaptive: ${typeof adaptive}`);

console.log('screens length: ', screens.length);

console.log(`Стоимость верстки экранов ${screenPrice} долларов`);

console.log(`Стоимость разработки сайта ${fullPrice} долларов`);

console.log(screens.toLowerCase().split(', '));

console.log('Процент отката посреднику за работу: ', fullPrice * (rollback / 100));

console.log('servicePercentPrice = ', servicePercentPrice);

if (fullPrice >= 30000) {
  console.log('Даем скидку в 10%');
} else if (fullPrice >= 15000) {
  console.log('Даем скидку в 5%');
} else if (fullPrice < 15000) {
  console.log('Скидка не предусмотрена');
} else if (fullPrice < 0) {
  console.log('Что то пошло не так');
}