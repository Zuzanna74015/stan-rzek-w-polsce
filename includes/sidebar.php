<nav id="sidebar" class="text-white overflow-hidden" role="navigation" aria-label="Menu boczne">

  <div class="scroll-area">
    <div class="sidebar-header px-4 py-2">
      <h3 class="mt-3">🌤️ Pogodowy Panel</h3>
    </div>
    <hr>

    <ul class="list-unstyled px-3 d-flex flex-column gap-3">

      <li>
        <a href="/nowe-rzeki-w-polsce/home" class="d-flex align-items-center sidebar-link" aria-label="Strona główna">
          <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
            stroke="currentColor" width="20" height="20">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M3 10l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
          </svg>
          <span class="ms-2">Strona główna</span>
        </a>
      </li>

      <li>
        <a href="/nowe-rzeki-w-polsce/pages/stacje" class="d-flex align-items-center sidebar-link"
          aria-label="Stacje pomiarowe">
          <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
            stroke="currentColor" width="20" height="20">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M12 11c1.104 0 2-.896 2-2s-.896-2-2-2-2 .896-2 2 .896 2 2 2z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M12 22s8-4.5 8-10a8 8 0 10-16 0c0 5.5 8 10 8 10z" />
          </svg>
          <span class="ms-2">Stacje pomiarowe</span>
        </a>
      </li>

      <li>
        <a href="/nowe-rzeki-w-polsce/pages/top5" class="d-flex align-items-center sidebar-link"
          aria-label="Ranking Top 5">
          <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
            stroke="currentColor" width="20" height="20">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M13 16h-1v-4h-1m1-4h.01M12 20a8 8 0 100-16 8 8 0 000 16z" />
          </svg>
          <span class="ms-2">Top-ki</span>
        </a>
      </li>

      <li>
        <a href="/nowe-rzeki-w-polsce/pages/ostrzezenia" class="d-flex align-items-center sidebar-link"
          aria-label="Ostrzeżenia hydrologiczne">
          <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
            stroke="currentColor" width="20" height="20">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M10.29 3.86L1.82 18a1 1 0 00.86 1.5h18.64a1 1 0 00.86-1.5L13.71 3.86a1 1 0 00-1.72 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v4m0 4h.01" />
          </svg>
          <span class="ms-2">Ostrzeżenia hydro</span>
        </a>
      </li>

      <li>
        <a href="/nowe-rzeki-w-polsce/pages/ostrzezenia_meteo" class="d-flex align-items-center sidebar-link"
          aria-label="Ostrzeżenia meteorologiczne">
          <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
            stroke="currentColor" width="20" height="20">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M3 15a4 4 0 014-4h1a5 5 0 019.9-1.5A4 4 0 0120 15H3z" />
          </svg>
          <span class="ms-2">Ostrzeżenia meteo</span>
        </a>
      </li>

      <li>
        <a href="/nowe-rzeki-w-polsce/pages/pogoda" class="d-flex align-items-center sidebar-link" aria-label="Pogoda">
          <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
            stroke="currentColor" width="20" height="20">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M12 3v1m0 16v1m8.66-8.66l-.707.707M4.05 4.05l.707.707M21 12h1M2 12H1m16.95 4.95l-.707.707M4.05 19.95l.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
          </svg>
          <span class="ms-2">Pogoda</span>
        </a>
      </li>

      <li>
        <a href="/nowe-rzeki-w-polsce/pages/about" class="d-flex align-items-center sidebar-link"
          aria-label="O projekcie">
          <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
            stroke="currentColor" width="20" height="20">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M13 16h-1v-4h-1m1-4h.01M12 20a8 8 0 100-16 8 8 0 000 16z" />
          </svg>
          <span class="ms-2">O projekcie</span>
        </a>
      </li>

    </ul>

    <hr class="text-white">

    <div id="local-weather" class="bg-white p-3 rounded shadow-sm border border-primary-subtle"
      aria-label="Pogoda lokalna" role="region">
      <div class="d-flex align-items-center">
        <div id="weather-icon" class="me-3 fs-3" aria-hidden="true">🌤️</div>
        <div>
          <div class="fw-bold text-primary-emphasis">Twoja pogoda:</div>
          <div id="weather-data" class="small text-muted" aria-live="polite" role="status">
            ⏳ Czekam na lokalizację...
          </div>
        </div>
      </div>
    </div>

    <div class="px-3 pb-4 text-center">
      <button id="resetLocation" class="btn btn-sm btn-outline-light" type="button"
        aria-label="Zmień ustawienia lokalizacji pogodowej">
        🔄 Zmień decyzję pogodową
      </button>
    </div>

    <hr>

    <div class="px-3 pb-4">
      <div class="bg-light text-dark p-3 rounded">
        <h6 class="text-dark"><strong>Legenda:</strong></h6>
        <ul class="list-unstyled small">
          <li><span class="badge bg-danger">Czerwony</span> – Stan wysoki (&gt; 300 cm)</li>
          <li><span class="badge bg-warning text-dark">Żółty</span> – Stan średni (101–300 cm)</li>
          <li><span class="badge bg-success">Zielony</span> – Stan niski (≤ 100 cm)</li>
          <li><span class="badge bg-light border text-dark">Biały</span> – Brak danych</li>
        </ul>
      </div>
    </div>
  </div>
</nav>