"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

//==========================================================================================
//                           ESQUEMA DE LA COLECCION DE PRODUCTOS
//==========================================================================================
var esquema = new _mongoose["default"].Schema( // PROPIEDADES DE LA COLECCION
{
  nombre: {
    type: String,
    "default": "N/A",
    required: true,
    unique: true
  },
  descripcion: {
    type: String,
    "default": "N/A"
  },
  precio: {
    type: Number,
    "default": "0.00"
  },
  imagen: {
    type: String,
    "default": ""
  }
}, // CONFIGURACIONES EXTRAS DE LA COLECCION 
{
  timestamps: true,
  // AGREGA 2 CAMPOS A LA COLLECION: fecha de creacion y de actualizacion 
  versionKey: false // QUITAR EL CAMPO __v QUE SE AGREGA POR DEFECTO

}); // se EXPORTA la coleccion llamada "productos" con dicho esquema

var _default = _mongoose["default"].model('productos', esquema);

exports["default"] = _default;