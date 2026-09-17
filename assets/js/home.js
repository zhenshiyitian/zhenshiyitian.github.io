document.getElementById('year').textContent = new Date().getFullYear();

// A decorative pixel ripple follows each primary click without changing the cursor.
const rippleMarkup = `<svg viewBox="0 0 64 64" aria-hidden="true" focusable="false">
  <path class="ripple-ring ring-one" d="M26 4h12v4h8v4h6v6h4v8h4v12h-4v8h-4v6h-6v4h-8v4H26v-4h-8v-4h-6v-6H8v-8H4V26h4v-8h4v-6h6V8h8z" />
  <path class="ripple-ring ring-two" d="M26 4h12v4h8v4h6v6h4v8h4v12h-4v8h-4v6h-6v4h-8v4H26v-4h-8v-4h-6v-6H8v-8H4V26h4v-8h4v-6h6V8h8z" />
  <path class="ripple-ring ring-three" d="M26 4h12v4h8v4h6v6h4v8h4v12h-4v8h-4v6h-6v4h-8v4H26v-4h-8v-4h-6v-6H8v-8H4V26h4v-8h4v-6h6V8h8z" />
</svg>`;

document.addEventListener('pointerdown', (event) => {
  if (event.button !== 0 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const ripple = document.createElement('span');
  ripple.className = 'pixel-click-ripple';
  ripple.setAttribute('aria-hidden', 'true');
  ripple.style.left = `${event.clientX}px`;
  ripple.style.top = `${event.clientY}px`;
  ripple.innerHTML = rippleMarkup;
  document.body.append(ripple);
  window.setTimeout(() => ripple.remove(), 950);
});
