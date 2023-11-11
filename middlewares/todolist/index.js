function BodyValidaton(req, res, next) {
    const { todo, detail } = req.body

    if ( !todo || !detail ) {
        res.status(400).send({
            message: 'Field is not complete!',
            statusText: 'Field is not complete!',
            statusCode: 400,
        })
    } else {
        next()
    }
}

module.exports = {
    BodyValidaton
}