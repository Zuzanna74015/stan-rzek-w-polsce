<?php
$title = "TOP 5 najwyższych stanów wód";
include __DIR__ . '/../includes/header.php';
?>

<main id="main-content" class="container py-5" role="main">
  <h1 class="text-center mb-4">💧 TOP 5 rzek z najwyższym poziomem</h1>

  <div id="top5-chart-container" class="text-center mb-4">
    <p id="chart-loading" class="text-muted">⏳ Ładowanie wykresu...</p>
    <canvas id="top5Chart"
            height="100"
            aria-label="Wykres przedstawiający najwyższe poziomy wód w rzekach"
            role="img"
            style="display:none;"></canvas>
  </div>

  <ul id="top5-details"
      class="list-group mt-4"
      aria-live="polite"
      aria-label="Lista TOP 5 rzek z najwyższym poziomem">
    <li class="list-group-item text-muted">⏳ Ładowanie danych o rzekach...</li>
  </ul>
</main>

<?php include __DIR__ . '/../includes/footer.php'; ?>

<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script src="/nowe-rzeki-w-polsce/js/top5.js" defer></script>
