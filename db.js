const knex = require("knex");

class Contenedor {
  constructor(knexOptions) {
    this.knex = knex(knexOptions);
  }

  isExistTable(nameTable) {
    return this.knex.schema.hasTable(nameTable);
  }

  createTable() {
    return this.knex.schema.createTable("productos", (table) => {
      table.increments();
      table.string("title", 15).notNullable();
      table.float("price").notNullable();
      table.string("thumbnail").notNullable();
    });
  }

  createarticles(producto) {
    return this.knex("productos").insert(producto);
  }

  selectArticles() {
    return this.knex("productos");
  }

  updateStockById(stock, id) {
    // return this.knex("productos").where("id", id).update("stock", stock);
  }

  destroy() {
    this.knex.destroy();
  }
}

module.exports = Contenedor;
