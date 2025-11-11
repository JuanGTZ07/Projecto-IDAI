const comprar = document.querySelectorAll('.Comprarahora');

comprar.forEach(button => {
    button.addEventListener('click', function(event) {

    const productDiv = button.closest('#prodaventa');
    const nombre = productDiv.querySelector('#nombreart').textContent.trim();
    const precio = productDiv.querySelector('.precioart').textContent.trim();


    localStorage.setItem('selectedProduct', nombre);
    localStorage.setItem('selectedPrice', precio);
    });
}); 