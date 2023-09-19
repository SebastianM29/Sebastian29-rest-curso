const jwt = require ('jsonwebtoken');


const generarJwt = ( uid ) => {
     return new Promise((resolve, reject) => {
       const payload = { uid }
       
        jwt.sign(payload,process.env.KeyKeyPayload, {
            expiresIn: '2h'
        },(error,token)=>{
            if (error) {
                console.log(error)
                reject('problemas al generar esta ... o sea este token')
                
            } else {
                
                resolve (token)
                
            }
        })
   })
}



module.exports = generarJwt