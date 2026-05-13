import { useEffect } from "react";
import { useState } from "react";
import {io} from "socket.io-client";
function App(){
  const[inputMessage, setInputMessage] = useState("");
  const[mensajeRecibido, setMensajeRecibido] = useState([]);  
  const [socket, setSocket] = useState();
  const [user, setUser] = useState("");

  useEffect(()=>{
    const newSocket = io("http://10.30.7.66:3000");
    setSocket(newSocket);
    newSocket.on("mensaje", (msg) => {
      setMensajeRecibido(msg);

    });
    setUser(prompt("Ingrese su nombre de usuario"));
    return () => newSocket.disconnect();
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    //como se envian los mensajes ...

    socket.emit("mensaje", {user, inputMessage});
    setInputMessage("");
  }
  
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input onChange ={(e) => setInputMessage(e.target.value)} value={inputMessage}/>
        <button type="submit">
          Enviar
        </button>
      </form>
      {mensajeRecibido.map(mensaje => <div>{mensaje.user}: {mensaje.inputMessage}</div>)}
    </div>
  );}
export default App;
