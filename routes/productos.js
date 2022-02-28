const express = require("express");
const router = express.Router();
const { Productos } = require("../classProductos/classProductos");

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

router.get("/productos", async (req, res) => {
  const productos = await manejadorProductos.getAll();
  req.app.io.sockets.emit("update_products", productos);
  res.send(productos);
  console.log(productos);
});

router.post("/productos", async (req, res) => {
  const producto = await manejadorProductos.save(req.body);
  req.app.io.sockets.emit("update_products", await manejadorProductos.getAll());
  res.send(`Se recibió el producto: ${JSON.stringify(producto)}`);
  console.log(`Se recibió el producto: ${JSON.stringify(producto)}`);
});

router.get("/productos/:id", async (req, res) => {
  const producto = await manejadorProductos.getById(req.params.id);
  res.send(producto);
  console.log(`El producto con el id es: ${JSON.stringify(producto)}`);
});

router.put("/productos/:id", async (req, res) => {
  const producto = await manejadorProductos.updateById(req.params.id, req.body);
  req.app.io.sockets.emit("update_products", await manejadorProductos.getAll());
  res.send(
    producto === undefined
      ? `Se actualizó el producto con id ${req.params.id}`
      : JSON.stringify(producto)
  );
  console.log(
    producto === undefined
      ? `Se actualizó el producto con id ${req.params.id}`
      : JSON.stringify(producto)
  );
});

router.delete("/productos/:id", async (req, res) => {
  const producto = await manejadorProductos.deleteById(req.params.id);
  req.app.io.sockets.emit("update_products", await manejadorProductos.getAll());
  res.send(
    producto === undefined
      ? `Se eliminó el producto con id ${req.params.id}`
      : JSON.stringify(producto)
  );
  console.log(
    producto === undefined
      ? `Se eliminó el producto con id ${req.params.id}`
      : JSON.stringify(producto)
  );
});

module.exports = router;
