 const { response } = require('express');
const jwt = require('jsonwebtoken');

const Usuario = require('../models/usuario');
const usuario = require('../models/usuario');

// Validacion del token
const validarJWT = async  (req,res = response,next) => {
   
    const token = req.header('x-token');
    
     if (!token) {
       
        return res.status(401).json({
            msg: 'No hay token en la petición'
        });
     }
         
         try {

         const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
         
         //lerr el usuario que corresponde al uid
         const  usuario = await Usuario.findById(uid);
        
         if (!usuario) {
            return res.status(401).json({
                msg: 'Token no valido - usuario no existe en DB: false'
 
              })
         }
            

         // verificar si el uid tiene el estado en true

         if (!usuario.estado) {
             return res.status(401).json({
               msg: 'Token no valido - usuario con estado: false'

             })
         }
          

         req.usuario = usuario;
         next();

         } catch (error) {
            console.log(error);
            res.status(401).json({
                msg: 'Token no valido'
            })
         }
    


}

module.exports = {
    validarJWT
}