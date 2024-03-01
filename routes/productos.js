
const {Router} = require('express');
const { check } = require('express-validator');


const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');

const { obetenerProductos, 
      obetenerProducto, 
      crearProducto,
      actualizarProducto, 
      borrarProducto } = require('../controllers/productos');
    


const { existeProductoPorId, existeCategoriaPorId } = require('../helpers/db-validator');



const router = Router();

//Obtener todas las producto - publico
router.get('/',obetenerProductos );

//Obtener un  Producto por id - publico
router.get('/:id',[
  check( 'id' ,'no es un id de Mongo valido').isMongoId(),
  check('id').custom(existeProductoPorId),
  validarCampos
]
,obetenerProducto);

//Crear productos - publico- cualquier persona con un token valido
router.post('/',[
      validarJWT, 
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('categoria','No es un Id de Mongo').isMongoId(),
    check('categoria').custom(existeCategoriaPorId),
    validarCampos
], crearProducto);

//Actualizar producto - privado -cualquiera con un token valido
router.put('/:id', [
      validarJWT,
      //check('Categoria','No es un Id de Mongo').isMongoId(),
      check('id').custom(existeProductoPorId),
      validarCampos
],actualizarProducto);


// Borrar una producto- Admin
router.delete('/:id', [
      validarJWT,
      esAdminRole,
      check( 'id' ,'no es un id de Mongo valido').isMongoId(),
      check('id').custom(existeProductoPorId),
      validarCampos
],borrarProducto);


module.exports = router;