document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('pogoda-search');
  const container = document.getElementById('pogoda-container');

  if (!input || !container) return;

  let liveRegion = document.getElementById('search-status');
  if (!liveRegion) {
    liveRegion = document.createElement('div');
    liveRegion.id = 'search-status';
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.setAttribute('role', 'status');
    liveRegion.classList.add('visually-hidden');
    input.insertAdjacentElement('afterend', liveRegion);
  }

  input.addEventListener('input', () => {
    const query = normalize(input.value);
    const cards = container.querySelectorAll('.card');

    let visibleCount = 0;

    cards.forEach(card => {
      const text = normalize(card.textContent);
      const match = text.includes(query);
      card.style.display = match ? 'block' : 'none';
      if (match) visibleCount++;
    });

    liveRegion.textContent =
      query.length === 0
        ? ''
        : visibleCount > 0
          ? `Znaleziono ${visibleCount} wynik${plural(visibleCount)} pasujących do „${query}”.`
          : `Brak wyników pasujących do „${query}”.`;
  });

  function normalize(str) {
    return str.toLowerCase()
              .normalize("NFD")
              .replace(/\p{Diacritic}/gu, "")
              .trim();
  }

  function plural(n) {
    if (n === 1) return '';
    if (n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)) return 'y';
    return 'ów';
  }
});
