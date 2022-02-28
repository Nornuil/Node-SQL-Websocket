const knex = require("knex");

class Productos {
  constructor(dbOptions, table) {
    this.knex = knex(dbOptions);
    this.table = table;
  }

  async getAll() {
    try {
      const contenido = await this.knex(this.table);
      return contenido;
    } catch (err) {
      return `Error: ${err} ${err.sqlMessage}\n${err.sql}`;
    }
  }

  async getById(id) {
    try {
      let contenido = await this.knex
        .from(this.table)
        .select("*")
        .where("id", parseInt(id));
      return contenido.length === 0
        ? (contenido = `No existe el producto con id: ${id}`)
        : contenido;
    } catch (err) {
      return `Error: ${err.sqlMessage}\n${err.sql}`;
    }
  }

  async save(producto) {
    if (producto.title && producto.price && producto.thumbnail) {
      try {
        const contenido = await this.knex(this.table).insert(producto);
        return contenido;
      } catch (err) {
        return `Error: ${err.sqlMessage}\n${err.sql}`;
      }
    }
  }

  async updateById(id, producto) {
    if (producto.title && producto.price && producto.thumbnail) {
      try {
        const contenido = await this.knex
          .from(this.table)
          .where("id", parseInt(id))
          .update(producto);
        return contenido === 0
          ? `Producto con id: ${id} no existe`
          : `Producto con id: ${id} actualizado`;
      } catch (err) {
        return `Error: ${err.sqlMessage}\n${err.sql}`;
      }
    } else {
      return "Error con los campos del producto";
    }
  }

  async deleteById(id) {
    try {
      const contenido = await this.knex
        .from(this.table)
        .where("id", parseInt(id))
        .del();
      return contenido === 0
        ? `Producto con id: ${id} no existe`
        : `Producto con id: ${id} borrado`;
    } catch (err) {
      return `Error: ${err.sqlMessage}\n${err.sql}`;
    }
  }

  async createTables() {
    await this.knex.schema
      .hasTable("productos")
      .then((exists) => {
        if (exists) {
          console.log('La tabla "productos" ya existe');
        } else {
          return this.knex.schema
            .createTable("productos", (table) => {
              table.increments();
              table.string("title");
              table.float("price");
              table.string("thumbnail");
            })
            .then(() => {
              console.log("Tabla productos creada");
            });
        }
      })
      .catch((err) => {
        console.log("Error de base de datos", err);
      });

    await this.knex.schema
      .hasTable("mensajes")
      .then((exists) => {
        if (exists) {
          console.log('La tabla "mensajes" ya existe');
        } else {
          return this.knex.schema
            .createTable("mensajes", (table) => {
              table.increments();
              table.string("email");
              table.string("fecha");
              table.string("message");
            })
            .then(() => {
              console.log("Tabla mensajes creada");
              this.knex("mensajes")
                .insert([
                  {
                    email: "Admin",
                    fecha: `${new Date()}`,
                    message: "¡Bienvenidos al chat colegas!",
                  },
                ])
                .then();
            });
        }
      })
      .catch((err) => {
        console.log("Error de base de datos", err);
      });
  }

  async insertMessage(data) {
    return await this.knex("mensajes").insert(data);
  }

  async getMessages() {
    return await this.knex("mensajes");
  }
}

module.exports = { Productos };
