// Function to increment quantity
function increment(element) {
  // Find the closest quantity element
  const quantityElement = element.parentElement.querySelector('.quantity');
  
  // Get current quantity and increment
  let quantity = parseInt(quantityElement.textContent);
  quantity++;
  
  // Update displayed quantity
  quantityElement.textContent = quantity;
  
  // Update the total price
  updateTotalPrice();
}

// Function to decrement quantity
function decrement(element) {
  // Find the closest quantity element
  const quantityElement = element.parentElement.querySelector('.quantity');
  
  // Get current quantity
  let quantity = parseInt(quantityElement.textContent);
  
  // Only decrement if quantity is greater than 0
  if (quantity > 0) {
    quantity--;
    quantityElement.textContent = quantity;
    
    // Update the total price
    updateTotalPrice();
  }
}

// Function to update the total price based on all items
function updateTotalPrice() {
  // Get all products
  const products = document.querySelectorAll('.card-body');
  let totalPrice = 0;
  
  // Calculate total based on each product's quantity and unit price
  products.forEach(product => {
    // Skip if this is the parent container instead of an actual product
    if (!product.querySelector('.unit-price')) return;
    
    const unitPriceText = product.querySelector('.unit-price').textContent;
    const unitPrice = parseFloat(unitPriceText.replace(' $', ''));
    const quantity = parseInt(product.querySelector('.quantity').textContent);
    
    // Add to total (quantity * unit price)
    totalPrice += quantity * unitPrice;
  });
  
  // Update the total price display
  const totalElement = document.querySelector('.total');
  totalElement.textContent = totalPrice.toFixed(2) + ' $';
}

// Function to set up delete functionality
function setupDeleteButtons() {
  const deleteButtons = document.querySelectorAll('.fa-trash-alt');
  
  deleteButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Find the card container to remove
      const cardBody = this.closest('.card-body');
      
      // Add a fade-out effect
      cardBody.style.transition = 'opacity 0.5s';
      cardBody.style.opacity = '0';
      
      // Remove the element after animation completes
      setTimeout(() => {
        cardBody.remove();
        updateTotalPrice();
      }, 500);
    });
  });
}

// Function to set up like functionality
function setupLikeButtons() {
  const likeButtons = document.querySelectorAll('.fa-heart');
  
  likeButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Toggle the color by adding/removing class
      this.classList.toggle('liked');
      
      // Visual feedback - pulse animation
      this.classList.add('pulse');
      setTimeout(() => {
        this.classList.remove('pulse');
      }, 300);
    });
  });
}

// Initial setup when the document is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Set up event listeners for increment and decrement
  // Note: These are already set up via inline onclick in HTML
  
  // Set up delete functionality
  setupDeleteButtons();
  
  // Set up like functionality
  setupLikeButtons();
  
  // Initial calculation of total
  updateTotalPrice();
});

// Add CSS for the liked heart and animations
document.head.insertAdjacentHTML('beforeend', `
  <style>
    .fa-heart.liked {
      color: red;
    }
    
    .pulse {
      animation: pulse-animation 0.3s;
    }
    
    @keyframes pulse-animation {
      0% { transform: scale(1); }
      50% { transform: scale(1.5); }
      100% { transform: scale(1); }
    }
  </style>
`);
 