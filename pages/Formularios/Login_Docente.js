import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../../BD/configuracion";
import Image from 'next/image'

export default function Login_docente() {
    const [alertContrasena, setAlertContrasena] = useState("")
    const [alertCorreo, setAlertCorreo] = useState("")

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
        .catch((error) => {
            console.log( error)
            console.log(error.code)
            if(error.code == "auth/wrong-password"){
                setAlertContrasena(error.code)
            }
            
            if(error.code == "auth/user-not-found"){
                setAlertCorreo(error.code)
            }
          });
    }




    return (
        <>
        <div className="gridfrm">
            <div className="grid-main-fomr">
                <div>
                        <div className="login" >

                        <div>
                         
                            <h1 className="h1-login">Iniciar Sesión</h1><br></br>
                        </div>
                        <div className="display-login">
                            <form >

                                <label >{alertCorreo == ""? <span>Correo</span>: <span className="contrasenaRequerida">El correo es incorrecto *</span>}<br></br> <input className="input-login" type="email" name="apellido" id="correo_Inicio" /></label><br></br>
                                <label > {alertContrasena == ""? <span>Clave</span>: <span className="contrasenaRequerida">Contrasena es incorrecta *</span>}<br></br> <input className="input-login" type="password" id="clave_Inicio" /></label>

                                <button className="btn-login" onClick={datos_Inicio}>Ingresar</button>

                            </form>
                        </div>
                        </div>
                    </div>
                    <div>
                        <div className="section-img">
                            <div className="img-derecha">
                            </div>
                        </div> 
                    </div>
            </div>
            </div>
    </>
    )
}