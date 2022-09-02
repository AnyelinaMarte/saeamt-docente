import Link from "next/link";
import { useRouter } from 'next/router';
import { useState } from 'react';
import Completa from "../../Componentes/Completa";
import Razona from "../../Componentes/Razona";
import Seleccionmultiple from "../../Componentes/Seleccionmultiple";
import VyF from "../../Componentes/VyF";
export default function indexActividad1() {
    const router = useRouter()


    const [posicionActual, setPosicion] = useState("principal")
    return (
        <div> 

            {posicionActual == "principal" ?
                <>
                    <div className="section-contenido">
                        <Link href="/ActividadesU4/Actividad"><button className="btn-back">
                            <img className="img-back" src="/back.png" />
                        </button></Link>
                        <h1 className="h1-position">{"Actividades de la Unidad 4" + "-" + router.query.id}</h1>

                        <div className="grid">

                            <a className="a-registro" >Ejemplo</a>


                            <a className="a-registro" onClick={() => setPosicion("completa")}>Completa</a>

                            <a className="a-registro" onClick={() => setPosicion("seleccionmultiple")}>Seleccion Multiple</a>
                            <a className="a-registro" onClick={() => setPosicion("VyF")}>Verdadero y Falso</a>

                            <a className="a-registro" onClick={() => setPosicion("razona")}>Razona</a>

                            <Link href="#">
                                <button >
                                    Aparea
                                </button>
                            </Link>
                        </div>

                    </div>
                </> : posicionActual == "completa" ?
                    <Completa nivel={"Nivel_4"} id={router.query.id} ButtonAtras={() => setPosicion("principal")} />
                    : posicionActual == "VyF" ?
                        <VyF nivel={"Nivel_4"} id={router.query.id} ButtonAtras={() => setPosicion("principal")} />
                        :posicionActual == "seleccionmultiple" ? 
                        <Seleccionmultiple nivel={"Nivel_4"} id={router.query.id} ButtonAtras={() => setPosicion("principal")}/>
                        :posicionActual == "razona"?
                        <Razona nivel={"Nivel_4"} id={router.query.id} ButtonAtras={() => setPosicion("principal")}/>
                        :<h1>hey</h1>
            }
        </div>

    )
}