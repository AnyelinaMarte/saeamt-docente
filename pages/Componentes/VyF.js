import { collection, doc, onSnapshot, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../BD/Configuracion";
import { add_VyF, add_VyF_encabezado } from "../../BD/CRUD";

export default function VyF(props){
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
        onSnapshot(query(doc(db, "11111", "Niveles", "Nivel_1", props.id,"VyF","encabezado")), (querySnapshot) => {
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
        if (data.pregunta != '' && data.respuesta != ''  ) {
            extraeE == ""?
            add_VyF_encabezado("11111", "Nivel_1", props.id, "encabezado", datoE)
            :console.log(" ")
            add_VyF("11111", "Nivel_1", props.id, data);
            setData(datos_Inicial)
            
        } else {
            console.log("No se admiten campos vacios")
        }

    }
   
    const [completaData, setCompletaData] = useState([])
    useEffect(()=>{
        onSnapshot(query(collection(db, "11111", "Niveles", "Nivel_1", props.id,"VyF")), (querySnapshot)=>{
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
                        <h1>{"Completa" + "-"+ props.id }</h1>
                    
                    <form onSubmit={handleSubmit} >
                        {extraeE == ""? 
                            <input className="encabezado" placeholder="Ingrese el encabezado de la actividad." onChange={handleChange1}  name="encabezado" value={data.encabezado} />
                            :  <input className="encabezado" placeholder="Ingrese el encabezado de la actividad."  name="encabezado" value={extraeE} /> 
                        }

                        <label>Pregunta</label><input id="pregunta" name="pregunta" placeholder="Ingrese la pregunta" onChange={handleChange} value={data.pregunta}/>
                        <select name="respuesta" id="respuesta" onChange={handleChange} value={data.respuesta} >
                            <option >Seleccione</option>
                            <option value="verdadero">Verdadero</option>
                            <option value="falso">Falso</option>
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