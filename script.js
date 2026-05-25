// Wait for DOM content to finish parsing
document.addEventListener('DOMContentLoaded', () => {
    let cartCount = 0;
    const cartCountBadge = document.getElementById('cart-count');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');

    // Add click event listeners to all "Add to Cart" buttons
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const productName = e.target.getAttribute('data-name');
            const productPrice = e.target.getAttribute('data-price');

            // Increment Cart Count
            cartCount++;
            cartCountBadge.textContent = cartCount;

            // Simple visual response
            alert(`Added ${productName} ($${productPrice}) to your cart!`);
        });
    });

    // Optional click action for Cart Icon 
    const cartBtn = document.getElementById('cartBtn');
    cartBtn.addEventListener('click', () => {
        alert(`You have ${cartCount} item(s) in your cart.`);
    });
});