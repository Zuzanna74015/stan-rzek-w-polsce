<?php
$title = "Ostrzeżenia hydrologiczne";
include '../includes/header.php';

$data = @file_get_contents('https://danepubliczne.imgw.pl/api/alerts/hydro');
$alerts = json_decode($data, true);
?>

<main id="main-content" role="main" class="container py-5">
  <h2 class="mb-4 text-center">💧 Ostrzeżenia hydrologiczne</h2>

  <div class="text-center my-4">
    <label for="ostrzezenia-search" class="form-label visually-hidden">
      Wyszukiwarka ostrzeżeń hydrologicznych
    </label>
    <input type="text" id="ostrzezenia-search" class="form-control w-50 mx-auto" placeholder="Szukaj ostrzeżenia..."
      aria-describedby="search-status" aria-label="Szukaj ostrzeżenia po nazwie miejscowości lub województwa">
    <div id="search-status" class="visually-hidden" aria-live="polite" role="status"></div>
  </div>

  <div id="ostrzezenia-container" aria-label="Wyniki wyszukiwania ostrzeżeń" aria-live="polite">
  </div>

  <script src="/nowe-rzeki-w-polsce/js/search-ostrzezenia.js" defer></script>

  <?php if (empty($alerts)): ?>
    <p class="text-muted" role="status">Brak aktywnych ostrzeżeń hydrologicznych.</p>
  <?php else: ?>
    <div id="alerts-container" role="region" aria-live="polite" aria-label="Lista ostrzeżeń hydrologicznych">
      <?php foreach ($alerts as $alert): ?>
        <div class="alert alert-warning mb-3" role="alert">
          <h5><?= htmlspecialchars($alert['stacja']) ?></h5>
          <p>
            <strong>Rzeka:</strong> <?= htmlspecialchars($alert['rzeka']) ?><br>
            <strong>Województwo:</strong> <?= htmlspecialchars($alert['wojewodztwo']) ?><br>
            <strong>Stopień:</strong> <?= htmlspecialchars($alert['stopien']) ?><br>
            <strong>Rodzaj:</strong> <?= htmlspecialchars($alert['rodzaj']) ?>
          </p>
        </div>
      <?php endforeach; ?>
    </div>
  <?php endif; ?>
</main>

<?php include '../includes/footer.php'; ?>