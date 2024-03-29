function showPaymentMethod() {
    document.getElementById("billing-address").style.display = "none";
    document.getElementById("payment-method").style.display = "block";
}

function showTransactionComplete() {
    document.getElementById("payment-method").style.display = "none";
    document.getElementById("checkout-confirmation").style.display = "block";
}


const checkboxes = document.querySelectorAll('.payment-form input[type="checkbox"]');
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