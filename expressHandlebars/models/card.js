const path = require('path');
const fs = require('fs');
const p = path.join(process.mainModule.path, 'data', 'card.json');

class Card {
    static async add(course) {
        const card = await Card.fetch();
        const indx = card.courses.findIndex(c => c.id === course.id)
        const candidate = card.courses[indx];

        if (candidate) {
            candidate.count++;
            card.courses[indx] = candidate;
        } else {
            course.count = 1
            card.courses.push(course)
        }

        card.price += +Number(course.price)

        return new Promise((resolve, reject) => {
            fs.writeFile(p, JSON.stringify(card), err => {
                if (err) {
                    reject(err);
                } else {
                    resolve()
                }
            })
        })
    }

    static async remove(id) {
        const card = await Card.fetch();
        const indx = card.courses.findIndex(c => c.id === id)
        const course = card.courses[indx];

        if (course.count === 1) {
            card.courses = card.courses.filter(c => c.id !== course.id)
        } else {
            card.courses[indx].count--
        }

        card.price -= Number(course.price)
        return new Promise((resolve, reject) => {
            fs.writeFile(p, JSON.stringify(card), err => {
                if (err) {
                    reject(err);
                } else {
                    resolve(card)
                }
            })
        })
    }

    static async fetch() {
        return new Promise((resolve, reject) => {
            fs.readFile(p, 'utf-8', (err, content) => {
                if (err) {
                    reject (err)
                } else {
                    resolve(JSON.parse(content));
                }
            })
        })
    }
}

module.exports = Card