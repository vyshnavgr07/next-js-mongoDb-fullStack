import mongoose from 'mongoose';

export async function connect(){
    try {
 mongoose.connect(process.env.DB_URL)
        const connection=mongoose.connection 
        connection.on('connected',()=>{
            console.log('mongodb connected')
        })

        connection.on('error',()=>{
            console.log('db connection error');
            process.exit()
        })
    } catch (error) {
        console.log('something went wrong connecting to db')
    }
}