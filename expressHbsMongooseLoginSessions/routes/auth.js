const { Router } = require('express')
const User = require('../data/user')
const bcrypt = require('bcrypt')
router = Router()

router.get('/login', (req, res) => {
    res.render('auth/login', {
        title: 'Авторизация',
        isLogin: true,
        loginError: req.flash('loginError'),
        registerError: req.flash('registerError')
    })
})

router.get('/logout', (req, res) => req.session.destroy(() => res.redirect('/auth/login#login')))

router.post('/login', async (req, res) => {
    try { 
        const { email, password } = req.body
        const candidate = await User.findOne({ email })
    
        if (candidate) {
            const passwordCheck = await bcrypt.compare(password, candidate.password)
            if (passwordCheck) {
                req.session.user = candidate;
                req.session.isAuth = true;
                req.session.isAdmin = candidate.isAdmin;
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
                password: hashPassword
            })
            await user.save()
            const userSession = await User.findOne({ email })
            req.session.user = userSession;
            req.session.isAuth = true;
            req.session.isAdmin = userSession.isAdmin;
            req.session.save(err => {
                if (err) throw err
                res.redirect('/')
            })
        }
    } catch (error) {
        console.log(error);
    }
})

module.exports = router