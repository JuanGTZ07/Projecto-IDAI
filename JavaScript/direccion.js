var formulario = document.getElementById("formulario");
var msj = document.getElementById("mensaje");

function direccion() {
    let nombre = document.getElementById("nombre").value;
    let email = document.getElementById("email").value;
    let municipio = document.getElementById("municipio").value;
    let calle = document.getElementById("calle").value;
    let numero = document.getElementById("num").value;
    let cp = document.getElementById("CoPo").value;

    if (!formulario.checkValidity()) {
        msj.textContent = "Porfavor complete todos los campos";
        msj.style.color = "red";
    }
    else {
        localStorage.setItem("NombreComprador", nombre);
        localStorage.setItem("EmailComprador", email);
        localStorage.setItem("Municipio", municipio);
        localStorage.setItem("Calle", calle);
        localStorage.setItem("Numero", numero);
        localStorage.setItem("CP", cp);

        msj.textContent = "Datos guardados. Continuando con el pago..."
        msj.style.color = "green";

        setTimeout(() => {
            window.location.href = "comprar.html"
        }, 1200);
    }
}
