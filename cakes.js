// Cakes Gallery JavaScript - Dynamic loading from cakes-data.js

let cakes = [];

// Function to load cakes from cakes-data.js
function loadCakes() {
    // CAKES_DATA is loaded from cakes-data.js script
    if (typeof CAKES_DATA !== 'undefined') {
        cakes = CAKES_DATA;
        renderCakes();
    } else {
        console.error('Cakes data not loaded. Make sure cakes-data.js is included before cakes.js');
        const gallery = document.getElementById('cakesGallery');
        if (gallery) {
            gallery.innerHTML = '<div class="col-12 text-center"><p>Unable to load cakes. Please check that cakes-data.js is loaded.</p></div>';
        }
    }
}

// Function to render cakes
function renderCakes() {
    const gallery = document.getElementById('cakesGallery');
    if (!gallery) return;

    gallery.innerHTML = '';

    cakes.forEach(cake => {
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

    // Add click event listeners
    const cakeCards = document.querySelectorAll('.clickable-cake');
    cakeCards.forEach(card => {
        card.addEventListener('click', function() {
            const cakeId = parseInt(this.getAttribute('data-cake-id'));
            openCakeModal(cakeId);
        });
    });
}

// Function to open cake modal
function openCakeModal(cakeId) {
    const cake = cakes.find(c => c.id === cakeId);
    if (!cake) return;

    const modal = new bootstrap.Modal(document.getElementById('cakeModal'));
    
    const modalImage = document.getElementById('modalCakeImage');
    modalImage.src = cake.image;
    modalImage.alt = cake.name;
    document.getElementById('modalCakeName').textContent = cake.name;
    document.getElementById('modalCakeDescription').textContent = cake.description;
    
    // Update WhatsApp link with cake name
    const whatsappLink = document.getElementById('modalWhatsAppLink');
    if (whatsappLink) {
        const message = encodeURIComponent(`Hi The Choco Forest 🍫✨ I would like to order ${cake.name}! Could you please share the price details?`);
        whatsappLink.href = `https://wa.me/919962649498?text=${message}`;
    }
    
    modal.show();
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    loadCakes();
});
