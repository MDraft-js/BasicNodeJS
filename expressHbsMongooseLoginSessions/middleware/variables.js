module.exports = function (req, res, next) {
    res.locals.csrf = req.csrfToken()

    next()
}