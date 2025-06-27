<?php
$title = "Dane pogodowe";
include '../includes/header.php';
?>

<main id="main-content" role="main" class="container py-5">
  <h1 class="mb-4 text-center">☀️ Pogoda</h1>

  <div class="text-center my-4">
    <label for="pogoda-search" class="form-label visually-hidden">
      Wyszukiwarka stacji pogodowej
    </label>
    <input type="text"
           id="pogoda-search"
           class="form-control w-50 mx-auto"
           placeholder="Szukaj stacji pogodowej..."
           aria-describedby="search-status"
           aria-label="Szukaj stacji pogodowej po nazwie lub lokalizacji">
    <div id="search-status" class="visually-hidden" aria-live="polite" role="status"></div>
  </div>

  <div id="pogoda-container" aria-live="polite" aria-label="Wyniki filtrowania stacji pogodowych">
  </div>

  <script src="/nowe-rzeki-w-polsce/js/search-pogoda.js" defer></script>

  <div id="cards-container"
       class="row g-4 justify-content-center"
       aria-live="polite"
       aria-label="Lista kart pogodowych">
    <p>Ładowanie danych...</p>
  </div>

  <div id="pagination" class="text-center mt-4" role="navigation" aria-label="Paginacja">
    <button id="prevPage"
            class="btn btn-outline-secondary me-2"
            type="button"
            aria-label="Poprzednia strona">
      ⬅️ Poprzednia
    </button>
    <span id="pageInfo" class="mx-2" aria-live="polite" role="status"></span>
    <button id="nextPage"
            class="btn btn-outline-secondary"
            type="button"
            aria-label="Następna strona">
      Następna ➡️
    </button>
  </div>

  <div class="text-center mt-5">
    <a href="/nowe-rzeki-w-polsce/" class="btn btn-link" aria-label="Powrót na stronę główną">⬅️ Wróć</a>
  </div>
</main>

<script src="../js/pogoda.js" defer></script>

<?php include '../includes/footer.php'; ?>
