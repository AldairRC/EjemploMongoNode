"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function getHTML(ID = "") { return document.getElementById(ID); }
let botonGuardar = getHTML('botonGuardar');
let botonBuscar = getHTML('botonBuscar');
let botonUpload = getHTML('botonUpload');
let cajaNombre = getHTML('cajaNombre');
let cajaBuscarNombre = getHTML('cajaBuscarNombre');
let cajaDesc = getHTML('cajaDesc');
let cajaPrecio = getHTML('cajaPrecio');
let imgProducto = getHTML('imgProducto');
let selectorFile = document.createElement('input');
selectorFile.type = "file";
//selectorFile.accept = ".pdf , .docx"   EJEMPLOS: image/*   audio/*    video/*   .pdf   .docx  ...
selectorFile.accept = "image/*";
selectorFile.classList.add('oculto');
let columnaNombre = getHTML('columnaNombre');
let columnaDescripcion = getHTML('columnaDescripcion');
let columnaPrecio = getHTML('columnaPrecio');
let columnaFoto = getHTML('columnaFoto');
let columnaBotonEliminar = getHTML('columnaBotonEliminar');
let columnaBotonEditar = getHTML('columnaBotonEditar');
function addRow(nombre = "", descripcion = "", precio = 0, ID = "", extensionIMG = "", base64IMG = "") {
    // CELDA NOMBRE
    let celdaNombre = document.createElement('input');
    celdaNombre.classList.add('celdaD');
    celdaNombre.value = nombre;
    // CELDA DESCRIPCION
    let celdaDescripcion = document.createElement('input');
    celdaDescripcion.classList.add('celdaD');
    celdaDescripcion.value = descripcion;
    // CELDA PRECIO
    let celdaPrecio = document.createElement('input');
    celdaPrecio.classList.add('celdaD');
    celdaPrecio.value = precio.toString();
    // CELDA FOTO
    let celdaFoto = document.createElement('img');
    celdaFoto.src = 'data:' + extensionIMG + ';base64,' + base64IMG;
    celdaFoto.classList.add('celdaImagenD');
    // CELDA BOTON EDITAR
    let celdaBotonEditar = document.createElement('div');
    celdaBotonEditar.classList.add('celdaD');
    celdaBotonEditar.classList.add('boton');
    celdaBotonEditar.innerText = "Editar";
    celdaBotonEditar.onclick = () => {
        let parametros = {
            id: ID,
            nombre: celdaNombre.value,
            descripcion: celdaDescripcion.value,
            precio: Number(celdaPrecio.value)
        };
        realizarFetchConParametros("/editarProducto", "GET", parametros)
            .then(datos => {
            console.log(datos);
        });
    };
    // CELDA BOTON ELIMINAR
    let celdaBotonEliminar = document.createElement('div');
    celdaBotonEliminar.classList.add('celdaD');
    celdaBotonEliminar.classList.add('boton');
    celdaBotonEliminar.innerText = "Eliminar";
    celdaBotonEliminar.onclick = () => {
        let parametros = { id: ID };
        realizarFetchConParametros("/eliminarProducto", "GET", parametros)
            .then(datos => {
            if (datos != null) {
                console.log(datos);
                window.location.href = "/nuevo";
            }
        });
    };
    // CREACION DEL ROW
    columnaNombre.appendChild(celdaNombre);
    columnaDescripcion.appendChild(celdaDescripcion);
    columnaPrecio.appendChild(celdaPrecio);
    columnaFoto.appendChild(celdaFoto);
    columnaBotonEditar.appendChild(celdaBotonEditar);
    columnaBotonEliminar.appendChild(celdaBotonEliminar);
}
//===========================================
//  FUNCION GENERICA PARA REALIZAR UN FETCH
//===========================================
function realizarFetchConParametros(URL, metodoHTTP, parametros) {
    return __awaiter(this, void 0, void 0, function* () {
        let esc = encodeURIComponent;
        // URL con parametros tipo1 ... ejemplo =>  /editar/?id=1234&nombre=aldair
        //let url = URL + "/?" + Object.keys(parametros).map(key => esc(key) + '=' + esc(parametros[key])).join('&');
        // URL con parametros tipo2 ... ejemplo =>  /editar/1234/aldair 
        //let url2 = URL + "/" + Object.keys(parametros).map(key => esc(parametros[key])).join('/');
        let P = [];
        if (parametros.id != undefined)
            P.push(parametros.id);
        if (parametros.nombre != undefined)
            P.push(parametros.nombre);
        if (parametros.descripcion != undefined)
            P.push(parametros.descripcion);
        if (parametros.precio != undefined)
            P.push(parametros.precio + "");
        let url3 = URL + "/" + P.join('/');
        //console.log( url2 )
        alert(url3);
        try {
            const respuesta = yield fetch(url3, {
                method: metodoHTTP, // GET, POST, PUT, DELETE, etc.
            });
            if (respuesta.ok) {
                let datos = yield respuesta.json();
                return datos;
            }
        }
        catch (ERROR) {
            const { message } = ERROR;
            alert("ERROR DE CONEXION" + message);
            return null;
        }
    });
}
botonGuardar.onclick = () => __awaiter(void 0, void 0, void 0, function* () {
    if (cajaNombre.value == "" || cajaDesc.value == "" || cajaPrecio.value == "") {
        alert("Campos Vacios");
        return;
    }
    let datos = new FormData();
    datos.append("nombre", cajaNombre.value);
    datos.append("descripcion", cajaDesc.value);
    datos.append("precio", cajaPrecio.value);
    if (filesSeleccionados == null || filesSeleccionados.length == 0)
        datos.append("imagen", "");
    else
        datos.append("imagen", filesSeleccionados[0]);
    //let datos2 = {descripcion: "prueba2" , precio2: 200}
    let URL = "/addProducto";
    try {
        let respuesta = yield fetch(URL, {
            method: 'POST',
            //headers: {
            //    'Content-Type': 'application/json',
            //} , 
            //body: JSON.stringify(datos2) 
            body: datos
        });
        if (respuesta.ok) { // HTTP OK
            let datos = yield respuesta.json();
            console.log(datos);
            if (datos.estatus == 1) { // GUARDADO EXITOSO
                alert("Producto Guardado");
            }
            else {
                let mensaje = "PRODUCTO NO ALMACENADO";
                switch (datos.mensaje.code) {
                    case 11000:
                        mensaje += "\nEste producto ya EXISTE";
                        break;
                }
                alert(mensaje);
            }
        }
        else {
            console.log("ERROR" + respuesta.status);
        }
    }
    catch (ERROR) {
        console.log(ERROR);
    }
});
function limpiarTabla() {
    while (columnaNombre.childElementCount > 1)
        columnaNombre.removeChild(columnaNombre.lastChild);
    while (columnaDescripcion.childElementCount > 1)
        columnaDescripcion.removeChild(columnaDescripcion.lastChild);
    while (columnaPrecio.childElementCount > 1)
        columnaPrecio.removeChild(columnaPrecio.lastChild);
    while (columnaFoto.childElementCount > 1)
        columnaFoto.removeChild(columnaFoto.lastChild);
    while (columnaBotonEditar.childElementCount > 1)
        columnaBotonEditar.removeChild(columnaBotonEditar.lastChild);
    while (columnaBotonEliminar.childElementCount > 1)
        columnaBotonEliminar.removeChild(columnaBotonEliminar.lastChild);
}
botonBuscar.onclick = () => __awaiter(void 0, void 0, void 0, function* () {
    limpiarTabla();
    let datos = new FormData();
    datos.append("nombre", cajaBuscarNombre.value);
    let a = "";
    let URL = "/getProductos";
    try {
        let respuestaHTTP = yield fetch(URL, {
            method: 'POST',
            body: datos
        });
        if (respuestaHTTP.ok) {
            console.log("RESPUESTA HTTP");
            console.log(respuestaHTTP);
            let datosServidor = yield respuestaHTTP.json();
            console.log(datosServidor);
            let fecha = Intl.DateTimeFormat().resolvedOptions().timeZone;
            //alert(fecha)   // EJEMPLO:  America/Chihuahua
            //fechaCreacion = new Date(datosServidor.fechaCreacion.getTime() - 
            //(  * 60000 )
            if (datosServidor.estatus == 1) {
                // OK
                for (let i = 0; i < datosServidor.registros.length; i++) {
                    let reg = datosServidor.registros[i];
                    //let fechaCreacion = new Date()
                    //let fechaCreacion2 = new Date()
                    //fechaCreacion = new Date( reg.fechaCreacion)
                    //fechaCreacion2 = new Date( reg.fechaCreacion)
                    //alert( typeof reg.fechaCreacion )  STRING
                    //alert(
                    //    fechaCreacion.toString() + '\n' +
                    //fechaCreacion2.toLocaleString( 'en-US', { timeZone: 'America/Mexico_City' } ) 
                    //)
                    addRow(reg.nombre, reg.descripcion, Number(reg.precio), reg.id, reg.extension, reg.imagen);
                }
                alert("Productos Cargados");
            }
            else {
                alert(datosServidor.registros);
            }
        }
        else {
            console.log(respuestaHTTP);
        }
    }
    catch (ERROR) {
        console.log(ERROR);
    }
});
botonUpload.onclick = () => {
    selectorFile.click();
};
let filesSeleccionados = selectorFile.files;
selectorFile.onchange = () => {
    console.log(selectorFile.files);
    if (selectorFile.files != null && selectorFile.files.length != 0) // 1 o mas files
     {
        let extensionesOK = ["PNG", "JPG", "JPEG"];
        let nombreExtension = selectorFile.files[0].name.split('.');
        let extension = nombreExtension[nombreExtension.length - 1].toUpperCase();
        let coincide = extensionesOK.filter((ext) => {
            //console.log( ext + "==" + extension )
            return ext == extension;
        });
        //alert(coincide)
        if (coincide.length != 0) {
            let imagen = URL.createObjectURL(selectorFile.files[0]);
            if (imgProducto.classList.contains('oculto'))
                imgProducto.classList.toggle('oculto');
            imgProducto.src = imagen;
            filesSeleccionados = selectorFile.files;
        }
        else {
            alert("Debes seleccionar una imagen");
        }
    }
    else {
        // REGRESA FILES 0 CUANDO SE DA EN EL BOTON CANCELAR DE LA VENTANA DEL SELECTOR
    }
    /*
    NOTA: selectorFile.files es un arreglo
    cada File contiene lo siguiente:
        name: "2021-04-21 (1).png"
        size: 690397    => tamaño en bytes   =>  1MB -> 1,000,000 bytes
        type: "image/png"
    */
    /*     RECEPCION DE IMAGENES
        response.blob().then(function(miBlob) {
        var objectURL = URL.createObjectURL(miBlob);
        miImagen.src = objectURL;
    */
};
imgProducto.onclick = () => {
    imgProducto.src = "";
    imgProducto.classList.toggle('oculto');
    selectorFile.files = null;
};
//================================
//  MAIN
//================================
imgProducto.classList.toggle('oculto');
