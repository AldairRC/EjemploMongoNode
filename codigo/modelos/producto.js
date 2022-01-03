import mongoose from 'mongoose'

//==========================================================================================
//                           ESQUEMA DE LA COLECCION DE PRODUCTOS
//==========================================================================================
const esquema = new mongoose.Schema(
    // PROPIEDADES DE LA COLECCION
    {
    nombre: 
        {
            type: String ,
            default: "N/A" ,
            required: true ,
            unique: true
        } ,
    descripcion: 
        {
            type: String ,
            default: "N/A"
        } ,
    precio: 
        {
            type: Number ,
            default: "0.00"
        }
    } ,
    // CONFIGURACIONES EXTRAS DE LA COLECCION 
    {
        timestamps: true ,  // AGREGA 2 CAMPOS A LA COLLECION: fecha de creacion y de actualizacion 
        versionKey: false   // QUITAR EL CAMPO __v QUE SE AGREGA POR DEFECTO
    }
)

// se EXPORTA la coleccion llamada "productos" con dicho esquema
export default mongoose.model( 'productos' , esquema )