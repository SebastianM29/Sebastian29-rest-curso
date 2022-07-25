
const { response,request } = require ('express')




const usuariosGet = (req = request , res = response)=> {

    const {q , nombre = "no name",apykey ,page , limit} = req.query;
    
    res.json({
        ok : true,
        msg : 'get api - controlador',
        q,
        apykey,
        page,
        limit,
        nombre

    })
  }
  
  const usuariosPost = (req, res)=> {
    const {edad,hobbie} = req.body;
    res.json({
        ok : true,
        msg : 'post api - controlador',
       edad,
       hobbie
    })
  }
  
  const usuariosPut = (req, res)=> {
    const id = req.params.id;
    res.json({
        ok : true,
        msg : 'put api - controlador',
        id
    })
  }
 
  
  const usuariosPatch = (req, res)=> {
    res.json({
        ok : true,
        msg : 'patch api - controlador'
    })
  }
  


 const usuariosDelete = (req, res)=> {
    res.json({
        ok : true,
        msg : 'delete api - controlador'
    })
  }
  





  module.exports={
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch, 
    usuariosDelete
   
}