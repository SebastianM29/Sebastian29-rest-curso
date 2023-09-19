const {request,response}= require('express')
const {Producto} = require('../models')



const crearProducto = async(req=request ,res = response) => {
    const {estado,usuario,...resto} = req.body
    try {
        const nombre = resto.nombre 
        
        const findProd = await  Producto.findOne({nombre});
        if (findProd) {
            return res.status(400).json({msg:`el producto ${findProd.nombre} ya existe`})
            
        }

        const data = {
            ...resto,
            usuario : req.usuario,
            nombre:resto.nombre.toUpperCase()
        }
    
        const saveProd = await new Producto(data)
        await saveProd.save();
        //await saveProd.populate('categoria').execPopulate()
        
        await res.json({
            saveProd,
            msg:'llegando'})
    } catch (error) {
        console.log(error)
        
    }
   

}

const actualizarProducto = async(req=request ,res = response) => {
const update = req.params.id;
const{usuario,estado,categoria,...resto}= req.body
const usuarioAct = req.usuario
console.log('aca deberia estar el resto', resto)
const actualizado =await Producto.findByIdAndUpdate(update,{
    nombre:req.body.nombre.toUpperCase(),
    precio:req.body.precio,
    usuario:usuarioAct,
    descripcion:req.body.descripcion},{new:true})

console.log(actualizado)


res.json({

    update,
    actualizado
})

};

const obtenerProductos = async(req=request ,res = response)=>{
    const{limite,desde} = req.query;
    const estado = {estado:true}

    const[pagina,total] = await Promise.all([
        Producto.find(estado).skip(Number(desde)).limit(Number(limite)).populate('usuario').populate('categoria'),
        Producto.countDocuments(estado)
    ])
    res.json({
        pagina,
        total,
        
        msg:'llegando al get'})
}

const borrarProducto = async(req=request ,res = response) => {
    const id = req.params.id
    console.log(id)
    const borrando = await Producto.findByIdAndUpdate(id,{estado:false},{new:true}).populate('usuario','email')

    res.json({msg: 'borrado',
              borrando
            })
}




module.exports= {crearProducto,
                 actualizarProducto,
                 obtenerProductos,
                 borrarProducto
                }