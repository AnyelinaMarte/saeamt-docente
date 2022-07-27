import Link from "next/link";
import { db } from "../../../BD/Configuracion";
import {  doc, updateDoc, onSnapshot, query, } from "firebase/firestore";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { actualizar_unidad } from '../../../BD/CRUD'
import { async } from "@firebase/util";
export default function indexUnidad() {

    const router = useRouter()
    const [dataU, setdataU] = useState([])
    const [dataO, setdataO] = useState([])


    const datos_Inicial = {
        Definicion: '',

    }
    const dato_Inicial = {
        Video: '',
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
        onSnapshot(query(doc(db, "11111", "Niveles", "Nivel_2", router.query.id)), (querySnapshot) => {

            setdataU(querySnapshot.data())
            setdataO(querySnapshot.data().Objetivos)


        })

    }, [])

    const handleSubmit1 = (e) => {
        e.preventDefault()
        if (data1.Definicion != '') {
            actualizar_unidad("11111", "Nivel_2", router.query.id, data1);
            setData1(datos_Inicial)

        } else {
            console.log("No se admiten campos vacios")
        }

    }
    const handleSubmit2 = (e) => {
        e.preventDefault()
        if (data2.Video != '') {
            actualizar_unidad("11111", "Nivel_2", router.query.id, data2);
            setData2(dato_Inicial)

        } else {
            console.log("No se admiten campos vacios")
        }

    }
    const agregarObjetivos = async (e) => {
        e.preventDefault();
        const objetivoEstraido = dataO;
        const AgregarObjetivos = document.getElementById("objetivo").value
        const referencia = doc(db, "11111", "Niveles", "Nivel_2", router.query.id);
        objetivoEstraido.push({ Objetivos: AgregarObjetivos })
        await updateDoc(referencia, {
            Objetivos: objetivoEstraido

        })

    }
    const borrarObjetivos = async (objetivo) => {
        const arrayDatos = dataO;
        const indice = dataO.findIndex((elemento, indice) => {
            if (elemento.Objetivos === objetivo) {
                return indice + 1;
            }
        });
        arrayDatos.splice(indice, 1)
        console.log(arrayDatos);
        const referencia = doc(db, "11111", "Niveles", "Nivel_2", router.query.id);
        await updateDoc(referencia, {
            Objetivos: arrayDatos
        })

    }
 
    var num = 0
    return (
        <>
            <div className="section-contenido">
                <Link href="/Unidad2/Unidad"><button className="btn-back">
        <img className="img-back" src="/back.png" />
        </button></Link>
                <h1 className="h1-position">{dataU.ID}</h1>
                    <hr className="hr-d"></hr>
                <div className="columnas">

                    <form className="frm-letras">
                        <div>
                            <label className="label-frm">Definición de {dataU.ID}</label>
                        </div>
                        <div>
                            <textarea value={dataU.Definicion}></textarea >
                            <textarea placeholder="Escribe aquí para actualizar el contenido de la izquierda." onChange={handleChange} type="text" name="Definicion" id="Definicion" value={data1.Definicion}></textarea>
                        </div>
                        <div>
                            <button className="btn-form btn" onClick={handleSubmit1}> Guardar Cambios</button>
                        </div>
                        <hr className="hr-de"></hr>
                        <div>
                            <label className="label-frm">Video sobre {dataU.ID}</label>
                        </div>
                        <div>
                        <div  >
                            <textarea id="textarea-video" value={dataU.Video}></textarea >
                            <textarea placeholder="Escribe aquí para actualizar el contenido de la izquierda." onChange={handleChange2} type="text" name="Video" id="Video" value={data2.Video}></textarea>
                        </div>
                        <button className="btn-video">  <img className="img-back" src="/ver.png" /></button>
                        </div>
                        <div>
                            <button className="btn-form btn" onClick={handleSubmit2}> Guardar Cambios</button>
                        </div>
                        <hr className="hr-de"></hr>
                    </form>
                   
                  
                        <form className="frm-letras">
                            <label className="label-frm">Objetivos a cumplir en el tema {dataU.ID}</label>
                            <br></br>
                            <label id="label">Descripcion</label>
                            <input id="objetivo" />
                            <button className="btn-add" onClick={agregarObjetivos}> <img className="img-back" src="/add.png" /></button>
                        </form>
                    </div>
                    <table className="table-o">
                        <tr>
                            <th>
                                N.°
                            </th>
                            <th>
                                Objetivos
                            </th>

                            <th>
                                Eliminar
                            </th>
                        </tr>
                        {dataO.map(n =>
                            <>
                                <tr>
                                    <td>
                                        {num += 1}
                                    </td>
                                    <td>
                                        {n.Objetivos}
                                    </td>

                                    <td>
                                        <button className="btn-delete" onClick={() => borrarObjetivos(n.Objetivos)} > <img className="img-back" src="/delete.png" /></button>
                                    </td>
                                </tr>

                            </>

                        )
                        }

                    </table>

              

            </div>

        </>
    )
}