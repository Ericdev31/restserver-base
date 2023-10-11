const mongoose = require('mongoose');

const dbConnection = async() =>{
    
    try {
    await mongoose.connect(process.env.MONGODB_CNN,{
            useNewUrlParser: true,
            useUnifiedTopology:true,
            debug: true  
           //    useCreateIndex:true,
           //  useFindAndModify:false
    });
     console.log('Bases de datos online');
            
    } catch (error) {
        console.log(error);
        throw new Error ('Error a la hora de iniciar la base datos');
    }
}


module.exports = {
    dbConnection
}