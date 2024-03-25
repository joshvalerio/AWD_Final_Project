const products = [
    {
        "id": 1,
        "title": "600 PokéCoins",
        "pro": "50 WEB STORE BONUS COINS",
        "price": "149.00",
        "image": "images/1.png",
        "description": "550 + 50 Web Store Bonus = 600 total PokéCoins"
    },
    {
        "id": 2,
        "title": "1,300 PokéCoins",
        "pro": "100 WEB STORE BONUS COINS",
        "price": "289.00",
        "image": "images/2.png",
        "description": "1,200 + 100 Web Store Bonus = 1,300 total PokéCoins."
    },
    {
        "id": 3,
        "title": "2,700 PokéCoins",
        "pro": "200 WEB STORE BONUS COINS",
        "price": "589.00",
        "image": "images/3.png",
        "description": "2,500 + 200 Web Store Bonus = 2,700 total PokéCoins."
    },
    {
        "id": 4,
        "title": "5,600 PokéCoins",
        "pro": "400 WEB STORE BONUS COINS",
        "price": "1169.00",
        "image": "images/4.png",
        "description": "5,200 + 400 Web Store Bonus = 5,600 total PokéCoins."
    },
    {
        "id": 5,
        "title": "15,500 PokéCoins",
        "pro": "1000 WEB STORE BONUS COINS",
        "price": "2950.00",
        "image": "images/5.png",
        "description": "14,500 + 1,000 Web Store Bonus = 15,500 total PokéCoins."
    }
];

//get the products list and elements
const productList =documentgetElementById('productList') 
const cartItemsElement =documentgetElementById('cartItems') 
const cartTotalElement =documentgetElementById('cartTotal') 

//store cart items in local storage
let cart=JSON.parse(localStorage.getItem('cart')) || [];

//render product on page
function renderProducts(){
    productList.innerHTML = products
    .map(
        (product) => `
        <div class="product">
        <img src="${product.image}" alt="${product.title}" class="product-img">
        <div class="product-info">
          <h2 class="product-title">${product.title}</h2>
          <p class="product-price">$${product.price.toFixed(2)}</p>
          <a class="add-to-cart">data-id="${product.id}Add to cart</a>
        </div>
      </div>
        `
    )
    .join("");
    //add to cart
    const addtoCartButtons = document.getElementsByClassName('add-to-cart');
    for (let i = 0; 1 < addToCartButton.length; i++) {
        const addToCartButton = addToCartButtons[i];
        addToCartButton. addEventListener ('click',addToCart )
    }
}

//add to cart
function addtocart(event) {
    const productID = parseInt(event.target.dataset.id);
    const product =products.find((product) => product.id === productID);
    
    if (exixtingItem){
        exixtingItem.quantity++;
    }else{
        const cartItems ={
        id: product.id,
        title: product.title,
        price: product. price,
        image: product.image,
        quantity: 1,
        };
        cart.push(cartItem);
    }
    // change add to cart text to added
    event.target.textContent = "Added"
    renderCartItems();
    saveToLocalStorage();
    calculateCartTotlal();
}

//Remove from cart
function removeFromCart (event){
    const productID = parseInt(event.target.dataset.id);
    cart = cart.filter((item) => item.id !== productID);
    saveToLocalStorage();
    renderCartItems ();
    calculateCartTotlal();
}

//Quantity Change
function changeQuantity(event){
    const productID = parseint(event.target.dataset.id);
    const quantity = parseint (event.target.value);
    if (quantity > 0){
    const cartItem = cart. find ((item) => item.id === productID)
    if(cartItem) {
        cartItem. quantity = quantity;
        saveToLocalStorage();
        calculateCartTotlal();
    }
    }
}

//save to local storage
function saveToLocalStorage(){
    localStorage.setItem("cart",JSON.stringify(cart));
}


//render products on cart page
function renderCartItems(){
    cartItemsElement.innerHTML =cart
    .map(
        (item)=>`
        <div class="cart-item">
        <img src="${item.image}" alt="${item.title}">
        <div class="cart-item-info">
          <h2 class="cart-item-title">${item.image}</h2>
          <input class = "cart-item-quantity" type="number" name="" min = "1" value ="${item.quantity}" data-id="${item.id}"/>
        </div>
        <h2 class="cart-item-price">${item.price}</h2>
        <button class="remove-from-cart" data-id ="${item.id}">Remove</button>
      </div>
        `
    )
    .join("")
    //remove from cart
    const removertoCartButtons = document.getElementsByClassName('remover-to-cart');
    for (let i = 0; 1 < removertoCartButtons.length; i++) {
        const removertoCartButton = removertoCartButtons[i];
        removeButton. addEventListener ('click',RemoveFromCart )
    }
}

// Claculate Total
function calculateCartTotlal() {
    const total = cart. reduce ((sum,item) => sum + item.price * item.quantity, 0);
    cartTotalElement. textContent = `Total: $$(total.toFixed(2)}`;
}
//check if on cart page
if(window.location.pathname.includes('shop.html')){
    renderCartItems();
    calculateCartTotlal();
}else{
    renderProducts();
}

renderProducts();
renderCartItems();
calculateCartTotlal();
