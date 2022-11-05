import { async } from "@firebase/util"
import { updateEmail, updatePassword } from "firebase/auth"
import { collection, doc, getDoc, getDocs, onSnapshot, query } from "firebase/firestore"
import { useEffect, useState } from "react"
import { auth, db } from "../Configuracion"
import { actualizar_Docente } from "../CRUD"

export default function Configuracion() {
    //editar datos personales
    const datosDocente = {
        nombre: '',
        apellido: '',
        idEscuela: '',
        telefono: '',
        centro_educativo: '',
    }

    const [editarData, seteditarData] = useState(datosDocente)
    useEffect(() => {
        auth.onAuthStateChanged(async user => {
            if (user != null) {

                const docRef = doc(db, "11111", "Usuarios", "Docentes", user.email);
                await getDoc(docRef).then(doc => {
                    seteditarData(doc.data())
                })
            }
        })
    }, [])


    const handleChange = (e) => {
        const { name, value } = e.target
        seteditarData({ ...editarData, [name]: value })
    }
    const editar = (e) => {
       auth.onAuthStateChanged(user=>{
        if(user != null){
            e.preventDefault() 
            if (editarData.nombre != '' && editarData.apellido != '' && editarData.idEscuela != '' && editarData.telefono != '' && editarData.centro_educativo != '') {
                actualizar_Docente('11111', user.email, editarData);
    
    
    
            } else {
                console.log("No se admiten campos vacios")
            }
        }
       })

    }
    //Ver correo

    const [dataCorreo, setdataCorreo] = useState([])
    useEffect(() => {
        auth.onAuthStateChanged(async user => {
            if (user != null) {

                const docRef = doc(db, "11111", "Usuarios", "Docentes", user.email);
                await getDoc(docRef).then(doc => {
                    setdataCorreo(doc.data().correo)
                })
            }
        })
    }, [])
    const [editarClave, seteditarClave] = useState({})
    const handleChangeclave = (e) => {
        const { name, value } = e.target
        seteditarClave({ ...editarClave, [name]: value })
    }
    const actualizarClave = (e) => {
        e.preventDefault()
        const user = auth.currentUser;
        const clavenueva= editarClave.clave_Docente;
        console.log(clavenueva)
        if (clavenueva != ''){
            updatePassword(user, clavenueva).then(() => {
            console.log('Correcto')
            seteditarClave({clave_Docente:''})
                // Update successful.
            }).catch((error) => {
            console.log('incorrecto',error)
                // ...
        });}else{
            console.log("No acepta campo vacio")
        }

    }

    return (

        <>
            <h1 className="h1-conf">Configuración</h1>

            <div className="grid-conf section-configuracion">
                <form className="line-v">
                    <h2>Datos Personales</h2>
                    <label > Nombre:<input type="text" name="nombre" id="nombre" value={editarData.nombre} onChange={handleChange} /></label>
                    <label > Apellido: <input type="text" name="apellido" id="apellido" value={editarData.apellido} onChange={handleChange} /> </label>
                    <label > ID Escuela: <input type="text" name="idEscuela" size="5" maxLength="5" id="idEscuela" value={editarData.idEscuela} onChange={handleChange} /></label>
                    <label > Telefono:  <input type="text" name="telefono" size="10" maxLength="10" id="telefono" value={editarData.telefono} onChange={handleChange} /></label>
                    <label > Centro Educativo: <input name="centro_educativo" id="centro_educativo" value={editarData.centro_educativo} onChange={handleChange} /></label>


                    <button className="btn-conf" onClick={editar}>Actualizar</button>


                </form>

                <form className="line-l">
                    <h2>Datos de Inicio de Sessión</h2>

                    <label > Correo: <input disabled type="email" name="correoActual" id="correo_DocenteActual" value={dataCorreo} /></label>
                    <label > Clave Nueva: <input type="password" id="clave_Docente" name="clave_Docente" onChange={handleChangeclave} value={editarClave.clave_Docente}/></label>

                    <button className="btn-conf-cl" onClick={actualizarClave} >Actualizar Clave</button>

                </form>
            </div>

        </>
    )

}