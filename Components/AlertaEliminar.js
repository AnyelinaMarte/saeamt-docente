export default function AlertaEliminar(props){
    return(
        <div className="alertaA ">
            <div className="eliminar">
                <h4>Esta seguro que lo desea eliminar?</h4>
                <p>Los siguientes datos se borraran de manera permanente</p>
                <div>
                    <button onClick={props.buttonEliminar} >Eliminar</button>
                    <button onClick={props.ButtonCancelar}>Cancelar</button>
                </div>
            </div>
        </div>

    )
} 