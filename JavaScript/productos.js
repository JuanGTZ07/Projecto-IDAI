
const comprarButtons = document.querySelectorAll(".Comprarahora");

comprarButtons.forEach((button) => {
    button.addEventListener("click", (event) => {

        const product = event.target.closest("#prodaventa");
        const nombre = product.querySelector("#nombreart").textContent.trim();
        const precio = product.querySelector(".precioart").textContent.trim();

        localStorage.setItem("producto_nombre", nombre);
        localStorage.setItem("producto_precio", precio);
    });
});
