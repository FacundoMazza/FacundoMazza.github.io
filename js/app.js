const contenedorCards = document.getElementById ("contenedor-cards")
const verCarrito = document.getElementById ("ver-carrito")
const modalContainer = document.getElementById ("modal-container")
const cantidadCarrito = document.getElementById ("cantidad-carrito")


let carrito = JSON.parse(localStorage.getItem("carrito")) || [] ;


fetch (`productoss.json`)
.then ((respuesta) => respuesta.json())
.then ((data) => {
    
    data.forEach((producto)=>{
        let contenedor = document.createElement ("div")
        contenedor.className = "card"
        contenedor.innerHTML = `
            <img src="${producto.img}"> </img>
            <h3> ${producto.nombre} </h3>
            <p> $ ${producto.precio} </p>
        `
        contenedorCards.append (contenedor);
        
        let comprar = document.createElement ("button")
        comprar.className = "comprar-button"
        comprar.innerText = "Comprar"
    
        contenedor.append (comprar)
        
        comprar.addEventListener ("click", () => {
            
           

            const repetido = carrito.some ((repetidos)=> repetidos.id === producto.id);
            if (repetido){
                carrito.map((prod) =>{
                    if (prod.id === producto.id){
                        prod.cantidad++
                    }
                } );
            } else {
              
    
            carrito.push ({
                id: producto.id,
                img: producto.img,
                nombre: producto.nombre,
                precio: producto.precio,
                cantidad: producto.cantidad,
            });
        } 
        contadorProductos ()
        subirStorage()
        });
        
    
    });
})




 
const subirStorage = ()=>{
    localStorage.setItem ("carrito", JSON.stringify(carrito));
}

const contadorProductos = ()=>{
    cantidadCarrito.style.display = "block"
    const carritoStorage = carrito.length
    localStorage.setItem ("carritoStorage", JSON.stringify(carritoStorage))
    cantidadCarrito.innerText = JSON.parse(localStorage.getItem("carritoStorage"))
}
 contadorProductos ()


  

      
    