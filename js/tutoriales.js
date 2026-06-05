// =========================================================
// tutoriales.js — Base de datos de tutoriales
// Punto Digital Comunitario Morenense
// =========================================================

const baseDeTutoriales = {

    // ══════════════════════════════════════════════════════
    // CATEGORÍA: tramites
    // ══════════════════════════════════════════════════════

    correo: {
        categoria: 'tramites',
        nivel:     'basico',
        titulo:    "Crear un Correo Electrónico",
        icono:     "✉️",
        detalle:   "El correo es como tu buzón de cartas pero en el celu. Te lo van a pedir para casi todo: para sacar turnos, para el banco y para registrarte en las aplicaciones. ¡Es una llave personal de internet!",
        pasos: [
            "Tenés dos opciones: buscá en tu celular una aplicación que se llame <strong>Gmail</strong> (tiene el dibujo de un sobrecito blanco con bordes rojos) y tocá. O, si preferís, entrá directo desde el navegador tocando este botón: <button class='btn-paso' onclick=\"window.open('https://accounts.google.com/SignUp','_blank','noopener,noreferrer')\">Ir directo a crear cuenta en Gmail</button>",
            "Si te aparece para iniciar sesión, buscá abajo un texto que dice <strong>'Crear cuenta'</strong> o <strong>'Registrarse'</strong> y seleccionalo. Elegí la opción que dice <strong>'Para mi uso personal'</strong>.",
            "Escribí tu <strong>Nombre</strong> y, si querés, el <strong>Apellido</strong> en los casilleros blancos. Después tocá el botón azul que dice <strong>'Siguiente'</strong>.",
            "Poné el día, mes y año de tu nacimiento, y tu género. Volvé a tocar <strong>'Siguiente'</strong>.",
            "Ahora tienes que inventar el <strong>'nombre de usuario'</strong> de tu correo. Por ejemplo: <em>Maria_Moreno2026@gmail.com</em>. Si te dice que ya existe, probá agregando un número.",
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
    // ══════════════════════════════════════════════════════

    evitar_estafas: {
        categoria: 'cuidado',
        nivel:     'basico',
        titulo:    "Evitar estafas y cuentos del tío",
        icono:     "🛡️",
        detalle:   "Aprendé a reconocer mensajes falsos, enlaces peligrosos y cómo proteger tus cuentas para que no te roben plata ni datos.",
        pasos: [
            "<strong>Desconfiá de ofertas desesperadas o premios falsos:</strong> Si te llega un mensaje diciendo que ganaste un sorteo en el que no participaste, o que te van a dar un bono urgente, desconfiá. Nunca te van a apurar por canales oficiales.",
            "<strong>Mirar bien los enlaces (Links):</strong> Antes de hacer clic, revisá bien las letras de la dirección web. Los estafadores usan nombres parecidos pero con errores (por ejemplo, 'banc0nacion' en vez de 'bancoficial'). Si no es el sitio oficial, salí de ahí.",
            "<strong>Nunca des códigos de verificación por WhatsApp:</strong> Si te llaman por teléfono o te escriben pidiéndote el código de 6 números que te llegó por SMS (diciendo que es para un turno de vacunación o una entrega), NO SE LO DES A NADIE. Es el código para robarte el WhatsApp."
        ]
    },

    cuidado_dispositivo: {
        categoria: 'cuidado',
        nivel:     'basico',
        titulo:    "Cuidar tu celular y cambiar a uno nuevo",
        icono:     "📱",
        detalle:   "El celular es tu herramienta diaria. Acá vamos a ver trucos rápidos sobre la marcha, cómo bloquear publicidades invasivas y qué hacer exactamente si te comprás un celu nuevo para no perder nada ni dejar tus datos expuestos en el viejo.",
        pasos: [
            "<strong>El truco rápido para liberar memoria (El método del pellizco):</strong> En casi cualquier celular moderno (como Samsung o Motorola), no hace falta meterse en menús largos. Mantené apretado con el dedo el ícono de una aplicación que uses mucho (por ejemplo, TikTok o Chrome). Va a saltar un menú chiquito. Tocá el símbolo de la <strong>'i' (Información)</strong>. Ahí adentro buscá <strong>'Almacenamiento'</strong> y tocá el botón <strong>'Borrar caché'</strong>. ¡Listo! Acabás de barrer la basura acumulada sin borrar ni tu cuenta ni tus mensajes. Hacelo sobre la marcha cuando notes el celu lento.",
            "<strong>Limpieza automática (Si preferís no tocar):</strong> Si no querés buscar app por app, instalá la aplicación gratuita <em>Files de Google</em>. Al abrirla, vas a la pestaña 'Limpiar' y el sistema busca memes viejos y archivos basura automáticamente. Es la opción más segura.",
            "<strong>Bloquear publicidades molestas (El escudo AdGuard):</strong> ¿Cansado de los anuncios que saltan de la nada en internet o en algunas apps? Hay un truco ninja que no requiere instalar nada. Andá a <strong>Ajustes > Conexiones > Más ajustes de conexión > DNS Privado</strong>. Elegí 'Nombre del host', escribí exactamente <code>dns.adguard.com</code> y dale a Guardar. Esto actúa como un patovica de boliche: filtra tu conexión y no deja entrar anuncios molestos.",
            "<strong>La salud de la batería:</strong> Tu batería sufre muchísimo si llega a 0% o si la dejás enchufada toda la noche al 100%. El 'punto dulce' es mantenerla siempre entre 20% y 80%. Tratalo como si fuera el tanque de nafta del auto: no esperes a quedarte a pie para cargarle un poquito.",
            "<strong>Cambiar de celular - Concepto 'Transferir':</strong> ¿Te compraste un celu nuevo? ¡Felicitaciones! No pases tus contactos ni fotos a mano. Al prender el nuevo por primera vez, la pantalla te va a preguntar si querés <strong>Copiar aplicaciones y datos</strong>. Podés conectarlos entre sí con el cable del cargador o por Wi-Fi. Si ambos son Samsung, podés usar la app <em>Smart Switch</em>. Esto directamente 'clona' tu celu viejo en el nuevo: tus fotos, tu fondo de pantalla y tu WhatsApp pasan igualitos.",
            "<strong>Vender o regalar el viejo - Concepto 'Restablecer':</strong> ¡OJO ACÁ! Nunca le des tu celu viejo a nadie sin hacer esto. Una vez que te aseguraste de que el celular nuevo tiene absolutamente todo, agarrá el viejo, andá a Ajustes y buscá <strong>'Restablecer'</strong> o <strong>'Volver a estado de fábrica'</strong>. Esto destruye todos tus datos, desvincula tu correo y lo deja como si recién saliera de la caja. Es la única forma 100% segura de proteger tu privacidad antes de entregarlo."
        ],
        nota: "💡 Reiniciar el celular (apagarlo y volverlo a prender) una vez por semana es el mejor mantenimiento gratuito que existe. Acomoda el sistema y soluciona el 90% de las trabadas misteriosas."
    },

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
            "Si el mensaje dice ser de ANSES, del banco, o de algún organismo, buscá el teléfono oficial de ese organismo por tu cuenta y llamá para verificar. No usés el teléfono que aparece en el mensaje sospechoso.",
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
            "<strong>¿Cómo saber si hablo con una IA o una persona?</strong> Si responde al instante, a cualquier hora de la madrugada, con textos larguísimos y redacción perfecta en segundos, lo más seguro es que estés hablando con una IA.",
            "<strong>Animate a probar:</strong> La mejor forma de sacarle el miedo es usarla. Podés preguntarle recetas con lo que te quedó en la heladera o pedirle que te arme una rutina de ejercicios suaves."
        ],
        nota: "💡 La IA es una excelente compañera de ideas, pero la decisión final y el criterio humano siempre los tenés vos."
    },


    // ══════════════════════════════════════════════════════
    // CATEGORÍA: usos_tecnologia
    // ══════════════════════════════════════════════════════

    escanear_qr: {
        categoria: 'usos_tecnologia',
        nivel:     'basico',
        titulo:    "Escanear códigos QR sin peligro",
        icono:     "🔳",
        detalle:   "Esos cuadraditos con puntos negros y blancos (QR) están en todos lados: en los folletos de la Muni, en las cajas para pagar y en los carteles de los negocios. ¡Tu celular ya sabe leerlos sin necesidad de descargar ninguna aplicación rara!",
        pasos: [
            "<strong>El truco de la Cámara (Para celus nuevos):</strong> Agarrá el celular y abrí la aplicación de la <strong>Cámara de fotos</strong> (la misma que usás para retratar a la familia). Apuntá al código QR como si fueras a sacarle una foto, pero ¡no aprietes el botón! Mantené el pulso firme dos segundos.",
            "<strong>Tocar el enlace amarillo o azul:</strong> Vas a ver que arriba del código QR aparece una letritas chiquitas de color con un planeta o un link (un enlace). Tocá con el dedo arriba de esas letras y el celular te va a llevar directo a la página web automáticamente.",
            "<strong>El método de la barra de Google (Para celus intermedios):</strong> Si tu cámara común no hace nada, mirá la pantalla principal de tu celu donde está la barra de búsqueda de Google. Al lado del micrófono donde hablás, hay un dibujo de una <strong>camarita de colores (Google Lens)</strong>. Tocá ahí.",
            "<strong>Apuntar con Lens:</strong> Se va a abrir la cámara a través de Google. Apuntá al código QR y apretá el botón redondo del centro. Al instante te va a mostrar en grande el botón azul para entrar a la página de forma totalmente segura.",
            "<strong>El botón escondido de arriba:</strong> En muchos celulares (como Motorola o Samsung), si deslizás el dedo desde el borde de arriba de la pantalla hacia abajo (donde prendés el Wi-Fi o la linterna), hay un botón que dice <strong>'Escanear QR'</strong> o <strong>'Lector QR'</strong>. Si lo tocás, se abre un lector automático limpito y rápido."
        ],
        nota: "⚠️ <strong>Consejo de seguridad:</strong> Nunca descargues aplicaciones que se llamen 'Lector de QR' desde la Play Store. Suelen venir repletas de publicidades engañosas que te vuelven lento el celular, cuidado con eso."
    },

    lupa_digital: {
        categoria: 'usos_tecnologia',
        nivel:     'basico',
        titulo:    "Usar el celular como Lupa",
        icono:     "🔍",
        detalle:   "¿Te cuesta leer la letra chica de los medicamentos, las facturas de los servicios o los precios del supermercado? Tu celular puede convertirse en una lupa gigante con luz propia al instante.",
        pasos: [
            "<strong>La cámara es tu aliada:</strong> Abrí la aplicación de la <strong>Cámara de fotos</strong> de tu celular y apuntá al papel o envase que querés leer.",
            "<strong>Hacer el 'pellizco' para agrandar:</strong> Apoyá dos dedos juntos en la pantalla (el pulgar y el índice) y separalos despacito, como si estuvieras estirando una masa. Vas a ver cómo la letra se agranda gigante en la pantalla (Zoom).",
            "<strong>Prender el reflector si está oscuro:</strong> Si estás leyendo el prospecto de un remedio de noche, buscá el dibujito de un **rayo (Flash)** en la pantalla de la cámara y tocalo para que quede fijo como linterna mientras agrandás la letra.",
            "<strong>Congelar la imagen para leer cómodo:</strong> Si te tiembla el pulso y la letra se mueve, sacale una foto al texto. Después, andá a la galería de fotos, abrí esa imagen y agrandala tranquilo con los dos dedos sin necesidad de estar apuntando al papel."
        ]
    },

    gestion_archivos: {
        categoria: 'usos_tecnologia',
        nivel:     'intermedio',
        titulo:    "¿Dónde van mis fotos y archivos?",
        icono:     "📂",
        detalle:   "Entender la diferencia entre cómo guarda archivos un celular (Android/iPhone) y una computadora (Windows). Aprendé a encontrar lo que descargás y a moverlo.",
        pasos: [
            "<strong>Android vs. Windows:</strong> En Windows usás carpetas (como un archivador). En Android, las aplicaciones suelen esconder los archivos en sus propias carpetas. Por eso, a veces 'no encontrás' la descarga: está dentro de la app que la bajó.",
            "<strong>La app 'Files' o 'Mis Archivos':</strong> Casi todos los Android traen una app llamada 'Files de Google' o 'Mis Archivos'. Es tu lupa para ver todo lo que hay dentro del teléfono.",
            "<strong>El concepto de 'Compartir':</strong> En lugar de intentar 'copiar y pegar' carpetas como en Windows, en el celular lo más fácil es usar el botón de <strong>Compartir</strong>. Si querés pasar una foto a la compu, compartila a tu propio WhatsApp o enviala por correo.",
            "<strong>iOS (iPhone):</strong> Los iPhone son más cerrados. Todo se maneja a través de la app 'Archivos'. Si descargaste algo, buscá ahí adentro o en la carpeta 'Descargas' de iCloud.",
            "<strong>Cómo gestionar:</strong> Nunca borres carpetas que no conozcas. Si necesitás limpiar espacio, usá siempre la opción 'Limpiar' o 'Liberar espacio' que trae la misma app de 'Files' de Google, es más seguro que borrar archivos a mano."
        ],
        nota: "💡 <strong>Consejo:</strong> Si conectás el celu a la compu por cable USB, la computadora lo verá como una memoria externa. Ahí sí, navegá como si fuera una carpeta más de Windows."
    },

    uso_navegador_seguro: {
        categoria: 'usos_tecnologia',
        nivel:     'intermedio',
        titulo:    "Navegar tranquilo con Brave",
        icono:     "🦁",
        detalle:   "¿Cansado de que las publicidades te persigan o que aparezcan carteles raros? Brave es un navegador seguro, rápido y sencillo que funciona como tu ventana a internet, pero limpiando el camino de molestias.",
        pasos: [
            "<strong>El reemplazo ideal:</strong> Un navegador es la aplicación que usás para entrar a internet y leer páginas. Brave es una alternativa excelente porque frena los carteles publicitarios y evita que te sigan por la red. Podés conocer más sobre cómo frena estas molestias en su <a href='https://brave.com/es/shields/' target='_blank' rel='noopener noreferrer'>página oficial de protección</a>.",
            "<strong>Cómo conseguirlo:</strong> Entrá a la tienda de aplicaciones de tu celu, buscá 'Brave Browser' y tocalo para instalar. Es totalmente gratuito. Podés verificar que es el creador original en <a href='https://brave.com/es/' target='_blank' rel='noopener noreferrer'>brave.com</a>.",
            "<strong>La barra principal (arriba de todo):</strong> Es el renglón largo en la parte superior. Si tocás ahí, se abre el teclado. Podés escribir la dirección exacta de un sitio (como anses.gob.ar) o simplemente hacerle una pregunta (como 'farmacias de turno').",
            "<strong>Los Marcadores (Tu agenda de páginas):</strong> Cuando estés en una página importante y quieras guardarla para otro día, buscá el dibujito de una <strong>estrellita</strong> o abrí el menú de los tres puntitos y elegí 'Agregar a marcadores'. Es como doblar la punta de la hoja de un libro para encontrarla rápido la próxima vez sin tener que memorizar nada.",
            "<strong>Las Pestañas (Varios libros a la vez):</strong> Arriba a la derecha o abajo, vas a ver un cuadradito con un número. Si lo tocás, podés abrir otra página nueva sin perder la que ya estabas leyendo. El número te avisa cuántas páginas tenés abiertas al mismo tiempo en tu mesa de trabajo.",
            "<strong>Botones para moverse:</strong> En la pantalla vas a encontrar una <strong>flecha que apunta hacia la izquierda</strong> (sirve para retroceder a lo que estabas viendo hace un segundo) y una <strong>flechita que da la vuelta en círculo</strong> (sirve para 'recargar' o darle un empujón a la página si se quedó trabada o en blanco).",
            "<strong>Una experiencia más rápida:</strong> Todo funciona igual que siempre: podés tocar botones, ver videos y llenar formularios. Pero notarás que el celular responde más veloz. Como el navegador limpia todo el peso invisible de los anuncios antes de mostrártelo, ahorrás datos de tu abono y batería. Podés ver estos resultados en la <a href='https://brave.com/es/compare/chrome/' target='_blank' rel='noopener noreferrer'>comparativa oficial de rendimiento</a>.",
            "<strong>Tu elección siempre es válida:</strong> Si preferís seguir usando el navegador que ya trajo tu celular de fábrica, está perfecto. Lo más importante, uses el que uses, es no dejarse invadir por las 'ventanitas sorpresa' (pop-ups). Son esos carteles molestos que saltan de golpe tapando la pantalla, muchas veces ofreciendo premios falsos. Nunca toques sus botones llamativos; simplemente buscá una pequeña cruz ('X') en alguna esquina para cerrarlos y seguir tu camino tranquilo."
        ],
        nota: "⚠️ <strong>Dato clave:</strong> Por dentro, Brave está construido con las mismas piezas que otros navegadores conocidos. Esto significa que si ya sabías entrar a internet antes, vas a saber usar este de inmediato, sintiéndote mucho más cuidado."
    },

    copia_seguridad: {
        categoria: 'usos_tecnologia',
        nivel:     'intermedio',
        titulo:    "No perder tus fotos y contactos (La Nube)",
        icono:     "☁️",
        detalle:   "Aprendé a guardar tus fotos, contactos y mensajes de forma segura en internet. Así, si alguna vez perdés el celular o se te rompe, cuando compres uno nuevo recuperás todo al instante.",
        pasos: [
            "<strong>¿Qué es 'La Nube'?</strong> No te asustes con el nombre. Es simplemente un cajón virtual y seguro en internet que te regalan cuando te creás una cuenta de Gmail. Todo lo que guardes ahí, viaja con vos a cualquier celular.",
            "<strong>Resguardar tus Fotos (Google Fotos):</strong> Buscá en tu celu la aplicación <em>Fotos</em> (tiene el dibujo de un molinete de colores). Entrá, tocá tu foto o letra arriba a la derecha, y buscá la opción <strong>'Copia de seguridad'</strong>. Fijate que el botón esté encendido. <em>Consejo:</em> Hacé esto cuando estés conectado a Wi-Fi para no gastar los datos de tu línea.",
            "<strong>No perder nunca los Contactos:</strong> Para que los números de teléfono no queden atrapados en el aparato viejo, hay un truco simple. Cuando agendes a un vecino nuevo, fijate arriba de todo en la pantalla: asegurate de que diga <strong>'Guardar en: [tu correo]'</strong> en lugar de decir 'Dispositivo' o 'Tarjeta SIM'.",
            "<strong>Guardar los chats de WhatsApp:</strong> ¿Querés conservar tus conversaciones? Abrí WhatsApp, tocá los tres puntitos arriba a la derecha y andá a <strong>Ajustes > Chats > Copia de seguridad</strong>. Apretá el botón verde que dice <strong>'Guardar'</strong>. Abajo podés elegir que esto se haga solo, por ejemplo, todas las semanas.",
            "<strong>Liberar espacio con confianza:</strong> Una vez que Google Fotos termine de hacer la copia de seguridad de tus imágenes, podés usar un botón dentro de esa misma aplicación que dice <strong>'Liberar espacio'</strong>. Eso borra las fotos del aparato para que no esté lento, pero te las deja guardadas y visibles en la nube."
        ],
        nota: "💡 Acordate: para que todo esto funcione y puedas recuperar tus cosas en otro teléfono, ¡es vital que sepas tu dirección de correo electrónico y tu contraseña!"
    },

    organizacion_pantallas: {
        categoria: 'personalizacion',
        nivel:     'intermedio',
        titulo:    "Organizar Pantallas como un Experto",
        icono:     "📱",
        detalle:   "¿Te mareás buscando una aplicación? Aprendé los secretos de diseño (UX) que usan los profesionales para organizar el celular según tu modelo: Samsung, Motorola o iPhone. ¡Tu vista y tus dedos te lo van a agradecer!",
        pasos: [
            "<strong>Módulo 1: Conociendo el terreno</strong><br>Antes de ordenar, conozcamos los conceptos básicos: <ul><li><strong>Pantalla de Inicio:</strong> El frente de tu casa.</li><li><strong>Pantalla Secundaria:</strong> Las habitaciones.</li><li><strong>Cuadrícula:</strong> El diseño de tus baldosas.</li><li><strong>Widgets:</strong> Ventanitas vivas con info al instante.</li><li><strong>Ergonomía de pulgar:</strong> Mantener lo importante al alcance del dedo.</li><li><strong>Jerarquía Visual:</strong> Destacar lo esencial.</li></ul>",
            "<strong>Módulo 2: Las Reglas de Oro del Orden</strong><br>Usamos leyes de diseño para que sea fácil: <ul><li><strong>Regla de los 3 toques:</strong> Lo que usás a diario debe estar muy a mano.</li><li><strong>Ley de Hick:</strong> Menos opciones en pantalla = menos confusión.</li><li><strong>Carga cognitiva:</strong> Agrupar por tareas cansa menos a la mente.</li><li><strong>Minimalismo:</strong> Si no la usás en 2 meses, ¡fuera de la pantalla principal!</li></ul>",
            "<strong>Módulo 3: El Modelo Ideal</strong><br>Copiá esta distribución para mejorar tu productividad:<br><div style='background:#f8f9fa; padding:10px; border-radius:8px; border-left:4px solid #0B5AA2; margin-top:5px;'><strong>Principal:</strong> Teléfono, WhatsApp, Cámara y Navegador.<br><strong>Secundaria:</strong> Carpetas por tareas (Bancos, Compras, Entretenimiento).<br><strong>Terciaria:</strong> Aplicaciones de uso poco frecuente.</div>",
            "<strong>Módulo 4: Trucos según tu marca</strong><br><ul><li>🔵 <strong>Samsung (One UI):</strong> Ajustes > Cuadrícula de pantalla.</li><li>🔵 <strong>Motorola (MyUX):</strong> Personalizar > Diseño de cuadrícula.</li><li>🔵 <strong>Google Pixel:</strong> Usá el widget 'De un vistazo' y Material You.</li><li>🍏 <strong>iPhone (iOS):</strong> Biblioteca de Apps y carpetas inteligentes.</li></ul>",
            "<strong>Módulo 5: ¡Manos a la obra!</strong><br><ol><li>Mirá tu pantalla: ¿hay más de 15 íconos?</li><li>Eliminá del inicio las apps que no usás a diario.</li><li>Poné tus 4 apps principales en el renglón de abajo (Dock).</li><li>Arrastrá una app sobre otra para crear carpetas por temas.</li></ol>",
            "<strong>Módulo 6: ¿Qué nivel sos?</strong><br>🏆 <strong>Principiante:</strong> Tengo íconos que no conozco.<br>🏆 <strong>Organizado:</strong> Mis apps están en carpetas con nombre.<br>🏆 <strong>Productivo:</strong> Encuentro todo en menos de 3 segundos.<br>👑 <strong>Experto UX:</strong> Mi pantalla es minimalista, ordenada y ergonómica."
        ],
        nota: "💡 ¿Sabías qué? Las grandes empresas de tecnología gastan millones investigando cómo hacer que encuentres todo más rápido. Hoy, ese conocimiento ya es tuyo."
    },

// FUERZA LA EXPOSICIÓN GLOBAL
window.baseDeTutoriales = baseDeTutoriales;
console.log("Tutoriales cargados en window:", window.baseDeTutoriales);