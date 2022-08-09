
const Role = require('../models/role')
const Usuario = require ('../models/usuario' )






const validarRol = async(rol ='') => {
    const existeRol = await Role.findOne({rol})
    if (!existeRol) {
      throw new Error('No existe rol en nuestra base de datos')
      
    }

  }

 const emailExiste = async(email='')=>{
    const existeEmail = await Usuario.findOne({email});
    if (existeEmail) {
      throw new Error(`el correo ${ email} ya esta registrado` )
   
      }

 } 



 const usuarioExistePorId = async(id)=>{
  const existeUsuario = await Usuario.findById({_id:id});
  if (!existeUsuario) {
    throw new Error(`el id : ${id} no existe ` )
 
    }

} 
 
 
 
 
 
 







  module.exports = { validarRol,emailExiste,usuarioExistePorId }