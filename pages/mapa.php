<?php
$title = "Mapa stacji hydrologicznych";
include __DIR__ . '/../includes/header.php';
?>

<main id="main-content" role="main" class="container-fluid p-0">
  <div id="map" style="height:100vh;" role="application" aria-label="Interaktywna mapa stacji hydrologicznych">
  </div>
</main>

<?php include __DIR__ . '/../includes/footer.php'; ?>

<link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />
<script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
<script src="/nowe-rzeki-w-polsce/js/mapa.js" defer></script>