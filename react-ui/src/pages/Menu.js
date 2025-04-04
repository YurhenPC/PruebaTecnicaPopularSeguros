import React, { useEffect } from "react";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";  // Importar useNavigate
import "../css/Menu.css";

function Menu() {
  const cookies = new Cookies();
  const navigate = useNavigate();  // Usar el hook useNavigate

  const cerrarSesion = () => {
    cookies.remove("id", { path: "/" });
    cookies.remove("nombre", { path: "/" });
    cookies.remove("correo", { path: "/" });
    cookies.remove("username", { path: "/" });
    cookies.remove("password", { path: "/" });
    navigate("/");  // Redirigir a la página de inicio (Login)
  };

//   useEffect(() => {
//     if (!cookies.get("id")) {
//       navigate("/");  // Si no hay cookie de ID, redirigir al login
//     }
//   }, [cookies, navigate]);  // Asegúrate de agregar `navigate` como dependencia

  return (
    <div className="containerMenu">
      <br />
      <div class="container-fluid"> 
        <div  class="text-end">
        <button   className="btn btn-danger float-right" onClick={cerrarSesion}>
        Cerrar Sesión
      </button>
        </div>
      
      </div>
      <br />
      <div class="d-flex m-2">
      <button className="btn btn-info " slot="start" >
        Agregar Poliza
      </button>
      </div>
      
      <div>
      <h2>Tabla de Datos</h2>
      <table  class="table table-bordered" border="1" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Edad</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
           
            <tr  >
              <td>1 </td>
              <td> 2</td>
              <td>
                <button   class="btn btn-primary m-2">Modificar</button>
                <button class="btn btn-danger m-2" >Eliminar</button>
              </td>
            </tr>
 
        </tbody>
      </table>
    </div>
    </div>
    
  );
}

export default Menu;
