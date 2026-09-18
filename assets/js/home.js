document.getElementById('year').textContent = new Date().getFullYear();

const fieldCard = document.getElementById('field-card');
if (fieldCard) {
  const cards = [
    { title: 'Coastal Hazards', lines: ['COASTAL', 'HAZARDS'], image: 'card-coastal-hazards.svg' },
    { title: 'Tropical Cyclones', lines: ['TROPICAL', 'CYCLONES'], image: 'card-tropical-cyclones.svg' },
    { title: 'Compound Flooding', lines: ['COMPOUND', 'FLOODING'], image: 'card-compound-flooding.svg' },
    { title: 'Storm Surge', lines: ['STORM', 'SURGE'], image: 'card-storm-surge.svg' },
    { title: 'Infrastructure Resilience', lines: ['INFRASTRUCTURE', 'RESILIENCE'], image: 'card-infrastructure-resilience.svg' },
  ];
  const cardImage = document.getElementById('field-card-image');
  const cardCount = document.getElementById('field-card-count');
  const lineOne = document.getElementById('field-card-line-one');
  const lineTwo = document.getElementById('field-card-line-two');
  const cardStatus = document.getElementById('field-card-status');
  let cardIndex = 0;

  cards.slice(1).forEach(({ image }) => { const preload = new Image(); preload.src = `assets/img/${image}`; });
  fieldCard.addEventListener('click', () => {
    cardIndex = (cardIndex + 1) % cards.length;
    const card = cards[cardIndex];
    const next = cards[(cardIndex + 1) % cards.length];
    cardImage.src = `assets/img/${card.image}`;
    cardCount.textContent = `FIELD CARD // ${String(cardIndex + 1).padStart(2, '0')} / ${String(cards.length).padStart(2, '0')}`;
    lineOne.textContent = card.lines[0];
    lineTwo.textContent = card.lines[1];
    fieldCard.classList.toggle('field-card-long', card.title === 'Infrastructure Resilience');
    fieldCard.setAttribute('aria-label', `Field card ${cardIndex + 1} of ${cards.length}: ${card.title}. Click to show ${next.title}.`);
    cardStatus.textContent = card.title;
    fieldCard.classList.remove('field-card-flip');
    void fieldCard.offsetWidth;
    fieldCard.classList.add('field-card-flip');
  });
}

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
