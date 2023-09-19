const express = require('express')
const cors = require('cors')
const { dbconnection } = require('../Database/config')




class Server {

 constructor (){
    this.app = express(),
    this.port=process.env.PORT
    this.paths = {
      authpath : '/api/auth',
      usuariosPath : '/api/usuarios',
      usuarioCategorias : '/api/categorias',
      usuarioProducto: '/api/producto'

    }
    //this.authpath = '/api/auth';
    //this.usuariosPath = '/api/usuarios';
    //this.usuarioCategorias = '/api/categorias'
    //conectar base de datos
    this.conectarDB();
    //middlewares
    this.middlewares();
    //rutas de mi aplicacion//
    this.routes();


  
    

   
 }

    routes(){
       this.app.use(this.paths.authpath,require('../routes/auth'))
       
       this.app.use(this.paths.usuariosPath,require ('../routes/usuarios'));

       this.app.use(this.paths.usuarioCategorias,require ('../routes/categorias'));

       this.app.use(this.paths.usuarioProducto,require ('../routes/productos'));
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