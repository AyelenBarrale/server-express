const fs = require("fs");
const express = require("express");

const app = express();

class Contenedor {
  constructor(archivo) {
    this.archivo = archivo;
  }

  //GET ALL
  getAll() {
    const productos = fs.readFileSync(
      this.archivo,
      "utf-8",
      function (err, data) {
        if (err) console.log("error", err);
      }
    );
    return JSON.parse(productos);
  }

  //GET RANDOM PRODUCT
  getRandomProd() {
    const random = fs.readFileSync(this.archivo, "utf-8", function (err, data) {
      if (err) console.log("error", err);
    });
    const arr = JSON.parse(random);
    const randomProd = arr[Math.floor(Math.random() * arr.length)];
    return randomProd;
  }
}

const lista = new Contenedor("archivo.txt");

app.get("/", (req, res, next) => {
  res.send("Servidor Express: desafío clase 3 - Barrale Ayelén");
});

app.get("/productos", (req, res, next) => {
  res.send(`Listado de productos: ${JSON.stringify(lista.getAll())}`);
});

app.get("/productoRandom", (req, res, next) => {
  res.send(`Producto radom: ${JSON.stringify(lista.getRandomProd())}`);
});

const PORT = 8080;

const server = app.listen(PORT, () => {
  console.log(`servidor express corriendo en puerto ${PORT}`);
});

server.on("error", (error) => console.log(error));
