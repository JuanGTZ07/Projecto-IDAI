var formulario = document.getElementById("formulario");
var msj = document.getElementById("mensaje");

function direccion() {
    if (!formulario.checkValidity()) {
        msj.textContent = "Porfavor complete todos los campos";
        msj.style.color = "red";
    }
    else {
        const email = document.getElementById("")

        window.location.href = "comprar.html"
    }
}