const themeBtn = document.querySelector("#theme-btn");
const themeSaved = localStorage.getItem("theme");
const form = document.querySelector("#form");
const input = document.querySelector("#task");
const list = document.querySelector("#list");

//Array donde guardamos las tareas
let tareas = [];

if (themeSaved === "dark") {
  document.body.classList.add("dark");
  themeBtn.textContent = "☀️";
} else {
  themeBtn.textContent = "🌙";
}

themeBtn.addEventListener("click", function () {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    themeBtn.textContent = "☀️";
    localStorage.setItem("theme", "dark");
  } else {
    themeBtn.textContent = "🌙";
    localStorage.setItem("theme", "light");
  }
});

// 1) Cargar tareas desde localStorage al iniciar
document.addEventListener("DOMContentLoaded", () => {
  const guardadas = JSON.parse(localStorage.getItem("tareas")) || [];
  tareas = guardadas;

  tareas.forEach((t) => agregarTareaDOM(t));
});

// 2) Evento del formulario
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const texto = input.value.trim();
  if (texto === "") return;

  tareas.push(texto);
  guardarEnLocalStorage();

  agregarTareaDOM(texto);
  input.value = "";
});

// 3) Función para agregar tarea al DOM
function agregarTareaDOM(texto) {
  const li = document.createElement("li");

  //contenedor para checkbox y span
  const contenedorCSpan = document.createElement("div");
  contenedorCSpan.classList.add("checkSpan");

  //Checkbox
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";

  //span
  const span = document.createElement("span");
  span.textContent = texto;

  // Contenedor para los botones
  const contenedorBtns = document.createElement("div");
  contenedorBtns.classList.add("acciones");

  //Botón editar
  const btnEditar = document.createElement("button");
  btnEditar.textContent = "✏️";
  btnEditar.classList.add("editar");

  //Botón eliminar
  const btn = document.createElement("button");
  btn.textContent = "✖";
  btn.classList.add("Eliminar");

  //listener checkbox
  checkbox.addEventListener("change", () => {
    if (checkbox.checked) {
      span.classList.add("completada");
    } else {
      span.classList.remove("conpletada");
    }
  });

  // Editar tarea
  btnEditar.addEventListener("click", () => {
    const nuevoTexto = prompt("Edita la tarea:", span.textContent);
    if (nuevoTexto && nuevoTexto.trim() !== "") {
      actualizarTarea(span.textContent, nuevoTexto.trim());
      span.textContent = nuevoTexto.trim();
    }
  });

  //Eliminar tarea
  btn.addEventListener("click", () => {
    eliminarTarea(span.textContent);
    li.remove();
  });

  // Agregamos el checkbox y el span al div
  contenedorCSpan.append(checkbox, span);

  // Agregamos los botones al div
  contenedorBtns.append(btnEditar, btn);

  // Agregamos el texto y el div al <li>
  li.append(contenedorCSpan, contenedorBtns);

  list.appendChild(li);
}

function actualizarTarea(textoViejo, textoNuevo) {
  let tareas = JSON.parse(localStorage.getItem("tareas")) || [];
  let index = tareas.indexOf(textoViejo);

  if (index !== -1) {
    tareas[index] = textoNuevo;
  }

  localStorage.setItem("tareas", JSON.stringify(tareas));
}

// 4) Eliminar tarea del array y guardar
function eliminarTarea(texto) {
  tareas = tareas.filter((t) => t !== texto);
  guardarEnLocalStorage();
}

// 5) Guardar en localStorage
function guardarEnLocalStorage() {
  localStorage.setItem("tareas", JSON.stringify(tareas));
}
