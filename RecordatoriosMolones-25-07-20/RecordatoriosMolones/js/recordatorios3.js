const formulario = document.getElementById('form-tarea');
const lista = document.getElementById('lista-tareas');
const mensaje = document.getElementById('mensaje');
const alarma = document.getElementById('alarma');
const reloj = document.getElementById('clock');

const fechaTexto = document.getElementById('date'); // Para mostrar fecha del reloj

const modal = document.getElementById('modal-error');
const modalMensaje = document.getElementById('modal-mensaje');
const modalCerrar = document.getElementById('modal-cerrar');

let tareas = [];

const quotesPasado = [
  "Cuando sólo se piensa en el pasado, es que no se tiene futuro. — Somerset Maugham",
  "El mejor profeta del futuro es el pasado. — Lord Byron",
  "El niño enlaza el pasado con el futuro. — Oswald Spengler",
  "El pasado me ha revelado la estructura del futuro. — Pierre Theilhard de Chardin",
  "El pasado y el presente son los medios, nuestra meta es el porvenir. — Blaise Pascal",
  "Estudia el pasado si quieres pronosticar el futuro. — Confucio",
  "Las antiguedades son el único campo en que el pasado tiene aun futuro. — Harold Wilson",
  "Leer en el pasado la moralidad de nuestro tiempo puede no facilitar la tarea del historiador. — Hugh Thomas",
  "Lo bueno del pasado es que todo estaba entonces a mitad de precio. — Ramón Gómez de la Serna",
  "Me gustan más los sueños del futuro que las historias del pasado. — Thomas Jefferson",
  "No hay que tratar de olvidar el pasado; hay que afrontarlo. — Alexander McCall Smith",
  "Quien controla el pasado, controla también el presente. — George Orwell",
  "Si no somos corresponsables del pasado, tampoco tendremos derecho al futuro. — Fernando Savater",
  "Solamente aquél que contribuye al futuro tiene derecho a juzgar el pasado. — Friedrich Nietzsche",
  "Todo lenguaje es un alfabeto de símbolos cuyo ejercicio presupone un pasado compartido. — Jorge Luis Borges",
  "Todos los hombres de la historia que han hecho algo con el futuro tenían los ojos fijos en el pasado. — Chesterton"
];

const quotesFuturo = [
  "El futuro pertenece a quienes creen en la belleza de sus sueños. — Eleanor Roosevelt",
  "El futuro empieza hoy, no mañana. — Papa Juan Pablo II",
  "La mejor forma de predecir el futuro es crearlo. — Peter Drucker",
  "No podemos predecir el futuro, pero podemos inventarlo. — Dennis Gabor",
  "El futuro recompensa a quienes siguen adelante. — Anónimo"
];

// ⏰ Reloj en vivo + fecha
function actualizarReloj() {
    const ahora = new Date();

    const horas = String(ahora.getHours()).padStart(2, '0');
    const minutos = String(ahora.getMinutes()).padStart(2, '0');
    reloj.innerText = `${horas}:${minutos}`;

    const opcionesFecha = { 
        weekday: 'long', 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric' 
    };
    fechaTexto.innerText = ahora.toLocaleDateString(undefined, opcionesFecha);
}

setInterval(actualizarReloj, 1000);
actualizarReloj();

// 🧠 Cargar tareas guardadas
window.addEventListener('DOMContentLoaded', () => {
    const datosGuardados = localStorage.getItem('tareas');
    if (datosGuardados) {
        tareas = JSON.parse(datosGuardados);
        mostrarTareas();
    }
});

// Función para mostrar modal con mensaje
function mostrarModal(mensaje) {
  modalMensaje.innerText = mensaje;
  modal.style.display = 'block';
}
modalCerrar.addEventListener('click', () => {
  modal.style.display = 'none';
});

// ➕ Añadir tarea con validación
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

    const fechaTarea = new Date(`${fecha}T${hora}`);
    const ahora = new Date();

    if (fechaTarea < ahora) {
        const quote = quotesPasado[Math.floor(Math.random() * quotesPasado.length)];
        mostrarModal(`Fecha pasada no permitida.\n"${quote}"`);
        return;
    }

    if (fechaTarea.getFullYear() > 3000) {
        const quote = quotesFuturo[Math.floor(Math.random() * quotesFuturo.length)];
        mostrarModal(`Fecha demasiado lejana en el futuro.\n"${quote}"`);
        return;
    }

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

        const btnHecho = document.createElement('button');
        btnHecho.id = 'done';
        const iconHecho = document.createElement('span');
        iconHecho.className = 'material-symbols-rounded';
        iconHecho.innerText = 'done';
        btnHecho.appendChild(iconHecho);
        btnHecho.addEventListener('click', () => {
            t.hecha = true;

            alarma.pause();
            alarma.currentTime = 0;
            alarma.loop = false;

            mostrarTareas();
        });

        const btnEliminar = document.createElement('button');
        btnEliminar.id = 'cancel'
        const iconEliminar = document.createElement('span');
        iconEliminar.className = 'material-symbols-rounded';
        iconEliminar.innerText = 'close';
        btnEliminar.appendChild(iconEliminar);
        btnEliminar.addEventListener('click', () => {
            tareas = tareas.filter(x => x.id !== t.id);

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

    localStorage.setItem('tareas', JSON.stringify(tareas));
}

// ordena tareas 

tareas.sort((a, b) => {
    const fechaA = new Date(`${a.fecha}T${a.hora}`);
    const fechaB = new Date(`${b.fecha}T${b.hora}`);
    return fechaA - fechaB;
});


// Poner alerta en el título de la página
let tituloOriginal = document.title;
let intervaloTitulo = null;

function inicioAlertaTitulo(nombreTarea, hora) {
  if (intervaloTitulo) return;

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
                t.alertada = true;
                mostrarTareas();

                alarma.loop = true;
                alarma.play();

                inicioAlertaTitulo(t.texto, t.hora);
            }
        }
    });
}, 30000);
