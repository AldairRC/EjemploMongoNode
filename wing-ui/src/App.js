import logo from './logo.svg';
import './App.css';

function App() {

  const clicBoton = async () => {
    const datosPOST = new FormData()
    datosPOST.append( "nombre" , "" )

    const respuestaHTTP = await fetch( "https://ejemplo-mongodb.herokuapp.com/getProductos" , {
      method: "POST" ,
      body:datosPOST
    })
    if( respuestaHTTP.ok ){
      const datos = await respuestaHTTP.json()
      alert( datos.registros.length )
    }
    else{
      alert( "RESPUESTA RETORNO ERROR" )
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button  onClick={ (evento) => {
          clicBoton()
        }}>
          Aldair
        </button>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
