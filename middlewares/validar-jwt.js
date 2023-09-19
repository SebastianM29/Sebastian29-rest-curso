const {request , response } = require('express')
const jwt = require ('jsonwebtoken');

const Usuario = require ('../models/usuario');







const validarJwt = async (req=request, res=response,next )=>{
const token = req.header('x-token') ;
if (!token) {
    return res.status(401).json({
      msg : "ingrese token por favor"
    })
}
try {

  

    //declaro constante (dentro de jwt por ejemplo const payload = { uid: '64d27cba129720326e91791e', iat: 1691772249, exp: 1691779449 } , por eso de ahi desestructuro directamente y obtengo uid se encuentran los datos, por eso desestructuro parea obtener el que necesito)
    const {uid} = jwt.verify( token,process.env.KeyKeyPayload );
    //para mostrar en pantalla el valor de payload o sea buscar el uid que tenemos guardado en el token
    
    console.log (uid)

   
    const usuario = await Usuario.findById (uid);
 

    
    // si se regrtesa un undefined o un null ( al no encuentra nada )

    if (!usuario) {
        return res.status(401).json({
            msg:'token no valido - usuario borrado de la base de datos'
        })
        
    }
    
    
    //verificar si el uid tiene el estado en true (!usuario.estado   significa lo mismo - estado del usuario falso)
    
    if (usuario.estado === false) {
        return res.status(401).json({
            msg:'token no valido - usuario estado false'
        })
        
    }
    
    req.usuario = usuario;
    
    
   






    next ()
    
} catch (error) {

    console.log(error);
    res.status(401).json ({
        msg : 'token no valido'
    })
    
}



}


module.exports =  {validarJwt};