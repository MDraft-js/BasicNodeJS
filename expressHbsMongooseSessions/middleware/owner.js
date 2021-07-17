const Course = require('../models/course')

module.exports = async function (req, res, next) {
    const id = req.params.id || req.body.id
    const course = await Course.findById(id).lean()
    if (String(req.user._id) != String(course.userId)) return res.redirect('/')

    next()
}