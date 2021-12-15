/************************************  Model(Data)  ***************************************/

const cart = [];
const products = [ 
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
   const buttonName = event.target.dataset.name;   // It gives the product data-name from HTML and stored in buttonName
   /* 
      Find() spreads the id in products[] and compare the id with buttonName (data-name). 
      If it matches gives that object from products[] and store in addedProducts.
   */
   const addedProducts = products.find(({ id }) => id === buttonName);  
   
   /*
      Before added the products to the cart[], 
      checking if product already exist in the cart[] by findIndex().
      findIndex() finds the index of the id in cart[] and compares to buttonName.
      If it is not found - gives -1 else push the product to cart[]
      otherwise adding count.
   */
   if (cart.findIndex( ({id}) => id === buttonName) !== -1) {
      cart.forEach(cartProduct => {
         // If the product already exist in the cart[] it increase only the count.
         if(buttonName === cartProduct.id) {       
            cartProduct.noOfItems++;    
         }
      });   
   } else {
      // Adding products to the cart[] by push()
      cart.push(addedProducts);
   }
   updateCartDOM();
   updateTotal();
}

/* Delete products from the cart */
function deleteFromCart(event) {
   const buttonId = event.target.id;
   /*
      Finding index by findIndex() 
      - splice() needs index to remove item from cart[] splice(index, no of items to remove)
   */
      const removeIndex = cart.findIndex(cart => cart.id === buttonId);    
      cart[removeIndex].noOfItems = 1;    // Setting noOfItems to 1
      cart.splice(removeIndex, 1); 
   updateCartDOM() ;
   updateTotal();
}

/* Decreasing Count and Price */
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

/* Increasing Count and Price */
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

/************************************* event listeners ****************************************/ 

/* Adding click event by addEventListener() to the ADD TO BASKET button 
and when it trigges calling the addToCart function  */
const cartButtons = document.querySelectorAll('.add_cart button');
[...cartButtons].forEach(button => {
   button.addEventListener('click', addToCart);
});

/* Adding click event by addEventListener() to the jar-button 
and when it trigges calling the cartVisibility function */
const jarButtons = document.querySelectorAll('.jar_button');
[...jarButtons].forEach(jarButton => {
   jarButton.addEventListener('click', cartVisibility);
});

/* Adding click event by addEventListener() to the close-button 
and when it trigges calling the closingCart function */
const closeButtons = document.querySelectorAll('.close_button');
[...closeButtons].forEach(closeButton => {
   closeButton.addEventListener('click', closingCart);
});

/*
   querySelectorAll gives the array with all buttons
   Using spread operator [...spreads all the buttons] with forEach() method
   helps to adding click event to the buttons. 
*/

/*************************************** From Model to View ************************************/
 
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
   totalAmount.innerText = sum;
   totalAmounts.appendChild(totalAmount);
   
   const count = document.createElement('span');
   count.innerText = counting;
   countProducts.append(count);   
}

/* Adding the products from cart[] (model) to cart (view) */
const addedItems = document.querySelector('.add_products'); 
function updateCartDOM() {
   addedItems.innerText = '';
   
   cart.forEach (item => {
      const div = document.createElement('div');
      div.className = 'addedCartItems';
      addedItems.appendChild(div);

      // div (.addedCartItems) - child elements h4, button (delete_button), div (.adding_count)
      const head = document.createElement('h4');
      head.innerText = item.name;
      div.appendChild(head);

      const deleteButton = document.createElement('button');
      deleteButton.id = item.id;
      deleteButton.className = 'delete_button';
      deleteButton.innerText = 'Remove';
      div.appendChild(deleteButton);

      const buttonDiv = document.createElement('div');
      buttonDiv.className = 'adding_count';
      div.appendChild(buttonDiv);

      // div (.adding_count) - child elements p, button (.increasing), button (.decreasing), p
      const para = document.createElement('p');
      para.innerText = 'kr : ' + item.noOfItems * item.price;
      buttonDiv.appendChild(para);

      const increasingButton = document.createElement('button');
      increasingButton.id = item.id;
      increasingButton.className = 'increasing';
      increasingButton.innerText = '+';
      buttonDiv.appendChild(increasingButton);

      const decreasingButton = document.createElement('button');
      decreasingButton.id = item.id;
      decreasingButton.className = 'decreasing';
      decreasingButton.innerText = '-';
      buttonDiv.appendChild(decreasingButton);

      const text = document.createElement('p');
      text.innerText = item.noOfItems;
      buttonDiv.appendChild(text);
      
      // Adding click event to deleteButton and when it trigges calling the deleteFromCart function
      const itemDeleteButtons = document.querySelectorAll('.delete_button');
      [...itemDeleteButtons].forEach(deleteButton => {
         deleteButton.addEventListener('click', deleteFromCart);
      });

      // Adding click event listener to decreasingButton and when it trigges calling the decreasingCount function 
      const minusButton = document.querySelectorAll('.decreasing');
      [...minusButton].forEach(button => {
         button.addEventListener('click', decreasingCount);
      });

      // Adding click event listener to increasingButton and when it trigges calling the increasingCount function          
      const plusButton = document.querySelectorAll('.increasing');
      [...plusButton].forEach(button => { 
         button.addEventListener('click', increasingCount);
      });
   });
   
}