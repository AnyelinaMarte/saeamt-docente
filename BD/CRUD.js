import { db } from "../BD/Configuracion";
import { deleteDoc, doc, setDoc, updateDoc } from "firebase/firestore";



export const add_Estudiante = async (codigoCentro, usuarioEstudiante, data) => {
    await setDoc(doc(db, codigoCentro, "Usuarios", "Estudiantes", usuarioEstudiante), data);

}
export const delete_Estudiante = async (codigoCentro, id, data) => {
    await setDoc(doc(db, codigoCentro, "Usuarios", "Estudiantes-Eliminados", id), data);
    await deleteDoc(doc(db, '11111', "Usuarios", "Estudiantes", id))

}
export const actualizar_Estudiante = async (codigoCentro, id, data) => {
    await updateDoc(doc(db, codigoCentro, "Usuarios", "Estudiantes", id), data)
}
export const actualizar_unidad = async (codigoCentro, idnivel, nombresubnivel, data) => {
    await updateDoc(doc(db, codigoCentro, "Niveles", idnivel, nombresubnivel), data)
}