var formulario = document.getElementById("formulario");
var msj = document.getElementById("mensaje");

function direccion() {
    let nombre = document.getElementById("nombre").value;
    let email = document.getElementById("email").value;

    if (!formulario.checkValidity()) {
        msj.textContent = "Porfavor complete todos los campos";
        msj.style.color = "red";
    }
    else {
        localStorage.setItem("NombreComprador", nombre);
        localStorage.setItem("EmailComprador", email);

        msj.textContent = "Datos guardados. Continuando con el pago..."
        msj.style.color = "green";

        setTimeout(() => {
            window.location.href = "comprar.html"
        }, 1200);
    }
}