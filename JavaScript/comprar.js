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

    mensaje.textContent = "Redirigiendo...";
    mensaje.style.color = "green";
    form.reset();

    setTimeout(() => {
            window.location.href = "index.html"
        }, 1200);
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
