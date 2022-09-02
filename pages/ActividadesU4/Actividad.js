import Link from "next/link";
import { db } from "../../BD/Configuracion";
import { collection, onSnapshot, query, orderBy,where } from "firebase/firestore";
import { useEffect, useState } from 'react';

export default function Actividad() {

    const [dataU, setdataU] = useState([])


    useEffect(() => {
        onSnapshot(query(collection(db, "11111", "Niveles", "Nivel_4"), where("position", ">", 1), orderBy("position", "asc")), (querySnapshot) => {
            const docs = []
            
            querySnapshot.forEach((doc) => {
                docs.push({ ...doc.data(), id: doc.id })

            })
            setdataU(docs)

        })

    }, [])

    return (

        <div className="section-contenido">
            <Link href="/Actividades"><button className="btn-back">
        <img className="img-back" src="/back.png" />
        </button></Link>
            <h1 className="h1-position">Actividades de la Unidad 4</h1>

            <div className="grid">
                {dataU.map(u =>
                    <><Link href={"/ActividadesU4/" + u.id}>
                        <button >
                            <small className="small">{u.position-1}</small>
                            {u.ID}
                        </button>
                    </Link>

                    </>


                )}
            </div>

        </div>


    )
}