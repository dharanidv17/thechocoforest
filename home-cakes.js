// Home Page Cakes JavaScript - Dynamic loading from cakes-data.js

let homeCakes = [];

// Function to load cakes from cakes-data.js (for home page - show first 6)
function loadHomeCakes() {
    // CAKES_DATA is loaded from cakes-data.js script
    if (typeof CAKES_DATA !== 'undefined') {
        // Show only first 6 cakes on home page
        homeCakes = CAKES_DATA.slice(0, 6);
        renderHomeCakes();
    } else {
        console.error('Cakes data not loaded. Make sure cakes-data.js is included before home-cakes.js');
    }
}

// Function to render cakes on home page
function renderHomeCakes() {
    const gallery = document.getElementById('homeCakesGallery');
    if (!gallery) return;

    gallery.innerHTML = '';

    homeCakes.forEach(cake => {
        const col = document.createElement('div');
        col.className = 'col-lg-4 col-md-6';
        
        col.innerHTML = `
            <div class="cake-card clickable-cake" data-cake-id="${cake.id}">
                <img src="${cake.image}" alt="${cake.name}" class="cake-image" loading="lazy">
                <div class="cake-card-body">
                    <h3 class="cake-name">${cake.name}</h3>
                    <p class="cake-description">${cake.description}</p>
                </div>
            </div>
        `;
        
        gallery.appendChild(col);
    });

    // Add click event listeners for modal
    const cakeCards = document.querySelectorAll('#homeCakesGallery .clickable-cake');
    cakeCards.forEach(card => {
        card.addEventListener('click', function() {
            const cakeId = parseInt(this.getAttribute('data-cake-id'));
            openHomeCakeModal(cakeId);
        });
    });
}

// Function to open cake modal on home page
function openHomeCakeModal(cakeId) {
    const cake = homeCakes.find(c => c.id === cakeId);
    if (!cake) return;

    const modal = new bootstrap.Modal(document.getElementById('homeCakeModal'));
    
    const modalImage = document.getElementById('homeModalCakeImage');
    modalImage.src = cake.image;
    modalImage.alt = cake.name;
    document.getElementById('homeModalCakeName').textContent = cake.name;
    document.getElementById('homeModalCakeDescription').textContent = cake.description;
    
    // Update WhatsApp link with cake name
    const whatsappLink = document.getElementById('homeModalWhatsAppLink');
    if (whatsappLink) {
        const message = encodeURIComponent(`Hi The Choco Forest 🍫✨ I would like to order ${cake.name}! Could you please share the price details?`);
        whatsappLink.href = `https://wa.me/919962649498?text=${message}`;
    }
    
    modal.show();
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    loadHomeCakes();
});

