import { auth } from "../BD/Configuracion"

export default function CerrarSeccion(props){
    const cerrar = ()=>{
        auth.signOut()
    }
    return(
        <div className="alertaA ">
        <div className="eliminar">
            <h4>Esta seguro que desea salir?</h4>
            <div>
                <button onClick={cerrar} >Cerrar Seccion</button>
                <button onClick={props.ButtonCancelar}>Cancelar</button>
            </div>
        </div>
    </div>

    )
}