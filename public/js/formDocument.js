let horaInicial;
let horaFinal;
let hora;
let fecha;
let tiempoTotal;
// Extensión para manejar el contador con alarmas
let interval; // Variable para el intervalo
let startTime; // Tiempo de inicio del contador
let isRunning = false; // Estado del contador
let aht = ''
const btnInicio = document.getElementById('btnInicio')
const observacionesText = document.getElementById('observaciones');
const btnCopiar = document.getElementById('btnCopiar')
const btnEnviar = document.getElementById('btnEnviar')
const selectTecnology = document.getElementById('tecnology');
const selectTipoServicio = document.getElementById('tipoServicio');
const selectNaturaleza = document.getElementById('naturaleza');
const idLlamada = document.getElementById('id-llamada');


btnEnviar.disabled = true;
btnInicio.addEventListener('click', function(event) {
    event.preventDefault();
    horaInicial = new Date();
    hora = horaInicial.toTimeString().split(' ')[0]; // solo hora
    fecha = horaInicial.toISOString().split('T')[0]; // solo fecha
    console.log(hora);
    startCounter()
    insertarTexto()
    btnInicio.disabled = true;
    btnEnviar.disabled = false;
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



btnEnviar.addEventListener('click', async function(event) {
    event.preventDefault()
    if(horaInicial){
        calcularTiempo()
        btnInicio.disabled = false;
    } 
    btnInicio.focus()
    stopCounter()
    try {
        await enviarDatosAlServidor()
        limpiarDatosForm()
        insertarTexto()
    } catch (error) {
        console.error('Error al enviar los datos al servidor:', error);
    }
})

async function enviarDatosAlServidor() {
    const smnet = document.getElementById('smnet');
    const observaciones = document.getElementById('observaciones');
    const tecnology = document.getElementById('tecnology');
    const tipoServicio = document.getElementById('tipoServicio');
    const naturaleza = document.getElementById('naturaleza');
    const horarioB2B = document.getElementById('horario-b2b');
    const atiendeB2b = document.getElementById('atiende-b2b');
    const celularB2b = document.getElementById('celular-b2b');
    const diasAtencion = document.getElementById('dias-atencion');
    const horarioAtencion = document.getElementById('horario-atencion');
    const documento = document.getElementById('documentoIdentidad');
    const cel = document.getElementById('celular');
    const actualizacion = document.getElementById('actualizacion-datos');
    const guion = document.getElementById('guion-agendamiento');
    const modo = document.getElementById('modo-back');
    const actualizacionDatos = `¿Actualicé los datos?: ${actualizacion.value}, ¿brindé guion de agendamiento?: ${guion.value}, ¿realicé verificación de modo back?: ${modo.value}`

    let plantillaCreada;

    if (horarioB2B.value === 'si') {
        plantillaCreada = `Observaciones: ${observaciones.value}, Id de la llamada: ${idLlamada.value}, SMNET: ${smnet.value}, Tecnología: ${tecnology.value}, Tipo de servicio: ${tipoServicio.value}, Naturaleza: ${naturaleza.value}. Horario B2B activo. Los datos del representante encargado de atender la visita se especifican a continuación: nombre: ${atiendeB2b.value}, celular: ${celularB2b.value}, días de atención: ${diasAtencion.value}, en el horario: ${horarioAtencion.value}, Documento o Nit: ${documento.value}`;
    } else {
        let celular;
        if(cel.value > 0){
            celular = `, cel: ${cel.value}`
        } else {
            celular = ''
        }
        plantillaCreada = `Observaciones: ${observaciones.value}, Id de la llamada ${idLlamada.value}, SMNET: ${smnet.value}, Tecnología: ${tecnology.value}, Tipo de servicio: ${tipoServicio.value}, Naturaleza: ${naturaleza.value}, Documento: ${documento.value}${celular}`;
    }

    const data = {
        idLlamada: idLlamada.value,
        name: document.getElementById('name').value,
        documentoIdentidad: documento.value,
        observaciones: plantillaCreada,
        actualizacionDatos: actualizacionDatos,
        fecha: fecha,
        hora: hora,
        tiempoPromedio: tiempoTotal,
        tipoPlantilla: document.getElementById('modoDeTrabajo').value
    }

    //Enviar datos al servidor 
    try {
        const response = await fetch('http://localhost:5000/api/forms/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }, 
            body: JSON.stringify(data),
        })
        if(response.ok) {
            const result = await response.json()
            console.log('Datos enviados con éxito ', result)
        } else {
            console.log('Error al enviar datos', response.statusText)
        }
    } catch (error) {
        console.error('Error al enviar los datos al servidor', error)
    }
}

function calcularTiempo() {
    horaFinal = new Date();
    console.log(horaFinal.getHours())
    const modoDeTrabajo = document.getElementById('modoDeTrabajo')

    if(modoDeTrabajo.value === 'N2') {
        const diferenciaMilisegundos = horaFinal - horaInicial;
        const diferenciaSegundos = Math.floor(diferenciaMilisegundos / 1000);
        tiempoTotal = diferenciaSegundos
    } else {
        const diferenciaMilisegundos = horaFinal - horaInicial;
        const diferenciaSegundos = Math.floor(diferenciaMilisegundos / 1000);
        tiempoTotal = diferenciaSegundos
    }
}

async function insertarTexto() {
    const tipoPlantilla = document.getElementById('modoDeTrabajo')
    const totalTiempotext = document.getElementById('totalTiempoText')
    let tiempoTotal = 0;
    let counter = 0;

    try {
        // realizar la solicitud a la Api para obtener los registros 
        const response = await fetch('http://localhost:5000/api/forms/')
        if(!response.ok) {
            throw new Error('Error al obtener los datos ', response.statusText)
        }

        const data = await response.json()

        //Filtrar datos según el modo de trabajo seleccionado N1 o N2
        if(tipoPlantilla.value === 'N2'){
            const registrosN2 = data.filter(registro => registro.tipoPlantilla === 'N2')
            tiempoTotal = registrosN2.reduce((acc, curr) => acc + curr.tiempoPromedio, 0) // sumar el tiempo promedio
            counter = registrosN2.length // contar el número de registros
            totalTiempotext.style.backgroundColor = '#D5D2F5';
        } else {
            const registrosN1 = data.filter(registro => registro.tipoPlantilla === 'N1')
            tiempoTotal = registrosN1.reduce((acc, curr) => acc + curr.tiempoPromedio, 0) // sumar el tiempo promedio
            counter = registrosN1.length // contar el número de registros
            totalTiempotext.style.backgroundColor = '#f9f9f9';
        }

        //calcular AHT
        if(tiempoTotal > 0 && counter > 0){
            const promedio = tiempoTotal / counter;
            const aht = `AHT de ${tipoPlantilla.value}: --- ${promedio.toFixed()}, Min ${((promedio / 60).toFixed(1))}`;
            totalTiempotext.textContent = aht;
        } else {
            totalTiempotext.textContent = '0';
        }
    } catch (error) {
        console.error('Error al insertar texto:', error);
        totalTiempotext.textContent = 'Error al cargar datos';
    }
}
insertarTexto()



function insertarTextDinamico() {
    const modoDeTrabajo = document.getElementById('modoDeTrabajo')
    modoDeTrabajo.addEventListener('change' , () => { insertarTexto()})
}
insertarTextDinamico()

//Copiar los datos al portapapeles
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
        let celular;
        if(cel.value > 0){
            celular = `, cel: ${cel.value}`
        } else {
            celular = ''
        }
        const plantillaCreada = `Observaciones ${observaciones.value}, Id de la llamada ${idLlamada.value}, prueba SMNET: ${smnet.value}, tecnología: ${tecnology.value}, tipo de servicio: ${tipoServicio.value}, naturaleza del problema: ${naturaleza.value}, documento: ${documento.value}${celular}`;
        return navigator.clipboard.writeText(plantillaCreada)
        }
}

function limpiarDatosForm () {
    document.getElementById('id-llamada').value = '';
    document.getElementById('smnet').value = '';
    document.getElementById('name').value = '';
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
    ocultarB2b()
    function reiniciarObservarciones () {
        const observaciones = document.getElementById('observaciones')
        observaciones.style.height = 'auto';
    }
    reiniciarObservarciones()
    
}
limpiarDatosForm()
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



// Función para reproducir un sonido genérico
function playSound(frequency = 440, duration = 1000) {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
    gainNode.gain.setValueAtTime(0.5, audioContext.currentTime);

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.start();
    setTimeout(() => {
        oscillator.stop();
        audioContext.close();
    }, duration);
}

// Función para iniciar el contador
function startCounter() {
    if (isRunning) return; // Evita múltiples inicios
    isRunning = true;

    startTime = Date.now();
    let hasPlayedInitialAlarm = false;
    let nextAlarmTime = 60; // Primera alarma a los 60 segundos

    interval = setInterval(() => {
        const elapsedTime = (Date.now() - startTime) / 1000; // Tiempo transcurrido en segundos

        // Alarma inicial a los 60 segundos
        if (!hasPlayedInitialAlarm && elapsedTime >= 60) {
            playSound(); // Reproduce el sonido
            hasPlayedInitialAlarm = true;
            nextAlarmTime = 230; // Configura la siguiente alarma a los 200 segundos (60 + 170)
        }

        // Alarmas repetitivas cada 140 segundos
        if (elapsedTime >= nextAlarmTime) {
            playSound(); // Reproduce el sonido
            nextAlarmTime += 170; // Actualiza para la siguiente alarma
        }

    }, 100); // Actualización precisa cada 100ms
}


// Función para detener el contador
function stopCounter() {
    clearInterval(interval);
    isRunning = false;
}