export let cart = JSON.parse(localStorage.getItem('cart')) || [];

export function updateCartQuantity()
{
  let totalItem = 0;
  cart.forEach((item)  =>{
totalItem += item.quantity;
  })
  document.querySelector('.js-cart-quantity').innerHTML = `${totalItem} items`;
}
function saveToCart() 
{
  localStorage.setItem('cart', JSON.stringify(cart));
}
export function addToCart(prodIdentity)
{
      let prodExists = false;
const quantity = Number(document.querySelector(`.select-quantity-${prodIdentity}`).value);
    cart.forEach((itemObj) => {
      if (prodIdentity === itemObj.productid) {
        itemObj.quantity+= quantity;
        prodExists = true;
      }
    });

    if (!prodExists) {
      cart.push({
        productId: prodIdentity,
        quantity: quantity,
        deliveryOptionsId : '1'
      });
    }
    saveToCart();
}
export function removeFromCart(prodId)
{
  let newCart = [];
  cart.forEach((item) => {

    if(item.productid !== prodId) newCart.push(item);
  
  })
  
  cart = newCart;
  saveToCart();
}
export function updateDeliveryOptions(productId, deliveryOptionsId)
{
  let matchingItem;
  cart.forEach((cartItem) =>{
    if(cartItem.productid === productId) matchingItem = cartItem;
  })
  matchingItem.deliveryOptionsId =  deliveryOptionsId;
  
  saveToCart();
}
export function loadCart(func)
{
  const xhr = new XMLHttpRequest();
  // the above code makes an object of the class XML...


  xhr.addEventListener('load', () => {
    // console.log(xhr.response); // this gives JSON in form of string, a list of all the products

    
    func();
  })

      // the below code sends an https request to get some data so the response of the backend is stored in above code
      xhr.addEventListener('error', (error) => {
      console.log('Unexpected Error.Please try again later');
    })
  xhr.open('GET', 'https://supersimplebackend.dev/cart');
  xhr.send();
  }
