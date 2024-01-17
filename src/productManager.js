const fs = require("fs").promises;

// CLASE
class productManager {
  constructor(archivo) {
    this.path = archivo;

    //this.products = [];
  }
  static id = 0;
 
  addProduct = async (title, description, price, thumbnail, code, stock) => {
    // ver codigo repetido
    let colecciones = await this.getProducts();
    let codeRep = colecciones.some((i) => i.code === code);
    if (codeRep) {
      console.log(`Error, code ${code} esta repetido.`);
    } else {
      const newProduct = { title, description, price, thumbnail, code, stock };
      // Comprueba que todos los campos sean obligatorios.

      if (!Object.values(newProduct).includes(undefined)) {
        productManager.id++; // Con cada producto nuevo, aumenta el ID en uno, de esta forma no se repiten.
        this.products.push({
          ...newProduct,
          id: productManager.id,
        });
        await fs.writeFile(this.path, JSON.stringify(this.products));
      } else {
        console.log(`Por favor, completar los campos faltantes del producto "${title}"`);
      }
    }
  };


  getProducts = async () => {
    try {
        let colecciones = await fs.readFile(this.path, "utf-8");
        return JSON.parse(colecciones);
    } catch (error) {
        if (error.code === 'ENOENT') {
            // Si el archivo no existe, retornar un array vacío
            return [];
        } else {
            // Si ocurre un error diferente, lanzar el error
            throw error;
        }
    }
};


  getProductById = async (id) => {
    let colecciones = await this.getProducts();
    if (!colecciones.find((i) => i.id == id)) {
      console.log(`Producto con ID: "${id}", no existe.`);
      return `Producto "${id}", no existe.`
    } else {
      console.log(colecciones.find((i) => i.id == id));
      return colecciones.find((i)=> i.id == id);
    }
  };


  deleteProduct = async (id) => {
    let colecciones = await this.getProducts();

    let listaNueva = colecciones.filter((i) => i.id !== id);
    await fs.writeFile(this.path, JSON.stringify(listaNueva));
  };

  updateProduct = async (id, campo, valor) => {
    let colecciones = await this.getProducts();
    let productoIndex = colecciones.findIndex((i) => i.id === id);

    if (productoIndex !== -1) {
        colecciones[productoIndex][campo] = valor;
        await fs.writeFile(this.path, JSON.stringify(colecciones));
    } else {
        console.log(`Not found id: ${id}`);
    }
    
    
  };

}

// Se agregan productos.
const producto = new productManager("./listadoDeProductos.json");

//exportar
module.exports = productManager;