const formulario = document.getElementById('form-tarea');
const lista = document.getElementById('lista-tareas');
const mensaje = document.getElementById('mensaje');
const alarma = document.getElementById('alarma');
const reloj = document.getElementById('clock');


const fecha = document.getElementById('date'); // Nuevo elemento para la fecha

let tareas = [];

// ⏰ Reloj en vivo
// function actualizarReloj() {
//     const ahora = new Date();
//     const horas = String(ahora.getHours()).padStart(2, '0');
//     const minutos = String(ahora.getMinutes()).padStart(2, '0');
//     const segundos = String(ahora.getSeconds()).padStart(2, '0');
//     reloj.innerText = `${horas}:${minutos}`;
// }
// setInterval(actualizarReloj, 1000);
// actualizarReloj();


function actualizarReloj() {
    const ahora = new Date();

    // Hora y minutos
    const horas = String(ahora.getHours()).padStart(2, '0');
    const minutos = String(ahora.getMinutes()).padStart(2, '0');
    reloj.innerText = `${horas}:${minutos}`;

    // Fecha en idioma del navegador
    const opcionesFecha = { 
        weekday: 'long', 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric' 
    };
    const fechaTexto = ahora.toLocaleDateString(undefined, opcionesFecha);
    fecha.innerText = fechaTexto;
}

setInterval(actualizarReloj, 1000);
actualizarReloj();






// 🧠 Cargar tareas del localStorage
window.addEventListener('DOMContentLoaded', () => {
    const datosGuardados = localStorage.getItem('tareas');
    if (datosGuardados) {
        tareas = JSON.parse(datosGuardados);
        mostrarTareas();
    }
});

// ➕ Añadir nueva tarea
formulario.addEventListener('submit', function (e) {
    e.preventDefault();

    const texto = document.getElementById('texto').value.trim();
    const fecha = document.getElementById('fecha').value;
    const hora = document.getElementById('hora').value;

    if (!texto || !fecha || !hora) {
        mensaje.innerText = 'Completa todos los campos';
        return;
    }

    mensaje.innerText = '';

    const tarea = {
        id: Date.now(),
        texto,
        fecha,
        hora,
        hecha: false,
        alertada: false
    };

    tareas.push(tarea);
    mostrarTareas();
    formulario.reset();
});

// 🖼 Mostrar tareas en pantalla
function mostrarTareas() {
    lista.innerHTML = '';

    tareas.forEach(t => {
        const div = document.createElement('div');
        div.classList.add('tarea');
        if (t.hecha) {
            div.classList.add('hecha');
        } else if (t.alertada) {
            div.classList.add('alerta');
        }

        const h3 = document.createElement('h3');
        h3.innerText = `${t.texto} - ${t.fecha} ${t.hora}`;

        // const btnHecho = document.createElement('button');
        // btnHecho.innerText = 'Hecho';
        // btnHecho.addEventListener('click', () => {
        //     t.hecha = true;

        //     // Detener sonido y parpadeo si está activo
        //     alarma.pause();
        //     alarma.currentTime = 0;
        //     alarma.loop = false;

        //     mostrarTareas();
        // });

        // const btnEliminar = document.createElement('button');
        // btnEliminar.innerText = 'Cancelar';
        // btnEliminar.addEventListener('click', () => {
        //     tareas = tareas.filter(x => x.id !== t.id);

        //     // Por si estaba sonando, detener alarma
        //     alarma.pause();
        //     alarma.currentTime = 0;
        //     alarma.loop = false;

        //     mostrarTareas();
        // });

        const btnHecho = document.createElement('button');
        btnHecho.id = 'done';
        const iconHecho = document.createElement('span');
        iconHecho.className = 'material-symbols-rounded';
        iconHecho.innerText = 'done';  // ícono de "Hecho"
        btnHecho.appendChild(iconHecho);
        btnHecho.addEventListener('click', () => {
            t.hecha = true;

            // Detener sonido y parpadeo si está activo
            alarma.pause();
            alarma.currentTime = 0;
            alarma.loop = false;

            mostrarTareas();
        });

        const btnEliminar = document.createElement('button');
        btnEliminar.id = 'cancel'
        const iconEliminar = document.createElement('span');
        iconEliminar.className = 'material-symbols-rounded';
        iconEliminar.innerText = 'close';  // ícono de "Cancelar"
        btnEliminar.appendChild(iconEliminar);
        btnEliminar.addEventListener('click', () => {
            tareas = tareas.filter(x => x.id !== t.id);

            // Por si estaba sonando, detener alarma
            alarma.pause();
            alarma.currentTime = 0;
            alarma.loop = false;

            mostrarTareas();
        });


        div.appendChild(h3);
        div.appendChild(btnHecho);
        div.appendChild(btnEliminar);
        lista.appendChild(div);
    });

    // 💾 Guardar en localStorage
    localStorage.setItem('tareas', JSON.stringify(tareas));
}

// Pone alerta en el titulo de la pagina

let tituloOriginal = document.title;
let intervaloTitulo = null;

function inicioAlertaTitulo(nombreTarea, hora) {
  if (intervaloTitulo) return; // Evitar múltiples intervalos
  
  intervaloTitulo = setInterval(() => {
    document.title = (document.title === tituloOriginal) 
      ? `🔔 ${nombreTarea} - ${hora} 🔔`
      : tituloOriginal;
  }, 1000);
}

function detenerAlertaTitulo() {
  clearInterval(intervaloTitulo);
  document.title = tituloOriginal;
  intervaloTitulo = null;
}



// ⏱ Verificar alertas cada 30 segundos
setInterval(() => {
    const ahora = new Date();
    tareas.forEach(t => {
        if (!t.hecha && !t.alertada) {
            const momentoTarea = new Date(`${t.fecha}T${t.hora}`);
            if (Math.abs(momentoTarea - ahora) < 30000) {
                // alert(`¡Es hora de: ${t.texto}!`);
                t.alertada = true;
                mostrarTareas();

                alarma.loop = true;
                alarma.play();
            }
        }
    });
}, 30000);
