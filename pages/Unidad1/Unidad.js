import Link from "next/link";
import { db } from "../../BD/Configuracion";
import { collection, getDocs, onSnapshot, query, orderBy } from "firebase/firestore";
import { useEffect, useState } from 'react';

export default function Unidad(){
   
    const [dataU, setdataU] = useState([])


    useEffect(() => {
        onSnapshot(query(collection(db, "11111", "Niveles","Nivel_1"),orderBy("position","asc")), (querySnapshot) => {
            const docs = []
            const prueba = []
            querySnapshot.forEach((doc) => {
                docs.push({ ...doc.data(), id: doc.id })
                
            })
            setdataU(docs)
           
        })

    }, [])
   
    return(
       
        <div className="section-contenido">
            <Link href="/Contenido"><button>Atras</button></Link>
                <h1>Unidad 1</h1>

            <div className="grid">
             {dataU.map(u=>
              <><Link href={"/Unidad1/"+u.id}>
                 <button > 
                <small className="small">{u.position}</small>
                   {u.ID}
                </button>
                </Link>
              
              </>  
                
                
                )}
            </div>
            
        </div>


    )
}