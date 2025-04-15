import mongoose from "mongoose";

 export function connectToMongo(url) {
    return mongoose.connect(url, { // Return the promise from mongoose.connect
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
}


