import { useEffect, useState } from "react"
import { collection, getDocs, query, doc, getDoc} from "firebase/firestore";
import { db } from "../Configuracion";
import ProgresoNivel from "../Components/ProgresoNivel";
export default function Home() {
  const [id, setId] = useState([])
  const [data, setData] = useState([])
  const [buscar, setbuscar]= useState([])
  const [estudianteSeleccionado, setEstudianteSeleccionado] = useState({})
  const [nivelCalificaciones, setNivelCalificaciones] = useState([])
  const [nivel2Calificaciones, setNivel2Calificaciones] = useState([])
  const [nivel3Calificaciones, setNivel3Calificaciones] = useState([])
  const [nivel4Calificaciones, setNivel4Calificaciones] = useState([])
  const [activeProgreso, setProgreso] = useState(false)
  const [porcentajes, setPorcentaje] =useState(0)
  const [email, setEmail] =useState("")
  const [progress, setprogress] = useState(0)
  const [Nivel1estado, setNivel1estado]=useState(0)
  const [Nivel2estado, setNivel2estado]=useState(0)
  const [Nivel3estado, setNivel3estado]=useState(0)
  const [Nivel4estado, setNivel4estado]=useState(0)



  useEffect(()=>{
    const idData = []
    getDocs(query(collection(db, "11111","Usuarios", "Estudiantes")) )
    .then(docu =>{
      docu.forEach((doc) => {
        idData.push({...doc.data(), id:doc.id})
      });
      setId(idData)
    })
  },[])
  const getData=async (correo)=>{
    const Data = []
    getDocs(query(collection(db, "11111","Usuarios", "Estudiantes",correo, "Progeso-Estudiante" )) )
    .then(docu =>{
      docu.forEach((doc) => {
        Data.push({...doc.data(), id:doc.id})
      });
      setData(Data)
    })
    const datosProgreso = []
    const nivel1 = [];
    const nivel2 = [];
    const nivel3 = [];
    const nivel4 = [];
    let contador = 0

      // const docRef= doc(db, "11111", "Usuarios", "Estudiantes", correo, "Progeso-Estudiante","Secuencias")
      const q = query(collection(db,  "11111", "Usuarios", "Estudiantes", correo, "Progeso-Estudiante"))
      const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          datosProgreso.push({id:doc.id})
          setprogress(datosProgreso.length)

      }); 
      
      const dataProgresoEstudiante =[] 
      datosProgreso.forEach(async docus=>{

          const docRef= doc(db, "11111", "Usuarios", "Estudiantes", correo, "Progeso-Estudiante",docus.id )
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
              for (var i = 0; i < 1; i++) {
                dataProgresoEstudiante.push({...docSnap.data()[i]})
                  
              }
          } else {
            dataProgresoEstudiante.push("No such document!")
          }
          let intentoCorrecta = 0
          let numeroDeVecesIncorrectas = 0
          dataProgresoEstudiante.map(docu=>{
              intentoCorrecta = intentoCorrecta +docu.intentoCorrecta
              numeroDeVecesIncorrectas = numeroDeVecesIncorrectas + docu.numeroDeVecesIncorrectas
          })
          console.log(dataProgresoEstudiante)
          const division = 100 - ((numeroDeVecesIncorrectas / intentoCorrecta) * 100) 
          const numeroRedondeado = Math.round(division)
            if(docus.id == "Secuencias" || docus.id == "Adicion" || docus.id == "Division" || docus.id == "Multiplicacion" || docus.id == "NumerosOrdinales" || docus.id == "Numeros_pares_impares" || docus.id == "SignosComparacion" || docus.id == "Sustraccion" || docus.id == "ValorPosicion"){
                nivel1.push({...numeroRedondeado, id:docus.id, calificacion:numeroRedondeado})
                setNivel1estado(nivel1.length)
            }
            if(docus.id == "Angulos" || docus.id == "Congruencia" || docus.id == "CuerposGeometricos" || docus.id == "Poligonos" || docus.id == "Simetria" ){
                nivel2.push({...numeroRedondeado, id:docus.id, calificacion:numeroRedondeado})
                setNivel2estado(nivel2.length)

            }
            if(docus.id == "Longitud" || docus.id == "Perimetro" ){
                nivel3.push({...numeroRedondeado, id:docus.id, calificacion:numeroRedondeado})
                setNivel3estado(nivel3.length)

            }
            if(docus.id == "datosProgresoEstadisticos"  ){
                nivel4.push({...numeroRedondeado, id:docus.id, calificacion:numeroRedondeado})
                setNivel4estado(nivel4.length)

            }
          })
      setNivelCalificaciones(nivel1) 
      setNivel2Calificaciones(nivel2) 
      setNivel3Calificaciones(nivel3) 
      setNivel4Calificaciones(nivel4) 
      const porcentaje =( ((nivel1.length + nivel2.length + nivel3.length + nivel4.length) * 100 ) / 17)
     

  }
  
  const handleChange =(e)=>{
    const {name, value}= e.target
    var text = value
      const newData = id.filter(function(item){
          const itemDataTitle = item.correo_Estudiante.toUpperCase()
          const itemDataDescp = item.nombre_Estudiante.toUpperCase()
          const itemDataApellido = item.apellido_Estudiante.toUpperCase()
          const campo = itemDataTitle+" "+itemDataDescp+" "+itemDataApellido
          const textData = text.toUpperCase()
          return campo.indexOf(textData) > -1
      })
      setbuscar(newData)

  } 
  const seleccionarEstudiante = (correo, datos)=>{
    getData(correo)
    setEmail(correo)
    setEstudianteSeleccionado(datos)
    
  }
  const [valorNivel, setValorNivel] = useState({})
  const seleccionNivel = (nombreNivel,progresoNiveles,  data, nivelActual)=>{
    setValorNivel({nombreNivel,ProgresoNivel:progresoNiveles, datos:data, nivelles:nivelActual})
    
  }
 
  useEffect(()=>{
    setProgreso(true)
  },[])
  

  return (
    <main className="estadistica">
      
      <div className="BuscadorEstudiantes">
        <input onChange={handleChange}  name="buscador" type="text" placeholder="Buscar Estudiantes"/>
      </div>
      <table>
          <tr>
              <th>
                  Nombre
              </th>
              <th>
                  Apellido
              </th>
              <th>
                  Genero
              </th>
              <th>
                  Fecha de Nacimiento
              </th>   
              <th>
                  Correo
              </th>
              
          </tr>
        {
        buscar.map(n=>
            <tr key={n.correo_Estudiante} onClick={()=>seleccionarEstudiante(n.correo_Estudiante, n)}>
              <td>
                {n.nombre_Estudiante}
              </td>
              <td>
                {n.apellido_Estudiante}
              </td>
              <td>
                {n.genero_Estudiante}
              </td>
              <td>
                {n.fechan_Estudiante}
              </td>
              <td>
                {n.correo_Estudiante}
              </td>
            </tr>         
          )
      }</table>
      <div className="progreso-estadistica">
        {data.length != 0 ?
          <>
          <h3>Progreso de {estudianteSeleccionado.nombre_Estudiante} {estudianteSeleccionado.apellido_Estudiante}</h3>
              <div>
                {
                  activeProgreso != true?<span></span>
                  :<>
                    <style>{`
                      .progress-bar::before{
                        width:${Math.round( ((progress ) * 100 ) / 17)}%;
                      }
                        
                    `}</style>
                  <span>{Math.round( ((progress) * 100 ) / 17)}% de 100%</span>
                  <div className="progress-bar"></div>
                  </>
                }
                    
                </div>
            <div className="estadistica-niveles">
              <hr></hr>
              <h4>Seleccionar Nivel</h4>

              <div>
                <div><button onClick={()=>seleccionNivel("Numeracion", nivelCalificaciones, data, "Nivel_1") }>Numeración  {Nivel1estado}/9<br></br></button></div>
                <div><button onClick={()=>seleccionNivel("Geometria", nivel2Calificaciones, data, "Nivel_2") }>Geometría {nivel2Calificaciones.length}/5</button></div>
                <div><button onClick={()=>seleccionNivel("Medicion", nivel3Calificaciones, data, "Nivel_3") }>Medición {nivel3Calificaciones.length}/2</button></div>
                <div><button onClick={()=>seleccionNivel("Estadistica Elemental", nivel4Calificaciones, data, "Nivel_4") }>Estadística Elemental {nivel4Calificaciones.length}/1</button></div>
              
              </div>

            </div>
          </>
          :email === "" ? <span></span>
          :<div className="realizado-no">
            <h2>Este estudiante aún no ha realizado práctica</h2>
          </div>
        
        }
      </div>
      <div>
        <ProgresoNivel valor={valorNivel}  email={email}/>
      </div>
    </main>
  )
}
