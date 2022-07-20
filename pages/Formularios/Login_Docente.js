import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../BD/configuracion";
import { doc, setDoc } from "firebase/firestore";
import { useState } from 'react';

export default function Login_docente() {
    //Obtener y registrar datos del docente
    const datos_Docente = (e) => {
        e.preventDefault()
        const nombreDocente = document.getElementById('nombre_Docente').value;
        const apellidoDocente = document.getElementById('apellido_Docente').value;
        const idEscuela = document.getElementById('idescuela_Docente').value;
        const telefonoDocente = document.getElementById('telefono_Docente').value;
        const centroEduDocente = document.getElementById('centroEdu_Docente').value;
        const correoDocente = document.getElementById('correo_Docente').value;
        const claveDocente = document.getElementById('clave_Docente').value;


        
            createUserWithEmailAndPassword(auth, correoDocente, claveDocente).then(async usuario => {
               
                        
                        setDoc(doc(db, idEscuela, "Usuarios","Docentes",correoDocente,"BD-Docente","DatosPersonales"), {
                            nombre: nombreDocente,
                            apellido: apellidoDocente,
                            idEscuela: idEscuela,
                            telefono: telefonoDocente,
                            centro_educativo: centroEduDocente,
                            correo: correoDocente,
                            clave: claveDocente
                        })
                        
                    } )
    }

    // hasta aqui

    // obtener y verificar datos para iniciar seccion
    const datos_Inicio = (e) => {
        e.preventDefault()
        const correoDocente = document.getElementById('correo_Inicio').value;
        const claveDocente = document.getElementById('clave_Inicio').value;

        signInWithEmailAndPassword(auth, correoDocente, claveDocente).then((userCredential) => {

            // Signed in
            const user = userCredential.user;
            console.log(user)
            console.log("Inicio Correcto")
            // ...

        })
    }

    // Hasta aqui
    // Formulario de Registro
    const form_Registro = (
        <>
            <div className="grid-container">
                <div >
                    <img className="img" src="icon-math.png" />
                    <div >
                        <button className="btn-lr" onClick={() => setCuerpo(form_Login)}> Login</button> <br></br>
                        <button className="btn-lr" onClick={() => setCuerpo(form_Registro)}> Registro</button>

                    </div>


                </div>
                <div className="form">
                    <div>
                        <h1 className="formh1 " >Registro Docente</h1>
                    </div>

                    <div >
                        <form className="formLogin">
                            <label className="formlabel"> Nombre:<input className="forminput" type="text" name="nombre" id="nombre_Docente" /></label>
                            <label className="formlabel"> Apellido: <input className="forminput" type="text" name="apellido" id="apellido_Docente" /> </label>
                            <label className="formlabel"> Id Escuela: <input className="forminput" type="text" name="idescuela" size="5" maxLength="5" id="idescuela_Docente" /></label>
                            <label className="formlabel"> Telefono:  <input className="forminput" type="text" name="telefono" size="10" maxLength="10" id="telefono_Docente" /></label>
                            <label className="formlabel"> Centro Educativo:
                                <select className="formselect" name="centro_educativo" id="centroEdu_Docente">
                                    <option value="Luis Eduardo Ortiz Delgado" selected>Luis Eduardo Ortiz Delgado </option>
                                </select>
                            </label>
                            <label className="formlabel"> Correo Electronico: <input className="forminput" type="email" name="apellido" id="correo_Docente" /></label>
                            <label className="formlabel"> Clave: <input className="forminput" type="password" id="clave_Docente" /></label>

                            <button className="btn-registro" onClick={datos_Docente}>Registrarse</button>

                            <div>
                                <a className="a-registro" onClick={() => setCuerpo(form_Login)}>¿Ya tienes una cuenta? Incia seccion aquí</a>
                            </div>

                        </form>
                    </div>

                </div>
            </div>
        </>
    )
    // Hasta aqui

    // Formulario de Login
    const form_Login = (
        <div className="grid-container">
            <div>
                <img className="img" src="icon-math.png" />
                <div >
                    <button className="btn-lr" onClick={() => setCuerpo(form_Login)}> Login</button> <br></br>
                    <button className="btn-lr" onClick={() => setCuerpo(form_Registro)}> Registro</button>

                </div>

            </div>

            <div className="formingresar">
                <div>
                    <h1 className="formh1 " >Iniciar Seccion</h1><br></br>
                </div>
                <div>
                    <form className="formLogin">

                        <label className="formlabel">Correo Electronico: <input className="forminput" type="email" name="apellido" id="correo_Inicio" /></label>
                        <label className="formlabel"> Clave: <input className="forminput" type="password" id="clave_Inicio" /></label>

                        <button className="btn-iniciar" onClick={datos_Inicio}>Iniciar Seccion</button>
                        <div>
                            <a className="a-registro" onClick={() => setCuerpo(form_Registro)}>¿A un no tienes una cuenta? Registrate aquí</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )

    //Hasta aqui

    const [cuerpo, setCuerpo] = useState(form_Login);
    return (
        <div>
            {cuerpo}
        </div>
    )
}