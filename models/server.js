const express = require('express')
const cors = require('cors')




class Server {

 constructor (){
    this.port=process.env.PORT
    this.app = express(),
    this.usuariosPath = '/api/usuarios'
    this.middlewares(),
    //rutas de mi aplicacion//
    this.routes()


  
    

   
 }

    routes(){
       this.app.use(this.usuariosPath,require ('../routes/usuarios'));
    }
   
     
    puert(){
        this.app.listen(this.port , ()=>{
            console.log('usted corre en el puerto', this.port)
        })


     }
    middlewares (){
        //lectura y parseo del body 
        this.app.use(express.json());  
        //CORS
        this.app.use(cors());
        //directorio publico//
        this.app.use(express.static('public'));

}

} 



module.exports = Server