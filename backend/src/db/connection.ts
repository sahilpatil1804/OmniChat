import {connect, disconnect} from "mongoose"
async function connectToDb(){
    try{
        await connect(process.env.MONGODB_URL)
    }catch(error){
        console.log(error)
        throw new Error("can't connect to db")
    }
}
async function disconnectFromDb(){
    try{
        await disconnect()
    }catch(error){
        console.log(error)
        throw new Error("can't disconnect")
    }
}
export {connectToDb, disconnectFromDb}