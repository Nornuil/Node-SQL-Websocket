// const ProductoSqlite = new cl_Producto(
//   {
//     client: "sqlite3",
//     connection: { filename: "./DB/mydb.sqlite" },
//   },
//   "productos"
// );
//productos en base de datos
const Contenedor = require("../db");
// const knex = require("knex");

class Productos {
  constructor(dbOptions, table) {
    this.conexion = dbOptions;
    this.tabla = table;
  }

  async getAll(db, nameTable) {
    // return new Promise((resolve, reject) => {
    //   this.conexion
    //     .from(nameTable)
    //     .then((rows) => {
    //       return rows;
    //     })
    //     .catch((err) => {
    //       console.log(err.sqlMessage);
    //       console.log(err.sql);
    //     })
    //     .finally(() => {
    //       console.log("finally");
    //       this.conexion.destroy();
    //     });
    // });
  }

  getById(id) {
    const resultado = this.productos.find(
      (idBuscado) => idBuscado.id === parseInt(id)
    );
    if (resultado === undefined) {
      return { error: "producto no encontrado" };
    } else {
      return resultado;
    }
  }

  close() {
    this.conexion.destroy();
  }

  save(producto) {
    if (producto.title && producto.price && producto.thumbnail) {
      const contenedor = new Contenedor(this.conexion);
      contenedor
        .isExistTable(this.tabla)
        .then((isExist) => (isExist ? true : contenedor.createTable()))
        .then(() => contenedor.createarticles(producto))
        .then(() => contenedor.selectArticles())
        .then((rows) => console.log(rows))
        .finally(() => contenedor.destroy());
    } else {
      return "Campo de producto faltante";
    }
  }

  updateById(id, producto) {
    const resultado = this.productos.find(
      (idBuscado) => idBuscado.id === parseInt(id)
    );

    if (resultado === undefined) {
      return { error: "producto no encontrado" };
    } else {
      if (producto.title && producto.price && producto.thumbnail) {
        resultado.title = producto.title;
        resultado.price = producto.price;
        resultado.thumbnail = producto.thumbnail;
      } else {
        return "No es el formato de producto que podes ingresar";
      }
    }
  }

  deleteById(id) {
    const resultado = this.productos.find(
      (idBuscado) => idBuscado.id === parseInt(id)
    );

    if (resultado === undefined) {
      return { error: "producto no encontrado" };
    } else {
      this.productos = this.productos.filter(
        (idEliminado) => idEliminado.id !== parseInt(id)
      );
    }
  }
}

module.exports = { Productos };
