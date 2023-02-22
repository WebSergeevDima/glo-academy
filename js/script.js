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
  servicePricesPercent: 0,
  servicePricesNumber: 0,
  fullPrice: 0,
  servicePercentPrice: 0,
  servicesPercent: {},
  servicesNumber: {},
  isValid: true,
  count: 0,
  init: function () {
    appData.addTitle();
    btnStart.addEventListener('click', appData.start);
    btnPlus.addEventListener('click', appData.addScreenBlock);
    inputRange.addEventListener('input', appData.addRollback);
  },
  addRollback: function () {
    appData.rollback = inputRange.value;
    rangeValue.innerHTML = inputRange.value + '%';
  },
  addScreenBlock: function () {
    const cloneScreen = screenBlocks[0].cloneNode(true);
    cloneScreen.querySelector('select').selectedIndex = 0;
    cloneScreen.querySelector('input').value = '';
    btnPlus.before(cloneScreen);
  },
  addTitle: function () {
    document.title = title.textContent;
  },
  addScreens: function () {
    screenBlocks = document.querySelectorAll('.screen');

    screenBlocks.forEach(function (screen, index) {
      const select = screen.querySelector('select');
      const selectName = select.options[select.selectedIndex].textContent;
      const input = screen.querySelector('input');

      if (!input.value || select.selectedIndex === 0) {
        appData.isValid = false
      }

      appData.screens.push({
        id: index,
        name: selectName,
        price: +input.value * +select.value
      });

      appData.count += +input.value;

    });
  },
  addServices: function () {

    otherItemsPercent.forEach(function (item) {
      const check = item.querySelector('input[type="checkbox"]');
      const label = item.querySelector('label');
      const input = item.querySelector('input[type="text"]');

      if (check.checked) {
        appData.servicesPercent[label.textContent] = +input.value;
      }
    });
    otherItemsNumber.forEach(function (item) {
      const check = item.querySelector('input[type="checkbox"]');
      const label = item.querySelector('label');
      const input = item.querySelector('input[type="text"]');

      if (check.checked) {
        appData.servicesNumber[label.textContent] = +input.value;
      }
    });
  },
  start: function () {
    appData.isValid = true;
    appData.count = 0;
    appData.addScreens();
    appData.addServices();
    appData.addPrice();
    // appData.logger();
    if (appData.isValid) {
      appData.showResult();
    } else {
      alert('Заполните все поля в блоке "Расчет по типу экрана"!');
    }
  },
  showResult: function () {
    total.value = appData.screenPrice;
    totalCount.value = appData.servicePricesPercent + appData.servicePricesNumber;
    totalFullCount.value = appData.fullPrice;
    totalCount.value = appData.count;
    totalCountRollback.value = appData.servicePercentPrice;
  },
  addPrice: function () {

    appData.screenPrice = appData.screens.reduce(function (acc, item) {
      return acc += +item.price;
    }, 0);

    for (let key in appData.servicesNumber) {
      appData.servicePricesNumber += appData.servicesNumber[key];
    }
    for (let key in appData.servicesPercent) {
      appData.servicePricesPercent += +appData.screenPrice * (+appData.servicesPercent[key] / 100);
    }

    appData.fullPrice = +appData.screenPrice + +appData.servicePricesPercent + +appData.servicePricesNumber;
    appData.servicePercentPrice = Math.ceil(appData.fullPrice - (appData.rollback * appData.fullPrice / 100));
  },
  isString: function (str) {
    return str !== 'null' && isNaN(str) && str.trim() === str && str !== '' && !(parseInt(str) == str);
  },
  showTypeOf: function (data) {
    return data + ': ' + typeof data;
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

appData.init();