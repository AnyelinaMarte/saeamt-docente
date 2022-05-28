import "../styles/Form.css";
import { auth } from "../BD/Configuracion"
import { useState } from "react";
import Login_docente from './Formularios/Login_Docente';

function MyApp({ Component, pageProps }) {
  const [nombreUsuario, setnombreUsuario] = useState(null);
  return (
    <>

      <title>Sistema de Apoyo a la Enseñanza Aprendizaje Matematicas Tercer Grado</title>

      {auth.onAuthStateChanged((user) => {
        setnombreUsuario(user);

      })}
      {nombreUsuario ? (
        <Component {...pageProps} />

      ) : (
        <Login_docente />

      )
      }

    </>
  );
}

export default MyApp
