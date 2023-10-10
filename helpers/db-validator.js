const Role = require('../models/role');
const Usuario = require('../models/usuario');

 const esRoleValido =  async (rol = '') =>{
    const existerol = await Role.findOne({rol});
      if (!existerol) {
         throw new Error(`El rol ${rol} no esta registrado en la BD`)
      }
}

  const  emailExiste= async (correo = "") =>  {
      //Verificar si el correo existe
    const  existeEmail = await Usuario.findOne({correo})
    if (existeEmail) {
        throw new Error(`El correo: ${correo}, ya esta registrado`);
     }

  }
 
module.exports = {
     esRoleValido,
     emailExiste
}