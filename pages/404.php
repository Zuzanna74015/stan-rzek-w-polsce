<?php 
  $title = "Nie znaleziono strony";
  include '../includes/header.php'; 
?>

<main id="main-content" role="main" class="container text-center py-5">
  <h1 class="display-1 text-danger" aria-hidden="true">404</h1>
  <p class="lead" role="alert">
    Ups! Nie znaleziono strony, której szukasz. Upewnij się, że adres jest poprawny.
  </p>
  <a href="/nowe-rzeki-w-polsce/" class="btn btn-outline-primary mt-3" aria-label="Wróć do strony głównej">
    🔙 Wróć do strony głównej
  </a>
</main>

<?php include '../includes/footer.php'; ?>
