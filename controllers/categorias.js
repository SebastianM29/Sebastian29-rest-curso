const{response,request} = require('express');
const { Categoria } = require('../models');


// obtenerCategorias - paginado -total - populate

const obtenerCategorias = async(req=request,res=response)=>{

    const {limite ,desde } = req.query
    const estado = {estado:true}
    const [pagina,total] = await Promise.all([
        Categoria.find(estado).skip(Number(desde)).limit(Number(limite)).populate('usuario'),
        Categoria.countDocuments(estado)

    ])
    pagina.usuario = "no se";
    console.log(pagina)
    

    res.json({
       pagina,
       total,
       msg:'todo ok aca'
    })
   }

// obtenerCategoria por id - populate
const obtenerCategoriasPorId = async(req=request,res=response)=>{
const {id} = req.params;
console.log(id);
const find = await Categoria.findById(id).populate('usuario')
console.log(find)    

    res.json({
       find,
       msg:'categoria por id'
    })
}

const crearCategoria = async(req,res = response)=>{

    const nombre = req.body.nombre.toUpperCase();
    const categoria =await Categoria.findOne({nombre});
    if (categoria) {
        return res.status(400).json({
            msg: `la categoria ${categoria.nombre}, ya existe en la base de datos`
        });
    };

    const data = {
        nombre,
        usuario: req.usuario._id
    }
    console.log(data)
    const categoriaCreada = new Categoria(data)
 
    await categoriaCreada.save();
    console.log(categoriaCreada)



    res.json({
       msg:'creacion categoria post',
       categoriaCreada
    })
}

// actualizarCategoria
const actualizarCategoria = async(req=request,res=response)=>{
    const act = req.params.id
    const {usuario,estado, ...resto} = req.body
    resto.usuario = req.usuario._id;
    resto.nombre = resto.nombre.toUpperCase();
    const saveDate =await Categoria.findByIdAndUpdate( act , resto,{new: true}).populate('usuario','nombre')
    
    res.json({
       msg:'actualizar put',
       saveDate
    })
}


// borrarCategoria
const borrarCategoria = async(req=request,res=response)=>{

    const id = req.params.id
    const cambiandoEstado = await Categoria.findByIdAndUpdate(id,{estado:false},{new:true}).populate('usuario')
    res.json({
        cambiandoEstado,
       msg:'delete'
    })
}



module.exports = {
    crearCategoria,
    obtenerCategorias,
    obtenerCategoriasPorId,
    actualizarCategoria,
    borrarCategoria
}