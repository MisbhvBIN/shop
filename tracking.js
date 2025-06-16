// Order tracking functionality
document.addEventListener('DOMContentLoaded', function() {
    loadOrderTracking();
    
    // Refresh tracking button
    const refreshButton = document.getElementById('refreshTracking');
    if (refreshButton) {
        refreshButton.addEventListener('click', function() {
            this.textContent = 'Odświeżanie...';
            this.disabled = true;
            
            setTimeout(() => {
                loadOrderTracking();
                this.textContent = 'Odśwież status';
                this.disabled = false;
                showToast('Status zaktualizowany', 'Informacje o przesyłce zostały odświeżone.');
            }, 1500);
        });
    }
});

// Load order tracking information
function loadOrderTracking() {
    const order = JSON.parse(localStorage.getItem('lastOrder'));
    
    if (!order) {
        // If no order found, show error or redirect
        document.querySelector('.tracking-content').innerHTML = `
            <div class="text-center">
                <h2>Nie znaleziono zamówienia</h2>
                <p>Nie można znaleźć informacji o zamówieniu do śledzenia.</p>
                <a href="index.html" class="btn btn-primary">Wróć do strony głównej</a>
            </div>
        `;
        return;
    }
    
    // Update order number and tracking code
    const orderNumberElement = document.getElementById('orderNumber');
    const trackingCodeElement = document.getElementById('trackingCode');
    
    if (orderNumberElement) orderNumberElement.textContent = '#' + order.orderNumber;
    if (trackingCodeElement) trackingCodeElement.textContent = order.trackingCode;
    
    // Generate tracking timeline
    generateTrackingTimeline(order);
    
    // Generate current location
    generateCurrentLocation(order);
    
    // Load order details
    loadOrderDetails(order);
}

// Generate tracking timeline
function generateTrackingTimeline(order) {
    const timeline = document.getElementById('trackingTimeline');
    if (!timeline) return;
    
    const orderDate = new Date(order.createdAt);
    const now = new Date();
    const deliveryDate = new Date(order.estimatedDelivery);
    
    // Calculate timeline steps
    const timelineSteps = [
        {
            status: 'Zamówienie złożone',
            date: orderDate,
            description: 'Twoje zamówienie zostało pomyślnie złożone i opłacone.',
            completed: true
        },
        {
            status: 'Zamówienie w przygotowaniu',
            date: new Date(orderDate.getTime() + 2 * 60 * 60 * 1000), // 2 hours after order
            description: 'Przygotowujemy Twoje produkty do wysyłki.',
            completed: now > new Date(orderDate.getTime() + 2 * 60 * 60 * 1000)
        },
        {
            status: 'Wysłano',
            date: new Date(orderDate.getTime() + 24 * 60 * 60 * 1000), // 1 day after order
            description: 'Przesyłka została przekazana do kuriera.',
            completed: now > new Date(orderDate.getTime() + 24 * 60 * 60 * 1000),
            active: now > new Date(orderDate.getTime() + 24 * 60 * 60 * 1000) && now < deliveryDate
        },
        {
            status: 'W transporcie',
            date: new Date(orderDate.getTime() + 48 * 60 * 60 * 1000), // 2 days after order
            description: 'Przesyłka jest w drodze do Ciebie.',
            completed: now > new Date(orderDate.getTime() + 48 * 60 * 60 * 1000),
            active: now > new Date(orderDate.getTime() + 48 * 60 * 60 * 1000) && now < deliveryDate
        },
        {
            status: 'Dostarczone',
            date: deliveryDate,
            description: 'Przesyłka została dostarczona.',
            completed: now > deliveryDate
        }
    ];
    
    timeline.innerHTML = '';
    
    timelineSteps.forEach(step => {
        const timelineItem = document.createElement('div');
        timelineItem.className = `timeline-item ${step.completed ? 'completed' : ''} ${step.active ? 'active' : ''}`;
        
        timelineItem.innerHTML = `
            <div class="timeline-status">${step.status}</div>
            <div class="timeline-date">${step.date.toLocaleDateString('pl-PL')} ${step.date.toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit' })}</div>
            <div class="timeline-description">${step.description}</div>
        `;
        
        timeline.appendChild(timelineItem);
    });
}

// Generate current location
function generateCurrentLocation(order) {
    const currentLocationElement = document.getElementById('currentLocation');
    const estimatedDeliveryElement = document.getElementById('estimatedDelivery');
    
    if (!currentLocationElement || !estimatedDeliveryElement) return;
    
    // Generate random location based on order progress
    const locations = [
        'Magazyn - Warszawa',
        'Centrum sortownicze - Łódź',
        'W transporcie - Kraków',
        'Centrum doręczeń - ' + order.customerInfo.city,
        'Kurier w drodze - ' + order.customerInfo.city
    ];
    
    const orderDate = new Date(order.createdAt);
    const now = new Date();
    const deliveryDate = new Date(order.estimatedDelivery);
    
    let currentLocationIndex = 0;
    const hoursElapsed = (now - orderDate) / (1000 * 60 * 60);
    
    if (hoursElapsed > 2) currentLocationIndex = 1;
    if (hoursElapsed > 24) currentLocationIndex = 2;
    if (hoursElapsed > 48) currentLocationIndex = 3;
    if (hoursElapsed > 60) currentLocationIndex = 4;
    if (now > deliveryDate) currentLocationIndex = 4;
    
    currentLocationElement.textContent = locations[currentLocationIndex];
    
    // Calculate estimated delivery
    const deliveryOptions = [
        'Dziś do 18:00',
        'Jutro do 12:00',
        deliveryDate.toLocaleDateString('pl-PL') + ' do 18:00'
    ];
    
    let deliveryText = deliveryOptions[2]; // Default
    
    if (now > deliveryDate) {
        deliveryText = 'Dostarczono';
    } else if (deliveryDate.toDateString() === now.toDateString()) {
        deliveryText = deliveryOptions[0];
    } else if (deliveryDate.toDateString() === new Date(now.getTime() + 24 * 60 * 60 * 1000).toDateString()) {
        deliveryText = deliveryOptions[1];
    }
    
    estimatedDeliveryElement.textContent = deliveryText;
}

// Load order details
function loadOrderDetails(order) {
    const orderItemsList = document.getElementById('orderItemsList');
    const deliveryAddress = document.getElementById('deliveryAddress');
    
    if (orderItemsList) {
        orderItemsList.innerHTML = '';
        
        order.items.forEach(item => {
            const orderItem = document.createElement('div');
            orderItem.className = 'order-item';
            orderItem.innerHTML = `
                <div class="item-info">
                    <div class="item-name">${item.name}</div>
                    <div class="item-details">
                        Rozmiar: ${item.size} | Kolor: ${item.color} | Ilość: ${item.quantity}
                    </div>
                </div>
                <div class="item-price">${(item.price * item.quantity).toFixed(2)} zł</div>
            `;
            orderItemsList.appendChild(orderItem);
        });
        
        // Add total
        const totalItem = document.createElement('div');
        totalItem.className = 'order-item total';
        totalItem.innerHTML = `
            <div class="item-info">
                <div class="item-name"><strong>Razem</strong></div>
            </div>
            <div class="item-price"><strong>${order.total.toFixed(2)} zł</strong></div>
        `;
        orderItemsList.appendChild(totalItem);
    }
    
    if (deliveryAddress) {
        deliveryAddress.innerHTML = `
            <p><strong>${order.customerInfo.firstName} ${order.customerInfo.lastName}</strong></p>
            <p>${order.customerInfo.address}</p>
            <p>${order.customerInfo.postalCode} ${order.customerInfo.city}</p>
            <p>Tel: ${order.customerInfo.phone}</p>
            <p>Email: ${order.customerInfo.email}</p>
        `;
    }
}

// Show toast notification
function showToast(title, message) {
    const toast = document.getElementById('toast');
    if (toast) {
        const toastTitle = toast.querySelector('.toast-title');
        const toastMessage = toast.querySelector('.toast-message');
        
        if (toastTitle) toastTitle.textContent = title;
        if (toastMessage) toastMessage.textContent = message;
        
        toast.classList.add('show');
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }
}
