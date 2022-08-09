const express = require('express')
const cors = require('cors')
const { dbconnection } = require('../Database/config')




class Server {

 constructor (){
    this.app = express(),
    this.port=process.env.PORT
    this.usuariosPath = '/api/usuarios'
    //conectar base de datos
    this.conectarDB()
    //middlewares
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
    async conectarDB() {
      await dbconnection();
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