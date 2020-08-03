const fs = require('fs');
// File System
const path = require('path');

// Создание папки
// fs.mkdir(path.join(__dirname, 'notes'), (err) => {
//     if (err) throw new Error(err);
//     console.log(`Папка была создана`);
// })

// Создание файлов и работы с ними
// fs.writeFile(path.join(__dirname, 'notes', 'mynotes.txt'), 'Hello World!', (err) => {
//     if (err) throw new Error(err);
//     console.log(`Файл был создан`);

//     fs.appendFile(path.join(__dirname, 'notes', 'mynotes.txt'), '\nFrom appendFile', (err) => {
//         if (err) throw new Error(err);
//         console.log(`Файл был изменён`);

//         fs.readFile(path.join(__dirname, 'notes', 'mynotes.txt'), 'utf-8', (err, data) => {
//             if (err) throw new Error(err)
//             console.log(data);
//         })
//     })
// });

// Как читать буферы
// fs.readFile(path.join(__dirname, 'notes', 'mynotes.txt'), (err, data) => {
//     if (err) throw new Error(err)
//     console.log(Buffer.from(data).toString());
// })

//Как переименовать Файл
fs.rename(path.join(__dirname, 'notes', 'mynotes.txt'), 'newNotes', (err) => {
    if (err) throw new Error(err)
    console.log('Файл был переименован');
})