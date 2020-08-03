const { Router } = require('express')
const Course = require('../models/course')
const router = Router()

router.get('/', async (req, res) => {
    const courses = await Course.find().lean().populate('userId', 'name, email')

    res.render('courses', {
        title: 'Все курсы',
        isCourses: true,
        courses
    })
})

router.get('/:id', async (req, res) => {
    const course = await Course.findById(req.params.id).lean()
    res.render('course', {
        title: `Курс ${course.title}`,
        layout: 'empty',
        course
    })
})

router.post('/edit', async(req, res) => {
    const { id } = req.body;
    delete req.body.id;
    await Course.findByIdAndUpdate(id, req.body)
    res.redirect('/courses')
})

router.post('/delete', async (req, res) => {
    try {
        await Course.findByIdAndDelete(req.body.id)
        res.redirect('/courses')
    } catch (error) {
        console.log(error);
    }
})

router.get('/:id/edit', async (req, res) => {
    if (!req.query.allow) {
        return res.redirect('/')
    }

    const course = await Course.findById(req.params.id).lean()

    res.render('course-edit', {
        title: `Редактировать ${course.title}`,
        course
    })
})

module.exports = router