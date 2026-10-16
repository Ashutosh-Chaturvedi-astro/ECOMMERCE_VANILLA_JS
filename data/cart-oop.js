const cart = {
 cartItems : undefined,
 loadFromStorage : function () {
    this.cartItems  = JSON.parse(localStorage.getItem('cart-oop')) || []
    
 },

    saveToCart : function () 
{
  localStorage.setItem('cart-oop', JSON.stringify(this.cartItems));
},
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



},

removeFromCart(prodId)
{
  let newCart = [];
  this.cartItems.forEach((item) => {

    if(item.productid !== prodId) newCart.push(item);
  
  })
  
  this.cartItems = newCart;
  this.saveToCart();
}, 
 updateDeliveryOptions(productId, deliveryOptionsId)
{
  let matchingItem;
  this.cartItems.forEach((cartItem) =>{
    if(cartItem.productid === productId) matchingItem = cartItem;
  })
  matchingItem.deliveryOptionsId =  deliveryOptionsId;
  this.saveToCart();
},
 updateCartQuantity()
{
  let totalItem = 0;
  this.cartItems.forEach((item)  =>{
totalItem += item.quantity;
  })
  document.querySelector('.js-cart-quantity').innerHTML = `${totalItem} items`;
}
 
};



cart.loadFromStorage();
cart.addToCart('54e0eccd-8f36-462b-b68a-8182611d9add')
console.log(cart);


