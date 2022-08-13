import Link from "next/link";
import { onAuthStateChanged } from "firebase/auth";
import { auth,db } from "../../BD/configuracion";
import { doc, getDoc } from "firebase/firestore";
import {useState, useEffect} from 'react'; 
export default function Nav(props){
    const cerrar=()=>{
        auth.signOut()
    }

    const [userData, setuserData] = useState("")
    useEffect(()=>{
      auth.onAuthStateChanged(async user=>{
        if(user != null){
          //console.log(user.email)
         const docRef = doc(db,"11111","Usuarios","Docentes",user.email,"BD-Docente","DatosPersonales");
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
          <span className="logo_name">S.A.E.A.M <br></br>3er Grado</span>
        </div>
        <ul className="nav-links">
          <li>
          <Link href="/">
            <a>
              <i className='bx bx-grid-alt' ></i>
              <span className="links_name">HOME</span>
            </a>
          </Link>
          </li>
          <li>
            <Link href="/Estudiantes">
             <a>
              <i className='bx bx-box' ></i>
              <span className="links_name">ESTUDIANTES</span>
              </a>
            </Link>
          </li>
          <li>
            <a href="#">
              <i className='bx bx-list-ul' ></i>
              <span className="links_name">PROGRESO</span>
            </a>
          </li>
          <li>
          <Link href="/Contenido">
            <a href="#">
              <i className='bx bx-pie-chart-alt-2' ></i>
              <span className="links_name">CONTENIDO</span>
            </a>
          </Link>
          </li>
          <li>
          <Link href="/Actividades">
            <a href="#">
              <i className='bx bx-pie-chart-alt-2' ></i>
              <span className="links_name">ACTIVIDADES</span>
            </a>
          </Link>
          </li>
          <li>
            
            <a >
              <i className='bx bx-coin-stack' ></i>
              <span className="links_name">AVISOS</span>
            </a>
            
          </li>
          <li>
          <Link href="/Configuracion">
             <a>
              <i className='bx bx-book-alt' ></i>
              <span className="links_name">CONFIGURACION</span>
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
        <div className="search-box">
          <input type="text" placeholder="Search..." />
          <i className='bx bx-search' ></i>
        </div>
        <div className="profile-details">
        <img src="/user.png" />
          <span className="admin_name">{userData}</span>
          <i className='bx bx-chevron-down' ></i>
        </div>
      </nav>
      
      </section>
 
      {props.children}
  
      </main>
    )
}