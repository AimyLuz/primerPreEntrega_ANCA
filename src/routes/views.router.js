import express from 'express';

import productManager from '../productManager.js';
const pml = new productManager("./listaDeProductos.json");
const router = express.Router();


export default router