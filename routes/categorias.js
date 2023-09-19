const {Router} = require ('express');
const {check} = require ('express-validator');


const { crearCategoria,
        obtenerCategorias, 
        obtenerCategoriasPorId, 
        actualizarCategoria, 
        borrarCategoria } = require('../controllers/categorias');

const { validarJwt,validarCampos, validarUser} = require('../middlewares');
const { obtenerCat } = require('../helpers/db-validators');


const router = Router();


//{{url}}/api/categorias
//obtener todas las categorias
router.get('/',obtenerCategorias)

//obtener una categoria por id
router.get('/:id',[
    check('id','no es un id de mongo valido').isMongoId(),
    //crear para reutilizar
    check('id').custom(obtenerCat),
    validarCampos
],obtenerCategoriasPorId)



//crear una categoria -privado- cualquier persona con un token valido
router.post('/',
[validarJwt,
check('nombre','el nombre es obligatorio').not().isEmpty(),

validarCampos],
crearCategoria)

//Actualizar -privado- cualquiera con token valido
router.put('/:id',[
    validarJwt,
    check('nombre','el nombre debe ser obligatorio').not().isEmpty(),
    check('id','no es un id de mongo valido').isMongoId(),
     //crear para reutilizar
    check('id').custom(obtenerCat),
    validarCampos    
],
actualizarCategoria)

//borrar una categoria -solo Admin- 
router.delete('/:id',[
    validarJwt,
    validarUser,
    check('id','no es un id de mongo valido').isMongoId(),
    //crear para reutilizar
   check('id').custom(obtenerCat),
   
    validarCampos
],
borrarCategoria)














module.exports = router