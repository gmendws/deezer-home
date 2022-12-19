const mongoose = require('mongoose')

const Music = mongoose.model('Music', {
    nameMusic: String,
    singer: String
})

module.exports = Music