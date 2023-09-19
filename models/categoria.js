const {Schema,model}= require('mongoose');


const CategoriaSchema = new Schema({
nombre:{
    type: String,
    required: [true, 'el nombre es obligatorio']
},
estado:{
    type: Boolean,
    default: true,
    required: true

},
usuario: {
    type: Schema.Types.ObjectId,
    ref:'Usuario',
    required:true
}


})

CategoriaSchema.methods.toJSON = function(){ 
    const { estado,__v, ... cat } = this.toObject(); 
    //cambio el nombre del id "_id" por "uid"
    //usuario.uid = _id;
    
    return cat;
    
    };


module.exports= model('Categoria', CategoriaSchema)