document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('cards-container');
  const input = document.getElementById('pogoda-search');

  if (!container) return;

  let liveRegion = document.getElementById('search-status');
  if (!liveRegion && input) {
    liveRegion = document.createElement('div');
    liveRegion.id = 'search-status';
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.classList.add('visually-hidden');
    input.insertAdjacentElement('afterend', liveRegion);
  }

  container.setAttribute('aria-live', 'polite');
  container.setAttribute('aria-label', 'Lista kart pogodowych');
  container.innerHTML = '<p class="text-muted">⏳ Ładowanie danych...</p>';

  fetch('https://danepubliczne.imgw.pl/api/data/synop/')
    .then(res => res.json())
    .then(data => {
      container.innerHTML = '';
      data.forEach(station => {
        const cardWrapper = document.createElement('div');
        cardWrapper.className = 'col-12 col-sm-6 col-lg-4 mb-4';

        const temp = station.temperatura ?? 'brak';
        const wind = station.predkosc_wiatru ?? 'brak';
        const humidity = station.wilgotnosc_wzgledna ?? 'brak';
        const pressure = station.cisnienie ?? 'brak';

        cardWrapper.innerHTML = `
          <div class="card shadow-sm h-100"
               role="region"
               aria-label="Stacja ${station.stacja}, temperatura: ${temp}°C, wiatr: ${wind} km/h, wilgotność: ${humidity}%, ciśnienie: ${pressure} hPa">
            <div class="card-body">
              <h5 class="card-title">${station.stacja}</h5>
              <p class="card-text">
                🌡️ Temperatura: ${temp}°C<br>
                💨 Wiatr: ${wind} km/h<br>
                💧 Wilgotność: ${humidity} %<br>
                ☁️ Ciśnienie: ${pressure} hPa
              </p>
            </div>
          </div>
        `;
        container.appendChild(cardWrapper);
      });

      if (input) {
        input.addEventListener('input', () => {
          const query = normalize(input.value);
          const cards = container.querySelectorAll('.card');

          let visibleCount = 0;

          cards.forEach(card => {
            const text = normalize(card.textContent);
            const match = text.includes(query);
            card.parentElement.style.display = match ? '' : 'none';
            if (match) visibleCount++;
          });

          if (!liveRegion) return;
          if (query.length === 0) {
            liveRegion.textContent = '';
          } else if (visibleCount > 0) {
            liveRegion.textContent = `Znaleziono ${visibleCount} wynik${plural(visibleCount)} pasujących do „${query}”.`;
          } else {
            liveRegion.textContent = `Brak wyników pasujących do „${query}”.`;
          }
        });
      }
    })
    .catch(err => {
      container.innerHTML = '';
      const msg = document.createElement('p');
      msg.className = 'text-danger';
      msg.setAttribute('role', 'alert');
      msg.textContent = '❌ Błąd ładowania danych pogodowych.';
      container.appendChild(msg);
      console.error('Błąd ładowania danych pogodowych:', err);
    });

  function normalize(str) {
    return str.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "").trim();
  }

  function plural(n) {
    if (n === 1) return '';
    if (n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)) return 'y';
    return 'ów';
  }
});
