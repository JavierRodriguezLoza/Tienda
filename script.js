// Datos y configuración
const productos = [
    { id: 1, tipo: "splendens", color: "Rojo", precio: 1500, imagen: "fas fa-fish" },
    { id: 2, tipo: "halfmoon", color: "Azul", precio: 1800, imagen: "fas fa-fish" },
    { id: 3, tipo: "crowntail", color: "Turquesa", precio: 1200, imagen: "fas fa-fish" },
    { id: 4, tipo: "plakat", color: "Acero", precio: 1000, imagen: "fas fa-fish" },
    { id: 5, tipo: "doubletail", color: "Opaco", precio: 2000, imagen: "fas fa-fish" },
    { id: 6, tipo: "dumbo", color: "Negro", precio: 1600, imagen: "fas fa-fish" },
    { id: 7, tipo: "splendens", color: "Naranja", precio: 1400, imagen: "fas fa-fish" },
    { id: 8, tipo: "halfmoon", color: "Blanco", precio: 1900, imagen: "fas fa-fish" },
    { id: 9, tipo: "crowntail", color: "Verde", precio: 1300, imagen: "fas fa-fish" },
    { id: 10, tipo: "plakat", color: "Violeta", precio: 1100, imagen: "fas fa-fish" },
    { id: 11, tipo: "doubletail", color: "Amarillo", precio: 1700, imagen: "fas fa-fish" },
    { id: 12, tipo: "dumbo", color: "Rosa", precio: 1500, imagen: "fas fa-fish" }
];

const tipoNombres = {
    "splendens": "Splendens", "halfmoon": "Media Luna", "crowntail": "Corona",
    "plakat": "Plakat", "doubletail": "Doble Cola", "dumbo": "Dumbo"
};

// Cache de elementos DOM
const elementos = {
    productosGrid: document.getElementById('productos-grid'),
    filtroTipo: document.getElementById('filtro-tipo'),
    filtroColor: document.getElementById('filtro-color'),
    filtroPrecio: document.getElementById('filtro-precio'),
    valorPrecio: document.getElementById('valor-precio'),
    btnLimpiar: document.getElementById('btn-limpiar-filtros')
};

let productosFiltrados = [...productos];

// Utilidades
const formateadorPrecio = new Intl.NumberFormat('es-CU', {
    style: 'currency',
    currency: 'CUP'
});

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    mostrarProductos(productos);
    configurarFiltros();
    configurarMenuMovil();
    configurarSmoothScroll();
});

// Mostrar productos
function mostrarProductos(productosArray) {
    elementos.productosGrid.innerHTML = productosArray.length === 0 ? `
        <div class="no-resultados">
            <i class="fas fa-search"></i>
            <p>No se encontraron peces con los filtros seleccionados.</p>
            <p>Intenta ajustar los criterios de búsqueda.</p>
        </div>
    ` : productosArray.map(producto => `
        <div class="producto-card">
            <div class="producto-imagen">
                <i class="${producto.imagen}"></i>
            </div>
            <div class="producto-info">
                <h3 class="producto-nombre">Betta ${tipoNombres[producto.tipo]}</h3>
                <p class="producto-color">${producto.color}</p>
                <p class="producto-precio">${formateadorPrecio.format(producto.precio)}</p>
                <button class="btn-primary" onclick="contactarPorProducto('${tipoNombres[producto.tipo]}', '${producto.color}', ${producto.precio})">
                    <i class="fas fa-info-circle"></i> Más Información
                </button>
            </div>
        </div>
    `).join('');
}

// Configuración de filtros
function configurarFiltros() {
    elementos.filtroPrecio.min = 0;
    elementos.filtroPrecio.max = 2000;
    elementos.filtroPrecio.value = 2000;
    
    // Event listeners unificados
    [elementos.filtroTipo, elementos.filtroColor].forEach(elemento => {
        elemento.addEventListener('change', aplicarFiltros);
    });
    
    elementos.filtroPrecio.addEventListener('input', () => {
        const valor = parseInt(elementos.filtroPrecio.value);
        elementos.valorPrecio.textContent = valor === 2000 ? 'Cualquier precio' : `Hasta ${valor} CUP`;
        aplicarFiltros();
    });
    
    elementos.btnLimpiar.addEventListener('click', () => {
        elementos.filtroTipo.value = 'todos';
        elementos.filtroColor.value = 'todos';
        elementos.filtroPrecio.value = 2000;
        elementos.valorPrecio.textContent = 'Cualquier precio';
        aplicarFiltros();
    });
}

// Aplicar filtros optimizado
function aplicarFiltros() {
    const tipoSeleccionado = elementos.filtroTipo.value;
    const colorSeleccionado = elementos.filtroColor.value;
    const precioMaximo = parseInt(elementos.filtroPrecio.value);
    
    productosFiltrados = productos.filter(producto => {
        const coincideTipo = tipoSeleccionado === 'todos' || producto.tipo === tipoSeleccionado;
        const coincideColor = colorSeleccionado === 'todos' || producto.color.toLowerCase() === colorSeleccionado.toLowerCase();
        const coincidePrecio = precioMaximo === 2000 || producto.precio <= precioMaximo;
        
        return coincideTipo && coincideColor && coincidePrecio;
    });
    
    mostrarProductos(productosFiltrados);
}

// Contacto por producto
function contactarPorProducto(tipo, color, precio) {
    const mensaje = `Hola, estoy interesado en el Betta ${tipo} de color ${color} (${formateadorPrecio.format(precio)}). ¿Podrían darme más información?`;
    const urlWhatsApp = `https://wa.me/+5356374820?text=${encodeURIComponent(mensaje)}`;
    window.open(urlWhatsApp, '_blank');
}

// Menú móvil optimizado
function configurarMenuMovil() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.nav');
    
    if (!menuToggle || !nav) return;
    
    menuToggle.addEventListener('click', () => {
        const estaActivo = nav.classList.toggle('active');
        const icon = menuToggle.querySelector('i');
        icon.className = estaActivo ? 'fas fa-times' : 'fas fa-bars';
    });
    
    // Cerrar menú al hacer clic en enlaces
    document.querySelectorAll('.nav a').forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            menuToggle.querySelector('i').className = 'fas fa-bars';
        });
    });
}

// Smooth scroll optimizado
function configurarSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}