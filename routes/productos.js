const {Router} = require('express');
const {check} = require ('express-validator');


const {crearProducto, actualizarProducto, obtenerProductos, borrarProducto} = require('../controllers/productos');
const { validarJwt, validarCampos, validarUser } = require('../middlewares');
const { obtenerProd, obtenerCat } = require('../helpers/db-validators');

const router = Router()

router.get('/',obtenerProductos)


router.post('/',[
    validarJwt,
    check('nombre','el nombre es obligatorio').not().isEmpty(),
    check('categoria','debe ser un id de mongo').isMongoId(),
    check('categoria').custom(obtenerCat),
    check('descripcion','descripcion obligatoria').not().isEmpty(),
    validarCampos,
    

], crearProducto)

router.put('/:id',[
    validarJwt,
    check('id','debe ser un id de mongo').isMongoId(),
    check('id').custom(obtenerProd),
    check('nombre','el nombre es obligatorio').not().isEmpty(),
    check('descripcion','descripcion obligatoria').not().isEmpty(),
    

    validarCampos,
],actualizarProducto)

router.delete('/:id',[
    validarJwt,
    validarUser,
    check('id','Debe ingresar un id de mongo').isMongoId(),
    check('id').custom(obtenerProd),
    validarCampos
],borrarProducto)








module.exports = router