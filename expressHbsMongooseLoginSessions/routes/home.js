const { Router } = require('express')
const admin = require('../middleware/admin')
const auth = require('../middleware/auth')
router = Router()

router.get('/', (req, res) => {
    res.render('index', {
        title: 'Главная',
        isHome: true,
    })
})

router.get('/admin', admin, (req, res) => {
    res.send('Далова')
})

router.get('/user', auth, (req, res) => {
    res.send(`name: ${req.user.name}\nemail: ${req.user.email}`)
})

module.exports = router