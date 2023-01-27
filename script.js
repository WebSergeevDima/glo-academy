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