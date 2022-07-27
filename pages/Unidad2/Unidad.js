import Link from "next/link";
import { db } from "../../BD/Configuracion";
import { collection, getDocs, onSnapshot, query, orderBy } from "firebase/firestore";
import { useEffect, useState } from 'react';

export default function Unidad() {

    const [dataU, setdataU] = useState([])


    useEffect(() => {
        onSnapshot(query(collection(db, "11111", "Niveles", "Nivel_2"), orderBy("position", "asc")), (querySnapshot) => {
            const docs = []
            const prueba = []
            querySnapshot.forEach((doc) => {
                docs.push({ ...doc.data(), id: doc.id })

            })
            setdataU(docs)

        })

    }, [])
 
    return (

        <div className="section-contenido">
            <Link href="/Contenido"><button className="btn-back">
        <img className="img-back" src="/back.png" />
        </button></Link>
            <h1 className="h1-position">Unidad 2</h1>

            <div className="grid">
                {dataU.map(u =>
                    <><Link href={"/Unidad2/" + u.id}>
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