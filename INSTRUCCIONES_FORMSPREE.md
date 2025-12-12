# 📬 Instrucciones para activar Formspree

## Paso a paso (5 minutos)

### 1. Crear cuenta en Formspree
- Ve a **https://formspree.io**
- Haz clic en **"Get Started"** o **"Sign Up"**
- Registrate con tu correo: **Camilo.rodriguez1@utp.edu.co**
- Verifica tu correo

### 2. Crear un nuevo formulario
- Una vez dentro, haz clic en **"+ New Project"** o **"New Form"**
- Dale un nombre (ej: "Invitación Domingo")
- Formspree te dará un **Form ID** que se ve así: `xyzabc123`

### 3. Configurar el proyecto
- Abre el archivo `index.html`
- Ve a la línea 72 aproximadamente
- Busca: `action="https://formspree.io/f/YOUR_FORM_ID"`
- Reemplaza `YOUR_FORM_ID` con tu ID real
- Ejemplo: `action="https://formspree.io/f/xyzabc123"`

### 4. Desplegar en Vercel
- Haz commit y push de los cambios
- Vercel se desplegará automáticamente

### 5. ¡Listo! 🎉
- Cada vez que alguien responda, recibirás un **email** en `Camilo.rodriguez1@utp.edu.co`
- También podrás ver todas las respuestas en el **dashboard de Formspree**: https://formspree.io/forms

---

## ¿Qué datos se guardarán?
- ✅ Respuesta (Sí o No)
- ✅ Nombre (si lo ponen)
- ✅ Nota (si la ponen)
- ✅ Plan: "Domingo - Desayuno y caminata con Thor"
- ✅ Información del dispositivo
- ✅ Fecha y hora exacta

---

## Plan gratuito de Formspree
- ✅ 50 respuestas por mes
- ✅ Almacenamiento ilimitado de respuestas
- ✅ Dashboard para ver todas las respuestas
- ✅ Notificaciones por email

¡Perfecto para este tipo de invitaciones! 🚀
