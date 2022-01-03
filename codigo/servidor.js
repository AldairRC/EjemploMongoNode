//==================================
// IMPORTACIONES
//==================================
import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import {create} from 'express-handlebars'
import indexRutas from './rutas/index-rutas' // CONTROLADOR DE RUTAS
import {PUERTO_SERVIDOR , URL_mongoBD} from './config'
/*
const path = require('path')
const bodyParser = require('body-parser');
const server = express()
const mongoose = require('mongoose')
*/


//==================================
// CONEXION A LA BD
//==================================
async function conectarBD() {
    try{
        const db = await mongoose.connect(URL_mongoBD)
        console.log( `conexion exitosa a la BD "${db.connection.name} ` )
    }
    catch( ERROR ){
        console.log( ERROR )
    }
}
conectarBD()





//==================================
// CONFIGURACIONES
//==================================
const server = express()

// CONFIGURAR EL PUERTO DE PETICIONES HTTP
server.set('port' , PUERTO_SERVIDOR) // ESUCHAR POR EL PUERTO DEVUELTO POR EL SO ... POR DEFAULT 3000

// CONFIGURAR LA CARPETA DE LAS PAGINAS HTML DE RESPUESTA
server.set('views' ,  path.join( __dirname , 'vistas') )  // INDICAR LA CARPETA DE LAS VISTAS O PAGINAS A MOSTRAR

// CONFIGURAR LA CARPETA DE ARCHIVOS ESTATICOS css , img , etc.
server.use(express.static(path.join(__dirname , 'vistas')))

// CONFIGURAR EL MANEJADOR DE RUTAS
//server.use('/' , indexRutas )
server.use(indexRutas)

// CONFIGURAR PARA LA RECEPCION DE DATOS DE TIPO FormData() 
server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json());

// CONFIGURAR EL MOTOR DE PLANTILLAS HTML
const handlebars = create({
    extname: '.hbs' ,
    layoutsDir: path.join( server.get("views") , "layouts") ,
    partialsDir: path.join( server.get("views") , "partials") ,
    defaultLayout:'main'
})
server.engine('.hbs' , handlebars.engine )
server.set('view engine' , '.hbs')  // establecer "handlebars" como motor de plantillas HTML






//==================================
// EJECUCION DEL SERVIDOR
//==================================
server.listen( server.get('port') , () => {
    console.log(`Servidor activo por el puerto ${server.get('port')}`)
} )

/*
Para ponerlo en ejecucion es necesario moddificar el
package.json agregando a la propiedad "script" las siguientes lineas:

>> start: "node codigo/servidor.js"      <---->  ejecutarlo con el comando "npm start" (para servidor en linea)
>> dev:   "nodemon codigo/servidor.js"   <---->  ejecutarlo con el comando "npm run dev" (para desarrollo local)

NOTA: 
>> Con el comando "npm run dev" los cambios se aplican automaticamente
>> (Control + C )para cancelar la ejecucion del servidor
>> Una vez ejecutado acceder a la pagina WEB mediante <----->  localhost:3000  
*/