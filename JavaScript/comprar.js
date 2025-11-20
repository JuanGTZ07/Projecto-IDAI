// ----- Temporizador -----
let minutos = 5;
let segundos = 0;

function actualizarTimer() {
    const minElem = document.getElementById("min");
    const segElem = document.getElementById("seg");

    minElem.textContent = minutos.toString().padStart(2, "0");
    segElem.textContent = segundos.toString().padStart(2, "0");
}

function iniciarTemporizador() {
    const intervalo = setInterval(() => {
        if (segundos === 0) {
            if (minutos === 0) {
                clearInterval(intervalo);
                document.getElementById("header").textContent =
                    "¡El tiempo terminó! Ya no aplica el 10% de descuento.";
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

// ----- Simulación de pago con tarjeta -----
document.addEventListener("DOMContentLoaded", () => {
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

        // Simulación del pago exitoso
        mensaje.textContent = "Pago realizado con éxito. ¡Gracias por tu compra!";
        mensaje.style.color = "green";
        form.reset();
    });
});
