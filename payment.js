function showPaymentMethod() {
    document.getElementById("billing-address").style.display = "none";
    document.getElementById("payment-method").style.display = "block";
}

function showTransactionComplete() {
    document.getElementById("payment-method").style.display = "none";
    document.querySelector(".checkout-confirmation").style.display = "block";
}