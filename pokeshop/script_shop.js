// Products Array
const products = [
    {
      id: 1,
      title: "600 PokéCoins",
      price: 149.00,
      image:
        "image/1.png",
    },
    {
      id: 2,
      title: "1,300 PokéCoins",
      price: 289.00,
      image:
        "image/2.png",
    },
    {
      id: 3,
      title: "2,700 PokéCoins",
      price: 589.00,
      image:
        "image/3.png",
    },
    {
      id: 4,
      title: "5,600 PokéCoins",
      price: 1169.00,
      image:
        "image/4.png",
    },
    {
      id: 5,
      title: "15,500 PokéCoins",
      price: 2950.00,
      image:
        "image/5.png",
    },
    {
      id: 6,
      title: "Cotton Hoodie",
      price: 395,
      image:
        "https://pangaia.com/cdn/shop/files/Reclaim-3.0-Hoodie-Reclaim-Jade-Womens-3.jpg?v=1693398673&width=1426",
    },
    {
      id: 7,
      title: "CLASSIC CREWNECK",
      price: 48.99,
      image:
        "https://img01.ztat.net/article/spp-media-p1/10cea44041564f81ac585fc6c8978907/c4c32dbc45dd4dbc9d15087c846538f2.jpg?imwidth=1800",
    },
    {
      id: 8,
      title: "TAPE HOODED",
      price: 79.99,
      image:
        "https://img01.ztat.net/article/spp-media-p1/d391f90be278469ebfdff731800cfccc/6d2101bd672f4e059501f01fe726f315.jpg?imwidth=1800",
    },
  ];
  
  //get product list
  const productList = document.getElementById('productList')
  const cartItemsElement = document.getElementById('cartItems')
  const cartTotalElement = document.getElementById('cartTotal')
  
  //store cart items in local storage
  let cart= JSON.parse (localStorage.getItem("cart")) || [];
  
  //render products on page
  function renderProducts(){
    productList.innerHTML= products.map(
        (product) =>`
        <div class="product">
        <img src="${product.image}" alt="${product.title}" class="product-img">
        <div class="product-info">
            <h2 class="product-title">${product.title}</h2>
            <p class="product-price">₱${product.price.toFixed(2)}</p>
            <a class="add-to-cart" data-id="${product.id}">Add to cart</a>
        </div>
    </div>
        `
    )
    .join("");
    // add to cart
    const addToCartButtons = document.getElementsByClassName('add-to-cart');
    for (let i= 0; i< addToCartButtons.length; i++){
        const addToCartButton = addToCartButtons[i];
        addToCartButton.addEventListener('click', addToCart)
    }
  }
  
  //add to cart
  function addToCart(event){
    const productID = parseInt(event.target.dataset.id);
    const product = products.find((product) => product.id === productID);
  
    if(product){
        // If product already in cart
        const existingItem = cart.find((item) => item.id === productID);
  
        if(existingItem){
            existingItem.quantity++;
        } else{
            const cartItem = {
                id: product.id,
                title: product.title,
                price: product.price,
                image: product.image,
                quantity: 1,
            };
            cart.push(cartItem);
        }
        //change add to to cart text to added
        event.target.textContent = "Added";
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
            <h2 class="cart-item-price">$${item.price}</h2>
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
      cartTotalElement.textContent = `Total: $${total.toFixed(2)}`;
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
  
  function updateCartIcon(){
    const totalQuantity= cart.reduce((sum, item) => sum+item.quantity, 0)
    const cartIcon= document.getElementById('cart-icon');
    cartIcon.setAttribute('data-quantity', totalQuantity);
  }
  
  
  
  renderProducts();
  renderCartItems();
  calculateCartTotal();
  