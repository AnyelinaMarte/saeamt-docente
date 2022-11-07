import { collection, getDocs, query, doc, getDoc} from "firebase/firestore";
import { db } from "../Configuracion";

export const  ProgresoCalculado = async (correo)=>{
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
      const q =  query(collection(db,  "11111", "Usuarios", "Estudiantes", correo, "Progeso-Estudiante"))
      const querySnapshot = getDocs(q);
          querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          datosProgreso.push({id:doc.id})
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
          const division = 100 - ((numeroDeVecesIncorrectas / intentoCorrecta) * 100) 
          const numeroRedondeado = Math.round(division)
            if(docus.id == "Secuencias" || docus.id == "Adicion" || docus.id == "Division" || docus.id == "Multiplicacion" || docus.id == "NumerosOrdinales" || docus.id == "Numeros_pares_impares" || docus.id == "SignosComparacion" || docus.id == "Sustraccion" || docus.id == "ValorPosicion"){
                nivel1.push({...numeroRedondeado, id:docus.id, calificacion:numeroRedondeado})
            }
            if(docus.id == "Angulos" || docus.id == "Congruencia" || docus.id == "CuerposGeometricos" || docus.id == "Poligonos" || docus.id == "Simetria" ){
                nivel2.push({...numeroRedondeado, id:docus.id, calificacion:numeroRedondeado})
            }
            if(docus.id == "Longitud" || docus.id == "Perimetro" ){
                nivel3.push({...numeroRedondeado, id:docus.id, calificacion:numeroRedondeado})
            }
            if(docus.id == "datosProgresoEstadisticos"  ){
                nivel4.push({...numeroRedondeado, id:docus.id, calificacion:numeroRedondeado})
            }
          })
          return Math.round(((nivel1.length + nivel2.length + nivel3.length + nivel4.length) * 100 ) / 17)

}