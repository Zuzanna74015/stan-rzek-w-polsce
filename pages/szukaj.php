<?php
$title = "Wyniki wyszukiwania";
include '../includes/header.php';

$q = $_GET['q'] ?? '';
?>

<main id="main-content" role="main" class="container py-5">
  <h2 class="mb-4">🔎 Wyniki dla: <strong><?= htmlspecialchars($q) ?></strong></h2>

  <div id="search-results"
       aria-live="polite"
       aria-atomic="true"
       aria-label="Wyniki wyszukiwania">
    <p>⏳ Trwa wyszukiwanie danych...</p>
  </div>
</main>

<?php include '../includes/footer.php'; ?>
<script src="/nowe-rzeki-w-polsce/js/search.js" defer></script>
