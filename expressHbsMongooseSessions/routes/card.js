const { Router } = require(`express`)
const Course = require(`../models/course`)
const auth = require('../middleware/auth')
const router = Router()

function mapCartItems(cart) {
    return cart.items.map(item => ({
        ...item.courseId._doc, id: item.courseId.id, count: item.count
    }))
}

function computePrice(courses) {
    return courses.reduce((total, course) => {
        return total += course.price * course.count;
    }, 0)
}

router.get('/', auth, async (req, res) => {
    const user = await req.user.populate('cart.items.courseId', nam).execPopulate()
    const courses = mapCartItems(user.cart)

    res.render('card', {
        title: 'Корзина',
        isCard: true,
        courses: courses,
        price: computePrice(courses)
    })
})

router.post('/add', auth, async (req, res) => {
    const course = await Course.findById(req.body.id).lean()
    await req.user.addToCart(course)
    res.redirect('/card')
})

router.delete('/remove/:id', auth, async (req, res) => {
    await req.user.removeFromCart(req.params.id)
    const user = await req.user.populate('cart.items.courseId').execPopulate()

    const courses = mapCartItems(user.cart)
    const cart = {
        courses, price: computePrice(courses)
    }

    res.status(200).json(cart)
})

module.exports = router