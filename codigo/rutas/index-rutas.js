
//=================================================
// IMPORTACIONES
//=================================================
import {Router} from 'express'
import {add , eliminar , buscar , editar} from '../controladores/controlador-productos'
import multer from 'multer'  // Middleware para procesar datos FormData()

/*
const express = require('express')
const router = express.Router()
const Producto = require('../modelos/producto')
const multer  = require('multer')  // Middleware para procesar datos FormData()
*/


//=================================================
// VARIABLES
//=================================================
const router = Router()
const upload = multer()  // se configura sin ubicacion para el alamacenamiento de imagenes



//=================================================
// RUTA PRINCIPAL
//=================================================
router.get('/' , (peticion , respuesta) => {
    respuesta.render('principal/index') 
    //respuesta.redirect('/')    redirecciona a la ruta /
})



//=================================================
// RUTA PARA GUARDAR UN NUEVO PRODUCTO
//=================================================
router.post('/addProducto' , upload.none() , add )



//=================================================
// RUTA PARA EDITAR UN PRODUCTO
//=================================================
router.get('/editarProducto/:id/:nombre/:descripcion/:precio' , editar )


//=================================================
// RUTA PARA ELIMINAR UN PRODUCTO
//=================================================
router.get('/eliminarProducto/:id' , eliminar )


//=================================================
// RUTA PARA REDIRECCIONAR
//=================================================
router.get('/nuevo' , (peticion , respuesta) => 
{
    respuesta.send("Borraste registro ...")
})


//=================================================
// RUTA PARA OBTENER REGISTROS
//=================================================
router.post('/getProductos' , upload.none() , buscar  )


export default router
