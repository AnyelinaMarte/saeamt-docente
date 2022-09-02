import { db } from "../BD/Configuracion";
import { collection, getDocs, onSnapshot, query, } from "firebase/firestore";
import { useEffect, useState } from 'react';
import { actualizar_Estudiante, add_Estudiante, delete_Estudiante } from "../BD/CRUD";
import axios from "axios";

export default function Estudiantes() {

    const datosEstudiantes = {
        nombre_Estudiante: '',
        apellido_Estudiante: '',
        genero_Estudiante: '',
        fechan_Estudiante: '',
        correo_Estudiante: '',
        clave_Estudiante: '',
        posicionActual: {},
    }

    const [datosE, setDatosE] = useState(datosEstudiantes);
   

    const handleChange = (e) => {
        const { name, value } = e.target
        setDatosE({ ...datosE, [name]: value })
        
    };


    const handleSubmit = (e) => {
        e.preventDefault()
        datosE.posicionActual = { nivel: 1, posicionNIvel: 1 }
       

        if (datosE.nombre_Estudiante != '' && datosE.apellido_Estudiante != '' && datosE.genero_Estudiante != '' && datosE.fechan_Estudiante != '' && datosE.correo_Estudiante != '' && datosE.clave_Estudiante != '') {
                
            axios.get(`https://registrodeestudiante.herokuapp.com/api/${datosE.clave_Estudiante}/${datosE.correo_Estudiante}`)
                add_Estudiante("11111", datosE.correo_Estudiante, datosE);
                setDatosE(datosEstudiantes)


        } else {
            console.log("No se admiten campos vacios")
        }

    }
    const Data = []
    const [currentId, setcurrentId] = useState('')
    const [editarData, seteditarData] = useState(datosEstudiantes)

    const handleChange2 = (e) => {
        const { name, value } = e.target
        seteditarData({ ...editarData, [name]: value })
        
    }; 
    const extraerData = async (id) => {
        await getDocs(collection(db, '11111', 'Usuarios', 'Estudiantes'))
            .then(querySnapshot => {

                querySnapshot.forEach(doc => {
                    if (doc.id == id) {
                        Data.pop()
                        Data.push({ ...doc.data() })
                        
                    }
                

                })
                seteditarData({ ...Data[0] })
            })
    }
    useEffect(() => {

        extraerData(currentId)

    }, [currentId])

    const editar = (e) => {
        e.preventDefault()
        if (editarData.nombre_Estudiante != '' && editarData.apellido_Estudiante != '' && editarData.genero_Estudiante != '' && editarData.fechan_Estudiante != '' && editarData.correo_Estudiante != '' && editarData.clave_Estudiante != '') {
                
            actualizar_Estudiante('11111', currentId, editarData);
        seteditarData(datosEstudiantes)
        setcurrentId('') 


        } else {
            console.log("No se admiten campos vacios")
        }
       
    }
    const eliminar = (id, nombre, apellido, genero, fecha, usuario) => {
        const datos = {
            Nombre: nombre,
            Apellido: apellido,
            Genero: genero,
            Fecha_Nacimiento: fecha,
            Usuario: usuario


        }
        delete_Estudiante("11111", id, datos);

    }




    const [dataE, setdataE] = useState([])
    useEffect(() => {
        onSnapshot(query(collection(db, "11111", "Usuarios", "Estudiantes")), (querySnapshot) => {
            const docs = []
            querySnapshot.forEach((doc) => {
                docs.push({ ...doc.data(), id: doc.id })

            })
            setdataE(docs)

        })

    }, [])

    return (
        <>
            <div className="section-estudiantes">
                {currentId.length == 0? 
                <form >
                    <h3>Registrar Estudiantes</h3>

                    <label > Nombre: <input name="nombre_Estudiante" id="nombre_Estudiante" value={datosE.nombre_Estudiante} onChange={handleChange} className="input-name" type="text" /></label>
                    <label > Apellido: <input value={datosE.apellido_Estudiante} onChange={handleChange} type="text" name="apellido_Estudiante" id="apellido_Estudiante" /> </label>
                    <label > Genero:
                        <select value={datosE.genero_Estudiante} onChange={handleChange} name="genero_Estudiante" id="genero_Estudiante">
                            <option value="Seleccione" selected>Seleccione</option>
                            <option value="Masculino" >Masculino</option>
                            <option value="Femenino" >Femenino</option>
                        </select>
                    </label>


                    <label > Fecha de Nacimiento:  <input value={datosE.fechan_Estudiante} onChange={handleChange} min="2012-01-01" max="2014-01-01" className="input-fechan" type="date" name="fechan_Estudiante" id="fechan_Estudiante" /></label>
                    <label > Usuario: <input value={datosE.correo_Estudiante} onChange={handleChange} className="input-user" type="text" name="correo_Estudiante" id="correo_Estudiante" /></label>
                    <label > Clave: <input value={datosE.clave_Estudiante} onChange={handleChange} className="input-clave" type="password" name="clave_Estudiante" id="clave_Estudiante" /></label>


                     <button onClick={handleSubmit} >Registrar</button> 
                     
                     


                </form>:
                <form> 
                    <h3>Actualizar Estudiante</h3>

                    <label > Nombre: <input name="nombre_Estudiante" id="nombre_Estudiante" value={editarData.nombre_Estudiante} onChange={handleChange2} className="input-name" type="text" /></label>
                    <label > Apellido: <input value={editarData.apellido_Estudiante} onChange={handleChange2} type="text" name="apellido_Estudiante" id="apellido_Estudiante" /> </label>
                    <label > Genero:
                        <select value={editarData.genero_Estudiante} onChange={handleChange2} name="genero_Estudiante" id="genero_Estudiante">
                            <option value="Seleccione" selected>Seleccione</option>
                            <option value="Masculino" >Masculino</option>
                            <option value="Femenino" >Femenino</option>
                        </select>
                    </label>


                    <label > Fecha de Nacimiento:  <input value={editarData.fechan_Estudiante} onChange={handleChange2} min="2012-01-01" max="2014-01-01" className="input-fechan" type="date" name="fechan_Estudiante" id="fechan_Estudiante" /></label>
                    <label > Usuario: <input disabled value={editarData.correo_Estudiante} onChange={handleChange2} className="input-user" type="text" name="correo_Estudiante" id="correo_Estudiante" /></label>
                    <label > Clave: <input disabled value={editarData.clave_Estudiante} onChange={handleChange2} className="input-clave" type="password" name="clave_Estudiante" id="clave_Estudiante" /></label>


                    <button onClick={editar} >Actualizar</button> 
                </form>
                }   
            </div>

            <div className="table-estudiantes">
                <h3>Estudiantes Registrados</h3>
                <table>

                    <tr>
                        <th>
                            Nombre
                        </th>
                        <th>
                            Apellido
                        </th>
                        <th>
                            Genero
                        </th>
                        <th>
                            Fecha de Nacimiento
                        </th>
                        <th>
                            Usuario
                        </th>
                        <th>
                            Editar
                        </th>
                        <th>
                            Eliminar
                        </th>
                    </tr>
                    {dataE.map(n =>
                        <>
                            <tr>
                                <td>

                                    {n.nombre_Estudiante}
                                </td>
                                <td>
                                    {n.apellido_Estudiante}
                                </td>
                                <td>
                                    {n.genero_Estudiante}
                                </td>
                                <td>
                                    {n.fechan_Estudiante}
                                </td>
                                <td>
                                    {n.correo_Estudiante}
                                </td>
                                <td>
                                    <button onClick={() => setcurrentId(n.id)} >Editar</button>
                                </td>
                                <td>
                                    <button onClick={() => eliminar(n.id, n.nombre_Estudiante, n.apellido_Estudiante, n.genero_Estudiante, n.fechan_Estudiante, n.correo_Estudiante)}>Eliminar</button>

                                </td>



                            </tr>
                        </>

                    )}
                </table>
            </div>

        </>
    )
}