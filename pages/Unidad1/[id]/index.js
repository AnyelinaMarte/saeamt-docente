import Link from "next/link";
import { db } from "../../../BD/Configuracion";
import { collection, doc, getDoc, onSnapshot, query, } from "firebase/firestore";
import { useEffect, useState } from 'react';
import {useRouter} from 'next/router';
import {actualizar_unidad} from '../../../BD/CRUD'
export default function indexUnidad(){
   
 const router = useRouter()
 const [dataU, setdataU] = useState([])
 const [dataO, setdataO] = useState([])


 const datos_Inicial= {
    Definicion: '',
   
 }
 const dato_Inicial={
    Video:'',
 }
 const [data1, setData1] = useState(datos_Inicial)
 const [data2, setData2] = useState(dato_Inicial)
 const handleChange = (e) => {
    const { name, value } = e.target
    setData1({ ...data1, [name]: value })
};
const handleChange2 = (e) => {
    const { name, value } = e.target
    setData2({ ...data2, [name]: value })
};
 
 useEffect(() => {
    onSnapshot(query(doc(db, "11111", "Niveles","Nivel_1",router.query.id)), (querySnapshot) => {
        
        setdataU(querySnapshot.data())
        setdataO(querySnapshot.data().Objetivos)


    })

}, [])

 const handleSubmit1 = (e) => {
    e.preventDefault()
    if (data1.Definicion != '' ) {
            actualizar_unidad("11111", "Nivel_1", router.query.id, data1);
            setData1(datos_Inicial)
        
    } else {
        console.log("No se admiten campos vacios")
    }

}
const handleSubmit2 = (e) => {
    e.preventDefault()
    if (data2.Video != '' ) {
            actualizar_unidad("11111", "Nivel_1", router.query.id, data2);
            setData2(dato_Inicial)
        
    } else {
        console.log("No se admiten campos vacios")
    }

}
var num = 0
    return(
       <>
        <div className="section-contenido">
            <Link href="/Unidad1/Unidad"><button>Atras</button></Link>
                <h1 className="h1">{dataU.ID}</h1>

            <div className="columnas">
            
              <form>
                <div>
                <label>Definición de {dataU.ID}</label> 
                </div>
                <div>
                <textarea value={dataU.Definicion}></textarea >
                <textarea placeholder="Escribe aquí para actualizar el contenido de la izquierda." onChange={handleChange} type="text" name="Definicion" id="Definicion" value={data1.Definicion}></textarea>
                </div>
                <div>
                    <button onClick={handleSubmit1}> Guardar Cambios</button>
                </div>
                <div>
                <label>Video sobre {dataU.ID}</label> 
                </div>
                <div>
                <textarea value={dataU.Video}></textarea >
                <textarea placeholder="Escribe aquí para actualizar el contenido de la izquierda." onChange={handleChange2} type="text" name="Video" id="Video" value={data2.Video}></textarea>
                </div>
                <div>
                    <button onClick={handleSubmit2}> Guardar Cambios</button>
                </div>
              </form>
              <h5>Objetivos a cumplir en el tema {dataU.ID}</h5>
              <div>
              <form>
              <label>Descripcion</label>
              <input/>
              </form>
              <button>add</button>
              </div>
              <table>
              <tr>
              <th>
              N.°
              </th>
              <th>
              Objetivos
              </th>
              <th>
              Editar
              </th>
              <th>
              Eliminar
              </th>
             </tr>
             {dataO.map(n =>
                <>
                <tr>
                <td>
                {  num +=1}
                </td>
                <td>
                  {n}
                </td>
                <td>
                 <button>Editar</button>
                </td>
                <td>
                  <button>Eliminar</button>
                </td>
                </tr>
              
                </>
                
                )
            }
                
              </table>
              
            </div>
            
        </div>

        </>
    )
}