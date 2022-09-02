import Link from "next/link";

export default function Actividades() {

    return (

        <div className="section-contenido">
            <h1 className="h1-text">Actividades</h1>

            <div className="grid">
                <Link href="/ActividadesU1/Actividad">
                    <button >
                        Unidad 1
                    </button>
                </Link>
                <Link href="/ActividadesU2/Actividad">
                    <button >
                        Unidad 2
                    </button>
                </Link>
                <Link href="/ActividadesU3/Actividad">
                    <button >
                        Unidad 3
                    </button>
                </Link>
                <Link href="/ActividadesU4/Actividad">
                    <button >
                        Unidad 4
                    </button>
                </Link>
            </div>

        </div>



    )
}