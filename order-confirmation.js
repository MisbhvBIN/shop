// Order confirmation page functionality
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on the order confirmation page
    const orderNumberElement = document.getElementById('orderNumber');
    if (!orderNumberElement) return;
    
    // Get order number from localStorage
    const orderNumber = localStorage.getItem('lastOrderNumber') || 'SH0000';
    
    // Display order number
    orderNumberElement.textContent = '#' + orderNumber;
});
