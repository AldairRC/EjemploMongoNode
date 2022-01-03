
function getHTML( ID = "" ){ return document.getElementById(ID) }

let botonGuardar = getHTML('botonGuardar')
let botonBuscar = getHTML('botonBuscar')
let cajaNombre = getHTML('cajaNombre')
let cajaBuscarNombre = getHTML('cajaBuscarNombre')
let cajaDesc = getHTML('cajaDesc')
let cajaPrecio = getHTML('cajaPrecio')

let columnaNombre = getHTML('columnaNombre')
let columnaDescripcion = getHTML('columnaDescripcion')
let columnaPrecio = getHTML('columnaPrecio')
let columnaBotonEliminar = getHTML('columnaBotonEliminar')
let columnaBotonEditar = getHTML('columnaBotonEditar')



function addRow( nombre="" , descripcion="" , precio=0 , ID="" ) {
    // CELDA NOMBRE
    let celdaNombre = document.createElement('input')
    celdaNombre.classList.add('celdaD')
    celdaNombre.value = nombre

    // CELDA DESCRIPCION
    let celdaDescripcion = document.createElement('input')
    celdaDescripcion.classList.add('celdaD')
    celdaDescripcion.value = descripcion

    // CELDA PRECIO
    let celdaPrecio = document.createElement('input')
    celdaPrecio.classList.add('celdaD')
    celdaPrecio.value = precio.toString()

    // CELDA BOTON EDITAR
    let celdaBotonEditar = document.createElement('div')
    celdaBotonEditar.classList.add('celdaD')
    celdaBotonEditar.classList.add('boton')
    celdaBotonEditar.innerText = "Editar"

    celdaBotonEditar.onclick = () => 
    {
        let parametros = 
        {
            id: ID ,
            nombre: celdaNombre.value ,
            descripcion: celdaDescripcion.value ,
            precio: Number( celdaPrecio.value )
        }
        realizarFetchConParametros( "/editarProducto" , "GET" , parametros )
        .then( datos => {
            console.log( datos )
        })
    }

    // CELDA BOTON ELIMINAR
    let celdaBotonEliminar = document.createElement('div')
    celdaBotonEliminar.classList.add('celdaD')
    celdaBotonEliminar.classList.add('boton')
    celdaBotonEliminar.innerText = "Eliminar"

    celdaBotonEliminar.onclick = () => {
        let parametros =  { id: ID }
        realizarFetchConParametros( "/eliminarProducto" , "GET" , parametros )
        .then( datos => {
            if(datos != null ) {
                console.log( datos )
                window.location.href = "/nuevo" 
            }
        })
    }


    // CREACION DEL ROW
    columnaNombre.appendChild( celdaNombre )
    columnaDescripcion.appendChild( celdaDescripcion )
    columnaPrecio.appendChild( celdaPrecio )
    columnaBotonEditar.appendChild( celdaBotonEditar )
    columnaBotonEliminar.appendChild( celdaBotonEliminar )
}



//===========================================
//  FUNCION GENERICA PARA REALIZAR UN FETCH
//===========================================
async function realizarFetchConParametros(URL="" , metodoHTTP="" , parametros={} ) 
{
    let esc = encodeURIComponent
    // URL con parametros tipo1 ... ejemplo =>  /editar/?id=1234&nombre=aldair
    let url = URL + "/?" + Object.keys(parametros).map(key => esc(key) + '=' + esc(parametros[key])).join('&');
    // URL con parametros tipo2 ... ejemplo =>  /editar/1234/aldair 
    let url2 = URL + "/" + Object.keys(parametros).map(key => esc(parametros[key])).join('/');
    //console.log( url2 )
    try
    {
        const respuesta = await fetch( url2 , {
            method: metodoHTTP,     // GET, POST, PUT, DELETE, etc.
        })
        if( respuesta.ok ) {
            let datos = await respuesta.json()
            return datos
        }
    }
    catch( ERROR ){ 
        alert("ERROR DE CONEXION" + ERROR.message)
        return null 
    }
}




botonGuardar.onclick = () => {
    if( cajaNombre.value == "" || cajaDesc.value == "" || cajaPrecio.value == "" ) {
        alert("Campos Vacios")
        return
    }
    let datos = new FormData();
    datos.append( "nombre" , cajaNombre.value );
    datos.append( "descripcion" , cajaDesc.value );
    datos.append( "precio" , Number(cajaPrecio.value) );

    //let datos2 = {descripcion: "prueba2" , precio2: 200}
    let URL = "/addProducto"
    fetch( URL , { 
        method: 'POST' ,
        //headers: {
        //    'Content-Type': 'application/json',
        //} , 
        //body: JSON.stringify(datos2) 
        body: datos
    })
    .then( respuesta => respuesta.json() )
    .then( datos => 
    {
        console.log(datos)
        if(datos.estatus == 1) {
            // OK
            alert("Producto Guardado")
        }
        else {
            let mensaje = "PRODUCTO NO ALMACENADO"
            switch( datos.mensaje.code )
            {
                case 11000: mensaje+= "\nEste producto ya EXISTE";  break
            }
            alert(mensaje)
        }
    })
    .catch( ERROR => {
        console.log( ERROR )
    })
}



function limpiarTabla(){
    while( columnaNombre.childElementCount > 1 )        columnaNombre.removeChild( columnaNombre.lastChild ) 
    while( columnaDescripcion.childElementCount > 1 )   columnaDescripcion.removeChild( columnaDescripcion.lastChild )
    while( columnaPrecio.childElementCount > 1 )        columnaPrecio.removeChild( columnaPrecio.lastChild )
    while( columnaBotonEditar.childElementCount > 1 )   columnaBotonEditar.removeChild( columnaBotonEditar.lastChild )
    while( columnaBotonEliminar.childElementCount > 1 ) columnaBotonEliminar.removeChild( columnaBotonEliminar.lastChild )
}


botonBuscar.onclick = () => {
    limpiarTabla()
    let datos = new FormData();
    datos.append( "nombre" , cajaBuscarNombre.value );

    let URL = "/getProductos"
    fetch( URL , { 
        method: 'POST' ,
        body: datos
    })
    .then( respuesta => respuesta.json() )
    .then( datos => 
    {
        console.log(datos)
        if(datos.estatus == 1) {
            // OK
            for( let i=0;  i<datos.registros.length;  i++ ) {
                let reg = datos.registros[i]
                addRow( reg.nombre , reg.descripcion , Number(reg.precio) , reg._id )
            }
            alert("Productos Cargados")
        }
        else {
            alert(datos.registros)
        }
    })
    .catch( ERROR => {
        console.log( ERROR )
    })
}

