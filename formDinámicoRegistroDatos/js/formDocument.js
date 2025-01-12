let horaInicial;
let dataHora = '';
let horaFinal;

const btnInicio = document.getElementById('btnInicio').addEventListener('click', function(event) {
    event.preventDefault();
    horaInicial = new Date();
    insertarTexto()
})

const btnCopiar = document.getElementById('btnCopiar').addEventListener('click', function(event) {
    event.preventDefault()
    console.log(horaInicial)
})

const btnEnviar = document.getElementById('btnEnviar').addEventListener('click', function(event) {
    calcularTiempo()
    
})

function calcularTiempo() {
    horaFinal = new Date();
    console.log(horaFinal)
    const diferenciaMilisegundos = horaFinal - horaInicial;
    const diferenciaSegundos = Math.floor(diferenciaMilisegundos / 1000);

    let tiempoTotal = parseInt(localStorage.getItem('datos')) || 0;
    tiempoTotal += diferenciaSegundos;
    localStorage.setItem('datos', tiempoTotal)

    let counter = parseInt(localStorage.getItem('counter') || 0);
    counter++;
    localStorage.setItem('counter', counter)
}

function insertarTexto () {
    const totalTiempotext = document.getElementById('totalTiempoText')
    
    const totalPrueba = parseInt(localStorage.getItem('datos'))
    const counter = parseInt(localStorage.getItem('counter'))
    if(totalPrueba > 0) {
        totalTiempotext.textContent = `Promedio segundos ${(totalPrueba/counter).toFixed()} y en minutos ${((totalPrueba/60)/counter).toFixed(1)}`;
        } else {
            totalTiempotext.textContent = '0'
            }
}

const localStorageButton = document.getElementById('localStorageButton').addEventListener('click', function(event) {
    event.preventDefault()
    localStorage.clear()
    insertarTexto()
    })