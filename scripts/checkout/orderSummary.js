import{cart, removeFromCart, updateCartQuantity, updateDeliveryOptions} from '../../data/cart.js';
import{products} from '../../data/products.js'
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import { deliveryOptions } from '../../data/deliveryOptions.js';
import { renderPaymentSummary } from './payementSummary.js';
export function renderPage()
{
let itemsDetail = '';
const today = (dayjs());
const deliveryDate = today.add(7, 'days');


updateCartQuantity();
cart.forEach((uniqueproduct) => {
    const productId = uniqueproduct.productId;
    const quant = uniqueproduct.quantity
    let  matchingItem;
    products.forEach((product) =>{
    if (product.id === productId) 
        matchingItem = product;
    });
    const deliveryOptionId = uniqueproduct.deliveryOptionsId;
   let deliveryOption;
   deliveryOptions.forEach((option) => {
      if(option.id === deliveryOptionId)
        deliveryOption = option;
   })
   const now = dayjs();
  const date = now.add(deliveryOption.deliveryDays, 'days');
  const dateString = date.format('dddd, MMMM, D');
const html = `  <div class="cart-item-container 
              js-item-container-${matchingItem.id}">
            <div class="delivery-date">Delivery date:${dateString}</div>

            <div class="cart-item-details-grid">
              <img
                class="product-image"
                src="${matchingItem.image}"
              />

              <div class="cart-item-details">
                <div class="product-name">
               ${matchingItem.name};
                </div>
                <div class="product-price">$${(matchingItem.priceCents /100).toFixed(2)}</div>
                <div class="product-quantity">
                  <span> Quantity: <span class="quantity-label">${quant}</span> </span>
                
                  <span class="delete-quantity-link link-primary js-delete-button" data-product-id = ${matchingItem.id}>
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                ${deliveryOptionsHTML(matchingItem, uniqueproduct)}
              </div>
            </div>
          </div>`
          itemsDetail += html;  
})
function deliveryOptionsHTML(matchingItem, uniqueproduct)
{
  let finalhtml = ``;
deliveryOptions.forEach((deliveryObject) => {
  const now = dayjs();
  const date = now.add(deliveryObject.deliveryDays, 'days');
  const dateString = date.format('dddd, MMMM, D');
  const priceString = deliveryObject.priceCents === 0 ? 'FREE' : `${(deliveryObject.priceCents / 100).toFixed(2)}`;
   const isChecked = deliveryObject.id === uniqueproduct.deliveryOptionsId;
  finalhtml += `
  <div class="delivery-option js-deliveryOption"
  data-product-id = "${matchingItem.id}"
  data-option-id = "${deliveryObject.id}">
                  <input

                    type="radio"
                    ${isChecked ? 'checked' : ''}
                    class="delivery-option-input"
                    name="delivery-option-${matchingItem.id}"
                  />
                  <div>
                    <div class="delivery-option-date">${dateString}</div>
                    <div class="delivery-option-price">$${(priceString)} - Shipping</div>
                  </div>
                </div>`

})
return finalhtml;
}
document.querySelector('.js-order-summary').innerHTML = itemsDetail;
document.querySelectorAll('.js-delete-button').forEach((deleteButton) => {
 

    deleteButton.addEventListener('click', ()=>{
         const prodId = deleteButton.dataset.productId;
        removeFromCart(prodId);
      const container = document.querySelector(`.js-item-container-${prodId}`);
      container.remove();
      updateCartQuantity();
      renderPaymentSummary();
    })
})
document.querySelectorAll('.js-deliveryOption').forEach((radioElement) =>
{
  const prductid = radioElement.dataset.productId;
  const deliveryOptionId = radioElement.dataset.optionId;
radioElement.addEventListener('click', ()=>{
  updateDeliveryOptions(prductid, deliveryOptionId);
  renderPage();
  // the above code renders the html on the left side ya above portion
  renderPaymentSummary();
  //the above code changes the renderPayment on the right or below part
})
})
}
