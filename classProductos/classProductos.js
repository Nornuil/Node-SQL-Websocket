class Productos {
  static id = 1;

  constructor() {
    this.productos = [
      {
        title: "matias",
        price: 111,
        thumbnail:
          "data:image/jpeg;base64,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",
      },
    ];
  }

  getAll(db, nameTable) {
    // return this.productos.length == 0 ? null : this.productos;
    db.from(nameTable)
      .then((rows) => {
        return rows;
      })
      .catch((err) => {
        console.log(err.sqlMessage);
        console.log(err.sql);
      })
      .finally(() => {
        console.log("finally");
        db.destroy();
      });
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

  save(db, nameTable, producto) {
    if (producto.title && producto.price && producto.thumbnail) {
      ////////////////////////
      db.schema.hasTable(nameTable).then(function (exists) {
        if (!exists) {
          db.schema
            .createTable(nameTable, (table) => {
              table.increments();
              table.string("title", 15).notNullable();
              table.float("price").notNullable();
              table.string("thumbnail").notNullable();
            })
            .then((data) => {
              console.log("Creada la tabla productos");
              db(nameTable)
                .insert(producto)
                .then((data) => {
                  console.log("Se registró exitosamente..");
                  //MOSTRAR?
                })
                .catch((err) => {
                  console.log(err.sqlMessage);
                  console.log(err.sql);
                })
                .finally(() => {
                  console.log("finally");
                  db.destroy();
                });
            })
            .catch((err) => {
              console.log(err.sqlMessage);
              console.log(err.sql);
            })
            .finally(() => {
              db.destroy();
            });
        } else {
          db(nameTable)
            .insert(producto)
            .then((data) => {
              console.log("Se registró exitosamente..");
              //MOSTRAR?
            })
            .catch((err) => {
              console.log(err.sqlMessage);
              console.log(err.sql);
            })
            .finally(() => {
              console.log("finally con tabla");
              db.destroy();
            });
        }
      });
      ////////////////////////
      return producto;
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


module.exports = {Productos};