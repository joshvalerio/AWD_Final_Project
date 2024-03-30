// Function to save payment method data to local storage
function savePaymentMethod() {
    const paymentForm = document.getElementById('payment-form');
    const formData = new FormData(paymentForm);
    const paymentMethod = {};
    formData.forEach((value, key) => {
        paymentMethod[key] = value;
    });
    localStorage.setItem('paymentMethod', JSON.stringify(paymentMethod));
}

// Function to save billing address data to local storage
function saveBillingAddress() {
    const billingForm = document.getElementById('billing-form');
    const formData = new FormData(billingForm);
    const billingAddress = {};
    formData.forEach((value, key) => {
        billingAddress[key] = value;
    });
    localStorage.setItem('billingAddress', JSON.stringify(billingAddress));
}

// Function to handle checkbox change event
function handleCheckboxChange() {
    const checkboxes = document.querySelectorAll('#payment-form input[type="radio"]');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            checkboxes.forEach(cb => {
                const label = cb.parentElement;
                if (cb.checked) {
                    label.style.boxShadow = '0px 0px 0px 1px #6064b6';
                    label.querySelector('.check').style.display = 'block';
                } else {
                    label.style.boxShadow = '0px 0px 0px 1px rgba(0, 0, 0, 0.2)';
                    label.querySelector('.check').style.display = 'none';
                 }
            });
        });
    });
}

// Function to show payment method section
function showPaymentMethod() {
    saveBillingAddress(); // Save billing address data before showing payment method
    document.getElementById('billing-address').style.display = 'none';
    document.getElementById('payment-method').style.display = 'block';
    handleCheckboxChange();
    savePaymentMethod();
}

// Function to show transaction completion message and save payment method data
function showTransactionComplete() {
    savePaymentMethod(); // Save payment method data before showing confirmation
    document.getElementById("payment-method").style.display = "none";
    document.getElementById("checkout-confirmation").style.display = "block";
}