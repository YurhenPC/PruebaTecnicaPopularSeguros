import React, { useState, useEffect } from "react";
import md5 from "md5";
import "bootstrap/dist/css/bootstrap.min.css";
import Cookies from "universal-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Importar useNavigate
import "../css/Login.css";

function Login() {
  const baseUrl = "https://localhost:44322/api/nombreApi";
  const cookies = new Cookies();
  const navigate = useNavigate(); // Usar useNavigate para la navegación

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const iniciarSesion = async () => {
    alert("Bienvenido: Jeffry");
    navigate("/menu");
    // Primero, hacer la solicitud a la API
//     await axios
//       .get(baseUrl + `/${form.username}/${md5(form.password)}`)
//       .then((response) => {
//         return response.data;
//       })
//       .then((response) => {
//         if (response.length > 0) {
//           var respuesta = response[0];

//           // Guardar datos en las cookies
//           cookies.set("id", respuesta.id, { path: "/" });
//           cookies.set("nombre", respuesta.nombre, { path: "/" });
//           cookies.set("correo", respuesta.correo, { path: "/" });
//           cookies.set("username", respuesta.username, { path: "/" });
//           cookies.set("password", respuesta.password, { path: "/" });

//           // Mostrar el mensaje de bienvenida después de guardar los datos
//           alert("Bienvenido: " + respuesta.nombre + " " + respuesta.apellido_paterno);

//           // Redirigir a la página del menú
//           navigate("/menu");
//         } else {
//           alert("El usuario o la contraseña no son correctos");
//         }
//       })
//       .catch((error) => {
//         console.log(error);
//       });
  };

  useEffect(() => {
    if (cookies.get("id")) {
      navigate("/menu"); // Si el usuario ya está logueado, redirigir
    }
  }, [cookies, navigate]);

  return (
    <div className="containerPrincipal">
      <div className="containerLogin">
        <div className="form-group">
          <label>Usuario: </label>
          <br />
          <input
            type="text"
            className="form-control"
            name="username"
         //   onChange={handleChange}
          />
          <br />
          <label>Contraseña: </label>
          <br />
          <input
            type="password"
            className="form-control"
            name="password"
         //   onChange={handleChange}
          />
          <br />
          <button className="btn btn-primary" onClick={iniciarSesion}>
            Iniciar Sesión
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
