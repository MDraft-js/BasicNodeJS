const User = require('../data/user')

module.exports = async function (req, res, next) {
    if (!req.session.user) return next()

    req.user = await User.findById(req.session.user._id)
    res.locals.isAuth = req.session.isAuth
    res.locals.isAdmin = req.session.isAdmin
    next()
}