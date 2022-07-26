const { default: mongoose } = require('mongoose');
const moongose = require('mongoose');
const URI = 'mongodb://localhost:27017/video_games';
moongose.connect(URI)
.then(db=> console.log('DB is connect'))
.catch(err => console.error(err))

module.exports = mongoose;