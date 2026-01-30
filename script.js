 //FORMULARIO VALIDACIÓN//


//REFERENCIAS A ELEMENTOS DEL DOM//
const form = document.getElementById("contact-form");
const asunto = document.getElementById("asunto");
const otroContainer = document.getElementById("otro-container");
const otroInput = document.getElementById("otro");
const terminos = document.getElementById("terminos");

//MOSTRAR / OCULTAR CAMPO "OTRO" SEGÚN EL ASUNTO//
asunto.addEventListener("change", () => {
  if (asunto.value === "otro") {
    otroContainer.style.display = "block";
    otroInput.required = true;
  } else {
    otroContainer.style.display = "none";
    otroInput.required = false;
    otroInput.value = "";
    limpiarCampo(otroInput);
    limpiarError("error-otro");
  }
});

//FUNCIONES AUXILIARES//

function limpiarCampo(campo) {
  campo.classList.remove("is-invalid", "is-valid");
}

function limpiarError(id) {
  document.getElementById(id).textContent = "";
}

function marcarError(campo, mensaje, errorId) {
  campo.classList.add("is-invalid");
  campo.classList.remove("is-valid");
  document.getElementById(errorId).textContent = mensaje;
}

function marcarValido(campo, errorId) {
  campo.classList.remove("is-invalid");
  campo.classList.add("is-valid");
  limpiarError(errorId);
}

//VALIDACIÓN EN TIEMPO REAL (INPUT)//

form.addEventListener("input", e => {
  const target = e.target;

  //NOMBRE: obligatorio + solo letras//
  if (target.id === "nombre") {
    const regexNombre = /^[A-Za-z\s]+$/;

    if (target.value.trim() === "") {
      marcarError(target, "El nombre es obligatorio", "error-nombre");
    } else if (!regexNombre.test(target.value.trim())) {
      marcarError(
        target,
        "No se permiten números ni caracteres especiales",
        "error-nombre"
      );
    } else {
      marcarValido(target, "error-nombre");
    }
  }

  //EMAIL//
  if (target.id === "email") {
    const regex = /^\S+@\S+\.\S+$/;

    if (!regex.test(target.value)) {
      marcarError(target, "Correo inválido", "error-email");
    } else {
      marcarValido(target, "error-email");
    }
  }

  //MENSAJE: mínimo 20 caracteres//
  if (target.id === "mensaje") {
    if (target.value.trim().length < 20) {
      marcarError(
        target,
        "El mensaje debe tener al menos 20 caracteres",
        "error-mensaje"
      );
    } else {
      marcarValido(target, "error-mensaje");
    }
  }

  //CAMPO "OTRO" SI ES REQUERIDO//
  if (target.id === "otro" && otroInput.required) {
    if (target.value.trim() === "") {
      marcarError(target, "Debes especificar el motivo", "error-otro");
    } else {
      marcarValido(target, "error-otro");
    }
  }

  //ASUNTO//
  if (target.id === "asunto") {
    if (target.value === "") {
      document.getElementById("error-asunto").textContent =
        "Debes seleccionar un asunto";
      target.classList.add("is-invalid");
      target.classList.remove("is-valid");
    } else {
      marcarValido(target, "error-asunto");
    }
  }

  //TÉRMINOS//
  if (target.id === "terminos") {
    if (terminos.checked) {
      limpiarError("error-terminos");
      terminos.classList.remove("is-invalid");
      terminos.classList.add("is-valid");
    } else {
      document.getElementById("error-terminos").textContent =
        "Debes aceptar los términos";
      terminos.classList.add("is-invalid");
      terminos.classList.remove("is-valid");
    }
  }
});

//VALIDACIÓN FINAL AL ENVIAR FORMULARIO//

form.addEventListener("submit", e => {
  e.preventDefault();

  const campos = ["nombre", "email", "mensaje"];
  if (asunto.value === "otro") campos.push("otro");

  let valido = true;

  //VALIDAR NOMBRE//
  const nombre = document.getElementById("nombre");
  const regexNombre = /^[A-Za-z\s]+$/;

  if (
    nombre.value.trim() === "" ||
    !regexNombre.test(nombre.value.trim())
  ) {
    marcarError(
      nombre,
      "Nombre inválido (solo letras y espacios)",
      "error-nombre"
    );
    valido = false;
  }

  //VALIDAR EMAIL//
  const email = document.getElementById("email");
  const regexEmail = /^\S+@\S+\.\S+$/;

  if (!regexEmail.test(email.value)) {
    marcarError(email, "Correo inválido", "error-email");
    valido = false;
  }

  //VALIDAR MENSAJE//
  const mensaje = document.getElementById("mensaje");
  if (mensaje.value.trim().length < 20) {
    marcarError(
      mensaje,
      "El mensaje debe tener al menos 20 caracteres",
      "error-mensaje"
    );
    valido = false;
  }

  //VALIDAR ASUNTO//
  if (asunto.value === "") {
    marcarError(asunto, "Debes seleccionar un asunto", "error-asunto");
    valido = false;
  }

  //VALIDAR "OTRO"//
  if (asunto.value === "otro") {
    if (otroInput.value.trim() === "") {
      marcarError(
        otroInput,
        "Debes especificar el motivo",
        "error-otro"
      );
      valido = false;
    }
  }

  //VALIDAR TÉRMINOS//
  if (!terminos.checked) {
    document.getElementById("error-terminos").textContent =
      "Debes aceptar los términos";
    terminos.classList.add("is-invalid");
    terminos.classList.remove("is-valid");
    valido = false;
  } else {
    limpiarError("error-terminos");
    terminos.classList.remove("is-invalid");
    terminos.classList.add("is-valid");
  }

  //ENVÍO EXITOSO//
  if (valido) {
    alert("Formulario enviado correctamente!");
    form.reset();

    document
      .querySelectorAll(".is-valid")
      .forEach(el => el.classList.remove("is-valid"));

    // Ocultar "otro" si estaba visible
    otroContainer.style.display = "none";
  }
});

//LIMPIEZA TOTAL AL RESETEAR FORM//
form.addEventListener("reset", () => {
  // Limpiar mensajes de error
  document.querySelectorAll(
    "#error-nombre, #error-email, #error-mensaje, #error-asunto, #error-otro, #error-terminos"
  ).forEach(error => {
    error.textContent = "";
  });

  // Quitar clases de validación//
  document
    .querySelectorAll(".is-invalid, .is-valid")
    .forEach(el => {
      el.classList.remove("is-invalid", "is-valid");
    });

  // Ocultar campo "otro"//
  otroContainer.style.display = "none";
  otroInput.required = false;
});