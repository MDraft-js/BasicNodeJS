const { Router } = require(`express`)
const Order = require(`../models/order`)
const auth = require(`../middleware/auth`)
const router = Router()

router.get('/', auth, async (req, res) => {
    try {
        const orders = await Order.find({ 'user.userId': req.user._id }).lean().populate('user.userId')

        let test = orders.map(order => ({
            ...order,
            price: order.courses.reduce((total, c) => {
                return total + c.count * c.course.price;
            }, 0)
        }))

        res.render('orders', {
            title: 'Заказы',
            isOrders: true,
            orders: orders.map(order => ({
                ...order,
                price: order.courses.reduce((total, c) => {
                    return total + c.count * c.course.price;
                }, 0)
            }))
        })
    } catch (error) {
        console.log(error);
    }
})

router.post('/', auth, async (req, res) => {
    try {
        const user = await req.user.populate('cart.items.courseId').execPopulate()
    
        const courses = user.cart.items.map(item => ({
            count: item.count,
            course: { ...item.courseId._doc }
        }))
    
        const order = new Order({
            user: {
                name: req.user.name,
                userId: req.user._id
            },
            courses: courses
        })
    
        await order.save()
        await req.user.clearCart();
    
        res.redirect('/orders')
    } catch (error) {
        console.log(error);
    }
})

module.exports = router