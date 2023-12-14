/**
 * PROYECTO ERICK POLANCO
 * 
 * El proyecto simulara un carrito de compras de una tienda de tecnologia
 * 1 - Se crea la tienda 
 * 2 - Se muestran los productos de la tienda
 * 3 - Se agregan el listener para que escuche el click de los botones de la tienda y agrege el producto al carrito
 * 4 - Se verifica si el localStorage tiene o no productos y se agregan al carrito, si no queda vacio
 * 5 - Se realiza la sumatoria de los precios
 * 6 - Se realiza la compra
 * 
 * */ 

const tienda = [];
let carrito = (!localStorage.getItem('carrito')) ? localStorage.setItem('carrito', JSON.stringify([])): localStorage.getItem('carrito');
let totalCarrito = 0;

const contenedorTienda = document.querySelector('.tienda');
const bodyCarrito = document.querySelector('.carrito tbody');
const total = document.querySelector('.total');
const btnReset = document.querySelector('.reset');
const btnComprar = document.querySelector('#btnComprar');


//1 - creacion de los items de la tienda

tienda.push(new Producto('Amazon Echo Dot','Amazon',65,'./img/amazon-echo-dot-5.png'));
tienda.push(new Producto('Amazon Firestick 4K MAX','Amazon',45,'./img/amazon-firestick-max.png'));
tienda.push(new Producto('Laptop Asus Gaming','Asus',1045,'./img/asus-gaming-laptop.png'));
tienda.push(new Producto('Barra de Sonido HP','HP',120,'./img/barra-de-sonido-hp.png'));
tienda.push(new Producto('Iphone 14 Pro Max','Apple',1100,'./img/iphone-14-pro-max.png'));
tienda.push(new Producto('Lenovo Yoga 3','Lenovo',1400,'./img/lenovo-yoga-3.png'));
tienda.push(new Producto('Samsung S23 Ultra','Samsung',1050,'./img/samsung-s23-ultra.png'));


// 2 - Muestra de los items en la tienda
function construirTienda(productos){

    productos.forEach((producto, index) => { 
        contenedorTienda.innerHTML +=  
        `
            <div class="item col-12 col-sm-6 col-md-4 col-lg-3 my-4">
                <img src="${producto.imagen}" alt="${producto.nombre}" class="img-fluid">
                <h3 class="fw-bolder"> ${producto.nombre} </h3>
                <h4 class="fw-light"> ${producto.marca} </h4>
                <h5> ${producto.precio} USD</h5>
                <button type="button" class="btn btn-primary btn-tienda" data-producto="${index}">Agregar</button>
            </div>
        `;
        total
    });

}

construirTienda(tienda);

// listener a los botones de la tienda
contenedorTienda.addEventListener('click', (e) => {
    console.log(e.target.classList.contains('btn-tienda'));
    if(e.target.classList.contains('btn-tienda')){
        let btnTienda = e.target;
        let id = btnTienda.getAttribute('data-producto');
        obtenerAtributo(id);
    }
})


// Obtenemos los items del localstorage del carrito
function verificarStorage() {
    carrito = JSON.parse(localStorage.getItem('carrito'));
    carrito.length !== 0 && construirCarrito();
}

verificarStorage();


//se le añade el evento click a cada boton de la tienda
btnReset.addEventListener('click', resetCarrito);

function obtenerAtributo(idProducto){
    carrito.push(tienda[idProducto]);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    construirCarrito();
    btnComprar.disabled = (Object.keys(carrito).length === 0);

    Toastify({
        text: "Agregado al carrito",
        duration: 3000,
        close: true,
        gravity: "top", 
        position: "right", 
    }).showToast();
}

function construirCarrito(){
    bodyCarrito.innerHTML = '';
    totalCarrito = 0;
    carrito = JSON.parse(localStorage.getItem('carrito'));
    carrito.forEach((producto,index) => {
        let precioProducto = producto.precio;
        bodyCarrito.innerHTML += 
        `
        <tr>
            <td> ${index+1} </td>
            <td> ${producto.nombre} </td>
            <td> ${producto.marca} </td>
            <td> ${producto.precio} </td>
        </tr>
        `;
        sumar(precioProducto);        
    });
    
}

function sumar(precio){
    totalCarrito = totalCarrito + precio;
    total.innerHTML = ` ${totalCarrito}  USD`;
}

function resetCarrito(){
    totalCarrito = 0;
    total.innerHTML = totalCarrito;
    bodyCarrito.innerHTML = '<tr><td colspan="4"><h5 class="text-center">No hay productos en el carrito</h5></td></tr>';
    localStorage.removeItem("carrito");
    carrito = [];
    btnComprar.disabled = 'disabled';
}

function comprarProductos(){
    btnComprar.disabled = 'disabled';
    Swal.fire({
        title: 'Gracias por su compra, vuelva pronto',
        icon: 'success',
        confirmButtonText: 'Aceptar',
    }).then((result) =>{
        // saber si el usuario apreto el boton confirmar
        if(result.isConfirmed){
            resetCarrito();
        }
    })
}


btnComprar.addEventListener('click', comprarProductos);







