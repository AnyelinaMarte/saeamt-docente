import Link from "next/link";

export default function Contenido() {

    return (

        <div className="section-contenido">
            <h1 className="h1-text">Contenido</h1>

            <div className="grid">
                <Link href="/Unidad1/Unidad">
                    <button >
                        Unidad 1
                    </button>
                </Link>
                <Link href="/Unidad2/Unidad">
                    <button >
                        Unidad 2
                    </button>
                </Link>
                <Link href="/Unidad3/Unidad">
                    <button >
                        Unidad 3
                    </button>
                </Link>
                <Link href="/Unidad4/Unidad">
                    <button >
                        Unidad 4
                    </button>
                </Link>
            </div>

        </div>



    )
}