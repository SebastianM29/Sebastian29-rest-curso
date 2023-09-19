
const { response,request } = require ('express')
const Usuario = require('../models/usuario')
const bcryptjs = require ('bcryptjs');
const { Promise } = require('mongoose');
  

   /* const conexion = {estado : true}
    //contamos la cantidad de usuarios y filtramos por estado de conexion.
    const total = await Usuario.countDocuments(conexion)
    const usuarios = await Usuario.find(conexion)
    //propios de find 
      .limit(Number(limite))
      .skip(Number(desde))
      
      
       res.json({
       total,
       // usuarios es igual a usuarios:usuarios
       usuarios

    })
    
    */


const usuariosGet = async(req = request , res = response)=> {

    //const {q , nombre = "no name",apikey ,page , limit} = req.query;
    const {limite=5,desde=0} = req.query
    const conexion = {estado : true}
    
    // en una promise junto las 2 await para optimizar ya que los await son codigos bloqueantes y tardarian mas por separados  
    // En vez de crear una constante ... se desestructura para asi poder ubicar como corresponde y quede mejor visualmentte en el get la cantidad
      const [cantidad , user ] = await Promise.all([
         Usuario.countDocuments(conexion),
         Usuario.find(conexion).limit(Number(limite)).skip(Number(desde))
      ])
    res.json({
      cantidad,
      user

    })
  }
  
    const usuariosPost = async(req, res)=> {
    //
     
  
  
    const {nombre,email,password,rol} = req.body;
    const usuario = new Usuario ({nombre,email,password,rol});
  
    //encriptar password
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password,salt);
  
    //guardar en bd
    await usuario.save();
    res.json({
       
        msg : 'post api - controlador - desarrollo',
        usuario
      
    })
  }
  
  
  //actualizo post validacion de id y rol
  const usuariosPut = async(req, res)=> {
    const {id} = req.params;
    //desestructuro lo q no necesito que se grabe o se manipule
    const {_id,password,google,email,...resto} = req.body;
    // validar contra base de datos
    if (password) {
      //encriptar contraseña
      const salt = bcryptjs.genSaltSync();
      resto.password = bcryptjs.hashSync(password,salt);
    }
    //busco `por id y actualizo resto (llamese usuario posteriormente)
    const usuario = await Usuario.findByIdAndUpdate(id,resto)
   
    res.json({
        ok : true,
        msg : 'put api - controlador',
        usuario
    });
  }
 
  
  const usuariosPatch = (req, res)=> {
    res.json({
        ok : true,
        msg : 'patch api - controlador'
    })
  }
  


 const usuariosDelete = async(req, res)=> {
  const {id} = req.params;
  //borrar fisicamente un usuario
  //const borrado =await Usuario.findByIdAndDelete(id);
  
  const deleteState =await Usuario.findByIdAndUpdate(id,{estado : false})
  //el que cuenta con autentificacion por lo tanto tambien esta almacenada la informacion del req.usuario
  const usuarioAutorizado = req.usuario;
    

  
    res.json({
       // borrado
       
        deleteState,
        msg : 'delete api --- controlador',
        user : usuarioAutorizado
        
    })
  }
  





  module.exports={
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch, 
    usuariosDelete
   
}