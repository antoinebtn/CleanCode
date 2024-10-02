class Cart {
    constructor() {
        const storedCart = localStorage.getItem('cart');
        this.cart = storedCart ? JSON.parse(storedCart) : [];
    }

    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.cart));
    }

    addProduct(name, price, quantity) {
        const existingProduct = this.cart.find(p => p.name === name);

        if (existingProduct) {
            existingProduct.quantity += quantity;
        } else {
            const newProduct = { name, price, quantity };
            this.cart.push(newProduct);
        }

        this.saveCart();
    }

    updateQuantity(name, newQuantity) {
        const product = this.cart.find(p => p.name === name);

        if (product) {
            product.quantity = newQuantity;

            if (product.quantity <= 0) {
                this.removeProduct(name);
            } else {
                this.saveCart();
            }
        }
    }

    removeProduct(name) {
        this.cart = this.cart.filter(p => p.name !== name);
        this.saveCart();
    }

    calculateTotal() {
        return this.cart.reduce((total, product) => {
            return total + product.price * product.quantity;
        }, 0);
    }

    displayCart() {
        console.log('Cart content:', this.cart);
        console.log('Total cart price: €', this.calculateTotal());
    }
}