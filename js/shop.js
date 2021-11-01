/******************************  Model(Data)  ********************************/

const cart = [];
const products =  [ 
   {name: 'CAFE AMARETTO', price: 109, id:'cart1', noOfItems:1},
   {name: 'CARDAMOM BUN', price: 99, id:'cart2', noOfItems:1 },
   {name: 'CHOCOLATE CHAI', price: 109, id:'cart3', noOfItems:1 },
   {name: 'CHOCOLATE CAREMEL', price: 109, id:'cart4', noOfItems:1 },
   {name: 'CHRISTMAS SPIRIT', price: 119, id:'cart5', noOfItems:1},
   {name: 'ISLAND COCONUT', price: 99, id:'cart6', noOfItems:1},
   {name: 'IRISH CREAM', price: 109, id:'cart7', noOfItems:1},
   {name: 'GINGERBREAD COOKIE', price: 119, id:'cart8', noOfItems:1},
   {name: 'HAVANA RUM', price: 109, id:'cart9', noOfItems:1}
];

/* Opening the cart */

function cartVisibility() {
   const visible = document.getElementById('cart_container')
   visible.style.visibility = "visible";
}

/* Closing the cart */
function closingCart() { 
   const visible = document.getElementById('cart_container')
   visible.style.visibility = "hidden";
}

/* Add products to cart */
function addToCart(event) {
   const buttonName = event.target.dataset.name;
   const addedProducts = products.find(({ id }) => id === buttonName);

   if (cart.findIndex( ({id}) => id === buttonName) !== -1) {
      cart.forEach(cartProduct => {
         if(buttonName === cartProduct.id) {
            cartProduct.noOfItems++;    
         }
      });   
   } else {
      cart.push(addedProducts);
   }

   updateCartDOM();
   updateTotal();
}


/* Delete products from the cart */

function deleteFromCart(event) {
   const buttonId = event.target.id;
   const removeIndex = cart.findIndex(cart => cart.id === buttonId);
      cart[removeIndex].noOfItems = 1; //to do noOfItems to 1
      cart.splice(removeIndex, 1); 
   updateCartDOM() ;
   updateTotal();
}

/* Decreacing Count and Price */

function decreasingCount(event) {
   const decreasingButtonName = event.target.id; 
   cart.forEach(product => {
         if(decreasingButtonName === product.id) { 
            if(product.noOfItems > 1) {
               product.noOfItems--;
            }     
         }
      updateCartDOM();
      updateTotal();
   });
}

/* Increacing Count and Price */

function increasingCount(event) {
   const increasingButtonName = event.target.id;
    cart.forEach(product => {
      if(increasingButtonName === product.id) {
         product.noOfItems++;    
      }
      updateCartDOM();
      updateTotal();
   });
}


/******** event listeners *********/ 

const cartButtons = document.querySelectorAll('.add_cart button');
[...cartButtons].forEach(button => {
   button.addEventListener('click', addToCart);
});

const jarButtons = document.querySelectorAll('.jar_button');
[...jarButtons].forEach(jarButton => {
   jarButton.addEventListener('click', cartVisibility);
});

const closeButtons = document.querySelectorAll('.close_button');
[...closeButtons].forEach(closeButton => {
   closeButton.addEventListener('click', closingCart);
});


/* From Model to View */
 
const totalAmounts = document.querySelector('.total_price');
const countProducts = document.querySelector('.count');

function updateTotal() {
   totalAmounts.innerText ='';
   countProducts.innerText = '';
   const sum = cart.reduce ((total, cartItem) => {
      return total + (cartItem.price * cartItem.noOfItems);
   } ,0);

   const counting = cart.reduce((number, countItem) => {
      return number + countItem.noOfItems;
   }, 0);
     
   const totalAmount = document.createElement('div');
   totalAmounts.appendChild(totalAmount);
   totalAmount.innerText =  sum;

   const count = document.createElement('span');
   countProducts.append(count);
   count.innerText = counting;
}

const addedItems = document.querySelector('.add_products'); 
function updateCartDOM() {
   addedItems.innerText = '';
   
   cart.forEach (item => {
      const div = document.createElement('div');
      const head = document.createElement('h4');
      const deleteButton = document.createElement('button');

      const buttonDiv = document.createElement('div');
      const para = document.createElement('p');
      const increasingButton = document.createElement('button');
      const decreasingButton = document.createElement('button');
      const text = document.createElement('p');
      
      head.innerText = item.name;
      para.innerText = 'kr : ' + item.noOfItems * item.price;
      text.innerText = item.noOfItems;
      increasingButton.innerText = '+';
      decreasingButton.innerText = '-';
      deleteButton.id = item.id;
      deleteButton.innerText = 'Remove'

      buttonDiv.className = 'adding_count';
      deleteButton.className = 'delete_button';
      div.className = 'addedCartItems';
      increasingButton.className = 'increasing';
      decreasingButton.className = 'decreasing';
      increasingButton.id = item.id; 
      decreasingButton.id = item.id;
      div.appendChild(head);
      div.appendChild(deleteButton);
      
      buttonDiv.appendChild(para);
      buttonDiv.appendChild(decreasingButton);
      buttonDiv.appendChild(text);
      buttonDiv.appendChild(increasingButton);
      div.appendChild(buttonDiv);
      addedItems.appendChild(div);

      /* Adding event to deleteButton */

      const itemDeleteButtons = document.querySelectorAll('.delete_button');
      [...itemDeleteButtons].forEach(deleteButton => {
         deleteButton.addEventListener('click', deleteFromCart);
      });

      // Adding event listener to decreasingButton 

      const minusButton = document.querySelectorAll('.decreasing');
      [...minusButton].forEach(button => {
         button.addEventListener('click', decreasingCount);
      });

      // Adding event listener to increasingButton          

      const plusButton = document.querySelectorAll('.increasing');
      [...plusButton].forEach(button => { 
         button.addEventListener('click', increasingCount);
      });
   });
   
}