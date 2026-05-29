// =========================================================
// tutoriales.js — Base de datos de tutoriales
// Punto Digital Comunitario Morenense
//
// ESTRUCTURA DE CADA TUTORIAL:
//   clave:      string único, sin espacios (para URL y storage)
//   categoria:  agrupa tutoriales en el menú
//   nivel:      'basico' | 'intermedio' (para filtros futuros)
//   titulo:     texto visible en el botón del menú
//   icono:      emoji que acompaña el título
//   detalle:    párrafo de presentación, en tono cercano
//   pasos:      array de strings; acepta HTML limitado:
//               <strong>, <em>, <button class="btn-paso">
//   nota:       (opcional) texto de cierre o advertencia especial
//
// CÓMO AGREGAR UN TUTORIAL NUEVO:
//   1. Copiar un bloque existente
//   2. Cambiar la clave y todos los campos
//   3. Elegir categoria de las existentes o crear una nueva
//   4. El tutorial aparece automáticamente en el menú
//   No hace falta tocar index.html ni ui.js.
// =========================================================

const baseDeTutoriales = {

    // ══════════════════════════════════════════════════════
    // CATEGORÍA: tramites
    // Trámites digitales con el Estado argentino
    // ══════════════════════════════════════════════════════

    correo: {
        categoria: 'tramites',
        nivel:     'basico',
        titulo:    "Crear un Correo Electrónico",
        icono:     "✉️",
        detalle:   "El correo es como tu buzón de cartas pero en el celu. Te lo van a pedir para todo: para sacar turnos, para el banco y para registrarte en las aplicaciones. ¡Es la llave maestra de internet!",
        pasos: [
            "Tenés dos opciones: buscá en tu celular una aplicación que se llame <strong>Gmail</strong> (tiene el dibujo de un sobrecito blanco con bordes rojos) y tocá. O, si preferís, entrá directo desde el navegador tocando este botón: <button class='btn-paso' onclick=\"window.open('https://accounts.google.com/SignUp','_blank','noopener,noreferrer')\">Ir directo a crear cuenta en Gmail</button>",
            "Si te aparece para iniciar sesión, buscá abajo un texto que dice <strong>'Crear cuenta'</strong> o <strong>'Registrarse'</strong> y seleccionalo. Elegí la opción que dice <strong>'Para mi uso personal'</strong>.",
            "Escribí tu <strong>Nombre</strong> y, si querés, el <strong>Apellido</strong> en los casilleros blancos. Después tocá el botón azul que dice <strong>'Siguiente'</strong>.",
            "Poné el día, mes y año de tu nacimiento, y tu género. Volvé a tocar <strong>'Siguiente'</strong>.",
            "Ahora tenés que inventar el <strong>'nombre de usuario'</strong> de tu correo. Por ejemplo: <em>Maria_Moreno2026@gmail.com</em>. Si te dice que ya existe, probá agregando un número.",
            "¡Momento contraseña! Inventá una clave segura. Poné algo que te acuerdes (por ejemplo, el nombre de tu nieto y el año). Un buen ejemplo: <em>NicoAngel003$</em>. <strong>¡Anotala en un cuadernito y guardalo bien!</strong>",
            "Dale todo para adelante tocando <strong>'Aceptar'</strong> o <strong>'Siguiente'</strong> a los carteles que aparezcan. ¡Listo! Ya tenés tu dirección de correo electrónico propia. ¡Felicidades!"
        ],
        nota: "💡 Si en algún paso te trabás, cerrá la aplicación y volvé a intentar desde el principio. No perdés nada de lo que ya hiciste."
    },

    anses: {
        categoria: 'tramites',
        nivel:     'basico',
        titulo:    "Sacar un Turno en ANSES",
        icono:     "🏛️",
        detalle:   "¡Olvidate de madrugar y hacer cola! Desde tu celular podés pedir un turno tranquilo desde casa. Seguí estos pasos despacito.",
        pasos: [
            "Primero agarrá tu celular y abrí Internet. Generalmente el navegador se llama <strong>Google Chrome</strong> y tiene un circulito de colores.",
            "Escribí <strong>ANSES</strong> en el buscador, o tocá este botón para entrar seguro a la página oficial: <button class='btn-paso' onclick=\"window.open('https://www.anses.gob.ar','_blank','noopener,noreferrer')\">👉 Ir directo a ANSES</button>",
            "Cuando cargue la página bajá un poquito con el dedo hasta encontrar un botón que diga <strong>'Turnos'</strong> o <strong>'Solicitar Turno'</strong>. Tocá ahí.",
            "Elegí el trámite que necesitás. Los más comunes: <div style='display:flex;flex-direction:column;gap:10px;margin-top:15px'><button class='btn-paso' onclick=\"window.open('https://www.anses.gob.ar/jubilaciones-y-pensiones','_blank')\">👵 Jubilaciones y Pensiones</button><button class='btn-paso' onclick=\"window.open('https://www.anses.gob.ar/asignacion-universal-por-hijo','_blank')\">👶 Asignación Universal por Hijo</button><button class='btn-paso' onclick=\"window.open('https://www.anses.gob.ar/prestacion-por-desempleo','_blank')\">💼 Fondo de Desempleo</button><button class='btn-paso' onclick=\"window.open('https://www.anses.gob.ar','_blank')\">🔎 Ver todos los turnos</button></div>",
            "Te va a pedir tu número de <strong>CUIL</strong>. Son 11 números. Escribilos sin puntos ni guiones.",
            "Si no sabés tu CUIL podés buscarlo acá: <button class='btn-paso' onclick=\"window.open('https://www.anses.gob.ar/consulta/constancia-de-cuil','_blank')\">📄 Ver mi CUIL</button>",
            "Ahora aparece un código raro con letras y números (captcha). Copialo igualito. Si no se entiende, tocá donde dice <strong>'Cambiar imagen'</strong> para que aparezca uno diferente. Si el captcha sigue siendo difícil de leer, podés ir directamente a la oficina — eso también está bien.",
            "Elegí la oficina de ANSES más cerca de tu barrio o localidad.",
            "Seleccioná el día y horario que te quede cómodo. <strong>Anotá todo en un papel para no olvidarte.</strong>",
            "Por último tocá el botón que diga <strong>'Confirmar'</strong> o <strong>'Finalizar'</strong>. ¡Y listo! Ya tenés tu turno sacado."
        ],
        nota: "💡 Si algo no funciona en la web, podés llamar al 130 (ANSES) o ir personalmente a la oficina. El trámite presencial siempre es una opción válida."
    },

    cuil: {
        categoria: 'tramites',
        nivel:     'basico',
        titulo:    "Obtener la Constancia de CUIL",
        icono:     "📄",
        detalle:   "El CUIL es el número con el que el Estado te identifica como trabajador. Te lo piden para cualquier laburo o beneficio social.",
        pasos: [
            "Entrá a Google en el celular y escribí: <strong>'Constancia de CUIL ANSES'</strong>, o tocá este botón directo: <button class='btn-paso' onclick=\"window.open('https://servicioswww.anses.gob.ar/C2-ConstaCUIL','_blank','noopener,noreferrer')\">Abrir Constancia de CUIL</button>",
            "Te va a aparecer una planilla digital. Tené tu <strong>DNI físico en la mano</strong> para copiar los datos.",
            "Seleccioná donde dice DNI, escribí tu número de documento, tu nombre, tu apellido y tu fecha de nacimiento.",
            "Abajo de todo vas a ver un botón azul que dice <strong>'Consultar'</strong>. Apretalo una sola vez.",
            "¡Listo! En la pantalla te va a aparecer tu constancia con tus 11 números. Si querés, hay un botón que dice <strong>'Descargar'</strong> para guardarlo como PDF, o podés sacarle una foto a la pantalla."
        ]
    },

    miargentina: {
        categoria: 'tramites',
        nivel:     'basico',
        titulo:    "Usar la App Mi Argentina",
        icono:     "📱",
        detalle:   "Esta aplicación te permite llevar tu DNI, tu carnet de conducir y tu credencial de vacunas adentro del celular, sin tener que cargar con los plásticos.",
        pasos: [
            "Abrí el buscador de tu celu (Google) y escribí: <strong>'Mi Argentina oficial'</strong>. O tocá este botón directo: <button class='btn-paso' onclick=\"window.open('https://www.argentina.gob.ar/miargentina','_blank','noopener,noreferrer')\">Ir a la Web de Mi Argentina</button>",
            "Desde esa página, vas a ver un botón grande que dice <strong>'Descargar la App'</strong> o <strong>'Instalar'</strong>. Tocalo. Si ya tenés la app instalada, buscá el ícono azul con la bandera argentina en tu pantalla de inicio.",
            "Cuando se abra, tocá el botón que dice <strong>'Crear mi cuenta'</strong> (si ya la tenés, elegí 'Ingresar').",
            "Te va a pedir tu <strong>CUIL</strong> (los 11 números) y tu <strong>Correo Electrónico</strong>. Ponelos con mucha atención, si te equivocás en una letra no te llega el código.",
            "Inventá una <strong>Clave de Seguridad</strong>. Tené el cuadernito a mano y anotala bien. No uses '123456' ni tu fecha de nacimiento.",
            "Andá a revisar tu <strong>Correo Electrónico</strong>. Te va a llegar un mensaje de 'Mi Argentina'. Abrilo y buscá un botón azul que dice <strong>'Activar mi cuenta'</strong>. Tocalo. Si no hacés esto, la app no te va a dejar entrar.",
            "Volvé a la aplicación, poné tu CUIL y la clave que inventaste. ¡Listo! Ya estás adentro. Ahí podés ver tu DNI digital, tus vacunas y más."
        ]
    },

    claves: {
        categoria: 'tramites',
        nivel:     'basico',
        titulo:    "Recuperar Contraseñas Olvidadas",
        icono:     "🔑",
        detalle:   "No te hagas mala sangre si te olvidaste una clave. A los que trabajamos en computación también nos pasa todo el tiempo. El sistema siempre te da una oportunidad para arreglarlo.",
        pasos: [
            "En la pantalla donde ponés tu usuario y te pide la clave, mirá bien abajo. Siempre hay una frase chiquita que dice <strong>'¿Olvidaste tu contraseña?'</strong> o <strong>'Recuperar clave'</strong>. Tocala.",
            "El sistema te va a preguntar cuál es tu CUIL o tu correo electrónico para verificar que de verdad sos vos.",
            "Escribilo y tocá <strong>'Continuar'</strong>. Ahora revisá tus mensajes de texto del celular (SMS) o tu correo electrónico.",
            "Te va a llegar un número de 5 o 6 dígitos, o un link de color azul. Si te llegó el número, escribilo en la pantalla de la aplicación.",
            "¡Perfecto! Ahora te va a aparecer un casillero vacío para que inventes una contraseña nueva. Poné una que recuerdes y <strong>acordate de anotarla</strong> para que no se te vuelva a perder."
        ]
    },

    formularios: {
        categoria: 'tramites',
        nivel:     'basico',
        titulo:    "Llenar Formularios Digitales",
        icono:     "📝",
        detalle:   "Los formularios son como las planillas de papel de antes que completabas con birome, pero ahora se hacen tocando la pantalla del celular.",
        pasos: [
            "Leé despacio renglón por renglón. Cuando veas un espacio en blanco, tocalo con el dedo; vas a ver que aparece el teclado para que escribas.",
            "Si ves una opción que tiene una flechita apuntando para abajo, tocala. Se va a desplegar una lista de opciones (por ejemplo, para elegir tu provincia). Deslizá el dedo y tocá la tuya.",
            "Prestá atención a los <strong>asteriscos rojos (*)</strong>. Si un casillero tiene ese signo al lado, significa que es obligatorio. Si lo dejás vacío, la página no te va a dejar enviar el trámite.",
            "Si hay cuadraditos chiquitos (casillas), tocalo una vez y se va a poner un tilde de color (✔️) para confirmar que aceptás.",
            "Cuando revises que todo esté bien, buscá el botón grande abajo de todo que dice <strong>'Enviar'</strong>, <strong>'Registrar'</strong> o <strong>'Finalizar'</strong> y apretalo <strong>una sola vez</strong>. Esperá a que cargue."
        ]
    },

    playstore: {
        categoria: 'tramites',
        nivel:     'basico',
        titulo:    "Descargar Apps de Play Store",
        icono:     "📥",
        detalle:   "Las aplicaciones (o 'apps') son las herramientas del celular. Tu teléfono viene con algunas, pero vos podés bajarle las que necesites, como la del banco, la de ANSES o juegos.",
        pasos: [
            "En la pantalla de tu celular buscá el ícono de <strong>'Play Store'</strong>. Es un dibujo que parece un triángulo acostado pintado de cuatro colores (azul, verde, amarillo y rojo).",
            "Arriba de todo vas a ver una barra alargada que dice <strong>'Buscar apps y juegos'</strong>. Tocala y escribí el nombre de lo que querés bajar (por ejemplo: <em>'PAMI'</em> o <em>'WhatsApp'</em>).",
            "Te van a aparecer los resultados de búsqueda. Fijate cuál es la correcta y tocá el botón verde grande que dice <strong>'Instalar'</strong>.",
            "Vas a ver que empieza a dar vueltas un círculo verde. Eso significa que se está descargando. Tené paciencia, puede tardar un par de minutos.",
            "Cuando termine, el botón verde va a cambiar y va a decir <strong>'Abrir'</strong>. ¡Listo! Si volvés a la pantalla principal de tu celular, vas a ver que el dibujito nuevo ya apareció."
        ]
    },

    identidad: {
        categoria: 'tramites',
        nivel:     'intermedio',
        titulo:    "Validar tu Identidad con la Cámara",
        icono:     "👤",
        detalle:   "Muchas aplicaciones seguras te piden que te saques una foto de tu cara y de tu DNI. Esto sirve para asegurarse de que nadie te esté robando la identidad. Si necesitás ayuda con esto, está bien pedirle a alguien de confianza que te acompañe.",
        pasos: [
            "Buscá un lugar de tu casa que tenga <strong>muy buena luz</strong>, preferentemente de día y cerca de una ventana. Si estás a oscuras, la aplicación te va a dar error.",
            "Si tenés anteojos puestos, sacátelos por un momento. Despejate el pelo de la frente para que se te vea bien la cara.",
            "La aplicación te va a pedir primero que le saques una foto al <strong>frente de tu DNI tarjeta</strong>. Ponelo arriba de una mesa lisa y sacá la foto. Si alguien está con vos, podés pedirle que sostenga el celu mientras vos acomodás el documento.",
            "Da vuelta el documento y sacale una foto a la <strong>parte de atrás</strong> de la misma manera.",
            "Ahora viene la <strong>'selfie'</strong> (foto de tu cara). Sostené el celular bien enfrente de tus ojos. La pantalla te va a mostrar un círculo: tenés que encuadrar tu cara ahí adentro.",
            "Seguí las instrucciones en la pantalla: te puede pedir que parpadees, que mires a un punto fijo o que sonrías. Mantené el pulso firme hasta que escuches el click. ¡Identidad confirmada!"
        ],
        nota: "💡 Si el proceso falla varias veces, no te preocupes. Podés intentarlo de nuevo más tarde o pedirle a alguien de confianza que te ayude. También podés ir directamente a la oficina del organismo con tu DNI físico."
    },

    // ══════════════════════════════════════════════════════
    // CATEGORÍA: cuidado
    // Seguridad, privacidad y ciudadanía digital
    // ══════════════════════════════════════════════════════

    paginas_oficiales: {
        categoria: 'cuidado',
        nivel:     'basico',
        titulo:    "Reconocer Páginas Oficiales del Gobierno",
        icono:     "🔍",
        detalle:   "No todas las páginas que aparecen en Google son reales. Hay páginas falsas que copian el aspecto del gobierno para robar tus datos. Con unos pocos trucos podés identificar las verdaderas.",
        pasos: [
            "Mirá la barra de arriba del navegador donde aparece la dirección de la página. Las páginas oficiales del gobierno argentino <strong>siempre terminan en .gob.ar</strong>. Por ejemplo: <em>www.anses.gob.ar</em>, <em>www.argentina.gob.ar</em>.",
            "Buscá el <strong>candadito 🔒</strong> que aparece antes de la dirección. Ese símbolo significa que la conexión es segura. Si no está, la página puede no ser confiable.",
            "Desconfiá si la dirección tiene errores raros, como letras de más o palabras extrañas: <em>www.an5es-argentina.com</em> NO es ANSES. <em>www.anses.gob.ar</em> SÍ es ANSES.",
            "Nunca entrés a una página del gobierno desde un link que te mandaron por WhatsApp o mensaje de texto. Siempre escribí la dirección vos mismo en el navegador, o usá los botones de acceso directo de esta app.",
            "Si tenés dudas, preguntale a alguien de confianza antes de poner tus datos. Siempre es mejor perder un minuto que perder tus datos."
        ],
        nota: "🛡️ Las páginas del gobierno argentino terminan en <strong>.gob.ar</strong> — siempre. Si la dirección termina diferente (.com, .net, .org) no es una página oficial."
    },

    datos_personales: {
        categoria: 'cuidado',
        nivel:     'basico',
        titulo:    "Qué Datos Personales No Compartir",
        icono:     "🛡️",
        detalle:   "Tus datos personales son tuyos. En el mundo digital, protegerlos es tan importante como cuidar tu billetera. Acá te explicamos qué nunca tenés que compartir y con quién.",
        pasos: [
            "<strong>Nunca compartir por WhatsApp, teléfono ni mensaje:</strong> tu número de CUIL/DNI completo con alguien que vos no conocés, tus contraseñas o claves, el código que te llega por SMS para entrar a una cuenta, ni el número completo de tu tarjeta de débito o crédito.",
            "<strong>ANSES nunca te va a llamar por teléfono para pedirte datos.</strong> El PAMI tampoco. El banco tampoco te va a pedir tu clave por teléfono. Ningún organismo oficial necesita tu contraseña para ayudarte.",
            "Si alguien dice ser del gobierno y te pide datos por teléfono o WhatsApp, <strong>cortá la llamada</strong>. No es maleducado — es prudente. Después podés llamar vos directamente al organismo al número oficial.",
            "Tus fotos del DNI solo mandáselas a organismos que vos conocés y cuando vos iniciás el trámite. Si alguien te pide una foto de tu DNI sin que vos hayas empezado nada, no la mandes.",
            "Si cometiste un error y compartiste algo que no debías, <strong>no te asustes</strong>. Avisá a alguien de confianza, cambiá la contraseña lo antes posible, y si fue información bancaria, llamá al banco."
        ],
        nota: "💬 Pedir ayuda no es una debilidad. Si recibís algo raro o no estás seguro/a de algo, consultá con alguien antes de actuar."
    },

    mensajes_raros: {
        categoria: 'cuidado',
        nivel:     'basico',
        titulo:    "Me Llegó un Mensaje Raro. ¿Qué Hago?",
        icono:     "⚠️",
        detalle:   "A veces llegan mensajes por WhatsApp, SMS o correo que parecen oficiales pero son intentos de estafa. Aprender a reconocerlos es parte de cuidarse en el mundo digital.",
        pasos: [
            "<strong>Señales de que un mensaje puede ser falso:</strong> te dicen que ganaste algo sin haber participado en nada, te piden que hagas algo urgente o que pierdas un beneficio si no actuás ya, el link tiene una dirección rara que no termina en .gob.ar, o te piden datos o fotos del DNI.",
            "Si el mensaje tiene un link (una dirección web en azul), <strong>no lo toques</strong>. Los links falsos pueden robar tus datos o instalar cosas en tu celu sin que vos te des cuenta.",
            "Antes de hacer cualquier cosa, <strong>preguntale a alguien de confianza</strong> — un familiar, un vecino, alguien del barrio que entienda de tecnología. Tomarte unos minutos no te hace perder ningún beneficio real.",
            "Si el mensaje dice ser de ANSES, del banco, o de algún organismo, buscá el teléfono oficial de ese organismo por tu cuenta y llamá para verificar. No uses el teléfono que aparece en el mensaje sospechoso.",
            "Podés <strong>eliminar el mensaje</strong> sin miedo. Si era real y lo borraste, el organismo siempre puede volverte a contactar por un canal oficial."
        ],
        nota: "🧘 La urgencia es una trampa. Los estafadores quieren que actúes rápido, sin pensar. Respirá, consultá, y recién después decidí."
    },

    contrasenas_seguras: {
        categoria: 'cuidado',
        nivel:     'basico',
        titulo:    "Crear Contraseñas Seguras y Recordarlas",
        icono:     "🔐",
        detalle:   "Una contraseña segura no tiene que ser complicada de recordar, solo tiene que ser difícil de adivinar para otros. Acá te explicamos cómo.",
        pasos: [
            "<strong>¿Por qué importa una contraseña segura?</strong> Si alguien adivina tu clave, puede entrar a tu cuenta de ANSES, de Mi Argentina o de tu banco y hacerse pasar por vos. Una buena contraseña es tu primera defensa.",
            "<strong>Cómo crear una contraseña que recuerdes:</strong> Pensá en dos palabras que solo vos conozcas, juntálas, agregá un número y un símbolo. Ejemplo: el nombre de tu mascota + el barrio + un número especial: <em>Luna!Moreno7</em>. Eso es seguro y fácil de recordar para vos.",
            "<strong>Qué evitar:</strong> tu fecha de nacimiento, '123456', tu nombre, el nombre de un familiar famoso, o cualquier cosa que alguien que te conoce pueda adivinar.",
            "<strong>Anotá tus contraseñas en papel</strong>, en un cuadernito que guardés en casa. No las mandes por WhatsApp, no las escribas en una nota del celular visible para todos, y no se las digas a nadie.",
            "Usá <strong>contraseñas diferentes</strong> para cosas diferentes. La del correo, diferente a la del banco, diferente a la de Mi Argentina. Si alguien descubre una, las otras siguen seguras."
        ],
        nota: "📒 Un cuadernito con tus contraseñas en casa es perfectamente válido y muy seguro — siempre que no lo dejes a la vista ni lo lleves en la cartera."
    },

    // ══════════════════════════════════════════════════════
    // CATEGORÍA: inteligencia_artificial
    // IA con enfoque humano, crítico y útil
    // ══════════════════════════════════════════════════════

    que_es_ia: {
        categoria: 'inteligencia_artificial',
        nivel:     'basico',
        titulo:    "¿Qué es la Inteligencia Artificial?",
        icono:     "🤖",
        detalle:   "Escuchás hablar de inteligencia artificial en todos lados. Acá te explicamos qué es en serio, sin tecnicismos, y qué podés esperar de ella — y qué no.",
        pasos: [
            "<strong>¿Qué es en palabras simples?</strong> La inteligencia artificial (IA) es un programa de computadora que aprendió a responder preguntas, escribir textos, traducir idiomas y hacer muchas cosas más, leyendo una cantidad enorme de información. Es como un asistente muy rápido, pero que no piensa como una persona.",
            "<strong>¿Qué puede hacer por vos?</strong> Puede ayudarte a redactar una nota o un reclamo, explicarte algo que no entendés, buscar información, traducir un texto, o resumir algo largo. Todo esto sin costo, desde el celular.",
            "<strong>¿Qué NO puede hacer?</strong> No conoce tu situación personal. No tiene sentimientos. No siempre tiene razón — a veces inventa información que suena verdadera pero es falsa. No reemplaza a un médico, un abogado, o a alguien que te conoce.",
            "<strong>¿Cómo sabés si lo que te dice es verdad?</strong> Verificá la información importante en fuentes oficiales (páginas .gob.ar) o consultá con una persona de confianza. La IA es útil como punto de partida, no como última palabra.",
            "<strong>¿Es peligrosa?</strong> No si se usa con criterio. Como cualquier herramienta, depende del uso. Un martillo puede clavar un clavo o romper algo — depende de quién lo usa y cómo. La IA es similar."
        ],
        nota: "💡 La IA es una herramienta, no un oráculo. Usarla con criterio propio es parte de la ciudadanía digital."
    },

    ia_para_escribir: {
        categoria: 'inteligencia_artificial',
        nivel:     'basico',
        titulo:    "Pedirle Ayuda a una IA para Escribir",
        icono:     "✍️",
        detalle:   "A veces necesitamos escribir una nota, un reclamo, o un mensaje formal y no sabemos cómo empezar. Una IA puede ayudarte a ordenar las ideas — pero la nota sigue siendo tuya.",
        pasos: [
            "Abrí el navegador del celular y entrá a <button class='btn-paso' onclick=\"window.open('https://claude.ai','_blank','noopener,noreferrer')\">Abrir Claude (IA gratuita)</button> o también podés buscar <strong>'ChatGPT'</strong> en Google. Son herramientas de IA que podés usar gratis.",
            "En el casillero que aparece abajo de la pantalla, escribí lo que necesitás con tus propias palabras. No hace falta ser formal. Por ejemplo: <em>'Necesito escribir una nota para reclamar que arreglen la vereda de mi casa al municipio'</em>.",
            "La IA te va a generar un texto. Leélo despacio. Fijate si dice lo que vos querés decir y si los datos son correctos (tu nombre, tu dirección, el problema).",
            "Si algo no está bien, podés decirle: <em>'Cambiá el nombre por Juan González'</em> o <em>'Hacelo más corto'</em> o <em>'Agregá que ya presenté un reclamo antes'</em>. La IA ajusta según lo que le pedís.",
            "Cuando el texto te guste, copialo (tocá y mantenés apretado el texto, elegí 'Copiar') y pegalo donde necesitás — en un correo, en WhatsApp, o imprimilo."
        ],
        nota: "✍️ La nota la firmás vos y la decisión de mandarla es tuya. La IA solo ayuda a ordenar las palabras."
    },

    verificar_informacion: {
        categoria: 'inteligencia_artificial',
        nivel:     'intermedio',
        titulo:    "Cómo Verificar si una Noticia es Verdadera",
        icono:     "🔎",
        detalle:   "En el mundo digital circula mucha información — y no toda es verdadera. Aprender a verificar es tan importante como aprender a leer.",
        pasos: [
            "<strong>Antes de compartir, preguntate:</strong> ¿Esta noticia viene de un medio que reconozco? ¿Tiene fecha? ¿Tiene nombre de quien la escribió? Si la respuesta a las tres es no, es una señal de alerta.",
            "Buscá la noticia en Google con palabras clave. Si es real, va a aparecer en varios medios conocidos. Si solo aparece en uno o en páginas que nunca viste, desconfiá.",
            "Entrá a <button class='btn-paso' onclick=\"window.open('https://chequeado.com','_blank','noopener,noreferrer')\">Chequeado.com</button> — es un sitio argentino especializado en verificar si las noticias son verdaderas. Podés buscar el tema ahí.",
            "Si la noticia tiene una foto impactante, podés verificar si la foto es real o fue sacada de contexto: en Google Imágenes, tocá el ícono de la cámara y subí la foto para buscarla.",
            "<strong>La regla más simple:</strong> si algo te genera mucha emoción (miedo, bronca, sorpresa, alegría extrema), respirá antes de compartirlo. Las noticias falsas están diseñadas para provocar emociones fuertes."
        ],
        nota: "📰 Compartir una noticia falsa sin querer le pasa a cualquiera. Lo importante es el hábito de verificar antes de reenviar."
    },

    // ══════════════════════════════════════════════════════
    // CATEGORÍA: acompanar
    // Para quienes enseñan, ayudan o acompañan a otros
    // ══════════════════════════════════════════════════════

    como_acompanar: {
        categoria: 'acompanar',
        nivel:     'basico',
        titulo:    "Cómo Ayudar a Alguien sin Hacer Todo Vos",
        icono:     "🤝",
        detalle:   "Cuando ayudamos a alguien a aprender tecnología, el mayor error es hacer todo por ellos. Acá te explicamos cómo acompañar de verdad.",
        pasos: [
            "<strong>La trampa del 'dejame que lo hago yo':</strong> Cuando hacemos todo nosotros, la persona aprende que no puede sola. La próxima vez va a necesitar ayuda de nuevo para lo mismo. El objetivo es que la próxima vez pueda hacerlo sin vos.",
            "<strong>Guiá con palabras, no con el celu:</strong> En vez de agarrar el celular de la otra persona, decile qué buscar y dónde tocar. 'Buscá el botón azul que dice Siguiente' es mucho más útil que hacerlo vos.",
            "<strong>Celebrá cada paso pequeño.</strong> 'Muy bien, lo encontraste' o 'eso estuvo perfecto' no son palabras vacías — reducen el miedo y dan confianza para seguir.",
            "<strong>Si algo sale mal, no corrijas rápido.</strong> Primero preguntá: '¿Qué creés que pasó?' o '¿Qué decía antes de tocar ahí?'. Eso activa el razonamiento propio.",
            "<strong>Repetir está bien.</strong> No te frustres si la persona necesita aprender lo mismo varias veces. Para quien recién empieza, repetir es parte del proceso — no es un fracaso."
        ],
        nota: "🧡 La paciencia es la herramienta más importante. Una persona que aprende sin presión retiene mucho más que una que aprende con ansiedad ajena."
    },

    lenguaje_simple: {
        categoria: 'acompanar',
        nivel:     'basico',
        titulo:    "Explicar sin Usar Palabras Técnicas",
        icono:     "💬",
        detalle:   "Una de las barreras más grandes para aprender tecnología es el lenguaje. Esta guía te ayuda a encontrar palabras simples para explicar cosas complejas.",
        pasos: [
            "<strong>Reemplazá los tecnicismos por comparaciones cotidianas:</strong> El correo electrónico = buzón de cartas. La contraseña = llave de tu casa. El navegador = el auto que te lleva a donde querés ir en internet. La nube = una biblioteca enorme donde guardás cosas.",
            "<strong>Describí lo que se ve, no lo que es.</strong> En vez de 'hacé click en el ícono', decí 'tocá el dibujito del sobre'. En vez de 'ingresá al sistema', decí 'escribí tu número y tu clave'.",
            "<strong>Evitá estas palabras cuando puedas:</strong> browser, login, URL, app (decí 'aplicación' o 'programa'), WiFi (decí 'internet inalámbrico' o simplemente 'internet'), actualizar (decí 'poner al día').",
            "<strong>Verificá que se entendió</strong> preguntando '¿Querés que lo repita de otra manera?' en vez de '¿Entendiste?'. La segunda pregunta presiona a decir que sí aunque no sea verdad.",
            "<strong>Usá el 'nosotros'</strong> en vez de darle órdenes. 'Ahora vamos a buscar el botón azul' suena acompañado. 'Buscá el botón azul' suena a examen."
        ]
    },

    taller_barrio: {
        categoria: 'acompanar',
        nivel:     'intermedio',
        titulo:    "Organizar un Taller Digital en el Barrio",
        icono:     "🏘️",
        detalle:   "Un taller comunitario no requiere equipamiento caro ni conocimiento técnico avanzado. Requiere organización, paciencia y ganas de compartir.",
        pasos: [
            "<strong>Antes del taller — lo que necesitás:</strong> Un espacio con enchufes y mesa o silla para cada persona. Los propios celulares de los participantes (no hace falta computadoras). Esta app descargada en los celuares (o un QR para que la descarguen ahí). Un tema concreto para el día — no intentes enseñar todo junto.",
            "<strong>Elegí un solo tutorial por encuentro.</strong> 'Hoy aprendemos a sacar el turno de ANSES' es un objetivo alcanzable. 'Hoy aprendemos internet' no lo es. El éxito concreto genera confianza para el próximo.",
            "<strong>Armá grupos de dos.</strong> Poner a alguien que ya sabe un poco con alguien que recién empieza funciona mejor que dar una clase magistral. Enseñar también refuerza lo aprendido.",
            "<strong>Cerrá con un logro tangible.</strong> Si el tutorial era sacar el turno, que cada persona termine el taller con su turno pedido. Si era el correo, que cada persona termine con su dirección de correo anotada.",
            "<strong>Dejá un espacio para preguntas 'vergonzosas'.</strong> Decí explícitamente al inicio: 'No hay preguntas tontas acá. Si algo no se entiende, es porque no se explicó bien, no porque alguien no sepa'. Eso cambia el clima del taller."
        ],
        nota: "📋 Los materiales impresos con QR que llevan directamente a cada tutorial de esta app pueden ser muy útiles para el taller. Pedile a alguien que te ayude a imprimirlos."
    },
    memoria: {
                titulo: "Cómo limpiar el celu cuando se llena la memoria y anda lento",
                        detalle: "Viste cuando el celu te tira ese cartel molesto de 'Memoria llena' y no te deja sacar fotos ni ver los videos de WhatsApp? Y encima se te re traba porque tiene poquita memoria (como 4 gigas de RAM). No te preocupes, acá te enseñamos a limpiarlo a fondo sin borrar tus cosas importantes.",
                                pasos: [
                                            "Paso 1: Frenar las descargas automáticas de WhatsApp. ¡Este es el secreto número uno! Entrá a WhatsApp, tocá los 3 puntitos de arriba a la derecha y elegí 'Ajustes'. Después buscá donde dice 'Almacenamiento y datos'.",
                                                        "Paso 2: En esa pantalla vas a ver dos opciones: 'Descargar con datos móviles' y 'Descargar con Wi-Fi'. Entrá a cada una y DESMARCÁ todas las casillas (fotos, videos, audios). Así, las cosas que manden a los grupos de la familia o del barrio solo se van a bajar si vos les hacés clic encima. ¡Te ahorrás toneladas de espacio!",
                                                                    "Paso 3: Borrar la mugre de WhatsApp de un tirón. En esa misma pantalla de Almacenamiento, tocá arriba de todo donde dice 'Administrar almacenamiento'. Ahí vas a ver ordenados cuáles son los chats o grupos que más memoria te están comiendo. Entrá al que quieras limpiar, seleccioná los videos pesados o memes repetidos y borralos sin miedo.",
                                                                                "Paso 4: Sacar las aplicaciones que ya no usás. Salí de WhatsApp y entrá a los 'Ajustes' o 'Configuración' de tu celu (el dibujito de la tuerquita). Buscá la opción 'Aplicaciones'. Mirá la lista con paciencia. ¿Viste ese juego que bajó tu nieto hace un año y nadie más tocó? Tocalo y dale al botón 'Desinstalar'. Menos bulto, más claridad.",
                                                                                            "Paso 5: Limpiar el 'Caché' (la basurita invisible). Ahí mismo, en la lista de Aplicaciones, entrá a las que más usás (como Facebook, Google Chrome o Instagram). Buscá donde dice 'Almacenamiento' y tocá el botón que dice 'Eliminar Caché' o 'Borrar Caché'. ¡OJO! No toques 'Borrar datos' porque ahí sí se te borra tu cuenta. El caché es solo la grasa que junta la app por andar en el día a día.",
                                                                                                        "Paso 6: Nivel Experto: Limpieza profunda desde el 'Recovery'. Si el celu sigue re pesado y lerdo, hay un truco de técnico. Apagá el celu por completo. Ahora, mantené apretados al mismo tiempo el botón de Subir Volumen y el de Encender hasta que la pantalla prenda con unas letras raras en inglés. Ese es el menú 'Recovery' (el sistema de emergencia).",
                                                                                                                    "Paso 7: ¡Mucho cuidado acá! En esa pantalla negra no anda el dedo. Tenés que bajar usando los botones de volumen de tu celu. Buscá la opción que dice 'Wipe Cache Partition' (significa borrar la basura del sistema) y apretá el botón de encender para aceptar. Te va a preguntar si estás seguro, bajá hasta 'Yes' y dale al botón de encender. Jamás de los jamases toques lo que dice 'Wipe Data/Factory Reset' porque eso te borra el celu de fábrica.",
                                                                                                                                "Paso 8: Para terminar y salir, buscá la opción de arriba de todo que dice 'Reboot system now' (reiniciar el sistema ahora) y apretá el botón de encender. El celu va a prender de manera normal, pero vas a notar que arranca mucho más liviano y vuela."
                                                                                                                                        ]
                                                                                                                                            }
};

// Exponer globalmente para uso desde otros módulos
if (typeof window !== 'undefined') {
    window.baseDeTutoriales = baseDeTutoriales;
}
