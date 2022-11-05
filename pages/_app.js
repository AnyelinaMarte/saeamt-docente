import "../styles/Form.css";
import "../styles/Index.css";
import "../styles/Contenido.css";
import "../styles/Configuracion.css"
import "../styles/Componentes.css"
import "../styles/Estudiantes.css";

import { auth } from "../BD/Configuracion"
import { useState } from "react";
import Login_docente from './Login_Docente';
import Nav from "../Components/nav";
function MyApp({ Component, pageProps }) {
  const [nombreUsuario, setnombreUsuario] = useState(null);
  return (
    <>
 
      <title>Sistema de Apoyo a la Enseñanza Aprendizaje Matematicas Tercer Grado</title>

      {auth.onAuthStateChanged((user) => {
        setnombreUsuario(user);

      })}
      {nombreUsuario ? (
        <>
        <Nav>
        <Component {...pageProps} />
        </Nav>
        
        </>
      ) : (
        <Login_docente />

      )
      }

    </>
  );
}

export default MyApp
