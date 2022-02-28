const express = require("express");
const productos = require("./routes/productos");
const PORT = process.env.PORT || 8080;
const { Productos } = require("./classProductos/classProductos");

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

manejadorProductos.createTables();

io.on("connection", async (socket) => {
  console.log("Cliente conectado con id: ", socket.id);
  socket.emit("update_products", await manejadorProductos.getAll());
  //CHAT
  socket.on("new_message", async (data) => {
    await manejadorProductos.insertMessage(data);
    io.sockets.emit(
      "messages_received",
      await manejadorProductos.getMessages("mensajes")
    );
  });
  io.sockets.emit(
    "messages_received",
    await manejadorProductos.getMessages("mensajes")
  );
});

const server = httpServer.listen(PORT, () =>
  console.log(`Servidor listo en el puerto ${PORT} ...`)
);

server.on("error", (error) =>
  console.log(`Error en el servidor... Error: ${error}`)
);
