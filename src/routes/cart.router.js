const express = require("express")
const router = express.Router()
const cartManager =require("../cartManager")
const cm = new cartManager("./carrito.json")




//rutas

router.get("/api/carts", async (req, res) => {
	try {
		const carts = await cm.getCarts();
		res.status(200).send(carts);
	} catch (error) {
		res.status(500).send("Error al obtener productos");
	}
});

// 
router.get("/api/carts/:cid", async (req, res) => {
	try {
		const cartId = parseInt(req.params.cid);
		const cart = await cm.getCartById(cartId);
		if (cart) {
			res.status(200).send(cart);
		} else {
			res.status(404).send("Producto no encontrado");
		}
	} catch (error) {
		res.status(500).send("Error al obtener el producto");
	}
});

//  comenzar carrito
router.post("/api/carts", (req, res) => {
	try {
		cm.addCart(req.body);
		res.status(200).send("Se agregó correctamente el carrito");
	} catch (error) {
		res.status(500).send("Error al agregar el producto");
	}
});

// agregar productos al carrito
router.post("/api/carts/:cid/product/:pid", async (req, res) => {
	try {
		const cartId = parseInt(req.params.cid);
		const productId = parseInt(req.params.pid);
		cm.updateCart(cartId, productId);
		res.status(200).send("Producto añadido al carrito");
	} catch (error) {
		res.status(500).send("Error al cargar el producto");
	}
});

module.exports = router;