import io from "socket.io-client";
import { useState, useEffect } from "react";
const socket = io("/");

function App() {
  const [mensaje, setMensaje] = useState("");
  const [mensajes, setMensajes] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("mensaje", mensaje);
    setMensaje(""); 
  };

  useEffect(() => {
    const handleMensaje = (mensaje) => {
      setMensajes(prevMensajes => [...prevMensajes, mensaje]);
    };

    socket.on("mensaje", handleMensaje);

    
    return () => {
      socket.off("mensaje", handleMensaje);
    };
  }, []); 

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Escribe tu Mensaje"
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
        />
        <button type="submit">Enviar</button>
      </form>
      <ul>
        {mensajes.map((mensaje, i) => (
          <li key={i}>{mensaje}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
