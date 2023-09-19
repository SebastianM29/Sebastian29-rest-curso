const {Schema, model} = require('mongoose');

//crear esquema objetos de Usuario (modelo) 
const UsuarioSchema= Schema ({
    nombre:{
        type: String,
        required:[true,' el nombre es obligatorio'],
        unique:true,
    },
    email:{
        type: String,
        required:[true,' el correo es unico'],
        unique: true, 
    },
    password:{
        type: String,
        required:[true,' la contraseña es obligatoria'],
        
    },
    img: {
        type: String,
    },
    rol: {
        type: String,
        required: true,
        default: 'USER_ROLE',
       // enum: ['ADMIN_ROLE','USER_ROLE'],
    },
    estado:{
        type: Boolean,
        default: true,
    },
    google: {
        type: Boolean,
        default: false
    },
});

UsuarioSchema.methods.toJSON = function(){ 
const { __v,password,_id, ... usuario } = this.toObject(); 
//cambio el nombre del id "_id" por "uid"
usuario.uid = _id;

return usuario;

};


module.exports = model('Usuario',UsuarioSchema);