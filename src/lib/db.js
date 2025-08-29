import mongoose from "mongoose"

//yaha db connection dena hai
export async function connectDB() {
    const  DBNAME="/WORKFLOW2"
    const name=process.env.MONGO_DB_URI+DBNAME
    try {
        mongoose.connect(name) 
        const connection=mongoose.connection
        connection.on('connected',()=>{
            console.log("Mongo Db jud gya")
        })
        connection.on('error',(err)=>{
            console.log("Mongo Db uddd gya, db is not running"+err)
            process.exit()
        })


    } catch (error) {
        console.log("something went wrong is connceting to db ye error",error)
    }
}