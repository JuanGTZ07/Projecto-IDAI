let DuracionContador = 300;
let IntervaloContador;

let minutos = document.getElementById("min");
let segundos = document.getElementById("seg");

function ContadorInicial() {
    var DuracionContador = 300;
    var TiempoTranscurrido = Date.now();
    var TiempoFaltante = DuracionContador - TiempoTranscurrido;

    var minutos = Math.floor(TiempoFaltante / 1000 / 60);
    var segundos = Math.floor((TiempoFaltante / 1000) % 60);

    var Contador = document.getElementById('timer');
    Contador.textContent = minutos + ":" + segundos;
}

window.addEventListener('load', function() {
    ContadorInicial();
});

const StartButton = document.getElementById('start-button');
StartButton.disabled = true;

function ActualizarContador() {
    const now = new Date().getTime();
    const distance = 
}