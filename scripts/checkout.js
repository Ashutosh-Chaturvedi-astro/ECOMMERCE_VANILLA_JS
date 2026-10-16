import { renderPage } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/payementSummary.js";
// import {xhr} from '../data/backend-practise.j'
import { loadProducts } from "../data/products.js";
import { loadCart } from "../data/cart.js";
import {loadProductsFetch}  from "../data/products.js"
// new Promise ((resolve) => {
//     console.log('Start Promise')
//     loadProducts (() => {
//         console.log('loading of products is finished');
//         resolve();
//     });
// }).then (() => {
//     console.log('next step');
// })

// new Promise ((resolve) => {
//     loadProducts (() => {
//         resolve();
//     });
// }).then (() => {
    
//     renderPage();
//     renderPaymentSummary();

// })

    async function loadPage()
    {
       try  {await loadProductsFetch();
        await new Promise((resolve) => {
            loadCart (() => {
                resolve();
            })
        });
    } catch (error) {
        console.log('error found');
    }
        renderPage();
    renderPaymentSummary();

    }
    loadPage();
 /*Promise.all ([
   loadProductsFetch(), 
    new Promise ((resolve) => {
        loadCart( () => {
            resolve();
        })
    })
 ]).then(() => {
    renderPage();
    renderPaymentSummary();
    });*/
//         new Promise ((resolve) => {
//             loadProducts (() => {
//                 resolve('value1');
//             });
//         }).then((value) => {
            
//              return new Promise((resolve) =>{
//                 loadCart (() => {
//                     resolve();
//                 })
//             }).then(() => {
//                 renderPage();
//             renderPaymentSummary();
//             })

//         })
//         function asynchronous1()
//         {
//             return new Promise ((resolve) => {
//                 //async code
//                 setTimeout(() => {
//                     console.log('I love uh1')
//                     resolve();
//                 }, 3000)
//             })
//         }

//  function asynchronous2()
//         {
//             return new Promise ((resolve) => {
//                 //async code
//                 setTimeout(() => {
//                     console.log('I love uh2')
//                     resolve();
//                 }, 3000)
//             })
//         }
//         console.log('close ur eyes');
//         // asynchronous1().then(() => {
//         //     console.log('my love');
//         //      console.log('really really');
//         //     asynchronous2().then (() => {
//         //        console.log('alpha')
//         //     })
//         // })
//     asynchronous1().then(() => {
//             console.log('my love');
//             console.log('really really');
//             return asynchronous2();
//             }).then(() => {
//                  console.log('alpha')
//             })
       