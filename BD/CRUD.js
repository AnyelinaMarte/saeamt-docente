import { db } from "../BD/Configuracion";
import { addDoc, collection, deleteDoc, doc, setDoc, updateDoc } from "firebase/firestore";
import { async } from "@firebase/util";



export const add_Estudiante = async (codigoCentro, usuarioEstudiante, data) => {
    await setDoc(doc(db, codigoCentro, "Usuarios", "Estudiantes", usuarioEstudiante), data);

}
export const delete_Estudiante = async (codigoCentro, id, data) => {
    await setDoc(doc(db, codigoCentro, "Usuarios", "Estudiantes-Eliminados", id), data);
    await deleteDoc(doc(db, '11111', "Usuarios", "Estudiantes", id))

}
export const actualizar_Estudiante = async (codigoCentro, id, data) => {
    await updateDoc(doc(db, codigoCentro, "Usuarios", "Estudiantes", id), data);
}
export const actualizar_unidad = async (codigoCentro, idnivel, nombresubnivel, data) => {
    await updateDoc(doc(db, codigoCentro, "Niveles", idnivel, nombresubnivel), data);
}
export const add_completa = async(codigoCentro,idnivel,nombresubnivel,data)=>{
    await addDoc(collection(db, codigoCentro, "Niveles", idnivel, nombresubnivel, "Completa"), data);
}
export const add_completa_encabezado = async(codigoCentro,idnivel,nombresubnivel,encabezado,data)=>{
    await setDoc(doc(db, codigoCentro, "Niveles", idnivel, nombresubnivel, "Completa", encabezado), data);
}
export const add_VyF_encabezado = async(codigoCentro,idnivel,nombresubnivel,encabezado,data)=>{
    await setDoc(doc(db, codigoCentro, "Niveles", idnivel, nombresubnivel, "VyF", encabezado), data);
}
export const add_VyF = async(codigoCentro,idnivel,nombresubnivel,data)=>{
    await addDoc(collection(db, codigoCentro, "Niveles", idnivel, nombresubnivel, "VyF"), data);
}
export const add_Seleccionm_encabezado= async(codigoCentro,idnivel,nombresubnivel,encabezado,data)=>{
    await setDoc(doc(db, codigoCentro, "Niveles", idnivel, nombresubnivel, "Seleccionm", encabezado), data);
}
export const add_Seleccionm = async(codigoCentro,idnivel,nombresubnivel,data)=>{
    await addDoc(collection(db, codigoCentro, "Niveles", idnivel, nombresubnivel, "Seleccionm"), data);
}
export const add_razona= async(codigoCentro,idnivel,nombresubnivel,data)=>{
    await addDoc(collection(db, codigoCentro, "Niveles", idnivel, nombresubnivel, "Razona"), data);
}
export const add_razona_encabezado = async(codigoCentro,idnivel,nombresubnivel,encabezado,data)=>{
    await setDoc(doc(db, codigoCentro, "Niveles", idnivel, nombresubnivel, "Razona", encabezado), data);
}