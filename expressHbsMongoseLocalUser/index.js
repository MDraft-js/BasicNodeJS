const express = require('express');
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const path = require('path')

const homeRoutes = require('./routes/home')
const addRoutes = require('./routes/add')
const cardRoutes = require('./routes/card')
const ordersRoutes = require('./routes/orders')
const coursesRoutes = require('./routes/courses')

const User = require('./models/user')

const app = express();

const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs',
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs');
app.set('views', 'views')

app.use(async (req, res, next) => {
    try {
        const user = await User.findById('5f23e2a14252b91978417a04')
        req.user = user
        next()
    } catch (error) {
        console.log(error);
    }
})

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extanded: true }))

app.use('/', homeRoutes)
app.use('/add', addRoutes)
app.use('/card', cardRoutes)
app.use('/orders', ordersRoutes)
app.use('/courses', coursesRoutes)

const PORT = process.env.PORT || 3000;

async function start() {
    try {
        let url = `mongodb+srv://Mikun:Bu3p4z5wh35rhNh@cluster0.vjf8v.mongodb.net/shop`;
        await mongoose.connect(url, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useFindAndModify: false
        })
        const candidate = await User.find();
        if (!candidate.length) {
            let user = new User({
                name: 'Jane',
                email: 'jane@example.com',
                cart: {items: []}
            })
            user.save()
        }
        app.listen(PORT, () => {
            console.log(`Server started at http://localhost:${PORT}`);
        })
    } catch (error) {
        console.log(error);
    }
}
start()

