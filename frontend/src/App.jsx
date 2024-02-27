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
    socket.emit("mensaje", mensaje);
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
    <div className="h-screen flex flex-col justify-between bg-gray-900 text-white  ">
      <div className="flex-grow flex flex-col justify-end">
        <ul className="flex flex-col items-start gap-2">
          {mensajes.map((mensaje, i) => (
            <li
              key={i}
              className={`my-2 p-2 table text-sm rounded-md ${
                mensaje.from === "Me"
                  ? "bg-blue-500 self-end justify-self-end"
                  : "bg-green-500 self-start"
              }`}
            >
              <span className="text-xs text-slate-300 block">
                {mensaje.from}
              </span>
              <span className="text-md">{mensaje.body}</span>
            </li>
          ))}
        </ul>
      </div>
      <form onSubmit={handleSubmit} className="flex justify-between px-4 py-2">
        <input
          type="text"
          placeholder="Escribe tu Mensaje"
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
          className="flex-grow px-4 py-2 rounded-md bg-gray-800 text-white"
        />
        <button
          type="submit"
          className="ml-2 px-4 py-2 bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Enviar
        </button>
      </form>
    </div>
  );
}

export default App;
