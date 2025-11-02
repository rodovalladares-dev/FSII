// =========================
// VALIDACIONES DEL FORMULARIO COMPLETO
// =========================

// 1️⃣ Capturamos los elementos principales del DOM
const form = document.getElementById("Formulario_Registro"); // Formulario principal
const alerta = document.getElementById("alerta"); // Div donde mostraremos los mensajes (éxito o error)

// 2️⃣ Creamos expresiones regulares para validar patrones
const regexNombre = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{3,}$/; // Solo letras y espacios, mínimo 3 caracteres
const regexUsuario = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{5,}$/; // Solo letras y espacios, mínimo 5 caracteres
const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}$/; // Formato básico de correo electrónico
const regexPass = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{6,18}$/; // Contraseña con mínimo 8 caracteres, MINIMO una mayúscula y un número Y UN CARACTESER ESPECIAL





// 3️⃣ Escuchamos el evento "submit" del formulario
form.addEventListener("submit", (event) => {
    event.preventDefault(); // Evita que el formulario recargue la página al enviarse


    let valido = true; // Variable que indica si el formulario pasa todas las validaciones

    // 4️⃣ Validamos el campo Nombre
    const nombre = document.getElementById("nombre");
    if (!regexNombre.test(nombre.value.trim())) { // .test() verifica si el texto cumple la expresión regular
        setInvalido(nombre);
        valido = false;
    } else {
        setValido(nombre);
    }

    // 4️⃣ Validamos el campo usuario
    const usuario = document.getElementById("usuario");
    if (!regexUsuario.test(usuario.value.trim())) { // .test() verifica si el texto cumple la expresión regular
        setInvalido(usuario);
        valido = false;
    } else {
        setValido(usuario);
    }

    // 5️⃣ Validamos el Correo
    const email = document.getElementById("email");
    if (!regexEmail.test(email.value.trim()) && (email.value.trim()) !== ' ' ) { // Verifica formato de correo válido
        setInvalido(email);
        valido = false;
    } else {
        setValido(email);
    }

    // 6️⃣ Validamos la Fecha de nacimiento
    const fecha = document.getElementById("fecha");
    const edad = calcularEdad(fecha.value); // Llama a la función que calcula edad
    if (edad > 13 || isNaN(edad)) { // Si es menor de 18 o no hay fecha válida
        setInvalido(fecha);
        valido = false;
    } else {
        setValido(fecha);
    }




    // Validamos Contraseña
    const password = document.getElementById("password");
    const confirmar = document.getElementById("confirmar");

    if (!regexPass.test(password.value || password.value === "")) { // Verifica que cumpla las condiciones mínimas
        setInvalido(password);
        valido = false;
    } else {
        setValido(password);
    }

    if (!regexPass.test(confirmar.value || confirmar.value === "")) { // Verifica que cumpla las condiciones mínimas
        setInvalido(confirmar);
        valido = false;
    } else {
        setValido(confirmar);
    }


    // Confirmación de contraseña
    if (password.value !== confirmar.value || confirmar.value === "") {
        setInvalido(confirmar);
        valido = false;
    } else {
        setValido(confirmar);
    }





    // 1 Resultado final
    if (valido) {
        // Si todo está correcto, mostramos mensaje verde de éxito
        mostrarMensaje("✅ Registro exitoso. Bienvenido/a, " + nombre.value + "!", "success");
        form.reset(); // Limpia todos los campos del formulario
        limpiarValidaciones(); // Quita las clases verdes/rojas
    } else {
        // Si hay errores, mostramos mensaje rojo de advertencia
        mostrarMensaje("⚠️ Revise los campos en rojo e intente nuevamente.", "danger");
    }





});

// =========================
// FUNCIONES DE APOYO
// =========================

// Calcula edad a partir de una fecha de nacimiento
function calcularEdad(fecha) {
    const hoy = new Date(); // Fecha actual
    const nacimiento = new Date(fecha); // Fecha ingresada
    let edad = hoy.getFullYear() - nacimiento.getFullYear(); // Diferencia de años
    const m = hoy.getMonth() - nacimiento.getMonth(); // Diferencia de meses
    // Si el mes actual es menor al mes de nacimiento, o está en el mismo mes pero el día aún no llega, resta un año
    if (m < 0 || (m === 0 && hoy.getDate() < nacimiento.getDate())) edad--;
    return edad; // Devuelve edad en años
}

// Marca un campo como válido (verde)
function setValido(elemento) {
    elemento.classList.remove("is-invalid"); // Quita clase de error
    elemento.classList.add("is-valid"); // Agrega clase de éxito
}

// Marca un campo como inválido (rojo)
function setInvalido(elemento) {
    elemento.classList.remove("is-valid"); // Quita clase verde
    elemento.classList.add("is-invalid"); // Agrega clase roja
}

// Limpia todas las clases de validación después del envío
function limpiarValidaciones() {
    document.querySelectorAll(".is-valid, .is-invalid").forEach(e => {
        e.classList.remove("is-valid", "is-invalid");
    });
}


// Muestra mensajes dinámicos en la zona de alerta (inferior)
function mostrarMensaje(texto, tipo) {
    // tipo puede ser: success (verde), danger (rojo), warning (amarillo), info (azul)
    alerta.innerHTML = `<div class="alert alert-${tipo}" role="alert">${texto}</div>`;
    // El mensaje desaparecerá automáticamente después de 4 segundos
    setTimeout(() => alerta.innerHTML = "", 4000);
}

function LimpiaForm() {


    // 2. Llama al método reset()
    form.reset();

    // Opcional: Mostrar un mensaje
    console.log("Formulario limpiado.");
}