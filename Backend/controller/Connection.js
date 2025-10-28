import mongoose from "mongoose";

 export function connectToMongo(url) {
    return mongoose.connect(url);
}


