const {Router} = require('express');
const { check } = require('express-validator');


const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');

const { 
      crearCategoria,
      obetenerCategorias,
      obetenerCategoria,
      ActualizarCategoria,
      BorrarCategoria,  
} = require('../controllers/categorias');

const { existeCategoriaPorId } = require('../helpers/db-validator');


const router = Router();

//Obtener todas las categorias - publico
router.get('/', obetenerCategorias);


//Obtener una  categorias por id - publico
router.get('/:id',[
  check( 'id' ,'no es un id de Mongo valido').isMongoId(),
  check('id').custom(existeCategoriaPorId),
  validarCampos
]
,obetenerCategoria);

//Crear categorias - publico- cualquier persona con un token valido
router.post('/',[
      validarJWT, 
      check('nombre','El nombre es obligatorio').not().isEmpty(),
      validarCampos
], crearCategoria);

//Actualizar - privado -cualquiera con un token valido
router.put('/:id', [
      validarJWT,
      check('nombre','El nombre es obligatorio').not().isEmpty(),
      check('id').custom(existeCategoriaPorId),
      validarCampos
],ActualizarCategoria);


// Borrar una categoria- Admin
router.delete('/:id', [
      validarJWT,
      esAdminRole,
      check( 'id' ,'no es un id de Mongo valido').isMongoId(),
      check('id').custom(existeCategoriaPorId),
      validarCampos
],BorrarCategoria);


module.exports = router;