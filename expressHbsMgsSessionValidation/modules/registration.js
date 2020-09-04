const config = require('../config.json')

module.exports = function (email) {
    return {
        to: email,
        from: config.Email_From,
        subject: 'Уккаунт создан',
        html: `
            <h1>Добро пожаловать в наш магазин!</h1>
            <p>Вы успешно создали аккаунт с email - ${email}</p>
            <hr>
            <a href="${config.BASE_URL}">Магазин курсов</a>
                `
    }
}