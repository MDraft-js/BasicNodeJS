const express = require('express');
const exphbs = require('express-handlebars')
const path = require('path')
const homeRoutes = require('./routes/home')
const cardRoutes = require('./routes/card')
const coursesRoutes = require('./routes/courses')
const addRoutes = require('./routes/add')

const app = express();

const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs');
app.set('views', 'views')

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extanded: true }))

app.use('/', homeRoutes)
app.use('/add', addRoutes)
app.use('/card', cardRoutes)
app.use('/courses', coursesRoutes)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
})