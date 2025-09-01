// Lista de citas sobre el tiempo
const citas = [
    "«Conocer el tiempo y usar el hombre de la oportunidad, hace a los hombres prósperos». – Fernando de Rojas",
    "«Cualquier tiempo pasado fue mejor». – Jorge Manrique",
    "«Cuando llega el tiempo en que se podría, ha pasado en el que se pudo». – Marie von Ebner-Eschenbach",
    "«De los tiempos el que más corre es el alegre». – Virgilio",
    "«Dejar que el tiempo resuelva nuestras dudas y dolores es mejor que tratar de cortarlos impacientemente». – Stephen Crane",
    "«Donde quiera que viva alguna cosa hay abierto, en alguna parte, un registro donde el tiempo se inscribe». – Henri Bergson",
    "«El gran educador: el tiempo». – Edmund Burke",
    "«El hombre es el experimento; el tiempo dirá si valió la pena». – Mark Twain",
    "«El problema de nuestro tiempo es que el futuro ya no es lo que era». – Paul Valery",
    "«El tiempo de vivir es para todos breve e irreparable». – Virgilio",
    "«El tiempo es el gran autor. Siempre escribe el final perfecto». – Charles Chaplin",
    "«El tiempo es una droga, en cantidades excesivas mata». – Terry Pratchett",
    "«El tiempo, esa vieja niñera, me acuñó en la resignación». – John Keats",
    "«El tiempo es como un río, formado por los hechos, que adquiere violenta corriente». – Marco Aurelio",
    "«El tiempo es el que desengaña a los hombres». – Emiliano Zapata",
    "«El tiempo es la cosa más valiosa que el hombre puede gastar». – Teofrasto",
    "«El tiempo es la distancia más larga entre dos lugares». – Tennessee Williams",
    "«El tiempo es la imagen móvil de la eternidad inmóvil». – Platón",
    "«El tiempo es muy lento para los que esperan, muy rápido para los que temen, muy largo para los que sufren, muy corto para los que gozan; pero para quienes aman, el tiempo es eternidad». – William Shakespeare",
    "«El tiempo es un despilfarro». – Oscar Wilde",
    "«El tiempo, excelente médico de nuestras pasiones». – Montaigne",
    "«El tiempo hiere todas las curaciones». – Groucho Marx",
    "«El tiempo no es oro; el tiempo es vida». – José Luis Sampedro",
    "«El tiempo no es sino el espacio entre nuestros recuerdos». – Henry Frédéric Amiel",
    "«En el fondo, lo único que tenemos es tiempo, y debemos pensar que no está ahí para economizarlo, sino para disfrutarlo». – Ellen Goodman",
    "«Es preciso matar el tiempo. Realmente, es la única ocupación de nuestra vida». – Anatole France",
    "«Hablamos de matar el tiempo como si no fuera el tiempo el que nos mata a nosotros». – Alphonse Allais",
    "«La mayor discreción es acomodarse al tiempo». – Lope de Vega",
    "«Lleva tiempo llegar a ser joven». – Picasso",
    "«Lo único que realmente nos pertenece es el tiempo: incluso aquel que no tiene otra cosa, cuenta con eso». – Baltasar Gracián",
    "«Mañana es sólo un adverbio de tiempo». – Joan Manuel Serrat",
    "«No podemos matar el tiempo sin herir la eternidad». – Henry Thoreau",
    "«Nosotros matamos el tiempo, pero él nos entierra». – Machado de Assis",
    "«Recordar es la única manera de detener el tiempo». – Jaroslav Seifert",
    "«Se dice que el tiempo es un gran maestro; lo malo es que va matando a sus discípulos». – Héctor Berlioz",
    "«Si hay un valor en la vida que tengo muy claro es: tener tiempo para perderlo». – Jaume Sisa",
    "«Tiempo: lo que los hombres siempre tratan de matar, pero que acaba por matarlos». – Herbert Spencer",
    "«Todo lo mortal el tiempo corta». – Petrarca",
    "«Un gran hombre no tiene tiempo para nada más que sentarse y ser grande». – Francis Scott Fitzgerald"
];

// Función para seleccionar una cita aleatoria
function mostrarCita() {
    const cita = citas[Math.floor(Math.random() * citas.length)];
    document.getElementById("citaDelDia").innerText = cita;
}

// Mostrar cita al cargar la página
window.onload = mostrarCita;