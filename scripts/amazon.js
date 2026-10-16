import {cart, addToCart} from '../data/cart.js';
import {products, loadProducts} from '../data/products.js';
loadProducts(renderProductGrid);
//the above parameter is a function inside a function and js treats function as a variable so its possible

updateCart();
 function updateCart()
{
  let totalItem = 0;
  cart.forEach((item)  =>{
totalItem += item.quantity;
  })
  document.querySelector('.js-cart-quantity').innerHTML = totalItem;
}
function renderProductGrid()
{
  let producthtml = ``;
  // loop thru the products to generate HTML
products.forEach((product) => {
const html = `
        <div class="product-container">
          <div class="product-image-container">
            <img
              class="product-image"
              src="${product.image}"
            />
          </div>

          <div class="product-name limit-text-to-2-lines">
        ${product.name}
          </div>

          <div class="product-rating-container">
            <img
              class="product-rating-stars"
              src=${product.getStarsUrl()}
            />
            <div class="product-rating-count link-primary">${product.rating.count}</div>
          </div>

          <div class="product-price">$${(product.priceCents  / 100).toFixed(2)}</div>

          <div class="product-quantity-container">
            <select class ="select-quantity-${product.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart">
            <img src="images/icons/checkmark.png" />
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart " 
          data-product-id="${product.id}">Add to Cart</button>
        </div>
       
`;
 // above line data-    --->attribute(in kebab-case)
producthtml += html;
})
document.querySelector('.js-products-grid').innerHTML = producthtml;





document.querySelectorAll('.js-add-to-cart').forEach((button) => {
  button.addEventListener('click', () => {
    const prodIdentity = button.dataset.productId;
// the above property after dataset. must be in camelCase
  addToCart(prodIdentity);
   updateCart();
   console.log(cart);
   
  });
});
}


