const express = require("express");
const productos = require("./routes/productos");
const PORT = process.env.PORT || 8080;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use("/api", productos);

const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");

const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);
app.io = io;

//ARRAY PARA EL CHAT
const MENSAJES = [
  {
    email: "Admin",
    message: "Bienvenido al chat!!",
    fecha: new Date(),
  },
];

// obtengo los productos
const { Productos } = require("./classProductos/classProductos");
// const manejadorProductos = new Productos();

const manejadorProductos = new Productos(
  {
    client: "mysql",
    connection: {
      host: "127.0.0.1",
      database: "ecommerce",
      user: "root",
      password: "cejudo2868",
      port: 3306,
    },
    pool: { min: 0, max: 7 },
  },
  "productos"
);

let listadoProductos = manejadorProductos.getAll();

app.use(function (req, res, next) {
  req.user = {
    name: "Matias",
    is_admin: false,
  };
  next();
});

io.on("connection", (socket) => {
  console.log("Cliente conectado con id: ", socket.id);
  socket.emit("update_products", listadoProductos);
  //CHAT
  socket.on("new_message", (data) => {
    MENSAJES.push(data);
    io.sockets.emit("messages_received", MENSAJES);
  });
  io.sockets.emit("messages_received", MENSAJES);
});

const server = httpServer.listen(PORT, () =>
  console.log(`Servidor listo en el puerto ${PORT} ...`)
);

server.on("error", (error) =>
  console.log(`Error en el servidor... Error: ${error}`)
);
