let minutos = 5;
let segundos = 0;
let descuentoActivo = true;

const minElem = document.getElementById("min");
const segElem = document.getElementById("seg");

function actualizarTimer() {
    minElem.textContent = minutos.toString().padStart(2, "0");
    segElem.textContent = segundos.toString().padStart(2, "0");
}

function iniciarTemporizador() {
    const intervalo = setInterval(() => {
        if (segundos === 0) {
            if (minutos === 0) {
                clearInterval(intervalo);
                descuentoActivo = false;
                document.getElementById("header").textContent =
                    "¡El tiempo terminó! Ya no aplica el 10% de descuento.";
                actualizarPrecioFinal();
                return;
            }
            minutos--;
            segundos = 59;
        } else {
            segundos--;
        }
        actualizarTimer();
    }, 1000);
}

function actualizarPrecioFinal() {
    const precioOriginal = parseFloat(localStorage.getItem("producto_precio")) || 0;
    let precioFinal = precioOriginal;

    if (descuentoActivo) {
        precioFinal = precioOriginal * 0.9;
    }

    const precioElem = document.getElementById("precioFinal");
    if (precioElem) {
        precioElem.textContent = "$" + precioFinal.toFixed(2);
    }
}

actualizarTimer();
iniciarTemporizador();

const form = document.getElementById("formPago");
const mensaje = document.getElementById("mensaje");

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const nombretarjeta = document.getElementById("nombre").value.trim();
    const tarjeta = document.getElementById("numeroTarjeta").value.trim();
    const fecha = document.getElementById("fecha").value;
    const cvv = document.getElementById("cvv").value.trim();

    if (tarjeta.length !== 16 || isNaN(tarjeta)) {
        mensaje.textContent = "Número de tarjeta inválido.";
        mensaje.style.color = "red";
        return;
    }

    if (cvv.length !== 3 || isNaN(cvv)) {
        mensaje.textContent = "CVV inválido.";
        mensaje.style.color = "red";
        return;
    }

    if (nombretarjeta === "" || fecha === "") {
        mensaje.textContent = "Por favor, completa todos los campos.";
        mensaje.style.color = "red";
        return;
    }

    const nombreComprador = localStorage.getItem("NombreComprador");
    const emailComprador = localStorage.getItem("EmailComprador");
    const municipio = localStorage.getItem("Municipio");
    const calle = localStorage.getItem("Calle");
    const numero = localStorage.getItem("Numero");
    const cp = localStorage.getItem("CP");

    const producto = localStorage.getItem("producto_nombre");
    const precioOriginal = parseFloat(localStorage.getItem("producto_precio")) || 0;

    let precioFinalCompra;

    if (descuentoActivo) {
        precioFinalCompra = (precioOriginal * 0.90).toFixed(2);
    } else {
        precioFinalCompra = precioOriginal.toFixed(2);
    }

    localStorage.setItem("producto_precio_final", precioFinalCompra);

    const emailData = {
        to_email: emailComprador,
        nombre: nombreComprador,
        municipio: municipio,
        calle: calle,
        numero: numero,
        cp: cp,
        producto: producto,
        precio: precioFinalCompra
    };

    emailjs.send("service_ycx2dlw", "template_h9judqg", emailData)
        .then(() => {
            mensaje.textContent = "Pago realizado. Enviando confirmación...";
            mensaje.style.color = "green";

            setTimeout(() => {
                window.location.href = "gracias.html";
            }, 1500);
        })
        .catch((error) => {
            mensaje.textContent = "Error enviando el correo.";
            mensaje.style.color = "red";
            console.error(error);
        });
});

window.addEventListener("DOMContentLoaded", () => {
    const nombre = localStorage.getItem("producto_nombre");
    const precio = parseFloat(localStorage.getItem("producto_precio")) || 0;

    const contenedor = document.querySelector(".contenedor");

    const resumen = document.createElement("div");
    resumen.innerHTML = `
        <h2>Producto seleccionado</h2>
        <p><strong>${nombre}</strong></p>
        <p>Precio original: $${precio.toFixed(2)}</p>
        <p>Precio con descuento: <span id="precioFinal"></span></p>
    `;

    contenedor.prepend(resumen);

    actualizarPrecioFinal();
});
