const { Router } = require('express')
const Course = require('../models/course')
const auth = require('../middleware/auth')
const { courseValidator } = require('../utils/validator')
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

router.get('/:id/edit', auth, async (req, res) => {
    if (!req.query.allow) {
        return res.redirect('/')
    }

    try {
        const course = await Course.findById(req.params.id).lean()
    
        res.render('course-edit', {
            title: `Редактировать ${course.title}`,
            course
        })
    } catch (error) {
        console.log(error);
    }
})

router.post('/edit', auth, courseValidator, async(req, res) => {
    const errors = validationResult(req)
    
    if(!errors.isEmpty()) {
        return res.status(422).redirect(`courses/${id}/edit?allow=true`)
    }

    const { id } = req.body;
    delete req.body.id;
    await Course.findByIdAndUpdate(id, req.body)
    res.redirect('/courses')
})

router.post('/delete', auth, async (req, res) => {
    try {
        await Course.findByIdAndDelete(req.body.id)
        res.redirect('/courses')
    } catch (error) {
        console.log(error);
    }
})

module.exports = router