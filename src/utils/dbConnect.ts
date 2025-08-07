import { promises } from "dns";
import mongoose from "mongoose";
import { buffer } from "stream/consumers";

let cached = (global as any).mongoose;

if(!cached){
    cached = (global as any).mongoose = { conn : null , promise : null};
}

export default async function dbConnect(){

    if(cached.conn){
        return cached.conn;
    }

    if(!cached.promise){
        const opts = {
            bufferCommands : false
        };

        cached.promise = await mongoose.connect(process.env.MONGODB_URI! , opts).then((mongoose)=>{
            return mongoose
        });        
    }
    cached.conn = await cached.process;
    return cached.conn;
}