window.allData = [];
window.filteredData = [];
let currentPage = 1;
const resultsPerPage = 30;

document.addEventListener('DOMContentLoaded', () => {
  function capitalize(text) {
    if (!text) return 'brak';
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  function normalizeText(str) {
    return String(str || '')
      .toLowerCase()
      .trim()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\s+/g, ' ');
  }

  function renderData(data) {
    const container = document.getElementById('cards-container');
    if (!container) {
      console.warn('Brak #cards-container w tym widoku — renderData przerwane.');
      return;
    }
    container.innerHTML = '';

    data.forEach(station => {
      const trendIcons = { '1': '📈 rośnie', '-1': '📉 spada', '0': '➡️ stabilnie' };
      const trend = trendIcons[station.tendencja] || 'brak danych';

      const stan = parseInt(station.stan_wody);
      let bgColor = 'bg-light';
      if (!isNaN(stan)) {
        if (stan > 300) bgColor = 'bg-danger text-white';
        else if (stan > 100) bgColor = 'bg-warning';
        else bgColor = 'bg-success text-white';
      }

      const card = document.createElement('div');
      card.className = 'col-12 col-sm-6 col-lg-4 mb-4';
      card.innerHTML = `
        <div class="card shadow-sm h-100 ${bgColor}" role="region" aria-label="Stacja ${station.stacja}, rzeka ${station.rzeka}, stan wody ${station.stan_wody || 'brak'} centymetrów">
          <div class="card-body">
            <h5 class="card-title text-capitalize">${station.stacja}</h5>
            <h6 class="card-subtitle mb-2 text-muted">${station.rzeka}</h6>
            <p class="card-text">
              <span class="fw-bold">🌍 Województwo:</span> ${capitalize(station.wojewodztwo)}<br>
              <span class="fw-bold">💧 Poziom wody:</span> ${station.stan_wody || 'brak'} cm<br>
              <span class="fw-bold">⏱️ Pomiar:</span> ${station.stan_wody_data_pomiaru || 'brak'}<br>
              <span class="fw-bold">📊 Tendencja:</span> ${trend}<br>
              <span class="fw-bold">☔ Opad:</span> ${station.opad || 'brak'} mm
            </p>
          </div>
        </div>
      `;
      container.appendChild(card);
    });
  }

  function renderPagination(data) {
    const totalPages = Math.ceil(data.length / resultsPerPage);
    const start = (currentPage - 1) * resultsPerPage;
    const pageData = data.slice(start, start + resultsPerPage);

    renderData(pageData);

    const licznik = document.getElementById('station-count');
    if (licznik) {
      licznik.textContent = `Pokazano ${pageData.length} z ${data.length} stacji`;
      licznik.setAttribute('aria-live', 'polite');
      licznik.setAttribute('aria-atomic', 'true');
    }

    const pagination = document.getElementById('pagination');
    if (pagination) {
      pagination.style.display = data.length <= resultsPerPage ? 'none' : 'block';
    }

    const pageInfo = document.getElementById('pageInfo');
    const prevBtn = document.getElementById('prevPage');
    const nextBtn = document.getElementById('nextPage');

    if (pageInfo) pageInfo.textContent = `Strona ${currentPage} z ${totalPages}`;
    if (prevBtn) prevBtn.disabled = currentPage === 1;
    if (nextBtn) nextBtn.disabled = currentPage === totalPages;

    prevBtn?.addEventListener('click', () => {
      if (currentPage > 1) {
        currentPage--;
        renderPagination(data);
      }
    });

    nextBtn?.addEventListener('click', () => {
      if (currentPage < totalPages) {
        currentPage++;
        renderPagination(data);
      }
    });
  }

  fetch('https://danepubliczne.imgw.pl/api/data/hydro/')
    .then(res => res.json())
    .then(data => {
      window.allData = data;
      window.filteredData = data;
      renderPagination(data);

      const wojSelect = document.getElementById('wojewodztwo');
      const searchInp = document.getElementById('szukaj');

      function filterAndRender() {
        const selected = normalizeText(wojSelect?.value || '');
        const query = normalizeText(searchInp?.value || '');

        const filtered = window.allData.filter(st => {
          const combined = normalizeText([
            st.stacja, st.rzeka, st.wojewodztwo,
            st.stan_wody, st.opad,
            { '1': 'rośnie', '-1': 'spada', '0': 'stabilnie' }[st.tendencja] || ''
          ].join(' '));

          const region = normalizeText(st.wojewodztwo || '');
          return combined.includes(query) && (!selected || region === selected);
        });

        currentPage = 1;
        window.filteredData = filtered;
        renderPagination(filtered);
      }

      wojSelect?.addEventListener('change', filterAndRender);
      searchInp?.addEventListener('input', filterAndRender);
    })
    .catch(error => {
      const container = document.getElementById('cards-container');
      if (container) {
        const errorEl = document.createElement('p');
        errorEl.className = 'text-danger';
        errorEl.setAttribute('role', 'alert');
        errorEl.textContent = 'Błąd ładowania danych.';
        container.innerHTML = '';
        container.appendChild(errorEl);
      }
      console.error(error);
    });
});
