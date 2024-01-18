const express = require("express");
const app = express();
const port = 8080;
//const routerCart = require("./routes/cart.router.js");
const routerProducts = require("./routes/products.router.js")
const routerCart = require ("./routes/cart.router.js")


//Middlewares
app.use(express.json())
//app.use(express.static("public"))


//Rutas
app.use("/", routerProducts)
app.use("/",routerCart);


//Reglas
app.get("/ping", (req, res) => {
  res.send("Pong");
});
app.get("/", (req,res)=>{
    res.status(200).send('<h1>AYELÉN LUZ ANCA GULLA</h1>')
})
//Escuchar
app.listen(port, () => {
  console.log(`Aplicación funcionando en el puerto ${port}`);
});
