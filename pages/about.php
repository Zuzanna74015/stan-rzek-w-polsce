<?php 
  $title = "O projekcie";
  include '../includes/header.php'; 
?>

<main id="main-content" role="main" class="container py-5">
  <h1 class="mb-4 text-center display-5">📘 O projekcie</h1>

  <p class="lead">
    Ten projekt to interfejs prezentujący aktualne dane hydrologiczne i meteorologiczne pochodzące z oficjalnego API IMGW.
    Dane są prezentowane w formie czytelnych kart, z możliwością filtrowania i przeglądania ostrzeżeń pogodowych.
  </p>

  <ul class="mt-4">
    <li>
      Źródło danych:
      <a href="https://danepubliczne.imgw.pl/api/"
         target="_blank"
         rel="noopener noreferrer"
         aria-label="Oficjalne API danych IMGW – otwiera się w nowej karcie">
        danepubliczne.imgw.pl
      </a>
    </li>
    <li>Technologie: HTML, CSS (Bootstrap), JavaScript, PHP</li>
    <li>Cel: Praktyczne wdrożenie front-endu z użyciem danych z API oraz wersjonowaniem w GitHub</li>
  </ul>
</main>

<?php include '../includes/footer.php'; ?>
