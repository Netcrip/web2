const products = [
    {
        id:1,
        img: "src/img/Red Jeans EDT.jpg",
        title: "Red Jeans EDT Ed. Limitada",
        description: "Una explosión de frescura con rosas búlgaras, frutas dulces, duraznos jugosos y la delicadeza de la fresia.",
        price: 120000,
        amount:10
    },
    {
        id:2,
        img: "src/img/Eros Flame EDP.jpg",
        title: "Eros Flame EDP",
        description: "Notas de Salida: Mandarina, pimienta negra, chinotto\nNotas de Corazón: Pimienta, Geranio, Rosa\nNotas de Fondo: Vainilla, Haba tonka, Sándalo",
        price: 230000,
        amount:5
    },
    {
        id:3,
        img: "src/img/Light Blue Summer.jpg",
        title: "Light Blue Summer Vibes EDT",
        description: "Notas de Salida: Limón siciliano.\nNotas de Corazón: Ciprés.\nNotas de Fondo: Amberwood",
        price: 210000,
        amount:50
    },
    {
        id:4,
        img: "src/img/Fresh Gold EDP.jpg",
        title: "Fresh Gold EDP Ed. Limitada EDT",
        description: "Notas de Salida: Pera, mango, durazno blanco, hojas de ruibarbo, pomelo y mandarina.\nNotas de Corazón: Jazmín, orquídea y lirio de los valles.\nNotas de Fondo: Vainilla, Akigalawood, almizcle, sándalo y pachulí.",
        price: 170000,
        amount:5
    },
    {
        id:5,
        img: "src/img/La Vie Est Bellle.jpg",
        title: "La Vie Est Belle Intensément EDP",
        description: "Notas de Salida: Limón siciliano.\nNotas de Corazón: Ciprés.\nNotas de Fondo: Amberwood",
        price: 180000,
        amount:25
    },
    {
        id:6,
        img: "src/img/Woman EDP.jpg",
        title: "Woman EDP",
        description: "Notas de Salida: Rosa, hoja de jazmin, bergamota.\nNotas de Corazón: Frambuesa, ciruela, flor de loto.\nNotas de Fondo: Almizcle, ámbar",
        price: 250000,
        amount:8
    },
    {
        id:7,
        img: "src/img/N°5 Eau De.jpg",
        title: "N°5 Eau De Parfum",
        description: "N°5, la esencia misma de la feminidad. Un bouquet floral aldehído sublimado por un frasco emblemático con líneas minimalistas. Un perfume icónico y atemporal.",
        price: 270000,
        amount:12
    },
    {
        id:8,
        img: "src/img/212 Vip Rose EDP.jpg",
        title: "212 Vip Rose EDP",
        description: "Notas de Salida: Champagne rosé, pimienta rosada.\nNotas de Corazón: Peach tree flower, bouquet of roses.\nNotas de Fondo: Queen wood, almizcle blanco y ámbar envolvente.",
        price: 280000,
        amount:41
    }
];


const productCards = document.getElementById('product-cards');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');

let cart = getCartFromStorage();

products.forEach((product, index) => {
    const card = document.createElement('div');
    // Agregamos las clases de Bootstrap para la responsividad
    card.classList.add('col-sm-12', 'col-md-6', 'col-xl-6', 'col-xxl-4', 'mb-4');

    const shortDescription = product.description.slice(0, 30);
    const hasMoreText = product.description.length > 30;

    card.innerHTML = `
        <div class="card h-100 d-flex flex-column">
            <div class="card-header">
                <h5 class="card-title">${product.title}</h5>
            </div>
            <img src="${product.img}" class="card-img-top" alt="${product.title}">
            <div class="card-body flex-grow-1">
                <p class="card-text">
                    <span class="short-description">${shortDescription}${hasMoreText ? '...' : ''}</span>
                    <span class="full-description d-none">${product.description}</span>
                    ${hasMoreText ? `<a href="#" class="toggle-description" onclick="toggleDescription(event, this)">más</a>` : ''}
                </p>
                <h6 class="card-subtitle mb-2 text-muted">$${Intl.NumberFormat("de-De").format(product.price)}</h6>
            </div>
            <p>Stock: ${product.amount}</p>
            <div class="card-footer">
                <button class="btn btn-primary w-100 animated-btn" onclick="addToCart(${index})">Agregar al carrito</button>
            </div>
        </div>
    `;

    productCards.appendChild(card);
});

function toggleDescription(event, element) {
    event.preventDefault();
    const cardBody = element.closest('.card-body');
    const shortDesc = cardBody.querySelector('.short-description');
    const fullDesc = cardBody.querySelector('.full-description');

    if (fullDesc.classList.contains('d-none')) {
        fullDesc.classList.remove('d-none');
        shortDesc.classList.add('d-none');
        element.textContent = 'menos';
    } else {
        fullDesc.classList.add('d-none');
        shortDesc.classList.remove('d-none');
        element.textContent = 'más';
    }
}


function addToCart(index) {
    const product = products[index];
    const existingIndex = cart.findIndex(item => item.title === product.title);
    if (existingIndex > -1) {
        if (cart[existingIndex].quantity < product.amount) {
            cart[existingIndex].quantity += 1;
        } else {
            sendAlert('No se pueden agregar más unidades de este producto. Límite alcanzado.');
            return; 
        }
    } else {
        if (product.amount > 0) {
            cart.push({ ...product, quantity: 1 });
        } else {
            sendAlert('No hay stock disponible para este producto.');
            return; 
        }
    }
    saveCartToStorage(cart);
    updateCart();
}

function sendAlert(message){
    const alertContainer = document.getElementById('Alert');
    const alert = document.createElement('div');
    alert.classList.add('alert', 'alert-danger', 'alert-dismissible', 'role-alert', 'fade', 'show');
    alert.role = 'alert';
    alert.role = 'alert';
    alert.style.position = 'fixed';
    alert.style.top = '50%';
    alert.style.left = '50%';
    alert.style.transform = 'translate(-50%, -50%)';
    alert.style.zIndex = '1050'; 
    alert.innerHTML = `
        <div class="alert alert-danger" role="alert">
        <h4 class="alert-heading">Error!</h4>
        ${message}
    `;
    alertContainer.appendChild(alert);
    alert.focus();
    setTimeout(() => {
        alert.classList.remove('show');
        alert.classList.add('fade');
    }, 3000); 
}


function removeFromCart(index) {
    cart.splice(index, 1);  
    saveCartToStorage(cart);
    updateCart();
}

function updateQuantity(index, quantity) {
    quantity = parseInt(quantity);
    if (quantity > 0 && quantity <= products[cart[index].id-1].amount) {
        cart[index].quantity = quantity;
    } else if (quantity === 0) {
        cart.splice(index, 1);
    }
    else
        sendAlert("Error");
    saveCartToStorage();
    updateCart();
}

function updateCart() {
    cartItems.innerHTML = '';
    let total = 0;
    cart.forEach((item, index) => {
        total += item.price * item.quantity;
        const li = document.createElement('li');
    
        li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
        li.innerHTML = `
            <div class="row"> 
            <div class="d-flex align-items-center col-lg-12 col-xl-8 col-md-8 ">
                <img src="${item.img}" class="img-thumbnail me-2" style="width: 50px; height: 50px; object-fit: cover;">
                <span>${item.title}</span>
                
            </div>
            <div class="col-lg-12 col-xl-4 col-md-4 align-self-center">
            <select class="form-select form-select-sm" onchange="updateQuantity(${index}, this.value)">
                    ${Array.from({ length: item.amount + 1 }, (_, i) => 
                        `<option value="${i}" ${i === item.quantity ? 'selected' : ''}>${i}</option>`
                    ).join('')}
            </select>
            <button class="btn btn-sm btn-danger " onclick="removeFromCart(${index})">&times;</button>
            </div>
        `;
        cartItems.appendChild(li);
    });
    cartTotal.textContent = `$${total.toLocaleString()}`;

    const checkoutButton = document.getElementById('checkout-button');
    if (cart.length === 0) {
        checkoutButton.disabled = true;
    } else {
        checkoutButton.disabled = false;
    }
}


function getCartFromStorage() { 
    const storedCart = localStorage.getItem('cart');

    try {
        return storedCart ? JSON.parse(storedCart) : [];
    } catch (error) {
        localStorage.removeItem('cart');
        return [];
    }
}


function saveCartToStorage(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
    sessionStorage.setItem('cart', JSON.stringify(cart));
}

document.addEventListener('DOMContentLoaded', () => {
    cart = getCartFromStorage();
    updateCart();
});

function finalizePurchase() {
    cart = [];
    updateCart(); 
    alert("Tu compra ha sido procesada correctamente.");
}