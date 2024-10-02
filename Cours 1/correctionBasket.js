const product = {
    name: String,
    price: Number,
    quantity: Number,
};
  
function getBasket() {
    let basket = localStorage.getItem("basket");
    if (!basket) return [];
    return JSON.parse(basket);
}

function saveBasket(basket) {
    if (!Array.isArray(basket)) {
        throw new BasketNotArrayError();
    }

    localStorage.setItem("basket", JSON.stringify(basket));
}
  
function addProductToBasket(product) {
    if (!product) {
      throw new ProductUnfifinedError();
    }
    if (product.quantity <= 0) {
      throw new NegativeQuantityError();
    }
    if (product.price <= 0) {
      throw new NegativePriceError();
    }
    let basket = getBasket();
    let productFound = basket.find(
      (basketProduct) => basketProduct.name === product.name
    );
    if (productFound) {
      throw new DuplicateProduct();
    }
    basket.push(product);
    saveBasket(basket);
}
  
function modifyQuantityProduct(nameProduct, newQuantity) {
    if (newQuantity <= 0) {
      throw new NegativeQuantityError();
    }
    let basket = getBasket();
    let modifyProduct = basket.find(
      (basketProduct) => (basketProduct.name = nameProduct)
    );
    if (!modifyProduct) {
      throw new ProductNotFound();
    }
    modifyProduct.quantity = newQuantity;
    saveBasket(basket);
}

function deleteProductFromBasket(nameProduct) {
    let basket = getBasket();

    productFoundIndex = basket.findIndex(product => product.name === nameProduct)

    if (productFoundIndex === -1) {
        throw new ProductNotFoundError();
    }

    cart = cart.filter(product => product.name !== nameProduct);
    saveBasket(basket);
}