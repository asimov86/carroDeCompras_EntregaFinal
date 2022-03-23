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
let flagComida='false';
let flagBebida='false';
let contenedorPrecioFinal = document.createElement("div");
let ultimoItem='false';

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
            productos.push(producto);
        });
        mostrarMenu();
        
    })
    .catch(function(error) {
        console.log(error);
    });
});

function buscarProducto(id){
    nombreProducto=(productos[id].nombre);
    precioProducto=(productos[id].precio);
    descripcionProducto=(productos[id].descripcion);
    imagenProducto=(productos[id].imagen);
    return;
}

const contenedorParrafoC = document.querySelector(".parrafoComida");
const contenedorParrafoB = document.querySelector(".parrafoBebida");
const contenedorComida = document.querySelector(".contenedor-comida");
const contenedorBebida = document.querySelector(".contenedor-bebida");
const contenedorCarrito = document.querySelector(".contenedor-carrito");
const contenedorParrafo = document.querySelector(".contenedor-parrafo");////////////////////////El problema parte de acá al parecer
const contenedorBotones = document.querySelector("#botones");
const contenedorSubtitulo = document.querySelector("#subtitulo");
const btn = document.querySelector(".btnCalcular");
const btn2 = document.querySelector(".btnBorrar");
const btnVolver =document.querySelector(".btnVolver");


//Funciones

function guardaLocalStorage(){
    //Guardamos en el localStorage los productos a comprar y que están en el array carrito.
    let guardaProductosJSON = JSON.stringify(arregloCarrito);
    localStorage.setItem("carrito", guardaProductosJSON);
}

function traeLocalStorage(){
    //Leemos del localStorage los productos comprados.
    let traeProductosJSON = JSON.parse(localStorage.getItem("carrito"));
    arregloCarrito=traeProductosJSON;  
}

function limpiaLocalStorage(){
    localStorage.clear();
}


////// En vez de colocar el parrafo en un P colocarlo en un h4 y este h4 colocarlo antes del div.
function mostrarMenu(){

    productos.forEach( function (producto){
        let {id, nombre, precio, descripcion, imagen, tipo} = producto;
        if(tipo==="Comida"){
            if(flagComida==='false'){
                flagComida='true';
                const hrComida = document.createElement('hr');
                const pComida = document.createElement('p');
                pComida.classList.add('contenedorComida', 'h4');
                pComida.textContent = "Elegí tu combo preferido.";
                contenedorParrafoC.appendChild(pComida);
                contenedorParrafoC.appendChild(hrComida);
            }
            const divColComida = document.createElement('div');
            divColComida.classList.add('col');

            const divCardComida = document.createElement('div');
            divCardComida.classList.add('card');

            const imagenProductoComida = document.createElement('img');
            imagenProductoComida.src = imagen;
            imagenProductoComida.classList.add('card-img-top');

            const divCardBodyComida = document.createElement('div');
            divCardBodyComida.classList.add('card-body');

            const pTitleComida = document.createElement('p');
            pTitleComida.classList.add('card-title');
            pTitleComida.textContent = nombre;

            const pPrecioComida = document.createElement('p');
            pPrecioComida.classList.add('card-text');
            pPrecioComida.textContent = 'A pagar ' + precio + ' pesos (ARS)';

            const pTextComida = document.createElement('p');
            pTextComida.classList.add('card-text');
            pTextComida.textContent = descripcion;

            const btnComboMenuComida = document.createElement('button');

            btnComboMenuComida.classList.add("btnComboMenu", "btn");
            btnComboMenuComida.textContent = "Agregar al carro de compras";
            btnComboMenuComida.onclick = () => {agregarACarrito(id)}

            divColComida.appendChild(divCardComida);
            divCardComida.appendChild(imagenProductoComida);
            divCardComida.appendChild(divCardBodyComida);
            divCardBodyComida.appendChild(pTitleComida);
            divCardBodyComida.appendChild(pPrecioComida);
            divCardBodyComida.appendChild(pTextComida);
            divCardBodyComida.appendChild(btnComboMenuComida);
            contenedorComida.appendChild(divColComida);
        }else{
            if(flagBebida==='false'){
                flagBebida='true';
                const hrBebida = document.createElement('hr');
                const pBebidas = document.createElement('p');
                pBebidas.classList.add('contenedorBebida', 'h4', 'col-12');
                pBebidas.textContent = "Elegí tu bebida preferida.";
                contenedorParrafoB.appendChild(pBebidas);
                contenedorParrafoB.appendChild(hrBebida);
            }
            const divColBebida = document.createElement('div');
            divColBebida.classList.add('col');

            const divCardBebida = document.createElement('div');
            divCardBebida.classList.add('card');

            const imagenProductoBebida = document.createElement('img');
            imagenProductoBebida.src = imagen;
            imagenProductoBebida.classList.add('card-img-top');

            const divCardBodyBebida = document.createElement('div');
            divCardBodyBebida.classList.add('card-body');

            const pTitleBebida = document.createElement('p');
            pTitleBebida.classList.add('card-title');
            pTitleBebida.textContent = nombre;

            const pPrecioBebida = document.createElement('p');
            pPrecioBebida.classList.add('card-text');
            pPrecioBebida.textContent = 'A pagar ' + precio + ' pesos (ARS)';

            const pTextBebida = document.createElement('p');
            pTextBebida.classList.add('card-text');
            pTextBebida.textContent = descripcion;

            const btnComboMenuBebida = document.createElement('button');

            btnComboMenuBebida.classList.add("btnComboMenu", "btn");
            btnComboMenuBebida.textContent = "Agregar al carro de compras";
            btnComboMenuBebida.onclick = () => {agregarACarrito(id)}

            divColBebida.appendChild(divCardBebida);
            divCardBebida.appendChild(imagenProductoBebida);
            divCardBebida.appendChild(divCardBodyBebida);
            divCardBodyBebida.appendChild(pTitleBebida);
            divCardBodyBebida.appendChild(pPrecioBebida);
            divCardBodyBebida.appendChild(pTextBebida);
            divCardBodyBebida.appendChild(btnComboMenuBebida);
            contenedorBebida.appendChild(divColBebida);
        }
        
    })
    /* Acá verifico, si hay algo en el localstorage lo muestro*/
    if(localStorage.length===1){
        mostrarCarrito();
    }
    
};
//////////////////////// Muestro carrito luego de seleccionar producto.
function mostrarCarrito(){
    contenedorCarrito.innerHTML = "";//Limpia el array de carrito al agregar otro producto.
    const lineaP=document.createElement('hr');
    contenedorParrafo.classList.add("pedido", "mt-5", "h4");
    contenedorParrafo.setAttribute("id", "parrafoP");
    contenedorParrafo.textContent = "Has agregado los siguientes productos a tu carro de compras:";
    contenedorParrafo.appendChild(lineaP);
    //Si hay algo en el localstorage lo traigo antes de pedir algo más.
    if(arregloCarrito.length===0){
        traeLocalStorage();
    }
    
    arregloCarrito.forEach( function (producto){
    
        let {id, nombre, precio, descripcion, imagen, tipo} = producto;

        const divCol = document.createElement('div');
        divCol.classList.add('col');

        const divCard = document.createElement('div');
        divCard.classList.add('card');

        const imagenProducto = document.createElement('img');
        imagenProducto.src = imagen;
        imagenProducto.classList.add('card-img-top');

        const divCardBody = document.createElement('div');
        divCardBody.classList.add('card-body');

        const pTitle = document.createElement('p');
        pTitle.classList.add('card-title');
        pTitle.textContent = nombre;

        const pText = document.createElement('p');
        pText.classList.add('card-text');
        pText.textContent = descripcion;

        const pPrecio = document.createElement('p');
        pPrecio.classList.add('card-text');
        pPrecio.textContent = 'A pagar ' + precio + ' pesos (ARS)';

        const btnComboCarrito = document.createElement('button');
        btnComboCarrito.classList.add("btnCarrito", "btn");
        btnComboCarrito.textContent = "Sacar del carro de compras";
        btnComboCarrito.onclick = () => {
            sacarDeCarrito(id)}

        divCol.appendChild(divCard);
        divCard.appendChild(imagenProducto);
        divCard.appendChild(divCardBody);
        divCardBody.appendChild(pTitle);
        divCardBody.appendChild(pText);
        divCardBody.appendChild(pPrecio);
        divCardBody.appendChild(btnComboCarrito);

        contenedorCarrito.appendChild(divCol);
    });

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
        let {id, nombre, precio} = producto; 

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
    btnPago.classList.add("btnPagoCompra", "btn");
    btnPago.textContent = "Pagar";
    btnPago.onclick = () => {console.log("Proceso de pago.")}

    const btnVolver = document.createElement('button');
    btnVolver.classList.add("btnVolver", "btn");
    btnVolver.textContent = "Seguir comprando";
    btnVolver.onclick = () => {volver()}

    contenedorBotones.appendChild(pagoT);
    contenedorBotones.appendChild(btnPago);
    contenedorBotones.appendChild(btnVolver);
};

//Agrega producto a carrito
function agregarACarrito(id){
    let productoAgregado = productos.find(producto => producto.id === id);
    id=parseInt(productoAgregado.id);   
    buscarProducto(id);
    let posicionProducto = arregloCarrito.length;
        let productoElegido = {
            id : id,
            nombre : nombreProducto,
            precio : precioProducto,
            descripcion: descripcionProducto,
            imagen: imagenProducto,
            posicion : posicionProducto
        }
    arregloCarrito.push(productoElegido);
    mostrarCarrito(arregloCarrito);
    guardaLocalStorage();
}

//Elimina producto de carrito
function sacarDeCarrito(id){
    const productoEliminado = productos.find(producto => producto.id === id);
    const idProducto= productoEliminado.id;
    //Traigo del localStorage los productos.
    const productosStorage = JSON.parse(localStorage.getItem('carrito'));
    for (i=0; i<arregloCarrito.length; i++) {
        const posicionProductoEliminado = productosStorage[i].posicion;
        const idProductoEliminado = productosStorage[i].id;
        if(idProductoEliminado === idProducto){
            let eliminado = arregloCarrito.splice(posicionProductoEliminado,1);
        } 
    }
    
    for (let i = 0; i < arregloCarrito.length; i++) {//Actualizo la posición de los productos en el array luego de borrar un item.
        arregloCarrito[i].posicion = i;
    }  
    if(productosStorage.length===1){
        arregloCarrito=[];
        limpiaLocalStorage();
        limpiarCarrito();
    }else{
        mostrarCarrito(arregloCarrito);
    }
    
    guardaLocalStorage();
}

//Si me devuelvo para comprar algo más uso esta función.
function comenzarDeNuevo(){
    parrafoImpreso='false';

    const subtitulo = document.createElement('h2');
    subtitulo.classList.add("text-start", "mt-5");
    subtitulo.textContent = "Realizá tu pedido.";
    contenedorSubtitulo.appendChild(subtitulo);

    let lineaC = document.createElement('hr');
    let lineaB = document.createElement('hr');
    let lineaP = document.createElement('hr');

    contenedorParrafoC.classList.add("parrafoComida", "h4", "mt-5");
    contenedorParrafoC.textContent = "Elegí tu combo preferido.";
    contenedorParrafoC.appendChild(lineaC);
    

    contenedorParrafoB.classList.add("parrafoBebida", "h4", "mt-5");
    contenedorParrafoB.textContent = "Elegí tu bebida preferida.";
    contenedorParrafoB.appendChild(lineaB);

    const pedidoParrafo = document.createElement('p');
    pedidoParrafo.classList.add("pedido", "mt-5", "h4");
    pedidoParrafo.setAttribute("id", "parrafoP");
    pedidoParrafo.textContent = "Has agregado los siguientes productos a tu carro de compras:";
    contenedorParrafo.appendChild(pedidoParrafo);
    contenedorParrafo.appendChild(lineaP);

    const botonCalcular = document.createElement("button");
    botonCalcular.classList.add("btn", "btn-outline-secondary", "px-5", "mx-5", "my-1", "btnCalcular");
    botonCalcular.innerText="Calcular compra";
    botonCalcular.setAttribute("id", "btnCalcular");
    contenedorBotones.appendChild(botonCalcular);
    botonCalcular.onclick = () => {
        if(arregloCarrito.length===0){
            swal("Elija un producto!", "Su carrito está vacío.", "error")}
        else {
            elementNameExists = !!document.getElementById("carrito").getElementsByTagName("p");
            total=0;
            const productosStorage = JSON.parse(localStorage.getItem('carrito'));
            for(const item of productosStorage){
                total=total+item.precio; 
            }
            limpiarCarrito();
            limpiarBotones();
            limpiarMenu();
            mostrarCompra(arregloCarrito, total);
        }
    }

    const botonLimpiar = document.createElement("button");
    botonLimpiar.classList.add("btn", "btn-outline-secondary", "px-5", "mx-5", "my-1", "btnBorrar");
    botonLimpiar.innerText="Limpiar compra";
    botonLimpiar.setAttribute("id", "btnBorrar");
    contenedorBotones.appendChild(botonLimpiar);
    botonLimpiar.onclick=()=> {
        limpiarCarrito();
        vaciarArray(arregloCarrito);
        localStorage.clear();
    }
}

function limpiarMenu(){
    var elementoParrafoComida = document.getElementById("parrafoComida");
    var elementoContenedorComida = document.getElementById("contenedor-comida");
    var elementoParrafobebida = document.getElementById("parrafoBebida");
    var elementoContenedorbebida = document.getElementById("contenedor-bebida");
    var elementoSubtitulo = document.getElementById("subtitulo");
    while(elementoParrafoComida.hasChildNodes()){
        elementoParrafoComida.removeChild(elementoParrafoComida.firstChild);
    }
    while(elementoContenedorComida.hasChildNodes()){
        elementoContenedorComida.removeChild(elementoContenedorComida.firstChild);
    }
    while(elementoParrafobebida.hasChildNodes()){
        elementoParrafobebida.removeChild(elementoParrafobebida.firstChild);
    }
    while(elementoContenedorbebida.hasChildNodes()){
        elementoContenedorbebida.removeChild(elementoContenedorbebida.firstChild);
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
    }
}

//Volver a menu
function volver(){
    limpiarBotones();
    comenzarDeNuevo();
    mostrarMenu();
    mostrarCarrito();
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
        elementNameExists = !!document.getElementById("carrito").getElementsByTagName("p");
        total=0;
        const productosStorage = JSON.parse(localStorage.getItem('carrito'));
        for(const item of productosStorage){
            total=total+item.precio; 
        }
        limpiarCarrito();
        limpiarBotones();
        limpiarMenu();
        mostrarCompra(arregloCarrito, total);
    }
});


//Funcion para el boton de limpiar compra. Incluyendo el LocalStorage.
btn2.addEventListener("click", function (e) {
    e.preventDefault();
    limpiarCarrito();
    vaciarArray(arregloCarrito);
    localStorage.clear();
});
