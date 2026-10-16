import { cart } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { deliveryOptions, getDeliveryOptionObject } from "../../data/deliveryOptions.js";
import {addOrder } from "../../data/orders.js";
export function renderPaymentSummary()
{
  let totalProducts = 0;
    let totalBaseMoneyCents = 0;
    let shippingChargesCents = 0;
    cart.forEach(cartItem => {
        let matchingProduct = getProduct(cartItem.productId);
        totalProducts += cartItem.quantity;
        totalBaseMoneyCents += matchingProduct.priceCents * cartItem.quantity;
        shippingChargesCents += getDeliveryOptionObject(cartItem.deliveryOptionsId).priceCents;

        
    });
    const totalBeforeTaxCents = totalBaseMoneyCents +  shippingChargesCents;
    const taxCents = totalBeforeTaxCents * 0.1;
    const totalCents = totalBeforeTaxCents + taxCents;
    const paymentHTML = `
    <div class="payment-summary-title">Order Summary</div>

          <div class="payment-summary-row">
            <div>Items (${totalProducts}):</div>
            <div class="payment-summary-money">$${formatCurrency(totalBaseMoneyCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${formatCurrency(shippingChargesCents)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatCurrency(totalBeforeTaxCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatCurrency(taxCents)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formatCurrency(totalCents)}</div>
          </div>

          <button class="place-order-button button-primary js-place-order">
            Place your order
          </button>
    `;
    document.querySelector('.js-payment-summary').innerHTML = paymentHTML;
    document.querySelector('.js-place-order').addEventListener('click', async () => {
      try{
        const response = await fetch ('https://supersimplebackend.dev/orders', {
        method : 'POST',
        headers : {
          'Content-Type': 'application/json'
        },
        body : JSON.stringify({
          cart : cart
        })
      })
     const order =  await response.json();
     addOrder(order);
      } catch (error)
      {
        console.log('Unexpected error.Try again later! ');
      }
     window.location.href = 'orders.html';
    })
}
export function formatCurrency(priceCents)
{
    return (Math.round(priceCents) / 100) .toFixed(2);
}
