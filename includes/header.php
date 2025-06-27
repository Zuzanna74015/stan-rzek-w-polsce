<!DOCTYPE html>
<html lang="pl">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title><?= htmlspecialchars($title ?? 'Stan rzek w Polsce') ?></title>

  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
  <link rel="stylesheet" href="/nowe-rzeki-w-polsce/style/style.css">
  <link rel="icon" type="image/png" href="https://cdn-icons-png.flaticon.com/512/414/414974.png">
</head>

<body class="bg-light text-dark">

  <a href="#main-content" class="skip-link visually-hidden-focusable">
    Przejdź do treści głównej
  </a>

  <?php include 'sidebar.php'; ?>

  <button id="sidebarToggle"
          class="sidebar-burger"
          aria-label="Przełącz menu nawigacji"
          aria-controls="sidebar"
          aria-expanded="false"
          role="button"
          type="button">
    ☰
  </button>
  
  <a href="/nowe-rzeki-w-polsce/pages/mapa.php"
     class="btn btn-warning position-fixed top-0 end-0 m-3"
     style="z-index:2000"
     aria-label="Zobacz mapę stacji hydrologicznych – niespodzianka">
    🎁 Niespodzianka
  </a>
