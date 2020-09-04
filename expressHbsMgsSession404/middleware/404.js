module.exports = function (req, res, next) {
    res.status(404).render('404', {
        title: '404 – страница не найдена',
        layout: '404'
    })
}