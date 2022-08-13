import { collection, doc, onSnapshot, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../BD/Configuracion";
import { add_Seleccionm, add_Seleccionm_encabezado, add_VyF, add_VyF_encabezado } from "../../BD/CRUD";

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
        onSnapshot(query(doc(db, "11111", "Niveles", "Nivel_1", props.id,"Seleccionm","encabezado")), (querySnapshot) => {
            if(querySnapshot.exists()){
                setextraeE(querySnapshot.data().encabezado)
            }
        })

    }, [])
    
  
    const [data, setData] = useState(datos_Inicial)
    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({...data,[name]:value })
        console.log(data)
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
            add_Seleccionm_encabezado("11111", "Nivel_1", props.id, "encabezado", datoE)
            :console.log(" ")
            add_Seleccionm("11111", "Nivel_1", props.id, data);
            setData(datos_Inicial)
            
        } else {
            console.log("No se admiten campos vacios")
        }

    }
   
    const [completaData, setCompletaData] = useState([])
    useEffect(()=>{
        onSnapshot(query(collection(db, "11111", "Niveles", "Nivel_1", props.id,"Seleccionm")), (querySnapshot)=>{
            const data = []
            querySnapshot.forEach((doc=>{
                if(doc.id != "encabezado"){
                    data.push({...doc.data(), id:doc.id})
                }
            }))
            setCompletaData(data)
        })
        
    },[])
    return(
        <>
            <div className="section-contenido">
                <button className="btn-back" onClick={props.ButtonAtras} >
                    <img className="img-back" src="/back.png" />
                </button>
                    </div>
                    <div className="completa">
                        <h1>{"Seleccion Multiple" + "-"+ props.id }</h1>
                    
                    <form onSubmit={handleSubmit} >
                        {extraeE == ""? 
                            <input className="encabezado" placeholder="Ingrese el encabezado de la actividad." onChange={handleChange1}  name="encabezado" value={data.encabezado} />
                            :  <input className="encabezado" placeholder="Ingrese el encabezado de la actividad."  name="encabezado" value={extraeE} /> 
                        }

                        <label>Pregunta</label><input id="pregunta" name="pregunta" placeholder="Ingrese la pregunta" onChange={handleChange} value={data.pregunta}/>
                        <label>Opciones</label>
                        <input placeholder="opcion 1" name="opcion1" id="opcion1" onChange={handleChange}/>
                        <select name="validar1" id="validar1" onChange={handleChange} value={data.validar1}>
                        <option ></option>    
                            <option value="Correcta">C</option>
                            <option value="Incorrecta">I</option>

                        </select>
                        <input placeholder="opcion 2" name="opcion2" id="opcion2" onChange={handleChange}/>
                        <select name="validar2" id="validar2" onChange={handleChange} value={data.validar2}>
                        <option ></option>   
                            <option value="Correcta">C</option>
                            <option value="Incorrecta">I</option>

                        </select>
                        <input placeholder="opcion 3" name="opcion3" id="opcion3" onChange={handleChange}/>
                        <select name="validar3" id="validar3" onChange={handleChange} value={data.validar3}>
                            <option></option>
                            <option value="Correcta">C</option>
                            <option value="Incorrecta">I</option>

                        </select>
                        <button onClick={handleSubmit}>add</button>
                    </form>
                    {completaData.length != 0?
                        completaData.map(e=>
                            <div >
                                <span>{e.pregunta}</span>
                                <span>{e.respuesta}</span>
                               

                            </div>
                        )
                        :<h1>No existen preguntas</h1>
                    }
            </div>
        </>
       
        )
}