const DEMO_EMAIL = "mustafaemin3458@gmail.com";
const DEMO_PASSWORD = "Mest!2026_Kalkan#Asim18";
const KEY = "mest_demo_admin";

function login() {
  const email = document.getElementById("email")?.value?.trim();
  const password = document.getElementById("password")?.value ?? "";
  const error = document.getElementById("error");

  if (email === DEMO_EMAIL && password === DEMO_PASSWORD) {
    localStorage.setItem(KEY, "ok");
    window.location.href = "./admin.html";
    return;
  }

  if (error) {
    error.textContent = "E-posta veya sifre hatali.";
  }
}

function logout() {
  localStorage.removeItem(KEY);
  window.location.href = "./login.html";
}

function toggleMenu() {
  const nav = document.querySelector(".nav");
  if (!nav) {
    return;
  }

  nav.classList.toggle("is-open");
}

if (window.location.pathname.endsWith("/admin.html") && localStorage.getItem(KEY) !== "ok") {
  window.location.href = "./login.html";
}
