const Contenedor = require("./Modulos/Contenedor.js"); //clase contenedor que trae productos
const express = require("express"); // libreria para crear servidor


function getRandomInt(min, max) {
    return Math.floor(Math.random() * max) + min;
}

const server = express(); // se suele poner a la variable app o server
const PORT = 8080;


const contenedorProductos = new Contenedor("./productos.txt");


server.get("/",(request,response)=> {
    response.send("<h1 style='color: blue'>Bienvenidos al servidor express")
});

// PRODUCTOS
server.get("/productos", (request,response) => {
    contenedorProductos.getAll()
      .then((listadoProductos) => response.send(listadoProductos))
      .catch((error) => console.error(error.message));
  });
   

//RANDOM
server.get("/productoRandom", (request,response) => {
    contenedorProductos.getAll()
    .then(async (listadoProductos) =>{
        //obtengo un numero al azar tomando en cuenta la cantidad q hay en el archivo
        let nroRandom = getRandomInt(1, listadoProductos.length);
        //devuelvo el producto con el id = al numero obtenido al azar
        response.send(await contenedorProductos.getById(nroRandom));
    })
    .catch((error) => console.error(error.message));
})


const connectedServer = server.listen(PORT, ()=>{
    console.log(`Servidor corriendo en el puerto ${connectedServer.address().port}`);
})
connectedServer.on("error", error => console.log(`Error en servidor ${error}`));

//http://localhost:8080