// Products Array
const products = [
  {
    id: 1,
    title: "600 PokéCoins",
    promo: "50 WEB STORE BONUS COINS",
    price: 149.00,
    image: "image/1.png",
  },

  {
    id: 2,
    title: "1,300 PokéCoins",
    promo: "100 WEB STORE BONUS COINS",
    price: 289.00,
    image:
      "image/2.png",
  },
  {
    id: 3,
    title: "2,700 PokéCoins",
    promo: "200 WEB STORE BONUS COINS",
    price: 589.00,
    image:
      "image/3.png",
  },
  {
    id: 4,
    title: "5,600 PokéCoins",
    promo: "400 WEB STORE BONUS COINS",
    price: 1169.00,
    image:
      "image/4.png",
  },
  {
    id: 5,
    title: "15,500 PokéCoins",
    promo: "1000 WEB STORE BONUS COINS ",
    price: 439.10,
    image:
      "image/5.png",
  },
  {
    id: 6,
    title: "Pokémon GO Fest 2024: Global Ticket",
    price: 439.10,
    image:
      "image/image4.PNG",
  },
  {
    id: 7,
    title: "GO Rocket Box",
    price: 289.00,
    image:
      "image/image2.PNG",
  },
  {
    id: 8,
    title: "Wonder Ticket",
    price: 289.00,
    image:
      "image/image3.PNG",
  },
]

const slider = document.querySelector(".items");
const slides = document.querySelectorAll(".item");
const button = document.querySelectorAll(".button");

//get product list
const productList = document.getElementById('productList')
const cartItemsElement = document.getElementById('cartItems')
const cartTotalElement = document.getElementById('cartTotal')

//store cart items in local storage
let cart= JSON.parse (localStorage.getItem("cart")) || [];

document.addEventListener("DOMContentLoaded", function () {
  renderProducts();
  renderCartItems(); // Render cart items initially
});


// Modify the renderProducts function to hide specific products
function renderProducts() {
  productList.innerHTML = products.map(
    (product) => {
      // Check if the product ID is 6, 7, or 8
      if (product.id === 6 || product.id === 7 || product.id === 8) {
        // Return an empty string for these products to make them invisible
        return '';
      } else {
        // Render other products as usual
        return `
          <div class="product">
            <img src="${product.image}" alt="${product.title}" class="product-img">
            <div class="product-info">
              <h1 class="product-title">${product.title}</h1>
              <p class="product-promo">${product.promo || ''}</p>
              <p class="product-price">₱${product.price.toFixed(2)}</p>
              <a class="add-to-cart" data-id="${product.id}">Add to cart</a>
            </div>
          </div>
        `;
      }
    }
  ).join("");

  // add to cart
  const addToCartButtons = document.getElementsByClassName('add-to-cart');
  for (let i = 0; i < addToCartButtons.length; i++) {
    const addToCartButton = addToCartButtons[i];
    addToCartButton.addEventListener('click', addToCart);
  }
}


function addToCart(event) {
  const productID = parseInt(event.target.dataset.id);
  const product = products.find((product) => product.id === productID);

  if (product) {
    // If product already in cart
    const existingItem = cart.find((item) => item.id === productID);

    if (existingItem) {
      // If product already exists in cart, update quantity
      existingItem.quantity++;
    } else {
      // If product does not exist in cart, add it
      const cartItem = {
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        quantity: 1,
      };
      cart.push(cartItem);
    }

    // Change add to cart text to added
    event.target.textContent = "Added";

    // Update cart icon, render cart items, save to local storage, and calculate total
    updateCartIcon();
    renderCartItems();
    saveToLocalStorage();
    calculateCartTotal();
  }

  console.log("Cart after adding:", cart);
}

//remove from cart
function removeFromCart(event){
  const productID = parseInt(event.target.dataset.id);
  cart = cart.filter((item) => item.id !== productID);
  saveToLocalStorage();
  renderCartItems();
  calculateCartTotal();
  updateCartIcon();

}
//quantity change
function changeQuantity(event){
  const productID = parseInt(event.target.dataset.id);
  const quantity=parseInt(event.target.value);

  if(quantity > 0){
    const cartItem = cart.find((item) => item.id ===productID);
    if(cartItem){
      cartItem.quantity = quantity;
      saveToLocalStorage();
      calculateCartTotal();
      updateCartIcon();
    }
  }

}
//save to local storage
function saveToLocalStorage(){
  console.log("Cart saved to local storage:", cart);
  localStorage.setItem('cart', JSON.stringify(cart))
}

//render products on cart page
function renderCartItems(){
  console.log("Rendering cart items:", cart);
  if (!cartItemsElement) {
    console.error('cartItemsElement not found');
    return;
  }
  if (cart.length === 0) {
    console.log('Cart is empty');
    cartItemsElement.innerHTML = '<p>Your cart is empty.</p>';
    return;
  }
  cartItemsElement.innerHTML = cart.map(
      (item) => `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.title}">
        <div class="cart-item-info">
          <h2 class="cart-item-title">${item.title}</h2>
          <input 
          class="cart-item-quantity" 
          type="number" 
          min="1" 
          value="${item.quantity}" 
          data-id="${item.id}"
          />
          </div>
          <h2 class="cart-item-price">₱${item.price}</h2>
        <button class="remove-from-cart" data-id="${item.id}">Remove</button>
      </div>
      `
  ).join("");
  console.log("Cart items rendered.");
  //remove from cart
  const removeButtons = document.getElementsByClassName('remove-from-cart');
  for (let i = 0; i < removeButtons.length; i++){
      const removeButton = removeButtons[i]; // Corrected variable name
      removeButton.addEventListener('click', removeFromCart);
  }
  //quantity change
  const quantityInputs= document.querySelectorAll('.cart-item-quantity')
  quantityInputs.forEach((input) =>{
    input.addEventListener('change',changeQuantity);
  })
}

//calculate total
function calculateCartTotal(){
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  if (cartTotalElement) {
    cartTotalElement.textContent = `Total: ₱${total.toFixed(2)}`;
  } else {
    console.error('cartTotalElement not found');
  }
}
//check if on cart page
console.log(window.location.pathname); // Add this to debug the path
if (window.location.pathname.includes('cart.html')){
  calculateCartTotal();
  renderCartItems();
}else{
  renderProducts();
}

// cart icon quantity 
const cartIcon = document.getElementById('cart-icon')

function updateCartIcon(){
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0)
  cartIcon.setAttribute('data-quantity', totalQuantity)

}

updateCartIcon()
function updateCartIconOnCartChange(){
  updateCartIcon();
}

window.addEventListener('storage', updateCartIconOnCartChange);

function updateCartIcon() {
  const totalQuantity= cart.reduce((sum, item) => sum+item.quantity, 0)
  const cartIcon= document.getElementById('cart-icon');
  cartIcon.setAttribute('data-quantity', totalQuantity);
}

renderProducts();
renderCartItems();
calculateCartTotal();



let current = 0;
let prev = 2;
let next = 1;
const totalSlides = 3; // Define the total number of slides

slides[current].classList.add("active");

for (let i = 0; i < button.length; i++) {
    button[i].addEventListener("click", () => i == 0 ? gotoPrev() : gotoNext());
}

const gotoPrev = () => {
  current = current > 0 ? current - 1 : totalSlides - 1;
  gotoNum(current);
};

const gotoNext = () => {
  current = current < totalSlides - 1 ? current + 1 : 0;
  gotoNum(current);
};

const gotoNum = number => {
  current = number;
  prev = current > 0 ? current - 1 : totalSlides - 1;
  next = current < totalSlides - 1 ? current + 1 : 0;

  // Loop through slides and apply classes
  for (let i = 0; i < slides.length; i++) {
    slides[i].classList.remove("active", "prev", "next");
  }

  // Apply active, prev, and next classes to the corresponding slides
  slides[current].classList.add("active");
  slides[prev].classList.add("prev");
  slides[next].classList.add("next");
};

// Add to cart buttons in shop.html
const addToCartButtonsShop = document.querySelectorAll('.add-to-cart-below-carousel');

if (addToCartButtonsShop) {
  addToCartButtonsShop.forEach((button, index) => {
    button.addEventListener('click', () => addToCart(index + 6)); // Remove the +6
  });
}




const addToCartButtonsCarousel = document.querySelectorAll('.add-to-cart-below-carousel');

if (addToCartButtonsCarousel) {
  addToCartButtonsCarousel.forEach((button, index) => {
    button.addEventListener('click', () => {
      const productId = index + 6; // Adjust to match the product IDs in your array
      const product = products.find(product => product.id === productId);
      if (product) {
        addToCartFromCarousel(product);
        button.textContent = "Added"; // Change text to "Added"
      }
    });
  });
}


// Function to add item to cart from carousel
function addToCartFromCarousel(product) {
  // Check if the product already exists in the cart
  const existingItemIndex = cart.findIndex(item => item.id === product.id);

  if (existingItemIndex !== -1) {
    // If the product exists, update the quantity
    cart[existingItemIndex].quantity++;
  } else {
    // If the product does not exist, add it to the cart
    cart.push({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      quantity: 1,
    });
  }

  // Save the updated cart to localStorage
  saveToLocalStorage();

  // Update the cart icon, render the updated cart items, and calculate the total cart value
  updateCartIcon();
  renderCartItems();
  calculateCartTotal();
}

