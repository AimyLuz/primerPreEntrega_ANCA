import express from "express";
const router = express.Router();
import productManager from "../productManager.js";
const pml = new productManager ("./src/listadoDeProductos.json")



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


  router.get("/api/products/:pid", async (req, res) => {
    try {
      let productId = parseInt(req.params.pid);
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
  router.post("/api/products", async (req,res)=>{
    try{
        pml.addProduct(req.body);
        res.status(200).send("Producto agregado con exito");
    }catch (error){
        res.status(500).send("Error al agregar el producto")
    }
  });
//BORRAR UN PRODUCTO
  router.delete("/api/products/:pid",async  (req,res)=>{
    try{
        let productId = parseInt(req.params.pid);
        pml.deleteProduct(productId);
        res.status(200).send("Producto borrado con exito");
    }catch (error){
        res.status(500).send("Error al borrar el producto")
    }
  });
//MODIFICAR UN PRODUCTO
router.put("/api/products/:pid", async (req, res) => {
  try {
    let productId = parseInt(req.params.pid);
    // Obtener los datos específicos a actualizar del cuerpo de la solicitud
    const { updates } = req.body;
    // Verificar que se proporcionen actualizaciones
    if (!updates || Object.keys(updates).length === 0) {
      return res.status(400).send("Debe proporcionar al menos un campo para la actualización.");
    }
    // Llamar al método updateProduct con los dos parámetros requeridos
    await pml.updateProduct(productId, updates);
    let producto = await pml.getProductById(productId);
    res.status(200).send("Actualización de producto exitosa");
    console.log(producto);
  } catch (error) {
    res.status(500).send("Error al actualizar el producto");
  }
});

  export default router;

