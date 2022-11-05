import { collection, doc, getDoc, getDocs, onSnapshot, query } from "firebase/firestore"
import { useEffect, useState } from "react"
import { auth, db } from "../Configuracion"

export default function Progeso({correo}){
    const [data, setData] = useState({nombre_Estudiante:"", apellido_Estudiante:"", posicionActual:""})
    const [calificaciones, setCalificaciones] = useState([])
    const [nivelCalificaciones, setNivelCalificaciones] = useState([])
    const [nivel2Calificaciones, setNivel2Calificaciones] = useState([])
    const [nivel3Calificaciones, setNivel3Calificaciones] = useState([])
    const [nivel4Calificaciones, setNivel4Calificaciones] = useState([])
    
    const getData = (email)=>{
            auth.onAuthStateChanged(async user=>{
                if(user != null){
                    const docRef = doc(db, "11111", "Usuarios","Estudiantes",email)
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {
                        setData(docSnap.data())
                        console.log(docSnap.data())
                      } else {
                        console.log("No such document!");
                      }
                  };
              })
              auth.onAuthStateChanged(async user =>{
                const datos = []
                const nivel1 = [];
                const nivel2 = [];
                const nivel3 = [];
                const nivel4 = [];
                if(user != null){
                   // const docRef= doc(db, "11111", "Usuarios", "Estudiantes", email, "Progeso-Estudiante","Secuencias")
                    const q = query(collection(db,  "11111", "Usuarios", "Estudiantes", email, "Progeso-Estudiante"))
                    const querySnapshot = await getDocs(q);
                        querySnapshot.forEach((doc) => {
                        // doc.data() is never undefined for query doc snapshots
                        datos.push({id:doc.id})
                    }); 
                    const data =[] 
                    datos.map(async docus=>{
                        const docRef= doc(db, "11111", "Usuarios", "Estudiantes", email, "Progeso-Estudiante",docus.id )
                        const docSnap = await getDoc(docRef);
                        if (docSnap.exists()) {
                            for (var i = 0; i < 1; i++) {
                                data.push({...docSnap.data()[i]})
                            }
                        } else {
                            data.push("No such document!")
                        }
                        let intentoCorrecta = 0
                        let numeroDeVecesIncorrectas = 0
                        data.map(docu=>{
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
                        if(docus.id == "DatosEstadisticos"  ){
                            nivel4.push({...numeroRedondeado, id:docus.id, calificacion:numeroRedondeado})
                        }
                    })
                    setNivelCalificaciones(nivel1) 
                    setNivel2Calificaciones(nivel2) 
                    setNivel3Calificaciones(nivel3) 
                    setNivel4Calificaciones(nivel4) 
        
        
                }
            })
    }
    
   
    getData(correo)
    const progresoTodos = [
        Math.round((data.posicionActual.nivel1  * 100) /10),
        Math.round((data.posicionActual.nivel2  * 100) /6),
        Math.round((data.posicionActual.nivel3  * 100) /3),
        Math.round((data.posicionActual.nivel4  * 100) /2)
    ]
    return progresoTodos
}