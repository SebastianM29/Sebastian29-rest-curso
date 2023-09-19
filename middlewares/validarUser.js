const { request, response } = require("express");







const validarUser = (req = request, res = response,next) => {
   if (!req.usuario) {
      return res.status(500).json({
         msg:'se requiere verificar el rol sin validar el token primero'
      })
   }  
   
   
   
   
   const {rol,nombre} = req.usuario;
     if (rol!='ADMIN_ROLE') {
     return res.status(401).json({

        msg : ` ${nombre} no es administrador `
     })
        
     }
    next()

}



const validarRolusers=(...rol)=> {
  return (req=request , res=response , next)=>{

   if (!req.usuario) {
      return res.status(500).json({
         msg:'se requiere verificar el rol sin validar el token primero'
      })
   }
   if (!rol.includes(req.usuario.rol)) {
      res.status(401).json({
         msg:`el servicio requiere uno de estos roles ${rol}`
      })
      
   }
   
   
   console.log(req.usuario.rol)
   console.log(rol)

   next();
  }

}


module.exports = {
   validarUser,
   validarRolusers

}