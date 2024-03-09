
const dbValitador  = require('./db-validator');
const generarJWT   = require('./generar-jwt');
const googleVeryfy = require('./google-verify');
const subirArchivo = require('./subir-archivo');

module.exports =  {
    ...dbValitador,
    ...generarJWT,
    ...googleVeryfy,
    ...subirArchivo,
}