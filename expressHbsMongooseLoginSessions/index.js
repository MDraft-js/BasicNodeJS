const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");
const mongoStore = require("connect-mongodb-session")(session);
const flash = require('connect-flash')
const csrf = require("csurf")
const path = require("path");

const homeRoutes = require("./routes/home");
const authRoutes = require("./routes/auth");

const mongoDB_url = 'mongodb+srv://Mikun:Bu3p4z5wh35rhNh@cluster0.osr5q.mongodb.net/gameshoptest'
const varMiddleware = require("./middleware/variables");
const userMiddleware = require("./middleware/user")

const app = express();

app.engine("hbs", exphbs({
    partialsDir: './views/components',
    defaultLayout: "main",
    extname: "hbs",
}));
app.set("view engine", "hbs");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extanded: true }));
app.use(session({
    secret: "some secret value",
    resave: false,
    saveUninitialized: false,
    store: new mongoStore({
        collection: 'sessions',
        uri: mongoDB_url
    })
}));
app.use(userMiddleware);
app.use(csrf());
app.use(varMiddleware);
app.use(flash())


app.use("/", homeRoutes);
app.use("/auth", authRoutes);

const PORT = process.env.PORT || 3000;

async function start() {
    try {
        await mongoose.connect(mongoDB_url, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useFindAndModify: false,
        });
        app.listen(PORT, () => {
            console.log(`Server started at http://localhost:${PORT}`);
        });
    } catch (error) {
        console.log(error);
    }
}
start();