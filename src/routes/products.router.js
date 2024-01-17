const express = require('express');
const router = express.Router();
const ProductManager = require("../productManager");
const pml = new ProductManager ("./listadoDeProductos.json")




router.get("/api/products", async (req, res) => {
    try {
          // Llamado a productManager
      let productos = await pml.getProducts();
      //limite query
      const { limit } = req.query;
      if (!limit) {
        res.send(productos);//enviar todos los productos
      } else if (Number.isInteger(Number(limit)) && Number(limit) > 0) {
        res.send(productos.slice(0, limit)); //transformar en numero el string y enviar el limit
      } else {
        res.send(`El límite ${limit} es inválido.`);//ingreso de datos no validos
      }
    } catch (error) {
      // Salida
      // Manejar errores aquí
      console.error(error);
      res.status(500).send("Error interno del servidor");
    }
  });


  router.get("/products/:pid", async (req, res) => {
    try {
      let productId = req.params.pid;
      console.log(req.params.pid);
      // Llamado a productManager
  
      let producto = await pml.getProductById(productId);
      // Salida
      res.send(producto);
    } catch (error) {
      // Manejar errores aquí
      console.error(error.message); // Imprime el mensaje de error en la consola
      res.status(404).send("Producto no encontrado"); // Envía una respuesta 404 al cliente
    }
  });
  //AGREGAR PRODUCTOS
  router.post("/api/products", (req,res)=>{
    try{
        pml.addProduct(req.body);
        res.status(200).send("Producto agregado con exito");
    }catch (error){
        res.status(500).send("Error al agregar el producto")
    }
  });
//BORRAR UN PRODUCTO
  router.delete("/api/products/:pid", (req,res)=>{
    try{
        const productId = parseInt(req.params.pid);
        pml.deleteProduct(productId);
        res.status(200).send("Producto borrado con exito");
    }catch (error){
        res.status(500).send("Error al borrar el producto")
    }
  });
//MODIFICAR UN PRODUCTO
  router.put("/api/products/:pid", (req,res)=>{
    try{
        const productId = parseInt(req.params.pid);
        pml.updateProduct(productId, req.body);
        res.status(200).send("Actualización de producto exitosa")
    }catch (error){
        res.status(500).send("Error al actualizar el producto")
    }
  } );

  module.exports = router;

