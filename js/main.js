//Carrito de compras
const DateTime = luxon.DateTime;
//Declaremos el array producto
let productos=[];
let productoComprado = [];
let carrito=[];
let menu=[];
let compra=[];
let subTotal=0;
let total=0;
let posicion = 0;
var flag = false;
let pedidoNumero = 0;
let i=0;
let id=0;
let nombre='';
let parrafoImpreso=false;
let arregloCarrito = [];

let contenedorPrecioFinal = document.createElement("div");

class Producto{
    constructor(id, nombre, precio, descripcion, imagen){
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.descripcion = descripcion;
        this.imagen = imagen;
    }
}
//AJAX & FETCH
const URL= "./data/menu.json"; 

document.addEventListener('DOMContentLoaded', () => {
    // Aquí ya podemos obtener elementos del DOM
    fetch(URL)
    .then((response) => response.json())
    .then((menu) => {
        //productos=menu;
       menu.forEach(producto => {

            console.log(producto);
            productos.push(producto);
        });
        console.log(productos); 
        mostrarMenu();
    })
    .catch(function(error) {
        console.log(error);
        swal("Error al leer archivo json", "Revise el archivo json o la url.", "error");
        //Agregué este alert para que indique que el error puede venir desde la lectura del JSON.
        //Es válido hacer esto?
    });
});

function buscarProducto(id){
    nombreProducto=(productos[id].nombre);
    precioProducto=(productos[id].precio);
    descripcionProducto=(productos[id].descripcion);
    imagenProducto=(productos[id].imagen);
    return;
}

const contenedorComidas = document.querySelector(".contenedor-comidass");
const contenedorBebidas = document.querySelector(".contenedor-bebidas");
const contenedorCarrito = document.querySelector(".contenedor-carrito");
const contenedorParrafo = document.querySelector(".contenedor-parrafo");
const contenedorBotones = document.querySelector("#botones");
const btn = document.querySelector(".btnCalcular");
const btn2 = document.querySelector(".btnBorrar");


//Funciones

function guardaLocalStorage(){
    //Guardamos en el localStorage los productos a comprar y que están en el array carrito.
    let guardaProductosJSON = JSON.stringify(arregloCarrito);
    localStorage.setItem("carrito", guardaProductosJSON);
}

function traeLocalStorage(){
    //Leemos del localStorage los productos comprados.
    let traeProductosJSON = JSON.parse(localStorage.getItem("carrito"));
}

function mostrarMenu(){
    productos.forEach( function (producto){
        let {nombre, precio, descripcion, imagen, tipo} = producto;
        console.log(tipo);
        if(tipo==="Comida"){
            console.log("Es comida");
            const divColComida = document.createElement('div');
            divColComida.classList.add('col');

            const divCardComida = document.createElement('div');
            divCardComida.classList.add('card');

            const imagenProductoComida = document.createElement('img');
            imagenProductoComida.src = producto.imagen;
            imagenProductoComida.classList.add('card-img-top');

            const divCardBodyComida = document.createElement('div');
            divCardBodyComida.classList.add('card-body');

            const pTitleComida = document.createElement('p');
            pTitleComida.classList.add('card-title');
            pTitleComida.textContent = producto.nombre;

            const pPrecioComida = document.createElement('p');
            pPrecioComida.classList.add('card-text');
            pPrecioComida.textContent = 'A pagar ' + producto.precio + ' pesos (ARS)';

            const pTextComida = document.createElement('p');
            pTextComida.classList.add('card-text');
            pTextComida.textContent = producto.descripcion;

            const btnComboMenuComida = document.createElement('button');

            btnComboMenuComida.classList.add('btnComboMenu');
            btnComboMenuComida.textContent = "Agregar al carro de compras";
            btnComboMenuComida.onclick = () => {agregarACarrito(producto.id)}

            divColComida.appendChild(divCardComida);
            divCardComida.appendChild(imagenProductoComida);
            divCardComida.appendChild(divCardBodyComida);
            divCardBodyComida.appendChild(pTitleComida);
            divCardBodyComida.appendChild(pPrecioComida);
            divCardBodyComida.appendChild(pTextComida);
            divCardBodyComida.appendChild(btnComboMenuComida);
            contenedorComidas.appendChild(divColComida);
        }else{
            const divColBebida = document.createElement('div');
            divColBebida.classList.add('col');

            const divCardBebida = document.createElement('div');
            divCardBebida.classList.add('card');

            const imagenProductoBebida = document.createElement('img');
            imagenProductoBebida.src = producto.imagen;
            imagenProductoBebida.classList.add('card-img-top');

            const divCardBodyBebida = document.createElement('div');
            divCardBodyBebida.classList.add('card-body');

            const pTitleBebida = document.createElement('p');
            pTitleBebida.classList.add('card-title');
            pTitleBebida.textContent = producto.nombre;

            const pPrecioBebida = document.createElement('p');
            pPrecioBebida.classList.add('card-text');
            pPrecioBebida.textContent = 'A pagar ' + producto.precio + ' pesos (ARS)';

            const pTextBebida = document.createElement('p');
            pTextBebida.classList.add('card-text');
            pTextBebida.textContent = producto.descripcion;

            const btnComboMenuBebida = document.createElement('button');

            btnComboMenuBebida.classList.add('btnComboMenu');
            btnComboMenuBebida.textContent = "Agregar al carro de compras";
            btnComboMenuBebida.onclick = () => {agregarACarrito(producto.id)}

            divColBebida.appendChild(divCardBebida);
            divCardBebida.appendChild(imagenProductoBebida);
            divCardBebida.appendChild(divCardBodyBebida);
            divCardBodyBebida.appendChild(pTitleBebida);
            divCardBodyBebida.appendChild(pPrecioBebida);
            divCardBodyBebida.appendChild(pTextBebida);
            divCardBodyBebida.appendChild(btnComboMenuBebida);
            contenedorBebidas.appendChild(divColBebida);
        }
        
    })

};

function mostrarCarrito(){
    contenedorCarrito.innerHTML = "";//Limpia el array de carrito al agregar otro producto.

    if(parrafoImpreso===false){
        const pedidoP = document.createElement('p');
        pedidoP.classList.add('pedido');
        pedidoP.setAttribute("id", "parrafoP");
        pedidoP.textContent = "Has agregado los siguientes productos a tu carro de compras:";
        contenedorParrafo.appendChild(pedidoP);
    }

    arregloCarrito.forEach( function (producto){
        const divCol = document.createElement('div');
        divCol.classList.add('col');

        const divCard = document.createElement('div');
        divCard.classList.add('card');

        const imagenProducto = document.createElement('img');
        imagenProducto.src = producto.imagen;
        imagenProducto.classList.add('card-img-top');

        const divCardBody = document.createElement('div');
        divCardBody.classList.add('card-body');

        const pTitle = document.createElement('p');
        pTitle.classList.add('card-title');
        pTitle.textContent = producto.nombre;

        const pText = document.createElement('p');
        pText.classList.add('card-text');
        pText.textContent = producto.descripcion;

        const pPrecio = document.createElement('p');
        pPrecio.classList.add('card-text');
        pPrecio.textContent = 'A pagar ' + producto.precio + ' pesos (ARS)';

        const btnComboCarrito = document.createElement('button');
        btnComboCarrito.classList.add('btnCarrito');
        btnComboCarrito.textContent = "Sacar del carro de compras";
        btnComboCarrito.onclick = () => {sacarDeCarrito(producto.id)}

        divCol.appendChild(divCard);
        divCard.appendChild(imagenProducto);
        divCard.appendChild(divCardBody);
        divCardBody.appendChild(pTitle);
        divCardBody.appendChild(pText);
        divCardBody.appendChild(pPrecio);
        divCardBody.appendChild(btnComboCarrito);

        contenedorCarrito.appendChild(divCol);
    })
    parrafoImpreso=true;

};


function mostrarCompra(){
    //contenedorCarrito.innerHTML = "";//Limpia el array de carrito al agregar otro producto.
    //Formato fecha y hora
    const horaFecha = DateTime.local();

    const divColF = document.createElement('div');
    divColF.classList.add('col')
    
    const fechaCompra = document.createElement('p');
    fechaCompra.classList.add('fechaCompra');
    fechaCompra.textContent = 'Fecha y hora de compra: ' + horaFecha.toLocaleString(DateTime.DATE_TIME) + " " + horaFecha.toLocaleString(DateTime.TIME_SIMPLE);

    const br = document.createElement('br');

    const pedidoP = document.createElement('p');
    pedidoP.classList.add('pPagar');
    pedidoP.setAttribute("id", "pPagar");
    pedidoP.textContent = "Tu compra es la siguiente:";

    divColF.appendChild(fechaCompra);
    fechaCompra.appendChild(br);
    br.appendChild(pedidoP);
    contenedorBotones.appendChild(divColF);

    arregloCarrito.forEach( function (producto){
        //Desestructuración
        const {id, nombre, precio} = producto; 

        const divColP = document.createElement('div');
        divColP.classList.add('col');
        divColP.setAttribute("id", "divFactura");

        const pTitle = document.createElement('p');
        pTitle.classList.add('elementoFactura');
        pTitle.textContent = nombre + ' ................................................ ' + precio + ' pesos (ARS)';

        divColP.appendChild(pTitle);
        contenedorBotones.appendChild(divColP);
        
    })

    const pagoT = document.createElement('p');
    pagoT.classList.add('elementoFactura');
    pagoT.textContent = 'El monto total a pagar es de ' + total + ' pesos (ARS)';

    const btnPago = document.createElement('button');
    btnPago.classList.add('btnPagoCompra');
    btnPago.textContent = "Pagar";
    btnPago.onclick = () => {console.log("Proceso de pago.")}

    contenedorBotones.appendChild(pagoT);
    contenedorBotones.appendChild(btnPago);
};

//Agrega producto a carrito
function agregarACarrito(id){
    let productoAgregado = productos.find(producto => producto.id === id);
    id=parseInt(productoAgregado.id);   
    console.log(id);
    buscarProducto(id);
    let posicionProducto = arregloCarrito.length;
        console.log("Posicion " + posicionProducto);
        let productoElegido = {
            id : id,
            nombre : nombreProducto,
            precio : precioProducto,
            descripcion: descripcionProducto,
            imagen: imagenProducto,
            posicion : posicionProducto
        }
    console.log(productoElegido);
    arregloCarrito.push(productoElegido);
    mostrarCarrito(arregloCarrito);
    guardaLocalStorage();
}

//Elimina producto de carrito
function sacarDeCarrito(id){
    const productoEliminado = productos.find(producto => producto.id === id);
    console.log("Producto eliminado");
    console.log(productoEliminado);
    console.log("Carrito");
    console.log(arregloCarrito);
    console.log("ID");
    const idProducto= productoEliminado.id;
    console.log(idProducto);

    //Traigo del localStorage los productos.
    const productosStorage = JSON.parse(localStorage.getItem('carrito'));
    for (i=0; i<arregloCarrito.length; i++) {
        console.log("Carrito");
        console.log(arregloCarrito[i]);
        console.log("Producto de carrito");
        console.log(productosStorage);
        const posicionProductoEliminado = productosStorage[i].posicion;
        const idProductoEliminado = productosStorage[i].id;
        console.log("Posicion de compra eliminada");
        console.log(posicionProductoEliminado);
        if(idProductoEliminado === idProducto){
            console.log("A eliminar");
            let eliminado = arregloCarrito.splice(posicionProductoEliminado,1);

        }
    }
    for (let i = 0; i < arregloCarrito.length; i++) {//Actualizo la posición de los productos en el array luego de borrar un item.
       arregloCarrito[i].posicion = i;
     }    
    mostrarCarrito(arregloCarrito);
    guardaLocalStorage();
}

function limpiarMenu(){
    var elementoMenu = document.getElementById("contenedor-productos");
    var elementoSubtitulo = document.getElementById("subtitulo");
    while(elementoMenu.hasChildNodes()){
        elementoMenu.removeChild(elementoMenu.firstChild);
    }
    while(elementoSubtitulo.hasChildNodes()){
        elementoSubtitulo.removeChild(elementoSubtitulo.firstChild);
    }
}

function limpiarCarrito(){
    var elementoCarrito = document.getElementById("carrito");
    var elementoParrafo = document.getElementById("parrafoP");
    while(elementoCarrito.hasChildNodes()){
        elementoCarrito.removeChild(elementoCarrito.firstChild);
    }
    while(elementoParrafo.hasChildNodes()){
        elementoParrafo.removeChild(elementoParrafo.firstChild);
    }
    
}

function limpiarBotones(){
    var elementosBotones = document.getElementById("botones");
    while(elementosBotones.hasChildNodes()){
        elementosBotones.removeChild(elementosBotones.firstChild);
    }
}

function limpiarPrecioTotal(){
    var elementoPrecioTotal = document.getElementById("precioTotal");
    while(elementoPrecioTotal.hasChildNodes()){
        elementoPrecioTotal.removeChild(elementoPrecioTotal.firstChild);
        console.log(elementoPrecioTotal);
    }
}

//Vacia un array
function vaciarArray(arr){
    arr.splice(0, arr.length);
    console.log(arr);
};

//Mostrar compra
btn.addEventListener("click", function (e) {
    e.preventDefault();
    if(arregloCarrito.length===0){
        swal("Elija un producto!", "Su carrito está vacío.", "error")}
    else {
        // console.log(carrito);
        elementNameExists = !!document.getElementById("carrito").getElementsByTagName("p");
        total=0;
        const productosStorage = JSON.parse(localStorage.getItem('carrito'));
        for(const item of productosStorage){
            total=total+item.precio; 
        }
        console.log(total);
        limpiarCarrito();
        limpiarBotones();
        limpiarMenu();
        mostrarCompra(arregloCarrito, total);
    };
    

    
});


//Funcion para el boton de limpiar compra. Incluyendo el LocalStorage.
btn2.addEventListener("click", function (e) {
    e.preventDefault();
    limpiarCarrito();
    vaciarArray(arregloCarrito);
    localStorage.clear();
});



