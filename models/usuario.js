const {Schema,model} = require('mongoose');

const UsuarioSchema = Schema({
    nombre: {
          type:String,
          require:[true, 'El nombre es obligatorio']
        },
    correo: {
          type:String,
          require:[true, 'El correo es obligatorio'],
          unique: true
        },
   password: {
          type:String,
          require:[true, 'La contraseña es obligatorio'],
        },
    img: {
          type:String,
        },
    rol: {
          type:String,
          require: true,
          enum: ['ADMIN_ROLE','USER_ROLE']
        },
    estado: {
         type :Boolean,
         default:true
      }, 
    google: {
        type :Boolean,
         default:false
      }  
});

// desestruccturacion para quitar el la version y el password del modelo de usuario al hacer la peticion post
UsuarioSchema.methods.toJSON = function() {
     const {__v,password,_id,...usuario  } = this.toObject();
     usuario.uid = _id;
     return usuario;
}

module.exports = model('Usuario',UsuarioSchema);

