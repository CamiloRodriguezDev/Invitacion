// Handle reveal button to show invitation content
document.addEventListener('DOMContentLoaded', () => {
  const revealBtn = document.getElementById('revealBtn');
  const content = document.getElementById('content');
  const form = document.getElementById('inviteForm');
  const statusEl = document.getElementById('status');
  const modal = document.getElementById('modal');
  const modalDesc = document.getElementById('modalDesc');
  const closeModalBtn = document.getElementById('closeModal');

  // Reveal content
  if (revealBtn && content) {
    revealBtn.addEventListener('click', () => {
      content.classList.remove('hidden');
    });
  }

  // Utility: open/close modal
  function openModal(message) {
    if (!modal) return alert(message);
    modalDesc.textContent = message;
    modal.classList.remove('hidden');
    document.body.classList.add('modal-open');
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.add('hidden');
    document.body.classList.remove('modal-open');
  }

  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeModal);
  }

  // Close modal clicking backdrop
  const backdrop = document.querySelector('.modal-backdrop');
  if (backdrop) {
    backdrop.addEventListener('click', closeModal);
  }

  // Populate hidden metadata
  const deviceInfoEl = document.getElementById('deviceInfo');
  const timestampEl = document.getElementById('timestamp');
  if (deviceInfoEl) {
    deviceInfoEl.value = `${navigator.userAgent} | ${window.innerWidth}x${window.innerHeight}`;
  }
  if (timestampEl) {
    timestampEl.value = new Date().toISOString();
  }

  // Handle form submit: show modal and send to Formspree
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const data = new FormData(form);
      const respuesta = data.get('respuesta');
      const nombre = (data.get('nombre') || '').toString().trim();
      const nota = (data.get('nota') || '').toString().trim();

      const saludo = nombre ? `, ${nombre}` : '';
      const extra = nota ? `\nNota: ${nota}` : '';
      let msg = `Respuesta registrada${saludo}: ${respuesta}.${extra}`;

      // Show modal immediately
      openModal(msg + '\n\nEnviando...');

      // Send to Formspree in background
      try {
        console.log('📤 Enviando a Formspree:', form.action);
        const response = await fetch(form.action, {
          method: 'POST',
          body: data,
          headers: { 'Accept': 'application/json' }
        });
        
        console.log('📬 Respuesta de Formspree:', response.status, response.statusText);
        const result = await response.json().catch(() => ({}));
        console.log('📄 Datos recibidos:', result);
        
        if (response.ok) {
          modalDesc.textContent = msg + '\n\n✅ ¡Enviado exitosamente a tu correo!';
          if (statusEl) statusEl.textContent = '✅ Respuesta guardada y enviada por email.';
          alert('✅ ÉXITO: Respuesta enviada correctamente a Formspree.\nRecibirás un email en Camilo.rodriguez1@utp.edu.co');
        } else {
          modalDesc.textContent = msg + '\n\n⚠️ Error al enviar (código: ' + response.status + ')';
          if (statusEl) statusEl.textContent = '⚠️ Error al enviar.';
          alert('⚠️ ERROR: No se pudo enviar.\nCódigo: ' + response.status + '\nRevisa la consola (F12).');
        }
      } catch (error) {
        console.error('❌ Error de red:', error);
        modalDesc.textContent = msg + '\n\n❌ Error de conexión: ' + error.message;
        if (statusEl) statusEl.textContent = '❌ Error de conexión.';
        alert('❌ ERROR DE RED: ' + error.message + '\n\nRevisa tu conexión y la consola (F12).');
      }
    });
  }
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
