document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('ostrzezenia-search');
  const container = document.getElementById('ostrzezenia-container');

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
    const rows = container.querySelectorAll('.alert-row');
    let visibleCount = 0;

    rows.forEach(row => {
      const text = normalize(row.textContent);
      const match = text.includes(query);
      row.style.display = match ? '' : 'none';
      if (match) visibleCount++;
    });

    liveRegion.textContent = query.length === 0
      ? ''
      : `Znaleziono ${visibleCount} ostrzeżenie${plural(visibleCount)} pasujące do "${query}".`;
  });

  function normalize(str) {
    return str.toLowerCase()
              .normalize("NFD")
              .replace(/\p{Diacritic}/gu, "")
              .trim();
  }

  function plural(n) {
    if (n === 1) return '';
    if (n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)) return 'a';
    return '';
  }
});
