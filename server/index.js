const express = require('express');
const {createServer} = require("node:http");
const {Server} = require("socket.io");

const app = express();
const server = createServer(app);

const io = new Server(server, {
    cors:{
        origin: "*"
    }

});

io.on("connection", (socket) => {
    console.log("Nuevo cliente conectado "); 
    //Para enviar un mensaje a un cliente específico, se puede usar el método emit del socket. Por ejemplo, para enviar un mensaje de bienvenida al cliente recién conectado, se puede hacer lo siguiente:    
    socket.emit("Bienvenido", "Bienvenido al chat");

    socket.on("mensaje", (mensaje) => {
        socket.broadcast.emit("mensaje", mensaje);
    //para enviar un mensaje a todos los clientes conectados, menos a mi.
    });


    
    socket.on("mensaje", (mensaje) => {
        console.log("Mensaje recibido: ", mensaje);
    });
});


server.listen(3000, () => {
    console.log("Servidor escuchando en el puerto 3000");
});
