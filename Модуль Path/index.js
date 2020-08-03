const path = require('path');

console.log(path.basename(__filename)); // Получаем название файла в котором работаем
console.log(path.dirname(__filename)); // Получаем путь к файлу, в котором работаем
console.log(path.extname(__filename)); // Получаем расширение файла, в котором работаем

console.log(path.parse(__filename)); // Получаем комплект пути файла в котором работаем

// console.log(path.join(__dirname, '..', 'test', 'second.html')); 
console.log(path.join(__dirname, 'test', 'second.html')); // Создаём путь в папке, где наш документ, /test/second.html
console.log(path.resolve(__dirname, './test', '/second.html'));