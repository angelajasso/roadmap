const themeBtn = document.querySelector("#theme-btn");
const themeSaved = localStorage.getItem("theme");
const input = document.querySelector("input");
const form = document.querySelector("form");

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

form.addEventListener("submit", function (event) {
  event.preventDefault(); // Para que no se recargue la página

  const text = input.value;
  const li = document.createElement("li");
  li.textContent = text;
  document.querySelector("ul").appendChild(li);
});
