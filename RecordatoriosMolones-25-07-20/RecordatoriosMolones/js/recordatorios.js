const formulario = document.getElementById('form-tarea');
const lista = document.getElementById('lista-tareas');
const mensaje = document.getElementById('mensaje');
const alarma = document.getElementById('alarma');
const reloj = document.getElementById('clock');

let tareas = [];

// ⏰ Reloj en vivo
function actualizarReloj() {
    const ahora = new Date();
    const horas = String(ahora.getHours()).padStart(2, '0');
    const minutos = String(ahora.getMinutes()).padStart(2, '0');
    const segundos = String(ahora.getSeconds()).padStart(2, '0');
    reloj.innerText = `${horas}:${minutos}:${segundos}`;
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
        if (t.hecha) div.classList.add('hecha');
        if (t.alertada) div.classList.add('alerta');

        const h3 = document.createElement('h3');
        h3.innerHTML = `
        <span class="primera-linea">${t.texto} - </span><br>
        <span>${t.fecha}-${t.hora}</span>
    `;
    

        const btnHecho = document.createElement('button');
        btnHecho.innerText = 'Hecho';
        btnHecho.addEventListener('click', () => {
            t.hecha = true;
            mostrarTareas();
        });

        const btnEliminar = document.createElement('button');
        btnEliminar.innerText = 'Cancelar';
        btnEliminar.addEventListener('click', () => {
            tareas = tareas.filter(x => x.id !== t.id);
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

// ⏱ Verificar alertas cada 30 segundos
setInterval(() => {
    const ahora = new Date();
    tareas.forEach(t => {
        if (!t.hecha && !t.alertada) {
            const momentoTarea = new Date(`${t.fecha}T${t.hora}`);
            if (Math.abs(momentoTarea - ahora) < 30000) {
                alert(`¡Es hora de: ${t.texto}!`);
                t.alertada = true;
                mostrarTareas();
                alarma.play();
            }
        }
    });
}, 30000);
