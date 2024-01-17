const fs = require("fs").promises;

// CLASE
class productManager {
  constructor(archivo) {
    this.path = archivo;

    this.products = [];
  }
  static id = 0;
 
  addProduct = async (title, description, price, thumbnail, code, stock) => {
    try {
        const colecciones = await this.getProducts();
        const codeRep = colecciones.some((i) => i.code === code);

        if (codeRep) {
            console.log(`Error, code ${code} está repetido.`);
        } else {
            const newProduct = { title, description, price, thumbnail, code, stock };

            if (Object.values(newProduct).every((value) => value !== undefined)) {
                productManager.id++;
                this.products.push({
                    ...newProduct,
                    id: productManager.id,
                });
                await fs.writeFile(this.path, JSON.stringify(this.products));
                console.log(`Producto "${title}" agregado con éxito.`);
            } else {
                console.log(`Por favor, completar todos los campos del producto "${title}".`);
            }
        }
    } catch (error) {
        console.error(error);
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
    try {
        const colecciones = await this.getProducts();
        const producto = colecciones.find((i) => i.id === id);

        if (producto) {
            producto[campo] = valor;
            await fs.writeFile(this.path, JSON.stringify(colecciones));
            console.log(`Producto con ID ${id} actualizado con éxito.`);
        } else {
            console.log(`No se encontró el producto con ID: ${id}`);
        }
    } catch (error) {
        console.error(error);
    }
};

}

// Se agregan productos.
const producto = new productManager("./listadoDeProductos.json");

//exportar
module.exports = productManager;