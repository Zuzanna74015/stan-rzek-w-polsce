<footer class="text-center text-muted py-4 mt-5 border-top" role="contentinfo">
  <small>&copy; <?= date('Y') ?> Projekt hydrologiczny na podstawie danych IMGW. Wszelkie prawa zastrzeżone.</small>
</footer>

<div class="modal fade" id="geoModal" tabindex="-1" role="dialog" aria-modal="true"
     aria-labelledby="geoModalLabel" aria-describedby="geoModalDesc" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="geoModalLabel">📍 Lokalizacja potrzebna</h5>
      </div>
      <div class="modal-body" id="geoModalDesc">
        Czy możemy pobrać Twoją lokalizację, żeby pokazać Ci lokalną pogodę? 🌦️
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="declineGeo">
          Nie, dzięki
        </button>
        <button type="button" class="btn btn-primary" id="acceptGeo">
          Tak, pokaż pogodę
        </button>
      </div>
    </div>
  </div>
</div>

<div id="export-status" class="visually-hidden" aria-live="polite" role="status"></div>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

<script src="/nowe-rzeki-w-polsce/js/sidebar.js" defer></script>

<?php
$current = basename($_SERVER['PHP_SELF']);
if ($current === 'stacje.php') {
    echo '<script src="/nowe-rzeki-w-polsce/js/main.js" defer></script>';
} elseif ($current === 'pogoda.php') {
    echo '<script src="/nowe-rzeki-w-polsce/js/pogoda.js" defer></script>';
} elseif ($current === 'ostrzezenia.php') {
    echo '<script src="/nowe-rzeki-w-polsce/js/ostrzezenia-hydro.js" defer></script>';
} elseif ($current === 'ostrzezenia_meteo.php') {
    echo '<script src="/nowe-rzeki-w-polsce/js/ostrzezenia-meteo.js" defer></script>';
}
?>

<script src="https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js"></script>
<script src="/nowe-rzeki-w-polsce/js/export.js" defer></script>

<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
<script src="/nowe-rzeki-w-polsce/js/modal-weather.js" defer></script>

</body>
</html>
