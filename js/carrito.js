const mostrarCarrito = () => {
    
        modalContainer.innerHTML = ""
        modalContainer.style.display = "flex"
        const modalHeader = document.createElement ("div")
        modalHeader.className = "modal-header"
        modalHeader.innerHTML = `
            <h1 class = "modal-title"> Carrito </h1> `
        
        modalContainer.append (modalHeader)
        
        const modalButton = document.createElement ("button")
        modalButton.className = "modal-button"
        modalButton.innerText = "❌"

        
        modalHeader.append (modalButton)
    
        modalButton.addEventListener ("click", ()=>{
            modalContainer.style.display = "none"
        })
    
    
        carrito.forEach ((producto) =>{
    
            let contenidoCarrito = document.createElement ("div")
            contenidoCarrito.className = "modal-contenido"
            contenidoCarrito.innerHTML = `
                <img src = "${producto.img}">
                <h3> ${producto.nombre} </h3>
                <p>  $ ${producto.precio} </p>
                <p> Cantidad: ${producto.cantidad} </p>
            `
            const eliminar = document.createElement ("button");
            eliminar.innerText = "❌"
            eliminar.className = "elimiar-producto"
            contenidoCarrito.append(eliminar)

            eliminar.addEventListener ("click", eliminarProducto);
    
            modalContainer.append (contenidoCarrito)

            subirStorage()

            if(carrito.length === 0){
                contenidoCarrito.innerHTML = " Aún no agregaste nada" 
                modalContainer.append (contenidoCarrito)
            };


        })
    
        const total = carrito.reduce ((acc, producto)=> acc + producto.precio * producto.cantidad, 0)
    
        const totalCompra = document.createElement ("div")
        totalCompra.className = "total-carrito"
        totalCompra.innerHTML = `
            <h2> Total a pagar : $ ${total}
            `
            modalContainer.append (totalCompra)

        const finalizarCompra = document.createElement ("button")
        finalizarCompra.className = "finalizar"
        finalizarCompra.innerText = "Finalizar Compra"
        finalizarCompra.addEventListener ("click", () => {
            new swal({
                title: '¡Listo!',
                text: 'Compra realizada con éxito',
                icon: 'success',
                confirmButtonText: 'salir'
              })

              localStorage.clear()


        } )
        if (carrito.length === 0){
            finalizarCompra.style.display = "none"
        }
        modalContainer.append(finalizarCompra)
};


verCarrito.addEventListener("click", mostrarCarrito);

const eliminarProducto =() =>{
    const eliminarId = carrito.find ((elemento)=> elemento.id)
    carrito = carrito.filter((carritoId)=>{
        return carritoId !== eliminarId
    });
    mostrarCarrito()
    contadorProductos ()
    subirStorage()
}


