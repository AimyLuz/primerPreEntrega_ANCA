import express from 'express';

import productManager from '../productManager.js';
const pml = new productManager("./src/listadoDeProductos.json");
const router = express.Router();

router.get("/", async (req, res) => {
    const products = await pml.getProducts();
    console.log(products)
    res.render("home", { products });
    
  });
  
  router.get("/socket", (req, res) => {
    res.render("socket");
  });
  
  router.get("/realTimeProducts", async (req, res) => {
    const products = await pml.getProducts();
    res.render("realTimeProducts", { products });
  });


export default router