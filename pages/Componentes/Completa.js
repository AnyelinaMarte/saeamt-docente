import { collection, doc, onSnapshot, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../BD/Configuracion";
import { add_completa, add_completa_encabezado } from "../../BD/CRUD";

export default function Completa(props){
    const datos_Inicial = {
        pregunta:'',
        respuesta:'',
       

    }
    const dato_encabezado = {
        encabezado:''
    }

    const [datoE, setdatoE] = useState(dato_encabezado)
    const [extraeE,setextraeE] = useState("")

    useEffect(() => {
        onSnapshot(query(doc(db, "11111", "Niveles", props.nivel, props.id,"Completa","encabezado")), (querySnapshot) => {
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
        if (data.pregunta != ''  && data.respuesta != '') {
            extraeE == ""?
                add_completa_encabezado("11111", props.nivel, props.id, "encabezado", datoE)
            :console.log(" ")
            add_completa("11111", props.nivel, props.id, data);
            setData(datos_Inicial)
            
        } else {
            console.log("No se admiten campos vacios")
        }

    }
    const [completaData, setCompletaData] = useState([])
    useEffect(()=>{
        onSnapshot(query(collection(db, "11111", "Niveles", props.nivel, props.id,"Completa")), (querySnapshot)=>{
            const data = []
            querySnapshot.forEach((doc=>{
                if(doc.id != "encabezado"){
                    data.push({...doc.data(), id:doc.id})
                }
            }))
            setCompletaData(data)
        })
        
    },[])
    var num =0;
    return(
        <>
            <div className="section-contenido">
                <button className="btn-back" onClick={props.ButtonAtras} >
                    <img className="img-back" src="/back.png" />
                </button>
                    </div>
                    <div className="completa">
                        <h1>{"Completa" + "-"+ props.id }</h1>
                    
                    <form onSubmit={handleSubmit} >
                        {extraeE == ""? 
                            <input className="encabezado" placeholder="Ingrese el encabezado de la actividad." onChange={handleChange1}  name="encabezado" value={data.encabezado} />
                            :  <input className="encabezado" placeholder="Ingrese el encabezado de la actividad."  name="encabezado" value={extraeE} /> 
                        }
                        <div className="pr">
                        <label className="label-completa">Pregunta</label><input className="input-completa" id="pregunta" name="pregunta" placeholder="Ingrese la pregunta" onChange={handleChange} value={data.pregunta}/>
                        <label className="label-completa">Respuesta</label><input className="input-completa" id="respuesta" name="respuesta" placeholder="Ingrese la respuesta" onChange={handleChange} value={data.respuesta} />
                        </div>
                        <button className="btn-cpt" onClick={handleSubmit}>Agregar</button>
                    </form>
                    <hr className="hr-de"></hr>
                    <h3>Actividad</h3>
                    <> 
                   
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
                        
                        {completaData.length != 0?
                        completaData.map(n =>
                            <>
                                <tr>
                                    <td>
                                        {num += 1}
                                    </td>
                                    <td>
                                        {n.pregunta}
                                    </td>

                                    <td>
                                        {n.respuesta}
                                    </td>
                                </tr>

                            </>

                        ) :<h1>No existen preguntas</h1>
                        }

                    </table>
                    
                     
                       
                       
                    
                    </>
            </div>
        </>
       
        )
}