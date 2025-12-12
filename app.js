// Carrusel de fotos
document.addEventListener('DOMContentLoaded', () => {
  let currentIndex = 0;
  const items = document.querySelectorAll('.carousel-item');
  const dots = document.querySelectorAll('.dot');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');

  function showItem(index) {
    items.forEach((item, i) => {
      item.classList.toggle('active', i === index);
    });
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
  }

  if (prevBtn) prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + items.length) % items.length;
    showItem(currentIndex);
  });

  if (nextBtn) nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % items.length;
    showItem(currentIndex);
  });

  dots.forEach(dot => {
    dot.addEventListener('click', (e) => {
      currentIndex = parseInt(e.target.dataset.index);
      showItem(currentIndex);
    });
  });
});
// 1) Botón “Ver la invitación”
const revealBtn = document.getElementById("revealBtn");
const content = document.getElementById("content");

revealBtn?.addEventListener("click", () => {
  content.classList.remove("hidden");
  revealBtn.disabled = true;
  revealBtn.textContent = "Invitación abierta ✅";
});

// 2) Metadatos útiles
const deviceInfo = document.getElementById("deviceInfo");
const timestamp = document.getElementById("timestamp");
if (deviceInfo) deviceInfo.value = navigator.userAgent || "";
if (timestamp) timestamp.value = new Date().toISOString();

// 3) Envío por Formspree
const form = document.getElementById("inviteForm");
const statusEl = document.getElementById("status");
const submitBtn = document.getElementById("submitBtn");

// 👉 PON AQUÍ tu endpoint de Formspree (paso 2)
const FORMSPREE_ENDPOINT = "https://formspree.io/f/manraaar";

if (form) form.action = FORMSPREE_ENDPOINT;

form?.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (!FORMSPREE_ENDPOINT || FORMSPREE_ENDPOINT.includes("XXXXXXXX")) {
    statusEl.textContent = "Falta configurar Formspree (reemplaza el endpoint en app.js).";
    return;
  }

  submitBtn.disabled = true;
  submitBtn.style.opacity = "0.8";
  statusEl.textContent = "Enviando… (pipeline en ejecución)";

  try {
    const data = new FormData(form);

    const res = await fetch(form.action, {
      method: "POST",
      body: data,
      headers: { "Accept": "application/json" }
    });

    if (res.ok) {
      statusEl.textContent = "Listo. Respuesta enviada ✅";
      form.reset();
    } else {
      statusEl.textContent = "Ups… no se pudo enviar. Intenta otra vez.";
    }
  } catch {
    statusEl.textContent = "Error de red. Revisa conexión o el endpoint.";
  } finally {
    submitBtn.disabled = false;
    submitBtn.style.opacity = "1";
  }
});
