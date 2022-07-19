const { Console } = require("console");
const fs = require("fs");
class Conteiner {
  constructor(ruta) {
    this.ruta = ruta;
  }
  async save(obj) {
    try {
      let data = await fs.promises.readFile(this.ruta, "utf-8");
      let dataParse = JSON.parse(data);
      if (dataParse.length) {
        await fs.promises.writeFile(
          this.ruta,
          JSON.stringify(
            [...dataParse, { ...obj, id: dataParse.length + 1 }],
            null,
            2
          )
        );
      } else {
        await fs.promises.writeFile(
          this.ruta,
          JSON.stringify([{ ...obj, id: dataParse.length + 1 }], null, 2)
        );
      }
      return console.log(`el id asignado es ${dataParse.length + 1}`);
    } catch (err) {
      console.log(err);
    }
  }
  async getById(id) {
    try {
      let data = await fs.promises.readFile(this.ruta, "utf-8");
      let dataParse = JSON.parse(data);
      let producto = dataParse.find((producto) => producto.id === id);
      if (producto) {
        return console.log(producto);
      } else {
        console.log("archivo no encontrado");
      }
    } catch (error) {}
  }
  async bringAll() {
    try {
      let data = await fs.promises.readFile(this.ruta, "utf-8");
      let dataParse = JSON.parse(data);
      if (dataParse.length) {
        return console.log(dataParse);
      } else {
        console.log("el archivo esta vacio");
      }
    } catch (error) {
      console.log(error);
    }
  }
  async deleteForId(id) {
    try {
      let data = await fs.promises.readFile(this.ruta, "utf-8");
      let dataParse = JSON.parse(data);
      let producto = dataParse.find((producto) => producto.id === id);
      if (producto) {
        const dataParseFilter = dataParse.filter((produc) => produc.id !== id);
        await fs.promises.writeFile(
          this.ruta,
          JSON.stringify(dataParseFilter, null, 2),
          "utf-8"
        );
        console.log(dataParseFilter);
      } else {
        console.log("archivo no encontrado");
      }
    } catch (error) {
      console.log(error);
    }
  }
}
module.exports = Conteiner;
