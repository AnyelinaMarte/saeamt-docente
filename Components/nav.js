import Link from "next/link";
import { onAuthStateChanged } from "firebase/auth";
import { auth,db } from "../Configuracion";
import { doc, getDoc } from "firebase/firestore";
import {useState, useEffect} from 'react'; 
import CerrarSeccion from "./CerrarSeccion";
export default function Nav(props){
    const [cerrarSe, setCerrarSeccion] = useState(false) 
    const cerrar=()=>{
        setCerrarSeccion(true)
    }

    const [userData, setuserData] = useState("")
    useEffect(()=>{
      auth.onAuthStateChanged(async user=>{
        if(user != null){
      
         const docRef = doc(db,"11111","Usuarios","Docentes",user.email);
          await getDoc(docRef).then(doc =>{
           setuserData(doc.data().nombre)
          })
        }
      })
    },[])
   
    return(
        <main>
        <div className="sidebar" >
        <div className="logo-details">
          <i className='bx bxl-c-plus-plus'></i>
          <span className="logo_name">CELEO <br></br>3er Grado</span>
        </div>
        <ul className="nav-links">
          
          <li>
            <Link href="/Estudiantes">
             <a>
              <i className='bx bx-box' ></i>
              <span className="links_name">ESTUDIANTES</span>
              </a>
            </Link>
          </li>
          <li>
          <Link href="/">
            <a>
              <i className='bx bx-grid-alt' ></i>
              <span className="links_name">PROGRESO</span>
            </a>
          </Link>
          </li>
         
          
          <li>
          <Link href="/Configuracion">
             <a>
              <i className='bx bx-book-alt' ></i>
              <span className="links_name">CONFIGURACIÓN</span>
              </a>
            </Link>
            
          </li>

          <li className="log_out">
            <a href="#" onClick={cerrar}>
              <i className='bx bx-log-out'></i>
              <span className="links_name">SALIR</span>
            </a>
          </li>
        </ul>
      </div>
      <section className="home-section">
      <nav>
        <div className="sidebar-button">
          <i className='bx bx-menu sidebarBtn'></i>
          <span className="dashboard">Matemáticas</span>
        </div> 
        
        <div className="profile-details">
          <span className="admin_name">{userData}</span>
          <i className='bx bx-chevron-down' ></i>
        </div>
      </nav>
      
      </section>
 
      {props.children}
      {cerrarSe == false?
          <span></span>
        :<CerrarSeccion ButtonCancelar={()=>setCerrarSeccion(false)}/>
      }
      </main>
    )
}