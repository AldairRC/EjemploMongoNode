"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.eliminar = exports.editar = exports.buscar = exports.add = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _producto = _interopRequireDefault(require("../modelos/producto"));

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

//=================================================
// IMPORTACIONES
//=================================================
//____________________
//  ELIMINAR PRODUCTO
//____________________
var eliminar = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(peticion, respuesta) {
    var documentoBorrado;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log(peticion.params);
            _context.prev = 1;
            _context.next = 4;
            return _producto["default"].findByIdAndDelete(peticion.params.id);

          case 4:
            documentoBorrado = _context.sent;

            _fs["default"].unlinkSync(documentoBorrado.imagen);

            respuesta.json({
              estatus: 1,
              mensaje: ""
            });
            _context.next = 12;
            break;

          case 9:
            _context.prev = 9;
            _context.t0 = _context["catch"](1);
            respuesta.json({
              estatus: 0,
              mensaje: _context.t0
            });

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 9]]);
  }));

  return function eliminar(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}(); //____________________
//  AGREGAR PRODUCTO
//____________________


exports.eliminar = eliminar;

var add = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(peticion, respuesta) {
    var archivo, rutaArchivo, nuevoProducto, registro;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            //console.log( peticion.body )
            console.log(peticion.file);
            archivo = peticion.file;
            /*
            {
                fieldname: 'imagen',
                originalname: 'IMG_20190207_154111.jpg',
                encoding: '7bit',
                mimetype: 'image/jpeg',
                destination: 'archivos',
                filename: '3040740d60dd507cac830a8b857db33c.jpg',
                path: 'archivos\\3040740d60dd507cac830a8b857db33c.jpg',
                size: 2832049
            }
            */

            rutaArchivo = "";

            if (archivo) {
              // CUANDO EXISTA O SE MANDE ARCHIVO
              rutaArchivo = archivo.path;
            }

            nuevoProducto = new _producto["default"]({
              nombre: peticion.body.nombre,
              descripcion: peticion.body.descripcion,
              precio: peticion.body.precio,
              imagen: rutaArchivo
            });
            _context2.prev = 5;
            _context2.next = 8;
            return nuevoProducto.save();

          case 8:
            registro = _context2.sent;
            respuesta.json({
              estatus: 1,
              mensaje: registro
            });
            _context2.next = 15;
            break;

          case 12:
            _context2.prev = 12;
            _context2.t0 = _context2["catch"](5);
            respuesta.json({
              estatus: 0,
              mensaje: _context2.t0
            });

          case 15:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[5, 12]]);
  }));

  return function add(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}(); //____________________
//  EDITAR PRODUCTO
//____________________


exports.add = add;

var editar = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(peticion, respuesta) {
    var registro;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            console.log(peticion.params);
            _context3.prev = 1;
            _context3.next = 4;
            return _producto["default"].findByIdAndUpdate(peticion.params.id, {
              nombre: peticion.params.nombre,
              descripcion: peticion.params.descripcion,
              precio: Number(peticion.params.precio)
            });

          case 4:
            registro = _context3.sent;
            respuesta.json({
              estatus: 1,
              mensaje: registro
            }); // registro = contiene los valores antiguos del registro en la BD

            _context3.next = 11;
            break;

          case 8:
            _context3.prev = 8;
            _context3.t0 = _context3["catch"](1);
            respuesta.json({
              estatus: 0,
              mensaje: _context3.t0
            });

          case 11:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[1, 8]]);
  }));

  return function editar(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}(); //____________________
//  OBTENER PRODUCTO
//____________________


exports.editar = editar;

var buscar = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(peticion, respuesta) {
    var registros, documentos;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            console.log(peticion.body);
            registros = [];
            _context4.t0 = peticion.body.nombre;
            _context4.next = _context4.t0 === "" ? 5 : 16;
            break;

          case 5:
            _context4.prev = 5;
            _context4.next = 8;
            return _producto["default"].find().lean();

          case 8:
            documentos = _context4.sent;
            documentos.forEach(function (documento) {
              var reg = {
                nombre: documento.nombre,
                descripcion: documento.descripcion,
                precio: documento.precio,
                imagen: _fs["default"].readFileSync(documento.imagen).toString('base64'),
                extension: _path["default"].extname(documento.imagen).replace('.', ''),
                id: documento._id,
                fechaCreacion: documento.createdAt,
                fechaModif: documento.updatedAt
              };
              registros.push(reg);
            });
            respuesta.json({
              estatus: 1,
              registros: registros
            });
            _context4.next = 16;
            break;

          case 13:
            _context4.prev = 13;
            _context4.t1 = _context4["catch"](5);
            respuesta.json({
              estatus: 0,
              registros: _context4.t1
            });

          case 16:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[5, 13]]);
  }));

  return function buscar(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

exports.buscar = buscar;