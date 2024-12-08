const productos = [
    {
        id: "curso-01",
        titulo: 'HTML5, CSS3, JavaScript para principiantes',
        profesor: 'Fernando Milanesi',
        precioAntiguo: 250,
        imagen: "img/curso1.jpg",
        precio: 120
    },
    {
        id: "curso-02",
        titulo: 'Curso de comida vegetariana',
        profesor: 'Pedro Herrera',
        precioAntiguo: 100,
        imagen: "img/curso2.jpg",
        precio: 70
    },
    {
        id: "curso-03",
        titulo: 'Guitarra para principiantes',
        profesor: 'Magalí Figueroa',
        precioAntiguo: 700,
        imagen: "img/curso3.jpg",
        precio: 450
    },
    {
        id: "curso-04",
        titulo: 'Huerto en tu casa',
        profesor: 'Mariano Arjona',
        precioAntiguo: 200,
        imagen: "img/curso4.jpg",
        precio: 50
    },
    {
        id: "curso-05",
        titulo: 'Decoracion de productos para tu hogar',
        profesor: 'Patricia Vasquez',
        precioAntiguo: 150,
        imagen: "img/curso5.jpg",
        precio: 80
    },
    {
        id: "curso-06",
        titulo: 'Diseño web para principiantes',
        profesor: 'Camila Lorenzo',
        precioAntiguo: 980,
        imagen: "img/curso1.jpg",
        precio: 500
    },
    {
        id: "curso-07",
        titulo: 'Comida Argentina para principiante',
        profesor: 'Miriam Sanchez',
        precioAntiguo: 260,
        imagen: "img/curso2.jpg",
        precio: 145
    },
    {
        id: "curso-08",
        titulo: 'Cosecha de verduras, frutas y vegetales',
        profesor: 'Valentín Quiroga',
        precioAntiguo: 190,
        imagen: "img/curso4.jpg",
        precio: 120
    },
    {
        id: "curso-09",
        titulo: 'Musica general',
        profesor: 'Gonzalo Picosti',
        precioAntiguo: 230,
        imagen: "img/curso3.jpg",
        precio: 110
    },
    {
        id: "curso-10",
        titulo: 'Decoración de hogar avanzado',
        profesor: 'Rodrigo Bentancour',
        precioAntiguo: 590,
        imagen: "img/curso5.jpg",
        precio: 500
    },
    {
        id: "curso-11",
        titulo: 'Javascript Moderno con ES6',
        profesor: 'Mauro Figo',
        precioAntiguo: 940,
        imagen: "img/curso1.jpg",
        precio: 600
    },
    {
        id: "curso-12",
        titulo: '100 recetas de comida natural',
        profesor: 'Sol Rocuzzo',
        precioAntiguo: 40,
        imagen: "img/curso2.jpg",
        precio: 15
    }
];


const contenedorProductos = document.querySelector("#contenedor-productos");
function agregar(id) {
    const carrito = JSON.parse(localStorage.getItem("carrito") || "[]");
    let newCarrito = [...carrito];
    const productoGuardado = carrito?.findIndex(producto => producto.id == id);

    if (productoGuardado >= 0) {
        newCarrito[productoGuardado] = {
            ...newCarrito[productoGuardado],
            cantidad: newCarrito[productoGuardado].cantidad + 1
        };
    } else {
        newCarrito = [...newCarrito, {
            id, cantidad: 1
        }];
    }

    localStorage.setItem("carrito", JSON.stringify(newCarrito));
    actualizarContador(newCarrito.reduce((suma, item) => suma + item.cantidad, 0));
    actualizarCarrito();
}


function quitarProducto(id) {
    const carrito = JSON.parse(localStorage.getItem("carrito") || "[]");
    const productoIndex = carrito.findIndex(producto => producto.id === id);

    if (productoIndex >= 0) {
        if (carrito[productoIndex].cantidad > 1) {

            carrito[productoIndex].cantidad -= 1;
        } else {

            carrito.splice(productoIndex, 1);
        }
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarCarrito();
    actualizarContador(carrito.reduce((suma, item) => suma + item.cantidad, 0));
}


/* ACTUALIZAR CARRITO */

function actualizarCarrito() {
    const carrito = JSON.parse(localStorage.getItem("carrito") || "[]");
    const contenedorCarrito = document.getElementById("contenedor-carrito-productos");

    let items = document.createElement("div");

    // Encabezado
    const encabezado = document.createElement("div");
    encabezado.classList.add("carrito-header");
    encabezado.innerHTML = `
        <p>Cantidad</p>
        <p>Título</p>
        <p>Precio</p>
        <p>Sacar</p>
        <p>Agregar</p>
        
    `;
    items.append(encabezado);

    // PRODUCTOS EN EL CARRITO
    carrito.forEach(({ id, cantidad }) => {
        const producto = productos.find(producto => id === producto.id);

        const div = document.createElement("div");
        div.classList.add("producto-row");
        div.innerHTML = `
        <p>${cantidad}</p>
        <p>${producto.titulo}</p>
        <p>$${producto.precio}</p>
        <div class="boton-container1">
            <button class="eliminar-producto" onclick="quitarProducto('${id}')">
                <img src="https://img.icons8.com/material-outlined/24/x-coordinate.png" alt="x-coordinate"/>
            </button>
        </div>
        <div class="boton-container2">
            <button class="agregar-producto" onclick="agregar('${id}')">
                <img src="https://img.icons8.com/material-rounded/24/filled-plus-2-math.png" alt="filled-plus-2-math"/>
            </button>
        </div>
    `;

        items.append(div);
        
    });

    // TOTAL
    const total = document.createElement("div");
    total.classList.add("carrito-total");
    total.innerHTML = `
        <p></p>
        <p>TOTAL:</p>
        <p>$${carrito.reduce((suma, { id, cantidad }) => {
        const producto = productos.find(producto => id === producto.id);
        return suma + (producto.precio * cantidad);
    }, 0)}</p>
    `;
    items.append(total);

    contenedorCarrito.innerHTML = items.outerHTML;
}

function actualizarContador(cantidad) {
    const contador = document.getElementById("contador")
    contador.textContent = cantidad
}

/* VACIAR CARRITO */

function vaciarCarrito() {
    localStorage.removeItem("carrito");
    actualizarContador(0);
    document.getElementById("contenedor-carrito-productos").innerHTML = "";
}

/* CARGAR TARJETAS */

function cargarProductos() {
    const carrito = JSON.parse(localStorage.getItem("carrito") || "[]")
    actualizarContador(carrito.reduce((suma, item) => suma + item.cantidad, 0))
    productos.forEach(producto => {
        const id = producto.id
        const div = document.createElement("div");
        div.classList.add('producto');
        div.innerHTML = `
        <img src="${producto.imagen}" alt="${producto.titulo}">
        <div class="info-card">
            <p class='producto-titulo'>${producto.titulo}</p>
            <p>${producto.profesor}</p>
            <div class="producto-precio">
                <p>$${producto.precioAntiguo}</p>
                <p>$${producto.precio}</p>
            </div>
            <button onclick="agregar(id)" class="producto-agregar" id='${producto.id}'>AGREGAR AL CARRITO</button>
         `;

        contenedorProductos.append(div);

    })
}
const popoverButton = document.getElementById('contenedor-iconos');
const popover = document.getElementById('popover');
const closeButton = document.getElementById('close-popover');
const vaciarCarritoButton = document.getElementById('vaciar-carro')

// MOSTRAR EL POP-OVER
popoverButton.addEventListener('click', () => {
    actualizarCarrito()
    popover.style.display = 'block';
});

// CERRAR EL POP-OVER
closeButton.addEventListener('click', () => {
    popover.style.display = 'none';
});

vaciarCarritoButton.addEventListener('click', vaciarCarrito)


cargarProductos();

