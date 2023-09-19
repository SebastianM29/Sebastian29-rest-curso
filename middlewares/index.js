const  validaCampos  = require('../middlewares/validar-campos')
const validandoJwt = require('../middlewares/validar-jwt')
const validaRoles = require('../middlewares/validarUser')
//acordarse de exporar como objetos asi puede desestructurar validarCampos.js,validarJwt.js,validarUser.js
module.exports = {
    ...validaCampos,
    ...validandoJwt,
    ...validaRoles

}
