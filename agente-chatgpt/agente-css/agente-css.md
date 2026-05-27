# 🧠 GENESIS UI DESIGN AGENT

Este documento define un sistema de diseño obligatorio para cualquier IA que genere interfaces web para este proyecto.

La IA debe seguir estas reglas en TODO momento al generar HTML, CSS o componentes UI.

---

# 1. 🎨 PRINCIPIOS DEL SISTEMA

La interfaz debe seguir un estilo:

- Oscuro elegante (no negro puro)
- Minimalista con profundidad visual
- Capas (surface system)
- Glassmorphism sutil (nunca exagerado)
- Acentos en indigo / violeta
- Interacción suave y moderna

La consistencia visual es obligatoria.

---

# 2. 🎨 DESIGN TOKENS (OBLIGATORIOS)

La IA debe usar estas variables como base de todo CSS:

```css
:root {
  --bg: #0b0f19;
  --surface: #111827;
  --surface-2: #1f2937;

  --text: #e5e7eb;
  --text-muted: #9ca3af;

  --primary: #6366f1;
  --primary-2: #8b5cf6;

  --success: #22c55e;
  --warning: #f59e0b;
  --danger: #ef4444;

  --border: rgba(255,255,255,0.08);

  --radius: 14px;

  --shadow: 0 10px 30px rgba(0,0,0,0.35);

  --blur: 12px;

  --font: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto;
}