import { collection, doc, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../BD/Configuracion";
import { add_Seleccionm, add_Seleccionm_encabezado } from "../../BD/CRUD";

export default function Seleccionmultiple(props){
    const datos_Inicial = {
        pregunta:'',
        opcion1:'',
        opcion2:'',
        opcion3:'',
        validar1:'',
        validar2:'',
        validar3:'',
        opciones:[],
    }
    const dato_encabezado = {
        encabezado:''
    }

    const [datoE, setdatoE] = useState(dato_encabezado)
    const [extraeE,setextraeE] = useState("")
  
    useEffect(() => {
        onSnapshot(query(doc(db, "11111", "Niveles", props.nivel, props.id,"Seleccionm","encabezado")), (querySnapshot) => {
            if(querySnapshot.exists()){
                setextraeE(querySnapshot.data().encabezado)
            }
        })

    }, [])
   
    const [data, setData] = useState(datos_Inicial)
    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({...data,[name]:value })
     
    };
    const handleChange1 = (e) => {
        const { name, value } = e.target;
        setdatoE({...datoE,[name]:value })
    };
    const handleSubmit = (e) => {
        e.preventDefault()
        data = {
            pregunta:data.pregunta,
            opciones:[{opcion:data.opcion1, validar:data.validar1},{opcion:data.opcion2, validar:data.validar2},{opcion:data.opcion3, validar:data.validar3}]
        }
this
        if (data.pregunta != '' && data.opciones != []  ) {
            extraeE == ""?
            add_Seleccionm_encabezado("11111", props.nivel, props.id, "encabezado", datoE)
            :console.log(" ")
            add_Seleccionm("11111", props.nivel, props.id, data);
            setData(datos_Inicial)
            
        } else {
            console.log("No se admiten campos vacios")
        }

    }
   
    const [seleccionmData, setseleccionmData] = useState([])
    useEffect(()=>{
        onSnapshot(query(collection(db, "11111", "Niveles", props.nivel, props.id,"Seleccionm")), (querySnapshot)=>{
            const data = []
            querySnapshot.forEach((doc=>{
                if(doc.id != "encabezado"){
                    data.push({...doc.data(), id:doc.id})
                }
            }))
            setseleccionmData(data)
        })
        
    },[])
   
    var num = 0;
    return(
        <>
            <div className="section-contenido">
                <button className="btn-back" onClick={props.ButtonAtras} >
                    <img className="img-back" src="/back.png" />
                </button>
                    </div>
                    <div className="seleccionm">
                        <h1>{"Seleccion Multiple" + "-"+ props.id }</h1>
                    
                    <form onSubmit={handleSubmit} >
                        {extraeE == ""? 
                            <input className="encabezado" placeholder="Ingrese el encabezado de la actividad." onChange={handleChange1}  name="encabezado" value={data.encabezado} />
                            :  <input className="encabezado" placeholder="Ingrese el encabezado de la actividad."  name="encabezado" value={extraeE} /> 
                        }
                        <div className="pr">
                        <label className="label-seleccionm">Pregunta</label><input className="input-seleccionm" id="pregunta" name="pregunta" placeholder="Ingrese la pregunta" onChange={handleChange} value={data.pregunta}/>
                        </div>
                        <label className="label-seleccionm">Opciones</label>
                        <div className="sm">
                        
                        <input className="input-seleccionm" placeholder="Opcion 1" name="opcion1" id="opcion1" onChange={handleChange}/>
                        <select className="input-seleccionm" name="validar1" id="validar1" onChange={handleChange} value={data.validar1}>
                        <option ></option>    
                            <option value="Correcta">Correcta</option>
                            <option value="Incorrecta">Incorrecta</option>

                        </select>
                        <input className="input-seleccionm" placeholder="Opcion 2" name="opcion2" id="opcion2" onChange={handleChange}/>
                        <select className="input-seleccionm" name="validar2" id="validar2" onChange={handleChange} value={data.validar2}>
                        <option ></option>   
                            <option value="Correcta">Correcta</option>
                            <option value="Incorrecta">Incorrecta</option>

                        </select>
                        <input className="input-seleccionm" placeholder="Opcion 3" name="opcion3" id="opcion3" onChange={handleChange}/>
                        <select className="input-seleccionm" name="validar3" id="validar3" onChange={handleChange} value={data.validar3}>
                            <option></option>
                            <option value="Correcta">Correcta</option>
                            <option value="Incorrecta">Incorrecta</option>

                        </select>
                        </div>
                        
                        <button className="btn-cpt" onClick={handleSubmit}>Agregar</button>
                    </form>
                    <hr className="hr-de"></hr>
                    <h3>Actividad</h3>
                    { extraeE != ""? 
                    <h4 >{extraeE} </h4>
                     :<h4>No existe encabezado de actividad</h4>
                     
                 }
                  <table className="table-a">
                        <tr>
                            <th>
                                N.°
                            </th>
                            <th>
                               Pregunta
                            </th>

                            <th>
                                Respuesta
                            </th>
                        </tr>
                        
                        {seleccionmData.length != 0?
                        seleccionmData.map(n =>
                            <>
                                <tr>
                                    <td>
                                        {num += 1}
                                    </td>
                                    <td>
                                        {n.pregunta}
                                    </td>

                                    <td>
                                        {n.opciones.map(p=>
                                        p.validar == "Correcta"?
                                        p.opcion
                                        :""

                                        )}
                                    </td>
                                </tr>

                            </>

                        ) :<h1>No existen preguntas</h1>
                        }

                    </table>
                  
            </div>
        </>
       
        )
}