import io from "socket.io-client";
import { useState, useEffect } from "react";
const socket = io("/");

function App() {
  const [mensaje, setMensaje] = useState("");
  const [mensajes, setMensajes] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newMensaje = {
      body: mensaje,
      from: "Me",
    };
    setMensajes([...mensajes, newMensaje]);
    socket.emit("mensaje", mensaje); //Desde este evento enviamos lo que escriben en el formulario a nuestro back.
    setMensaje("");
  };

  useEffect(() => {
    socket.on("mensaje", mensajeRecivido);

    return () => {
      socket.off("mensaje", mensajeRecivido);
    };
  }, []);

  const mensajeRecivido = (mensaje) => {
    setMensajes((state) => [...state, mensaje]);
  };

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
          <li key={i}>
            {mensaje.from} : {mensaje.body}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
