// Base de datos de productos (fácil de modificar)
const productos = [
    {
        id: 1,
        nombre: "Betta Splendens Rojo",
        tipo: "splendens",
        color: "rojo",
        precio: 25,
        imagen: ""
    },
    {
        id: 2,
        nombre: "Betta Halfmoon Azul",
        tipo: "halfmoon",
        color: "azul",
        precio: 40,
        imagen: ""
    },
    {
        id: 3,
        nombre: "Betta Crowntail Turquesa",
        tipo: "crowntail",
        color: "turquesa",
        precio: 35,
        imagen: ""
    },
    {
        id: 4,
        nombre: "Betta Plakat Acero",
        tipo: "plakat",
        color: "acero",
        precio: 30,
        imagen: ""
    },
    {
        id: 5,
        nombre: "Betta Double Tail Opaco",
        tipo: "doubletail",
        color: "opaco",
        precio: 45,
        imagen: ""
    },
    {
        id: 6,
        nombre: "Betta Elephant Ear Negro",
        tipo: "elephant",
        color: "negro",
        precio: 50,
        imagen: ""
    },
    {
        id: 7,
        nombre: "Betta Splendens Nemo",
        tipo: "splendens",
        color: "nemo",
        precio: 55,
        imagen: ""
    },
    {
        id: 8,
        nombre: "Betta Halfmoon Rojo",
        tipo: "halfmoon",
        color: "rojo",
        precio: 42,
        imagen: ""
    }
];

// Inicialización cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM cargado - Inicializando tienda...');
    inicializarTienda();
});

function inicializarTienda() {
    // Verificar que los elementos existen antes de usarlos
    const productosGrid = document.getElementById('productos-grid');
    const filtroTipo = document.getElementById('filtro-tipo');
    const filtroColor = document.getElementById('filtro-color');
    const filtroPrecio = document.getElementById('filtro-precio');
    const valorPrecio = document.getElementById('valor-precio');
    const btnLimpiarFiltros = document.getElementById('btn-limpiar-filtros');
    const formContacto = document.getElementById('form-contacto');

    // Si algún elemento no existe, mostrar error
    if (!productosGrid) {
        console.error('No se encontró el elemento productos-grid');
        return;
    }

    // Mostrar productos iniciales
    mostrarProductos(productos, productosGrid);

    // Configurar filtros si existen
    if (filtroTipo && filtroColor && filtroPrecio && valorPrecio && btnLimpiarFiltros) {
        configurarFiltros(filtroTipo, filtroColor, filtroPrecio, valorPrecio, btnLimpiarFiltros, productosGrid);
    } else {
        console.warn('Algunos elementos de filtros no se encontraron');
    }

    // Configurar formulario de contacto si existe
    if (formContacto) {
        configurarFormularioContacto(formContacto);
    }
}

// Mostrar productos en el grid
function mostrarProductos(productosArray, gridElement) {
    gridElement.innerHTML = '';
    
    if (productosArray.length === 0) {
        gridElement.innerHTML = '<p class="no-resultados">No se encontraron productos que coincidan con los filtros seleccionados.</p>';
        return;
    }
    
    productosArray.forEach(producto => {
        const productoCard = document.createElement('div');
        productoCard.className = 'producto-card';
        
        // Obtener nombre del tipo para mostrar
        const nombreTipo = obtenerNombreTipo(producto.tipo);
        
        productoCard.innerHTML = `
            <div class="producto-imagen">
                <i class="fas fa-fish"></i>
            </div>
            <div class="producto-info">
                <span class="producto-tipo">${nombreTipo}</span>
                <h3 class="producto-nombre">${producto.nombre}</h3>
                <p class="producto-color">Color: ${producto.color.charAt(0).toUpperCase() + producto.color.slice(1)}</p>
                <p class="producto-precio">$${producto.precio}</p>
                <button class="btn-primary" onclick="mostrarDetallesProducto(${producto.id})">Ver Detalles</button>
            </div>
        `;
        
        gridElement.appendChild(productoCard);
    });
}

// Obtener nombre completo del tipo de betta
function obtenerNombreTipo(tipo) {
    const tipos = {
        'splendens': 'Betta Splendens',
        'halfmoon': 'Betta Halfmoon',
        'crowntail': 'Betta Crowntail',
        'plakat': 'Betta Plakat',
        'doubletail': 'Betta Double Tail',
        'elephant': 'Betta Elephant Ear'
    };
    
    return tipos[tipo] || tipo;
}

// Configurar filtros
function configurarFiltros(filtroTipo, filtroColor, filtroPrecio, valorPrecio, btnLimpiarFiltros, gridElement) {
    // Filtro por tipo
    filtroTipo.addEventListener('change', function() {
        filtrarProductos(filtroTipo, filtroColor, filtroPrecio, gridElement);
    });
    
    // Filtro por color
    filtroColor.addEventListener('change', function() {
        filtrarProductos(filtroTipo, filtroColor, filtroPrecio, gridElement);
    });
    
    // Filtro por precio
    filtroPrecio.addEventListener('input', function() {
        valorPrecio.textContent = this.value === '100' ? 'Cualquier precio' : `Hasta $${this.value}`;
        filtrarProductos(filtroTipo, filtroColor, filtroPrecio, gridElement);
    });
    
    // Botón limpiar filtros
    btnLimpiarFiltros.addEventListener('click', function() {
        filtroTipo.value = 'todos';
        filtroColor.value = 'todos';
        filtroPrecio.value = 100;
        valorPrecio.textContent = 'Cualquier precio';
        mostrarProductos(productos, gridElement);
    });
}

// Filtrar productos según los criterios seleccionados
function filtrarProductos(filtroTipo, filtroColor, filtroPrecio, gridElement) {
    const tipoSeleccionado = filtroTipo.value;
    const colorSeleccionado = filtroColor.value;
    const precioMaximo = parseInt(filtroPrecio.value);
    
    const productosFiltrados = productos.filter(producto => {
        // Filtro por tipo
        if (tipoSeleccionado !== 'todos' && producto.tipo !== tipoSeleccionado) {
            return false;
        }
        
        // Filtro por color
        if (colorSeleccionado !== 'todos' && producto.color !== colorSeleccionado) {
            return false;
        }
        
        // Filtro por precio
        if (precioMaximo < 100 && producto.precio > precioMaximo) {
            return false;
        }
        
        return true;
    });
    
    mostrarProductos(productosFiltrados, gridElement);
}

// Mostrar detalles del producto (simulado)
function mostrarDetallesProducto(id) {
    const producto = productos.find(p => p.id === id);
    if (producto) {
        alert(`Detalles de ${producto.nombre}\n\nTipo: ${obtenerNombreTipo(producto.tipo)}\nColor: ${producto.color}\nPrecio: $${producto.precio}\n\nPara más información, contáctenos.`);
    }
}

// Configurar formulario de contacto
function configurarFormularioContacto(formContacto) {
    formContacto.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const nombre = document.getElementById('nombre').value;
        const email = document.getElementById('email').value;
        const telefono = document.getElementById('telefono').value;
        const mensaje = document.getElementById('mensaje').value;
        
        // Validación básica
        if (!nombre || !email || !mensaje) {
            alert('Por favor, complete todos los campos requeridos.');
            return;
        }
        
        // En un caso real, aquí se enviarían los datos a un servidor
        alert(`Gracias ${nombre}, tu mensaje ha sido enviado. Te contactaremos pronto.`);
        
        // Limpiar formulario
        formContacto.reset();
    });
}

// Función para agregar un nuevo producto (fácil de usar)
function agregarProducto(nuevoProducto) {
    // Asignar un ID único
    const nuevoId = productos.length > 0 ? Math.max(...productos.map(p => p.id)) + 1 : 1;
    nuevoProducto.id = nuevoId;
    
    // Agregar a la lista
    productos.push(nuevoProducto);
    
    // Actualizar la vista
    const productosGrid = document.getElementById('productos-grid');
    if (productosGrid) {
        mostrarProductos(productos, productosGrid);
    }
    
    console.log(`Producto "${nuevoProducto.nombre}" agregado exitosamente.`);
    return nuevoId;
}

// Función para eliminar un producto por ID
function eliminarProducto(id) {
    const index = productos.findIndex(p => p.id === id);
    
    if (index !== -1) {
        const nombreProducto = productos[index].nombre;
        productos.splice(index, 1);
        
        // Actualizar la vista
        const productosGrid = document.getElementById('productos-grid');
        if (productosGrid) {
            mostrarProductos(productos, productosGrid);
        }
        
        console.log(`Producto "${nombreProducto}" eliminado exitosamente.`);
        return true;
    } else {
        console.log(`No se encontró un producto con ID ${id}.`);
        return false;
    }
}

// Función para obtener todos los productos (útil para debugging)
function obtenerTodosLosProductos() {
    return productos;
}

// Ejemplos de uso (descomenta para probar):

// Agregar un nuevo producto:
// agregarProducto({
//     nombre: "Betta Halfmoon Dorado",
//     tipo: "halfmoon",
//     color: "dorado",
//     precio: 60,
//     imagen: ""
// });

// Eliminar un producto:
// eliminarProducto(1);

// Ver todos los productos en consola:
// console.log(obtenerTodosLosProductos());