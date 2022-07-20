import Link from "next/link";

export default function Contenido(){

    return(
       
        <div className="section-contenido">
                <h1>Contenido</h1>

            <div className="grid">
               <Link href="/Unidad1/Unidad">
                <button >
                    Unidad 1
                </button>
                </Link>
                <button>
                    Unidad 2
                </button>
                <button>
                    Unidad 3
                </button>
                <button>
                    Unidad 4
                </button>
            </div>
            
        </div>

    

    )
}