let horaInicial;
let horaFinal;
const btnInicio = document.getElementById('btnInicio')
const observacionesText = document.getElementById('observaciones');
const btnCopiar = document.getElementById('btnCopiar')
const btnEnviar = document.getElementById('btnEnviar')
const selectTecnology = document.getElementById('tecnology');
const selectTipoServicio = document.getElementById('tipoServicio');
const selectNaturaleza = document.getElementById('naturaleza');
const idLlamada = document.getElementById('id-llamada');



btnInicio.addEventListener('click', function(event) {
    event.preventDefault();
    horaInicial = new Date();
    insertarTexto()
    btnInicio.disabled = true;
    idLlamada.focus()

})


observacionesText.addEventListener('input', () => {
    observacionesText.style.height = 'auto';
    observacionesText.style.height = `${observacionesText.scrollHeight}px`;
});



btnCopiar.addEventListener('click', function(event) {
    event.preventDefault()
    console.log(horaInicial)
    copiarDatos()
    btnEnviar.focus()
})



btnEnviar.addEventListener('click', function(event) {
    event.preventDefault()
    if(horaInicial){
        calcularTiempo()
        btnInicio.disabled = false;
        limpiarDatosForm()
    } 
    btnInicio.focus()
    ocultarB2b()
    insertarTexto()
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

function insertarTexto() {
    const totalTiempotext = document.getElementById('totalTiempoText')
    
    const totalPrueba = parseInt(localStorage.getItem('datos'))
    const counter = parseInt(localStorage.getItem('counter'))
    if(totalPrueba > 0) {
        totalTiempotext.textContent = `Promedio segundos ${(totalPrueba/counter).toFixed()} y en minutos ${((totalPrueba/60)/counter).toFixed(1)}`;
        } else {
            totalTiempotext.textContent = '0'
            }
}
insertarTexto()

const localStorageButton = document.getElementById('localStorageButton').addEventListener('click', function(event) {
    event.preventDefault()
    localStorage.clear()
    insertarTexto()
    })

function copiarDatos () {
    const smnet = document.getElementById('smnet')
    const observaciones = document.getElementById('observaciones')
    const tecnology = document.getElementById('tecnology');
    const tipoServicio = document.getElementById('tipoServicio')
    const naturaleza = document.getElementById('naturaleza')
    const horarioB2B = document.getElementById('horario-b2b')
    const atiendeB2b = document.getElementById('atiende-b2b')
    const celularB2b = document.getElementById('celular-b2b')
    const diasAtencion = document.getElementById('dias-atencion')
    const horarioAtencion = document.getElementById('horario-atencion')
    const documento = document.getElementById('documentoIdentidad')
    const cel = document.getElementById('celular')

    if(horarioB2B.value === 'si'){
        const plantillaCreada = `Observaciones ${observaciones.value}, Id de la llamada ${idLlamada.value}, prueba SMNET: ${smnet.value}, tecnología: ${tecnology.value}, tipo de servicio: ${tipoServicio.value}, naturaleza del problema: ${naturaleza.value}. Horario B2B activo. Los datos del representante encargado de atender la visita se especifican a continuación: nombre: ${atiendeB2b.value}, celular: ${celularB2b.value}, días de atención: ${diasAtencion.value}, en el horario: ${horarioAtencion.value}, documento: ${documento.value}`;
        return navigator.clipboard.writeText(plantillaCreada)
    } else {
        const plantillaCreada = `Observaciones ${observaciones.value}, Id de la llamada ${idLlamada.value}, prueba SMNET: ${smnet.value}, tecnología: ${tecnology.value}, tipo de servicio: ${tipoServicio.value}, naturaleza del problema: ${naturaleza.value}, documento: ${documento.value}, cel: ${cel.value}`;
        return navigator.clipboard.writeText(plantillaCreada)
        }
}

function limpiarDatosForm () {
    document.getElementById('id-llamada').value = '';
    document.getElementById('smnet').value = '';
    document.getElementById('observaciones').value = '';
    document.getElementById('tecnology').value = '';
    document.getElementById('tipoServicio').value = '';
    document.getElementById('naturaleza').value = '';
    document.getElementById('celular').value = '';
    document.getElementById('horario-b2b').value = 'no';
    document.getElementById('documentoIdentidad').value = '';
    document.getElementById('atiende-b2b').value = '';
    document.getElementById('celular-b2b').value = '';
    document.getElementById('dias-atencion').value = 'Lunes a Viernes';
    document.getElementById('actualizacion-datos').value = 'no';
    document.getElementById('guion-agendamiento').value = 'no';
    document.getElementById('modo-back').value = 'no';
    
}

/*Cambiar de forma dinámica b2b */

function ocultarB2b() {
    const dinamicB2bInvisible = document.getElementById('horario-b2b');
    const invisible = document.getElementById('horario-b2b-invisible');

    function actualizarVisibilidad () {
        if(dinamicB2bInvisible.value === 'si'){
            
            invisible.style.display = 'block';
        }else {
            const invisible = document.getElementById('horario-b2b-invisible');
            invisible.style.display = 'none';
        }
    }
    dinamicB2bInvisible.addEventListener('change', actualizarVisibilidad);
    actualizarVisibilidad()
}   
ocultarB2b() 