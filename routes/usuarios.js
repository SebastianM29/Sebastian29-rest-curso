

const {Router} = require ('express')
const { check } = require('express-validator')
const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete, usuariosPatch } = require('../controllers/user')
const { validarRol, emailExiste, usuarioExistePorId } = require('../helpers/db-validators')
//const { validarCampos } = require('../middlewares/validar-campos')
//const validarJwt = require('../middlewares/validar-jwt')
//const {validarUser, validarRolusers} = require('../middlewares/validarUser')
const {validarCampos,validarJwt,validarUser,validarRolusers}= require('../middlewares')

const router = Router()

  router.get('/', usuariosGet);


  
  router.put('/:id',[
    check('id', 'no es un id valido').isMongoId(),
    check('id').custom(id=> usuarioExistePorId(id)),
    check ('rol').custom( rol =>  validarRol(rol) ),
    validarCampos

  ], usuariosPut);
 
  router.post('/',[
    //va preparando los errores, prepara en la req todos los errores y los almacena
  
  check ('nombre','El nombre debe ser obligatorio').not().isEmpty(),
  check ('password', 'El password debe ser de mas de 6 letras').isLength({min:6}),
  check ('email','El email no es valido').isEmail(),
  check ('email').custom(email => emailExiste(email)),
  //check ('rol', ' no es un rol valido').isIn(['ADMIN_ROLE','USER_ROLE']),
  check ('rol').custom( rol =>  validarRol(rol) ),
  validarCampos
], usuariosPost);

  
 
  router.patch('/', usuariosPatch);
 
  router.delete('/:id',[
    validarJwt,
    //validarUser,
    validarRolusers('VENTAS_ROLE','ADMIN_ROLE','CAJAS_ROLE'),
    check('id', 'no es un id valido').isMongoId(),
    check('id').custom(id=> usuarioExistePorId(id)),
    validarCampos
    //controlador
  ], usuariosDelete);

  








  module.exports = router ;