const { Router } = require('express')
const bcrypt = require("bcryptjs")
const User = require('../models/user')
const router = Router()

router.get('/login', async (req, res) => {
    res.render('auth/login', {
        title: 'Авторизация',
        isLogin: true,
        loginError: req.flash('loginError'),
        registerError: req.flash('registerError')
    })
})

router.get('/logout', async (req, res) => {
    req.session.destroy(() => {
        res.redirect('/auth/login#login')
    })
})

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body
        const candidate = await User.findOne({ email })
        if (candidate) {
            const areSame = await bcrypt.compare(password, candidate.password);
            if (areSame) {
                req.session.user = candidate;
                req.session.isAuthenticated = true
                req.session.save(err => {
                    if (err) throw err
                    res.redirect('/')
                })
            } else {
                req.flash('loginError', 'Неверный пароль')
                res.redirect('/auth/login#login') 
            }
        } else {
            req.flash('loginError', 'Такого пользователя не существует')
            res.redirect('/auth/login#login') 
        }
    } catch (error) {
        console.log(error);
    }
})

router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body
        
        const candidate = await User.findOne({ email })
        if (candidate) {
            req.flash('registerError', 'Пользователь с таким Email уже существует')
            res.redirect('/auth/login#register')
        } else {
            const hashPassword = await bcrypt.hash(password, 10)
            const user = new User({
                name: name,
                email: email,
                password: hashPassword,
                cart: {items: []}
            })
            await user.save()
            res.redirect('/')
        }
    } catch (error) {
        console.log(error);
    }
})

module.exports = router