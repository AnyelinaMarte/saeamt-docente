import { db } from "../Configuracion";
import { collection, getDocs, onSnapshot, query, } from "firebase/firestore";
import { useEffect, useState } from 'react';
import { actualizar_Estudiante, add_Estudiante, delete_Estudiante } from "../CRUD";
import axios, { AxiosError } from "axios";
import { LineWave } from  'react-loader-spinner'
import AlertaAgreado from "../Components/AlertaAgreado";
import AlertaEliminar from "../Components/AlertaEliminar";
export default function Estudiantes() {
    const [cargando, setCargando] = useState(false)
    const [activarCampoVacio, setActivarCampoVacio] = useState(false)
    const [activarEliminar, setEliminar] = useState(false)
    const [activarReptido, setActivarRepetido] = useState(false)
    const [elimina, setElimina] = useState("")
    const [datosEliminar, setDatosEliminar] =useState({
                Nombre: "",
                Apellido: "",
                Genero: "",
                Fecha_Nacimiento: "",
                Usuario: ""
    })

    const datosEstudiantes = {
        nombre_Estudiante: '',
        apellido_Estudiante: '',
        genero_Estudiante: '',
        fechan_Estudiante: '',
        correo_Estudiante: '',
        clave_Estudiante: '',
        posicionActual: {
            nivel1:1,
            nivel2:1,
            nivel3:1,
            nivel4:1,

        },
        
    }

    const [datosE, setDatosE] = useState(datosEstudiantes);
   

    const handleChange = (e) => {
        const { name, value } = e.target
        setDatosE({ ...datosE, [name]: value })
        
    };

    const [activarAlerta, setActivarAlerta] = useState(false)
    const handleSubmit =async (e) => {
        e.preventDefault()
       

        if (datosE.nombre_Estudiante != '' && datosE.apellido_Estudiante != '' && datosE.genero_Estudiante != '' && datosE.fechan_Estudiante != '' && datosE.correo_Estudiante != '' && datosE.clave_Estudiante != '') {
            datosE.correo_Estudiante = `${datosE.correo_Estudiante}@eleo.edu.do`
            const resultado =  dataE.filter(datas=>{
                return datas.correo_Estudiante  == datosE.correo_Estudiante 
            })
               if(resultado.length == 0){
                setCargando(true)
                axios.get(`https://registrodeestudiante.herokuapp.com/api/${datosE.clave_Estudiante}/${datosE.correo_Estudiante}`)
                setTimeout(()=>{
                    setCargando(false)
                    add_Estudiante("11111", datosE.correo_Estudiante, datosE);
                    setDatosE(datosEstudiantes)
                    setActivarAlerta(true)
                }, 9000)
               }
               else{
                setActivarRepetido(true)
               }
                
        } else {
            setActivarCampoVacio(true)

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

    const current = (id)=>{
        setcurrentId(id)
        extraerData(id)

    } 
    const editar = (e) => {
        e.preventDefault()
        if (editarData.nombre_Estudiante != '' && editarData.apellido_Estudiante != '' && editarData.genero_Estudiante != '' && editarData.fechan_Estudiante != '' && editarData.correo_Estudiante != '' && editarData.clave_Estudiante != '') {
                
            actualizar_Estudiante('11111', currentId, editarData);
        seteditarData(datosEstudiantes)
        setcurrentId('') 
        setActivarAlerta(true)



        } else {
            setActivarCampoVacio(true)

        }
       
    }
    const eliminar = (id, nombre, apellido, genero, fecha, usuario) => {
        setEliminar(true)
        setElimina(id)
            const datos = {
                Nombre: nombre,
                Apellido: apellido,
                Genero: genero,
                Fecha_Nacimiento: fecha,
                Usuario: usuario
    
    
            }
            setDatosEliminar(datos)

            

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
    const borrar =()=>{
        delete_Estudiante("11111", elimina, datosEliminar) 
        setEliminar(false)
    }
    return (
        <>
        
            <div className="section-estudiantes">

                {currentId.length == 0? 
                <div>
                <h3>Registrar Estudiantes</h3>
                <form >
                    <div> 
                        <label > Nombre: <input name="nombre_Estudiante" id="nombre_Estudiante" value={datosE.nombre_Estudiante} onChange={handleChange} className="input-name" type="text" placeholder="Nombre Estudiante" /></label>
                    </div>
                    <div>
                        <label > Apellido: <input value={datosE.apellido_Estudiante} onChange={handleChange} type="text" name="apellido_Estudiante" id="apellido_Estudiante" placeholder="Apellido Estudiante" /> </label>
                    </div>
                   <div>
                    <label > Genero:
                            <select value={datosE.genero_Estudiante} onChange={handleChange} name="genero_Estudiante" id="genero_Estudiante">
                                <option value="Seleccione" selected>Seleccione</option>
                                <option value="Masculino" >Masculino</option>
                                <option value="Femenino" >Femenino</option>
                            </select>
                        </label>
                   </div>
                   <div>
                    <label > Fecha de Nacimiento:  <input value={datosE.fechan_Estudiante} onChange={handleChange} min="2012-01-01" max="2014-01-01" className="input-fechan" type="date" name="fechan_Estudiante" id="fechan_Estudiante" /></label>
                   </div>
                   <div>
                     <label > Usuario: <input value={datosE.correo_Estudiante} onChange={handleChange} className="input-user" type="email" name="correo_Estudiante" id="correo_Estudiante" /> @eleo.edu.do</label>
                   </div>
                   <div>
                    <label > Clave: <input value={datosE.clave_Estudiante} onChange={handleChange} className="input-clave" type="password" name="clave_Estudiante" id="clave_Estudiante" /></label>
                   </div>
                <button onClick={handleSubmit} >Registrar</button> 

                </form>

                    
                </div>:
                <div><h3>Actualizar Estudiante</h3>
                    <form> 

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
                </div>
                }   
            </div>

            <div className="table-estudiantes">
            <h3>Estudiantes Registrados</h3>

            {cargando == false?
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
                                 <button onClick={() => current(n.id)} >Editar</button>
                             </td>
                             <td>
                                 <button onClick={() => eliminar(n.id, n.nombre_Estudiante, n.apellido_Estudiante, n.genero_Estudiante, n.fechan_Estudiante, n.correo_Estudiante)}>Eliminar</button>

                             </td>



                         </tr>
                     </>

                 )}
             </table>
             :<div className="cargando-linewave">
                <div>
                <LineWave
                    height="500"
                    width="500" 
                    color="#fff"
                    ariaLabel="line-wave"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={cargando}
                    firstLineColor=""
                    middleLineColor=""
                    lastLineColor=""
                    />
                </div>
                    
                    <span>Creando Estudiante</span>
             </div>
        
        }
             

             {activarAlerta == false?
                <span></span>
            :<div>
                <AlertaAgreado mensaje="Agregado correctamente"/>
                {setTimeout(()=>{setActivarAlerta(false)},2000)}
            </div>
            }
            {activarCampoVacio == false?
                <span></span>
            :<div>
                <AlertaAgreado mensaje="No se admiten campos vacios"/>
                {setTimeout(()=>{setActivarCampoVacio(false)},1000)}
            </div>
            }
             {activarReptido == false?
                <span></span>
            :<div>
                <AlertaAgreado mensaje="Correo existente"/>
                {setTimeout(()=>{setActivarRepetido(false)},1000)}
            </div>
            }
               {
                activarEliminar==false?
                    <span></span>
                :<div>
                    <AlertaEliminar buttonEliminar={borrar} ButtonCancelar={()=>setEliminar(false)}/>
                </div>
               }
            </div>
        </>
    )
}