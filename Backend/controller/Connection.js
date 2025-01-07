const mongoose = require('mongoose');

function connectToMongo(url) {
    return mongoose.connect(url, { // Return the promise from mongoose.connect
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
}

module.exports = { connectToMongo };
