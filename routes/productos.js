const express = require("express");
const router = express.Router();
const { Productos } = require("../classProductos/classProductos");
// const manejadorProductos = new Productos();
const knex = require("../db");

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

router.get("/", (req, res) => {
  // req.app.io.sockets.emit("update_products", manejadorProductos.getAll(knex,"productos"));
});

router.get("/productos", (req, res) => {
  // const productos = manejadorProductos.getAll(knex,"productos");
  // req.app.io.sockets.emit("update_products", manejadorProductos.getAll(knex,"productos"));
  res.send(productos);
});

router.post("/productos", (req, res) => {
  manejadorProductos.save(req.body);
  // const producto = manejadorProductos.save(req.body);
  //   req.app.io.sockets.emit(
  //     "update_products",
  //     // manejadorProductos.getAll(knex, "productos")
  //   );
});

router.get("/productos/:id", (req, res) => {
  const producto = manejadorProductos.getById(req.params.id);
  res.send(producto);
  console.log(`El producto con el id es: ${JSON.stringify(producto)}`);
});

router.put("/productos/:id", (req, res) => {
  const producto = manejadorProductos.updateById(req.params.id, req.body);
  res.send(
    producto === undefined
      ? `Se actualizó el producto con id ${req.params.id}`
      : JSON.stringify(producto)
  );
});

router.delete("/productos/:id", (req, res) => {
  const producto = manejadorProductos.deleteById(req.params.id);
  res.send(
    producto === undefined
      ? `Se eliminó el producto con id ${req.params.id}`
      : JSON.stringify(producto)
  );
});

module.exports = router;
