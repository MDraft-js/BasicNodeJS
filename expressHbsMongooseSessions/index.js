const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");
const mongoStore = require("connect-mongodb-session")(session);
const csrf = require("csurf")
const flash = require('connect-flash')
const path = require("path");

const homeRoutes = require("./routes/home");
const addRoutes = require("./routes/add");
const cardRoutes = require("./routes/card");
const ordersRoutes = require("./routes/orders");
const coursesRoutes = require("./routes/courses");
const authRoutes = require("./routes/auth");

const mongoDB_url = 'mongodb+srv://Mikun:Bu3p4z5wh35rhNh@cluster0.vjf8v.mongodb.net/shop'
const varMiddleware = require("./middleware/variables");
const userMiddleware = require("./middleware/user")

const app = express();

app.engine("hbs", exphbs({
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
app.use(flash())
app.use(userMiddleware);
app.use(varMiddleware);
app.use(csrf());


app.use("/", homeRoutes);
app.use("/add", addRoutes);
app.use("/card", cardRoutes);
app.use("/orders", ordersRoutes);
app.use("/courses", coursesRoutes);
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