"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _express = _interopRequireDefault(require("express"));

var _path = _interopRequireDefault(require("path"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _expressHandlebars = require("express-handlebars");

var _indexRutas = _interopRequireDefault(require("./rutas/index-rutas"));

var _config = require("./config");

//==================================
// IMPORTACIONES
//==================================
// CONTROLADOR DE RUTAS

/*
const path = require('path')
const bodyParser = require('body-parser');
const server = express()
const mongoose = require('mongoose')
*/
//==================================
// CONEXION A LA BD
//==================================
function conectarBD() {
  return _conectarBD.apply(this, arguments);
}

function _conectarBD() {
  _conectarBD = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var db;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _mongoose["default"].connect(_config.URL_mongoBD);

          case 3:
            db = _context.sent;
            console.log("conexion exitosa a la BD \"".concat(db.connection.name, " "));
            _context.next = 10;
            break;

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            console.log(_context.t0);

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 7]]);
  }));
  return _conectarBD.apply(this, arguments);
}

conectarBD(); //==================================
// CONFIGURACIONES
//==================================

var server = (0, _express["default"])(); // CONFIGURAR EL PUERTO DE PETICIONES HTTP

server.set('port', _config.PUERTO_SERVIDOR); // ESUCHAR POR EL PUERTO DEVUELTO POR EL SO ... POR DEFAULT 3000
// CONFIGURAR LA CARPETA DE LAS PAGINAS HTML DE RESPUESTA

server.set('views', _path["default"].join(__dirname, 'public', 'vistas')); // INDICAR LA CARPETA DE LAS VISTAS O PAGINAS A MOSTRAR
// CONFIGURAR LA CARPETA DE ARCHIVOS ESTATICOS css , img , etc.

server.use(_express["default"]["static"](_path["default"].join(__dirname, 'public'))); // CONFIGURAR EL MANEJADOR DE RUTAS
//server.use('/' , indexRutas )

server.use(_indexRutas["default"]); // CONFIGURAR PARA LA RECEPCION DE DATOS DE TIPO FormData() 

server.use(_bodyParser["default"].urlencoded({
  extended: true
}));
server.use(_bodyParser["default"].json()); // CONFIGURAR EL MOTOR DE PLANTILLAS HTML

var handlebars = (0, _expressHandlebars.create)({
  extname: '.hbs',
  layoutsDir: _path["default"].join(server.get("views"), "layouts"),
  partialsDir: _path["default"].join(server.get("views"), "partials"),
  defaultLayout: 'main'
});
server.engine('.hbs', handlebars.engine);
server.set('view engine', '.hbs'); // establecer "handlebars" como motor de plantillas HTML
//==================================
// EJECUCION DEL SERVIDOR
//==================================

server.listen(server.get('port'), function () {
  console.log("Servidor activo por el puerto ".concat(server.get('port')));
});
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