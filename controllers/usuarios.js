const {response,request} = require('express');


const usuariosGet = (req = request, res = response) => {
   const {q,nombre ='no name',apikey,page = 1,limit} = req.query;
    res.json({
        q,nombre,apikey,page,limit
    });
  }

 const usuariosPut =  (req, res) => {
    const id = req.params.id;

    res.status(500).json({
        id,
        msg: 'Put API - controlador'
    })
  }

  const usuariosPost = (req, res) => {
    const {nombre,edad} = req.body;
    res.status(201).json({
        msg: 'Post API - controlador ',
        nombre,edad,
        
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