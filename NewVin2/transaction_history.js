document.addEventListener('DOMContentLoaded', function() {
    // Retrieve checked out items from local storage
    const checkoutItems = JSON.parse(localStorage.getItem('checkoutItems'));

    // Check if there are checked out items
    if (checkoutItems && checkoutItems.length > 0) {
        const checkoutItemsContainer = document.getElementById('checkoutItems');

        // Loop through the checked out items and display them
        checkoutItems.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.textContent = item;
            checkoutItemsContainer.appendChild(itemElement);
        });
    } else {
        // If no items are checked out, display a message
        const noItemsMessage = document.createElement('p');
        noItemsMessage.textContent = 'No items checked out.';
        document.getElementById('checkoutItems').appendChild(noItemsMessage);
    }
});
