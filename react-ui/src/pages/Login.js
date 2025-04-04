import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";

function Login(){

  const { userName, error, loading, loginWithUserName} = useAuth();
    const [userNameState, setUserNameState] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
 
    useEffect(() => {
        if (userName) {
            navigate('/polizas');
        }
    }, [userName]);
 
    const handleSubmit = async (e) => {
        e.preventDefault();
        await loginWithUserName(userNameState, password)
    };

  return(
    <div className="login-container">
        <h2>Iniciar Sesión</h2>
        <form onSubmit={handleSubmit}>
            <input value={userNameState} onChange={(e) => setUserNameState(e.target.value)} type="text" className="input-field" placeholder="Usuario" required/>
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="input-field" placeholder="Contraseña" required/>
            <button type="submit" className="btn">{loading && <FaSpinner className="spinner-icon"/>} Ingresar</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
    </div>
  )
}
export default Login;