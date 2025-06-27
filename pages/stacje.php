<?php
$title = "Wszystkie stacje hydrologiczne";
include __DIR__ . '/../includes/header.php';
?>

<main id="main-content" class="container py-5" role="main">
  <h1 class="mb-4 text-center">💧 Wszystkie stacje hydrologiczne</h1>

  <div class="row g-3 align-items-end mb-4">
    <div class="col-md-4">
      <label for="szukaj" class="form-label">🔍 Szukaj stacji:</label>
      <input type="text" id="szukaj" class="form-control" placeholder="np. Warszawa"
        aria-label="Szukaj stacji hydrologicznej po nazwie">
    </div>

    <div class="col-md-5">
      <label for="wojewodztwo" class="form-label">🌍 Województwo:</label>
      <select id="wojewodztwo" class="form-select" aria-label="Filtruj stacje według województwa">
        <option value="">-- Wszystkie województwa --</option>
        <option value="dolnoslaskie">Dolnośląskie</option>
        <option value="kujawsko-pomorskie">Kujawsko-Pomorskie</option>
        <option value="lubelskie">Lubelskie</option>
        <option value="lubuskie">Lubuskie</option>
        <option value="lodzkie">Łódzkie</option>
        <option value="malopolskie">Małopolskie</option>
        <option value="mazowieckie">Mazowieckie</option>
        <option value="opolskie">Opolskie</option>
        <option value="podkarpackie">Podkarpackie</option>
        <option value="podlaskie">Podlaskie</option>
        <option value="pomorskie">Pomorskie</option>
        <option value="slaskie">Śląskie</option>
        <option value="swietokrzyskie">Świętokrzyskie</option>
        <option value="warminsko-mazurskie">Warmińsko-Mazurskie</option>
        <option value="wielkopolskie">Wielkopolskie</option>
        <option value="zachodniopomorskie">Zachodniopomorskie</option>
      </select>
    </div>

    <div class="col-md-3 text-end">
      <label class="form-label d-none d-md-block">&nbsp;</label>
      <button type="button" class="btn btn-outline-primary" onclick="eksportujXLSX()"
        aria-label="Eksportuj dane stacji do pliku Excel">
        📥 Eksport do Excel
      </button>
    </div>
  </div>

  <div id="station-count" class="text-muted mb-3 fw-semibold" aria-live="polite" aria-atomic="true">
  </div>

  <div id="cards-container" class="row g-4 justify-content-center" aria-live="polite"
    aria-label="Lista kart stacji hydrologicznych">
    <p>Ładowanie danych...</p>
  </div>

  <div id="pagination" class="text-center mt-4" role="navigation" aria-label="Paginacja wyników">
    <button id="prevPage" class="btn btn-outline-secondary me-2" type="button" aria-label="Poprzednia strona">
      ⬅️ Poprzednia
    </button>
    <span id="pageInfo" class="mx-2" aria-live="polite" role="status"></span>
    <button id="nextPage" class="btn btn-outline-secondary" type="button" aria-label="Następna strona">
      Następna ➡️
    </button>
  </div>

  <div class="text-center mt-5">
    <a href="/nowe-rzeki-w-polsce/" class="btn btn-link" aria-label="Powrót na stronę główną">⬅️ Wróć na stronę
      główną</a>
  </div>
</main>

<?php include __DIR__ . '/../includes/footer.php'; ?>