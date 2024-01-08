import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.scss';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null); // Nuevo estado para el mensaje de error
  const navigate = useNavigate();

  const handleLogin = async () => {
    // Validar que ambos campos no estén vacíos
    if (!username.trim() || !password.trim()) {
      setError('Por favor, completa todos los campos.');
      return;
    }

    try {
      // Realizar la solicitud de inicio de sesión aquí

      // Supongamos que recibes un token después de un inicio de sesión exitoso
      const token: string = 'tu_token_simulado'; // Especifica el tipo de token como string
      // Almacena el token en localStorage o en el estado global de tu aplicación
      localStorage.setItem('token', token);

      // Redirige a la página principal
      navigate('/home');
    } catch (error: any) {
      console.error('Error al iniciar sesión:', error.message);
      setError('Error al iniciar sesión. Por favor, inténtalo de nuevo.');
    }
  };

  return (
    <div className="container1">
      <h1>Iniciar Sesión</h1>
      {error && <div className="error-message">{error}</div>} {/* Nuevo elemento para mostrar el mensaje de error */}
      <label>
        Usuario:
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="input" />
      </label>
      <label>
        Contraseña:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input" />
      </label>
      <button onClick={handleLogin} className="button">
        Iniciar Sesión
      </button>
    </div>
  );
};

export default Login;
