const {response,request} = require('express');
const bcryptjs = require('bcryptjs')
const Usuario = require('../models/usuario');


 const usuariosGet = (req = request, res = response) => {
   const {q,nombre ='no name',apikey,page = 1,limit} = req.query;
    res.json({
        msg: 'Get API - controlador',
        q,nombre,apikey,page,limit
    });
  }

  const usuariosPut = async(req, res = response) => {
    const {id} = req.params;
    const {_id,password,google,correo, ...resto} = req.body;
    
    //TODO:validar contra base de datos

    if (password) {
      const salt = bcryptjs.genSaltSync();
      resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id,resto);

    res.json(usuario);

 }

// const usuariosPut = async (req, res = response) => {
//   const { id } = req.params;
//   const { password, ...resto } = req.body;

//   try {
//       const usuario = await Usuario.findById(id);

//       if (!usuario) {
//           return res.status(404).json({
//               ok: false,
//               msg: 'Usuario no encontrado'
//           });
//       }

//       if (password) {
//           const salt = bcryptjs.genSaltSync();
//           resto.password = bcryptjs.hashSync(password, salt);
//       }

//       const usuarioActualizado = await Usuario.findByIdAndUpdate(id, resto, { new: true });

//       res.json({
//           ok: true,
//           usuario: usuarioActualizado
//       });
//   } catch (error) {
//       console.error(error);
//       res.status(500).json({
//           ok: false,
//           msg: 'Error al actualizar usuario'
//       });
//   }
// }



  const usuariosPost = async (req, res) => {
     
    // const {nombre,edad} = req.body;
    const {nombre,correo,password, rol} = req.body;
    const usuario = new Usuario({nombre,correo,password,rol});
   
    
    //Encriptar la contraseña
     const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password,salt);


    //Guardar en DB
    await usuario.save();
  
    res.json({
        usuario
       
    })
  }

 const usuariosDelete =  (req, res) => {
    res.json({
        ok: true,
        msg: 'Delete API - controlador'

    })
  }

 const usuauriosPatch =  (req, res) => {
    res.json({
        ok: true,
        msg: 'Patch API'

    })
  }

  module.exports = {
     usuariosGet,
     usuariosPost,
     usuariosPut,
     usuariosDelete,
     usuauriosPatch,
     
  }
