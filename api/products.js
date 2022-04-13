class ProductsApi {
  constructor() {
    this.products = [];
    this.id = 0;
  }

  getAll() {
    return this.products;
  }

  getById(id) {
    const index = this.products.findIndex(el => {
      return el.id === Number(id);
    });
    if (index === -1) {
      return {error: 'Producto no encontrado'};
    }
    const product = this.products.splice(index, 1);
    return product;
  }

  createProduct(product) {
    this.id = (this.products.length === 0) ? 1 : this.products.at(-1).id + 1;
    const item = {
      ...product,
      id: this.id
    }
    this.products.push(item);
    return item;
  }

  updateProduct(product, id) {
    const { title, price, thumbnail } = product;
    const index = this.products.findIndex(el => {
      return el.id === Number(id);
    });
    if (index === -1) {
      return {error: 'Producto no encontrado'};
    }
    this.products[index].title = title;
    this.products[index].price = price;
    this.products[index].thumbnail = thumbnail;
  }

  deleteProduct(id) {
    const index = this.products.findIndex(el => {
      return el.id === Number(id);
    });
    if (index === -1) {
      return {error: 'Producto no encontrado'};
    }
    this.products.splice(index, 1);
  }
}

module.exports = ProductsApi;
