import { Chart } from "chart.js"
import { collection, doc, getDoc, getDocs, query } from "firebase/firestore"
import { useEffect, useState } from "react"
import { db } from "../BD/Configuracion"
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Bar } from 'react-chartjs-2';
  

export default function ProgresoNivel(props){
    const valor = props.valor
    const [dataProgreso, setDataProgreso] = useState([])
    const [ObjetivosProgreso1, setObjetivosProgreso1] = useState([])
    const [ObjetivosProgreso2, setObjetivosProgreso2] = useState([])
    const [ObjetivosProgreso3, setObjetivosProgreso3] = useState([])
    const [ObjetivosProgreso4, setObjetivosProgreso4] = useState([])
    const [ObjetivosProgreso5, setObjetivosProgreso5] = useState([])
    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
      );
      

  const GeneralLabels = (Objetivo)=>{
    const datoss =[]
    const contador =0
    Objetivo.forEach(docus=>{
        datoss.push(contador)
        contador = 1 + contador
    })
    return datoss
  }
  const GeneralLabelsPreguntar = (Objetivo)=>{
    const contador =0
    const datoss =[]
    Objetivo.forEach(docus=>{
        datoss.push({...docus.dataSeparada.pregunta,pregunta:docus.dataSeparada.pregunta, contar:contador})
        contador = 1 + contador

    })
    return datoss
  }
  const GeneralData= (Objetivo)=>{
    const datoss =[]
    Objetivo.forEach(docus=>{
        datoss.push(docus.dataSeparada.numeroDeVecesIncorrectas)
    })
    return datoss
  }
  const GeneralData1= (Objetivo)=>{
    const datoss =[]
    Objetivo.forEach(docus=>{
        datoss.push(docus.dataSeparada.intentoCorrecta)
    })
    return datoss
  }

    const sacarPromedio = (Objetivos)=>{
        let intentoCorrecta = 0
        let numeroDeVecesIncorrectas = 0
        Objetivos.map(docu=>{
            intentoCorrecta = intentoCorrecta +docu.dataSeparada.intentoCorrecta
            numeroDeVecesIncorrectas = numeroDeVecesIncorrectas + docu.dataSeparada.numeroDeVecesIncorrectas

        })
        const division = 100 - ((numeroDeVecesIncorrectas / intentoCorrecta) * 100) 
        const numeroRedondeado = Math.round(division)
        return numeroRedondeado
    }
    const getData = async(subTema)=>{
        const datosProgreso = []
        const docRefProgeso = doc(db, "11111", "Usuarios", "Estudiantes", props.email, "Progeso-Estudiante", subTema)
        const docSnapProgreso = await getDoc(docRefProgeso);
        if (docSnapProgreso.exists()) {
            for (var i = 0; i < docSnapProgreso.data().tamanoPregunta ; i++) {
                datosProgreso.push({...docSnapProgreso.data()[i]})
              }
        }
        const docRef = doc(db, "11111", "Niveles", valor.nivelles, subTema)
        const docSnap = await getDoc(docRef);

        const Objetivos1 = []
        const Objetivos2 = []
        const Objetivos3 = []
        const Objetivos4 = []
        const Objetivos5 = []
        
        if (docSnap.exists()) {
                datosProgreso.forEach(data=>{
                    if(data.idobjetivo === 0){
                        Objetivos1.push({...data.idobjetivo, NombreObjetivo:docSnap.data().Objetivos[data.idobjetivo].Objetivos, dataSeparada:data})
                    }
                    if(data.idobjetivo === 1){
                        Objetivos2.push({...data.idobjetivo, NombreObjetivo:docSnap.data().Objetivos[data.idobjetivo].Objetivos, dataSeparada:data})
                    }
                    if(data.idobjetivo === 2){
                        Objetivos3.push({...data.idobjetivo, NombreObjetivo:docSnap.data().Objetivos[data.idobjetivo].Objetivos, dataSeparada:data})
                    }
                    if(data.idobjetivo === 3){
                        Objetivos4.push({...data.idobjetivo, NombreObjetivo:docSnap.data().Objetivos[data.idobjetivo].Objetivos, dataSeparada:data})
                    }
                    if(data.idobjetivo === 4){
                        Objetivos5.push({...data.idobjetivo, NombreObjetivo:docSnap.data().Objetivos[data.idobjetivo].Objetivos, dataSeparada:data})
                    }
            })
        } 
        
        setObjetivosProgreso1(Objetivos1)
        setObjetivosProgreso2(Objetivos2)
        setObjetivosProgreso3(Objetivos3)
        setObjetivosProgreso4(Objetivos4)
        setObjetivosProgreso5(Objetivos5)

    }
    
    const AnalizarInformacion =()=>{
        var selectBox = document.getElementById("selectBox");
         var subTema = selectBox.options[selectBox.selectedIndex].value;
        getData(subTema)

    }
    
     const dataBar = (ObjetivosProgres, nombre1, nombre2)=>{
        const data = {
            labels: GeneralLabels(ObjetivosProgres),
            datasets: [
                {
                label: nombre1,
                data: GeneralData1(ObjetivosProgres),
                // borderColor: Utils.CHART_COLORS.red,
                backgroundColor: "#006aff",
                borderWidth: 2,
                borderRadius: 5,
                borderSkipped: false,
                },
                {
                label: nombre2,
                data: GeneralData(ObjetivosProgres),
                // borderColor: Utils.CHART_COLORS.blue,
                backgroundColor: "#ff00b3",
                borderWidth: 2,
                borderRadius: 5,
                 borderSkipped: false,
                }
            ]
      };
      return data
     }
  
    return(
        <div className="progresoNivel">
            <h4>{valor.nombreNivel}</h4>
            <hr></hr>
            {valor.nombreNivel == "Numeracion"?
                <select id="selectBox" onChange={AnalizarInformacion }>
                    <option  value="Sas">Seleccionar SubTema</option>
                    <option  value="Secuencias">Secuencias</option>
                    <option value="ValorPosicion">Valor Posicion</option>
                    <option value="Numeros_pares_impares">Numeros pares impares</option>
                    <option value="SignosComparacion">Signos Comparacion</option>
                    <option value="NumerosOrdinales">Numeros Ordinales</option>
                    <option value="Adicion">Adicion</option>
                    <option value="Sustraccion">Sustraccion</option>
                    <option value="Multiplicacion">Multiplicacion</option>
                    <option value="Division">Division</option>
                </select>
                :valor.nombreNivel == "Geometria"?
                <select id="selectBox" onChange={AnalizarInformacion }>
                    <option  value="Seas">Seleccionar SubTema</option>
                    <option  value="Poligonos">Poligonos</option>
                    <option value="Congruencia">Congruencia</option>
                    <option value="Angulos">Angulos</option>
                    <option value="Simetria">Simetria</option>
                    <option value="CuerposGeometricos">Cuerpos Geometricos</option>
                </select>
                :valor.nombreNivel == "Medicion"?
                <select id="selectBox" onChange={AnalizarInformacion }>
                    <option  value="Secuencidas">Seleccionar SubTema</option>
                    <option  value="Longitud">Longitud</option>
                    <option value="Perimetro">Perimetro</option>
                </select>
                :valor.nombreNivel == "Estadistica Elemental"?
                <select id="selectBox" onChange={AnalizarInformacion }>
                    <option  value="Secuencdias">Seleccionar SubTema</option>
                    <option  value="DatosEstadisticos">Datos Estadisticos</option>
                </select>
            :<span></span>}
            <div className="progresoObjetivos">
                {
                    ObjetivosProgreso1.length != 0?
                        <>
                            <p>Objetivo 1: {ObjetivosProgreso1[0].NombreObjetivo} Con un Promedio de <span>{sacarPromedio(ObjetivosProgreso1)} %</span></p>
                            <Bar  data={dataBar(ObjetivosProgreso1, "Numero de veces Correcta", "Numero de veces Incorrecta")} />
                            <h2>Leyenda del objetivo 1</h2>
                            {GeneralLabelsPreguntar(ObjetivosProgreso1).map(e=>
                                <div className="contador-progreso">
                                    <div>{e.contar}</div>
                                    <div>{e.pregunta}</div>
                                </div>
                            )}
                        </>
                    :<span></span>
                }
                 { 
                    ObjetivosProgreso2.length != 0?
                        <div className="Separador">
                            <p>Objetivo 2: {ObjetivosProgreso2[0].NombreObjetivo} Con un Promedio de <span>{sacarPromedio(ObjetivosProgreso2)} %</span></p>
                            <Bar  data={dataBar(ObjetivosProgreso2, "Numero de veces Correcta", "Numero de veces Incorrecta")} />
                            <h2>Leyenda del objetivo 2</h2>
                            {GeneralLabelsPreguntar(ObjetivosProgreso2).map(e=>
                                <div className="contador-progreso">
                                    <div>{e.contar}</div>
                                    <div>{e.pregunta}</div>
                                </div>
                            )}
                        </div>
                    :<span></span>
                }
                 {
                    ObjetivosProgreso3.length != 0?
                        <>
                            <p>Objetivo 1: {ObjetivosProgreso3[0].NombreObjetivo} Con un Promedio de <span>{sacarPromedio(ObjetivosProgreso3)} %</span></p>
                            <Bar  data={dataBar(ObjetivosProgreso3, "Numero de veces Correcta", "Numero de veces Incorrecta")} />
                            <h2>Leyenda del objetivo 3</h2>
                            {GeneralLabelsPreguntar(ObjetivosProgreso3).map(e=>
                                <div className="contador-progreso">
                                    <div>{e.contar}</div>
                                    <div>{e.pregunta}</div>
                                </div>
                            )}
                        </>
                    :<span></span>
                }
                 { 
                    ObjetivosProgreso4.length != 0?
                        <div className="Separador">
                            <p>Objetivo 2: {ObjetivosProgreso4[0].NombreObjetivo} Con un Promedio de <span>{sacarPromedio(ObjetivosProgreso4)} %</span></p>
                            <Bar  data={dataBar(ObjetivosProgreso4, "Numero de veces Correcta", "Numero de veces Incorrecta")} />
                            <h2>Leyenda del objetivo 4</h2>
                            {GeneralLabelsPreguntar(ObjetivosProgreso4).map(e=>
                                <div className="contador-progreso">
                                    <div>{e.contar}</div>
                                    <div>{e.pregunta}</div>
                                </div>
                            )}
                        </div>
                    :<span></span>
                }
                { 
                    ObjetivosProgreso5.length != 0?
                        <div className="Separador">
                            <p>Objetivo 2: {ObjetivosProgreso5[0].NombreObjetivo} Con un Promedio de <span>{sacarPromedio(ObjetivosProgreso5)} %</span></p>
                            <Bar  data={dataBar(ObjetivosProgreso5, "Numero de veces Correcta", "Numero de veces Incorrecta")} />
                            <h2>Leyenda del objetivo 5</h2>
                            {GeneralLabelsPreguntar(ObjetivosProgreso5).map(e=>
                                <div className="contador-progreso">
                                    <div>{e.contar}</div>
                                    <div>{e.pregunta}</div>
                                </div>
                            )}
                        </div>
                    :<span></span>
                }
            </div>
            
        </div>
    )
}