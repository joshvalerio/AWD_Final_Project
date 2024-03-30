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
      image: "image/2.png",
    },
    {
      id: 3,
      title: "2,700 PokéCoins",
      promo: "200 WEB STORE BONUS COINS",
      price: 589.00,
      image: "image/3.png",
    },
    {
      id: 4,
      title: "5,600 PokéCoins",
      promo: "400 WEB STORE BONUS COINS",
      price: 1169.00,
      image: "image/4.png",
    },
    {
      id: 5,
      title: "15,500 PokéCoins",
      promo: "1000 WEB STORE BONUS COINS ",
      price: 439.10,
      image: "image/5.png",
    },
    {
      id: 6,
      title: "Pokémon GO Fest 2024: Global Ticket",
      price: 439.10,
      image: "image/image4.PNG",
    },
    {
      id: 7,
      title: "GO Rocket Box",
      price: 289.00,
      image: "image/image2.PNG",
    },
    {
      id: 8,
      title: "Wonder Ticket",
      price: 289.00,
      image: "image/image3.PNG",
    },
  ];
  
// Store cart items in local storage
let cart = JSON.parse(localStorage.getItem("cart")) || [];
const cartItemsElement = document.getElementById('checkoutItems'); // Update the ID accordingly

document.addEventListener("DOMContentLoaded", function () {
    renderCartItems(); // Render cart items initially
    renderTransactionHistory(); // Render transaction history data
});

// Render cart items
function renderCartItems() {
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
            <p class="cart-item-quantity">Quantity: ${item.quantity}</p>
            </div>
            <h2 class="cart-item-price">₱${(item.price * item.quantity).toFixed(2)}</h2>
        </div>
        `
    ).join("");
    console.log("Cart items rendered.");
}
function renderTransactionHistory() {
    try {
        // Retrieve payment method data from local storage
        const savedPaymentMethod = JSON.parse(localStorage.getItem('paymentMethod'));
        // Retrieve billing address data from local storage
        const savedBillingAddress = JSON.parse(localStorage.getItem('billingAddress'));

        // Access the DOM elements where you want to render the data
        const paymentMethodContainer = document.getElementById('payment-method-info');
        const billingAddressContainer = document.getElementById('billing-address-info');

        // Check if payment method data exists
        if (savedPaymentMethod) {
            // Create HTML content to display payment method information
            const paymentMethodHTML = `
            <h2>Payment Method Information</h2>
            <p>Name on Card: ${savedPaymentMethod.nameOnCard}</p>
            <p>Card Number: ${savedPaymentMethod.cardNumber}</p>
            <p>Expiration Date: ${savedPaymentMethod.expirationDate}</p>
            <!-- Add more fields as needed -->
            `;
            // Set the HTML content to the container element
            paymentMethodContainer.innerHTML = paymentMethodHTML;
         } 

        // Check if billing address data exists
        if (savedBillingAddress) {
            // Create HTML content to display billing address information
            const billingAddressHTML = `
            <h2>Billing Address Information</h2>
            <p>Full Name: ${savedBillingAddress.fullName}</p>
            <p>Address: ${savedBillingAddress.address}</p>
            <p>City: ${savedBillingAddress.city}</p>
            <!-- Add more fields as needed -->
            `;
            // Set the HTML content to the container element
            billingAddressContainer.innerHTML = billingAddressHTML;
        }
    } catch (error) {
        console.error('Error rendering transaction history:', error.message);
    }
}

