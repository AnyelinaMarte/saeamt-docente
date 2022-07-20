import { db } from "../BD/Configuracion";
import { collection, getDocs, onSnapshot, query, } from "firebase/firestore";
import { useEffect, useState } from 'react';
import { actualizar_Estudiante, add_Estudiante, delete_Estudiante } from "../BD/CRUD";


export default function Estudiantes() {

    const datosEstudiantes = {
        nombre_Estudiante: '',
        apellido_Estudiante: '',
        genero_Estudiante: '',
        fechan_Estudiante: '',
        usuario_Estudiante: '',
        clave_Estudiante: ''

    }
    const [datosE, setDatosE] = useState(datosEstudiantes);
    const handleChange = (e) => {
        const { name, value } = e.target
        setDatosE({ ...datosE, [name]: value })
    };
    const handleSubmit = (e) => {
        e.preventDefault()
        if (datosE.nombre_Estudiante != '' && datosE.apellido_Estudiante != '' && datosE.genero_Estudiante != '' && datosE.fechan_Estudiante != '' && datosE.usuario_Estudiante != '' && datosE.clave_Estudiante != '') {
            const resultado = dataE.filter(word => {
                return word.usuario_Estudiante.toLowerCase() === datosE.usuario_Estudiante.toLowerCase()
            })
            if (resultado.length == 0) {
                add_Estudiante("11111", datosE.usuario_Estudiante, datosE);
                setDatosE(datosEstudiantes)
            } else {
                console.log("Nombre de usuario en uso")
            }

        } else {
            console.log("No se admiten campos vacios")
        }

    }
    const Data = []
    const [currentId, setcurrentId] = useState('')
    const extraerData = async (id) => {
        await getDocs(collection(db, '11111', 'Usuarios', 'Estudiantes'))
            .then(querySnapshot => {

                querySnapshot.forEach(doc => {
                    if (doc.id == id) {
                        Data.pop()
                        Data.push({ ...doc.data() })
                    }
                })
                setDatosE({ ...Data[0] })

            })
    }
    useEffect(() => {

        extraerData(currentId)

    }, [currentId])

    const editar = (e) => {
        e.preventDefault()
        actualizar_Estudiante('11111', currentId, datosE);
        setDatosE(datosEstudiantes)
        setcurrentId('')
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
                <form >
                    <h3>Registrar Estudiantes</h3>

                    <label > Nombre: <input value={datosE.nombre_Estudiante} onChange={handleChange} className="input-name" type="text" name="nombre_Estudiante" id="nombre_Estudiante" /></label>
                    <label > Apellido: <input value={datosE.apellido_Estudiante} onChange={handleChange} type="text" name="apellido_Estudiante" id="apellido_Estudiante" /> </label>
                    <label > Genero:
                        <select value={datosE.genero_Estudiante} onChange={handleChange} name="genero_Estudiante" id="genero_Estudiante">
                            <option value="Seleccione" selected>Seleccione</option>
                            <option value="Masculino" >Masculino</option>
                            <option value="Femenino" >Femenino</option>
                        </select>
                    </label>


                    <label > Fecha de Nacimiento:  <input value={datosE.fechan_Estudiante} onChange={handleChange} className="input-fechan" type="date" name="fechan_Estudiante" id="fechan_Estudiante" /></label>
                    <label > Usuario: <input value={datosE.usuario_Estudiante} onChange={handleChange} className="input-user" type="text" name="usuario_Estudiante" id="usuario_Estudiante" /></label>
                    <label > Clave: <input value={datosE.clave_Estudiante} onChange={handleChange} className="input-clave" type="password" name="clave_Estudiante" id="clave_Estudiante" /></label>


                    {currentId.length == 0 ? <button onClick={handleSubmit} >Registrar</button> : <button onClick={editar} >Actualizar</button>}


                </form>

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
                                    {n.usuario_Estudiante}
                                </td>
                                <td>
                                    <button onClick={() => setcurrentId(n.id)} >Editar</button>
                                </td>
                                <td>
                                    <button onClick={() => eliminar(n.id, n.nombre_Estudiante, n.apellido_Estudiante, n.genero_Estudiante, n.fechan_Estudiante, n.usuario_Estudiante)}>Eliminar</button>

                                </td>



                            </tr>
                        </>

                    )}
                </table>
            </div>

        </>
    )
}