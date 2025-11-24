window.addEventListener("DOMContentLoaded", () => {
    const producto = localStorage.getItem("producto_nombre");
    const precioFinal = localStorage.getItem("producto_precio_final");

    if (producto) {
        document.getElementById("productofinalmostrar").textContent = producto;
    }

    if (precioFinal) {
        document.getElementById("preciofinalmostrar").textContent = "$" + precioFinal;
    }
});