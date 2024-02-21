const mongoose = require('mongoose');

const dbConnection = async() =>{
    
    try {
    await mongoose.connect(process.env.MONGODB_CNN,{
            useNewUrlParser: true,
            useUnifiedTopology:true,
          
            // useCreateIndex:true,
            // useFindAndModify:false
    });
     console.log('Bases de datos online');
            
    } catch (error) {
        console.error("Error al conectar a la base de datos:", error);
        throw new Error("Error a la hora de iniciar la base de datos");
    }
    
   }

module.exports = {
    dbConnection
}