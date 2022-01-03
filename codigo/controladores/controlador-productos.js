
//=================================================
// IMPORTACIONES
//=================================================
import modeloProducto from '../modelos/producto'


//____________________
//  ELIMINAR PRODUCTO
//____________________
export const eliminar = async (peticion , respuesta) => 
{
    console.log( peticion.params )
    try
    {
        await modeloProducto.findByIdAndDelete( peticion.params.id )
        respuesta.json({estatus:1 , mensaje: ""})
    }
    catch( ERROR ) { respuesta.json({estatus:0 , mensaje: ERROR}) }
}



//____________________
//  AGREGAR PRODUCTO
//____________________
export const add = async (peticion , respuesta) => {
    console.log( peticion.body )
    let nuevoProducto = modeloProducto({ 
        nombre: peticion.body.nombre ,
        descripcion: peticion.body.descripcion ,
        precio: peticion.body.precio
    })
    try {
        const registro = await nuevoProducto.save()
        respuesta.json({estatus:1 , mensaje: registro})
    }
    catch( ERROR ){
        respuesta.json({estatus:0 , mensaje: ERROR})
    }
}


//____________________
//  EDITAR PRODUCTO
//____________________
export const editar = async (peticion , respuesta) => 
{
    console.log( peticion.params )
    try
    {
        /* EDITAR FORMA 1
        let registro = await modeloProducto.findById( peticion.params.id )
        registro.nombre = peticion.params.nombre
        registro.descripcion = peticion.params.descripcion
        registro.precio = Number(peticion.params.precio)
        await registro.save()
        */
       let registro = await modeloProducto.findByIdAndUpdate( peticion.params.id, {
            nombre: peticion.params.nombre ,
            descripcion: peticion.params.descripcion ,
            precio: Number(peticion.params.precio)
       })
        respuesta.json({estatus:1 , mensaje: registro})  // registro = contiene los valores antiguos del registro en la BD
    }
    catch( ERROR ) { respuesta.json({estatus:0 , mensaje: ERROR}) }
}


//____________________
//  OBTENER PRODUCTO
//____________________
export const buscar = (peticion , respuesta) => {
    console.log( peticion.body )
    switch( peticion.body.nombre ) {
        case "":
            // OBTENER TODO
            modeloProducto.find().lean()
            .then( documentos => {
                respuesta.json({estatus:1 , registros: documentos})
            })
            .catch( ERROR => {
                respuesta.json({estatus:0 , registros: ERROR})
            })
    }
}