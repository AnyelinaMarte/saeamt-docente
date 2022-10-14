import { doc, getDoc } from "firebase/firestore"
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { db } from "../../BD/Configuracion";


export default  function Ejemplo(props){
const [data,setData] = useState([])
const [contar,setContar] = useState(0)

const getData = async()=>{
    const docRef = doc(db, "11111", "Niveles",props.nivel,props.id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      setData(docSnap.data().Presentacion)
      console.log(data[0])
    } else { 
      
      console.log("No such document!");
    }
}
useEffect (()=>{
    getData()
},[])
 const handleClick = ()=>{
    if (contar < data.length -1){
    setContar(contar+1)
}else{
    setContar(0)
}
 }
 const handleClick2 = ()=>{
    if (contar == 0){
        setContar(data.length -1)
    }else{
        setContar(contar-1)
    }

 }


    return(
        
        <div>
        {data==[]?<h1>Cargando</h1>
        :<div>
           
            <div>
            <div className="ejemplo">
            <button className="btn-back" onClick={props.ButtonAtras} >
                    <img className="img-back" src="/back.png" />
                </button>
                <img className="img-ejemplo" src={data[contar]}/>
                <div className="slider">
                <button onClick={handleClick2} >←</button>
            <button onClick={handleClick} >→</button>
                </div>
            </div>
            </div>
        </div>
    
    }
        </div>

    )
}