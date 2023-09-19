const {response} = require ('express');
const Usuario = require ('../models/usuario');
const bcryptjs = require ('bcryptjs');
const generarJwt = require('../helpers/generar-jwt');
const { verify } = require('../helpers/google-verify');







const login =async (req, res = response ) => {
    
    const {email,password} = req.body;
    
    try {
        //verificar si existe el email
        const usuario =await Usuario.findOne({ email }) 
        if (!usuario) {
            return res.status(400).json({
                msg : 'usuario/password no son correctos - correo'
            });
        }
        // el estado del usuario tmb se puede escribir asi (usuario.estado === false)
        if (!usuario.estado ) {
         return res.status(400).json({
                    msg : 'usuario/password no son correctos - estado'
            });
        
        }
       //comparar contraseña entre argumento y usuar io de la base de datos
        const validPass = bcryptjs.compareSync(password, usuario.password);
        if (!validPass) {
            return res.status(400).json({
                msg : 'usuario/password no son correctos - password '
        });
            
        }
        
        const token =await generarJwt(usuario.id);
    



        res.json ({
            
            usuario,
            token
        })        
    
    
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg:'Error de servidor'
        })
        
    }


}


const googleSignIn = async (req , res=response) => {
    const {id_token} = req.body
    console.log(id_token)
    try {
   
    
    const googleUser = await verify(id_token)
    const{name,picture,email} = googleUser
    
    let usuario = await Usuario.findOne({email})
   
    if (!usuario) {
        console.log('entra validando q n o existe usuario',name,picture,email)
        const data = {
            nombre : name,
            email : email,
            img : picture,
            password : '..',
            google: true
          
        };
        console.log(data)
        usuario = new Usuario(data);
        await usuario.save();
    }else if (usuario){
        console.log('usuario ya registradito')

    }

    if (!usuario.estado) {
        return res.status(401).json({
            msg: 'hable con el admin, usuario bloqueado'
        })
        
    }

    const token = await generarJwt(usuario.id)

    res.json ({
        token,
        msg: "recibido",
        usuario
    })

    
   } catch (error) {
    res.status(400).json({
        ok:false,
        msg: 'token no se pudo verificar'
    })

    
   }
 
}


module.exports = {
    login,
    googleSignIn
}