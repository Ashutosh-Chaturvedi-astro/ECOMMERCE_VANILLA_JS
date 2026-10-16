class Cart{
     cartItems = undefined;
     #localStorageKey = undefined;
     //this is same as writing let cartItems;
     constructor(localStorageKey)
     {
        this.#localStorageKey = localStorageKey;
        this.loadFromStorage();
     }
     loadFromStorage = function () {
    this.cartItems  = JSON.parse(localStorage.getItem(this.localStorageKey)) || []
    
 }
     saveToCart = function () 
{
  localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
}
addToCart(prodIdentity)
{
      let prodExists = false;
const quantity = Number(document.querySelector(`.select-quantity-${prodIdentity}`).value);
    this.cartItems.forEach((itemObj) => {
      if (prodIdentity === itemObj.productid) {
        itemObj.quantity+= quantity;
        prodExists = true;
      }
    });

    if (!prodExists) {
      this.cartItems.push({
        productid: prodIdentity,
        quantity: quantity,
        deliveryOptionsId : '1'
      });
    }
    this.saveToCart();



}

removeFromCart(prodId)
{
  let newCart = [];
  this.cartItems.forEach((item) => {

    if(item.productid !== prodId) newCart.push(item);
  
  })
  
  this.cartItems = newCart;
  this.saveToCart();
}
 updateDeliveryOptions(productId, deliveryOptionsId)
{
  let matchingItem;
  this.cartItems.forEach((cartItem) =>{
    if(cartItem.productid === productId) matchingItem = cartItem;
  })
  matchingItem.deliveryOptionsId =  deliveryOptionsId;
  this.saveToCart();
}
 updateCartQuantity()
{
  let totalItem = 0;
  this.cartItems.forEach((item)  =>{
totalItem += item.quantity;
  })
  document.querySelector('.js-cart-quantity').innerHTML = `${totalItem} items`;
}

};



const cart = new Cart('cart-oop');
const businessCart = new Cart('cart-business');
cart.#localStorageKey = 'aa';
console.log(businessCart);
console.log(cart);
console.log(businessCart instanceof Cart);


