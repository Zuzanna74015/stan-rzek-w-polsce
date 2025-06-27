document.addEventListener('DOMContentLoaded', () => {
  const query = new URLSearchParams(window.location.search).get('q')?.toLowerCase() || '';
  const resultsContainer = document.getElementById('search-results');

  if (!resultsContainer) return;

  let liveRegion = document.getElementById('search-live-status');
  if (!liveRegion) {
    liveRegion = document.createElement('div');
    liveRegion.id = 'search-live-status';
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.setAttribute('role', 'status');
    liveRegion.classList.add('visually-hidden');
    resultsContainer.insertAdjacentElement('beforebegin', liveRegion);
  }

  if (!query) {
    resultsContainer.innerHTML = '<p class="text-danger" role="alert">Brak zapytania do wyszukania.</p>';
    liveRegion.textContent = 'Nie podano zapytania do wyszukania.';
    return;
  }

  let output = '';
  let matchCount = 0;
  let counter = 0;

  // Hydro - stacje
  fetch('https://danepubliczne.imgw.pl/api/data/hydro/')
    .then(res => res.json())
    .then(data => {
      const stacje = data.filter(st => st.stacja?.toLowerCase().includes(query));
      if (stacje.length > 0) {
        matchCount += stacje.length;
        output += '<h2 class="h5 mt-4">📍 Stacje hydrologiczne:</h2><ul>';
        stacje.forEach(st => {
          output += `<li><strong>${st.stacja}</strong> – ${st.rzeka}, ${st.wojewodztwo}</li>`;
        });
        output += '</ul>';
      }
      renderIfDone();
    });

  // Ostrzeżenia hydrologiczne
  fetch('https://danepubliczne.imgw.pl/api/alerts/hydro')
    .then(res => res.json())
    .then(data => {
      const hydro = data.filter(alert => alert.wojewodztwo?.toLowerCase().includes(query));
      if (hydro.length > 0) {
        matchCount += hydro.length;
        output += '<h2 class="h5 mt-4">💧 Ostrzeżenia hydrologiczne:</h2><ul>';
        hydro.forEach(alert => {
          output += `<li>${alert.stacja} – ${alert.rzeka}, ${alert.stopien} stopień</li>`;
        });
        output += '</ul>';
      }
      renderIfDone();
    })
    .catch(renderIfDone);

  // Ostrzeżenia meteorologiczne
  fetch('https://danepubliczne.imgw.pl/api/alerts/meteo')
    .then(res => res.json())
    .then(data => {
      const meteo = data.filter(alert => alert.wojewodztwo?.toLowerCase().includes(query));
      if (meteo.length > 0) {
        matchCount += meteo.length;
        output += '<h2 class="h5 mt-4">🌩️ Ostrzeżenia meteorologiczne:</h2><ul>';
        meteo.forEach(alert => {
          output += `<li>${alert.powiat} – ${alert.zjawisko}, ${alert.stopien} stopień</li>`;
        });
        output += '</ul>';
      }
      renderIfDone();
    })
    .catch(renderIfDone);

  function renderIfDone() {
    counter++;
    if (counter >= 3) {
      resultsContainer.innerHTML =
        output || '<p class="text-muted">Brak wyników dla podanego zapytania.</p>';

      liveRegion.textContent =
        matchCount > 0
          ? `Znaleziono ${matchCount} wyników dla zapytania "${query}".`
          : `Nie znaleziono wyników dla zapytania "${query}".`;
    }
  }
});
