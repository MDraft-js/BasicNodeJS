const { body } = require('express-validator')

exports.registerValidator = [
    body('name', 'Имя должно быть минимум 2 символа').isLength({min: 2}),
    body('email').isEmail().withMessage('Введите корректный Email'),
    body('password', 'Пароль должен быть минимум 6 символов').isLength({min: 6, max: 56}).isAlphanumeric().trim(),
    body('confirm').custom((value, {req}) => {
        if (value !== req.body.password) {
            throw new error('Пароли должны совпадать')
        }
        return true;
    }).trim()
]

exports.courseValidator = [
    body('title').isLength({min: 3}).withMessage('Минимальная длинна названия 3 символа'),
    body('price').isNumeric().withMessage('Введите корректную цену'),
    body('img', 'Введите корректный URL картинки').isURL()
]