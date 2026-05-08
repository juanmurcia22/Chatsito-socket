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
    socket.emit("Bienvenido", "Bienvenido al chat");
    
    socket.on("mensaje", (mensaje) => {
        console.log("Mensaje recibido: ", mensaje);
    });
});


server.listen(3000, () => {
    console.log("Servidor escuchando en el puerto 3000");
});
