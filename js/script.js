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
  rollback: 0,
  servicePricesPercent: 0,
  servicePricesNumber: 0,
  fullPrice: 0,
  servicePercentPrice: 0,
  servicesPercent: {},
  servicesNumber: {},
  count: 0,
  init: function () {
    this.addTitle();
    btnStart.addEventListener('click', this.start.bind(this));
    btnReset.addEventListener('click', this.reset.bind(this));
    btnPlus.addEventListener('click', this.addScreenBlock.bind(this));
    inputRange.addEventListener('input', this.addRollback);
  },
  start: function () {
    if (appData.isValid()) {
      this.count = 0;
      this.addScreens();
      this.addServices();
      this.addPrice();
      // this.logger(); 
      this.showResult();
    } else {
      alert('Заполните все поля в блоке "Расчет по типу экрана"!');
    }
  },
  isValid() {
    screenBlocks = document.querySelectorAll('.screen');
    let isValid = true;

    screenBlocks.forEach(function (screen) {
      const select = screen.querySelector('select');
      const input = screen.querySelector('input');

      if (!input.value || select.selectedIndex === 0) {
        isValid = false
      }

    });

    return isValid;
  },
  reset: function () {
    this.resetBtns();
    this.resetScreenBlocks();
    this.resetMainTotal();
  },
  resetBtns: function () {
    btnStart.style.display = 'block';
    btnReset.style.display = 'none';
    btnPlus.style.display = 'block';
  },
  resetScreenBlocks: function () {
    const checkboxInputs = document.querySelectorAll('input[type="checkbox"]');
    screenBlocks = document.querySelectorAll('.screen');

    screenBlocks.forEach((item, index) => {
      if (index > 0) {
        item.remove();
      } else {
        item.querySelector('select').selectedIndex = 0;
        item.querySelector('select').removeAttribute('disabled');
        item.querySelector('input').value = '';
        item.querySelector('input').removeAttribute('disabled');
      }
    });

    checkboxInputs.forEach(item => {
      item.removeAttribute('disabled');
    })

    inputRange.removeAttribute('disabled');
    inputRange.value = 0;
    rangeValue.innerHTML = '0%';

  },
  resetMainTotal: function () {
    const mainTotalInputs = document.querySelectorAll('.main-total input');

    mainTotalInputs.forEach(item => {
      item.value = 0;
    });
  },
  addRollback: function () {
    this.rollback = inputRange.value;
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

    screenBlocks.forEach((screen, index) => {
      const select = screen.querySelector('select');
      const selectName = select.options[select.selectedIndex].textContent;
      const input = screen.querySelector('input');

      this.screens.push({
        id: index,
        name: selectName,
        price: +input.value * +select.value
      });

      this.count += +input.value;

    });
  },
  addServices: function () {

    otherItemsPercent.forEach((item) => {
      const check = item.querySelector('input[type="checkbox"]');
      const label = item.querySelector('label');
      const input = item.querySelector('input[type="text"]');

      if (check.checked) {
        this.servicesPercent[label.textContent] = +input.value;
      }
    });
    otherItemsNumber.forEach((item) => {
      const check = item.querySelector('input[type="checkbox"]');
      const label = item.querySelector('label');
      const input = item.querySelector('input[type="text"]');

      if (check.checked) {
        this.servicesNumber[label.textContent] = +input.value;
      }
    });
  },
  showResult: function () {
    total.value = this.screenPrice;
    totalCount.value = this.servicePricesPercent + this.servicePricesNumber;
    totalFullCount.value = this.fullPrice;
    totalCount.value = this.count;
    totalCountRollback.value = this.servicePercentPrice;

    this.blockedElements();
  },
  addPrice: function () {

    this.screenPrice = this.screens.reduce((acc, item) => {
      return acc += +item.price;
    }, 0);

    for (let key in this.servicesNumber) {
      this.servicePricesNumber += this.servicesNumber[key];
    }
    for (let key in this.servicesPercent) {
      this.servicePricesPercent += +this.screenPrice * (+this.servicesPercent[key] / 100);
    }

    this.fullPrice = +this.screenPrice + +this.servicePricesPercent + +this.servicePricesNumber;
    this.servicePercentPrice = Math.ceil(this.fullPrice - (this.rollback * this.fullPrice / 100));
  },
  isString: function (str) {
    return str !== 'null' && isNaN(str) && str.trim() === str && str !== '' && !(parseInt(str) == str);
  },
  showTypeOf: function (data) {
    return data + ': ' + typeof data;
  },
  blockedElements: function () {
    const inputs = document.querySelectorAll('.elements input');
    const selects = document.querySelectorAll('.elements select');

    inputs.forEach(item => {
      item.disabled = true;
    });

    selects.forEach(item => {
      item.disabled = true;
    });

    btnStart.style.display = 'none';
    btnReset.style.display = 'block';
    btnPlus.style.display = 'none';

  },
  logger: function () {
    console.log(this.fullPrice);
    console.log(this.servicePercentPrice);
    console.log(this.screens);
    console.log(this.services);

    for (let key in appData) {
      console.log(key);
    }

  }

};

appData.init();