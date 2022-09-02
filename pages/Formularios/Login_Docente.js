import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../BD/configuracion";


export default function Login_docente() {


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




    return (
<>
<div className="gridfrm">
    <div className="rectangulo1">
        <div className="login" >

            <div>
                <img className="img-login" src="logo.ico"/>
                <h1 className="h1-login">Iniciar Sesión</h1><br></br>
            </div>
            <div className="display-login">
                <form >

                    <label >Correo : <input className="input-login" type="email" name="apellido" id="correo_Inicio" /></label>
                    <label > Clave: <input className="input-login" type="password" id="clave_Inicio" /></label>

                    <button className="btn-login" onClick={datos_Inicio}>Ingresar</button>

                </form>
            </div>
        </div>
    </div>
    <div className="rectangulo2">
    <div className="section-img">
        <div className="img-derecha">
        </div>
    </div>
    </div>
    </div>
    </>
    )
}