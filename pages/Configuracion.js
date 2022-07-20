export default function Configuracion(){


    return(
        
        <section className="section-configuracion">
            <form >
            <label > Nombre:<input  type="text" name="nombre" id="nombre_Docente" /></label>
                            <label > Apellido: <input  type="text" name="apellido" id="apellido_Docente" /> </label>
                            <label > Id Escuela: <input  type="text" name="idescuela" size="5" maxLength="5" id="idescuela_Docente" /></label>
                            <label > Telefono:  <input type="text" name="telefono" size="10" maxLength="10" id="telefono_Docente" /></label>
                            <label > Centro Educativo:
                                <select  name="centro_educativo" id="centroEdu_Docente">
                                    <option value="Luis Eduardo Ortiz Delgado" selected>Luis Eduardo Ortiz Delgado </option>
                                </select>
                            </label>
                            <label > Correo Electronico: <input type="email" name="apellido" id="correo_Docente" /></label>
                            <label > Clave: <input type="password" id="clave_Docente" /></label>

                            <button  >Actualizar datos</button>

                            
            </form>
        </section>
    )
   
}