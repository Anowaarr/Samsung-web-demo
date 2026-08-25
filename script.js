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

document.addEventListener('DOMContentLoaded', () => {
    // 1. Core State Initialization (Load existing cart from LocalStorage)
    let cart = JSON.parse(localStorage.getItem('galaxy_cart')) || [];
    
    // Elements present across pages
    const cartCountBadge = document.getElementById('cart-count');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');

    // Update global badge counter view 
    function updateNavbarBadge() {
        if (cartCountBadge) {
            cartCountBadge.textContent = cart.length;
        }
    }
    updateNavbarBadge();

    // 2. Add To Cart Logic
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const name = e.target.getAttribute('data-name');
            const price = parseFloat(e.target.getAttribute('data-price'));

            // Push object record to state
            cart.push({ name, price });
            localStorage.setItem('galaxy_cart', JSON.stringify(cart));
            
            updateNavbarBadge();
            alert(`"${name}" has been added to your shopping cart!`);
        });
    });

    // 3. Dedicated Cart Page Rendering Engine
    const cartItemsContainer = document.getElementById('cart-items-container');
    if (cartItemsContainer) {
        renderCartPage();
    }

    function renderCartPage() {
        cartItemsContainer.innerHTML = ''; // Clear container frame

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = `
                <div class="text-center py-5">
                    <i class="bi bi-bag-x display-1 text-muted"></i>
                    <p class="fs-5 text-muted mt-3">Your cart feels uniquely light. Add items to get started.</p>
                    <a href="index.html" class="btn btn-dark rounded-pill px-4 mt-2">Shop Our Products</a>
                </div>`;
            updateSummaryTotals(0);
            return;
        }

        let subtotal = 0;

        // Render each item line-by-line
        cart.forEach((item, index) => {
            subtotal += item.price;

            const itemRow = document.createElement('div');
            itemRow.className = "d-flex justify-content-between align-items-center mb-4 pb-3 border-bottom";
            itemRow.innerHTML = `
                <div class="d-flex align-items-center">
                    <div class="bg-light p-2 rounded-3 me-3" style="width: 60px; height: 60px; display: flex; align-items: center; justify-content: center;">
                        <i class="bi bi-laptop-adaptive fs-3"></i>
                    </div>
                    <div>
                        <h6 class="fw-bold mb-0">${item.name}</h6>
                        <small class="text-muted">Standard Delivery</small>
                    </div>
                </div>
                <div class="text-end">
                    <span class="fw-bold d-block">$${item.price.toFixed(2)}</span>
                    <button class="btn btn-link text-danger p-0 btn-sm text-decoration-none remove-item" data-index="${index}">Remove</button>
                </div>
            `;
            cartItemsContainer.appendChild(itemRow);
        });

        updateSummaryTotals(subtotal);
        attachRemoveEventListeners();
    }

    function updateSummaryTotals(subtotal) {
        const tax = subtotal * 0.10; // Simple 10% tax calculation
        const total = subtotal + tax;

        if(document.getElementById('summary-subtotal')) {
            document.getElementById('summary-subtotal').textContent = `$${subtotal.toFixed(2)}`;
            document.getElementById('summary-tax').textContent = `$${tax.toFixed(2)}`;
            document.getElementById('summary-total').textContent = `$${total.toFixed(2)}`;
        }
    }

    function attachRemoveEventListeners() {
        const removeButtons = document.querySelectorAll('.remove-item');
        removeButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const targetIndex = parseInt(e.target.getAttribute('data-index'));
                cart.splice(targetIndex, 1); // Remove item array entry
                localStorage.setItem('galaxy_cart', JSON.stringify(cart));
                renderCartPage(); // Refresh container interface
            });
        });
    }

    // 4. Reset Cart Functionality
    const clearCartBtn = document.getElementById('clearCartBtn');
    if (clearCartBtn) {
        clearCartBtn.addEventListener('click', () => {
            cart = [];
            localStorage.setItem('galaxy_cart', JSON.stringify(cart));
            renderCartPage();
        });
    }
});