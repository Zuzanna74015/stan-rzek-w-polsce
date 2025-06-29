**Raport techniczny realizacji projektu wdrożeniowego: "Stan rzek w Polsce"**

---

**Autorzy:** Daria Sech, Zuzanna Maciejewska
**Czas realizacji:** maj–czerwiec 2025
**Repozytorium:** [github.com/Zuzanna74015/stan-rzek-w-polsce](https://github.com/Zuzanna74015/stan-rzek-w-polsce),
[github.com/Daria76179/stan-rzek-w-polsce](https://github.com/Daria76179/stan-rzek-w-polsce)

---

## Wstęp

Projekt "Stan rzek w Polsce" to responsywna aplikacja webowa integrująca dane hydrologiczne i meteorologiczne pochodzące z oficjalnego API Instytutu Meteorologii i Gospodarki Wodnej (IMGW). Głównym celem było dostarczenie użytkownikowi przejrzystego i dostępnego narzędzia do monitorowania poziomu wód oraz ostrzeżeń pogodowych w podziale na województwa i lokalizacje stacji. Projekt oparty został na technologiach front-endowych (HTML, CSS, JS, Bootstrap) oraz backendzie PHP z obsługą serwera Apache.

System zrealizowano z myślą o przyszłym wdrożeniu, pełnej obsłudze błędów, elastycznej rozbudowie oraz transparentnej strukturze kodu z wersjonowaniem na GitHubie.

---

## 1. Cel i założenia projektu

Projekt zakładał stworzenie w pełni funkcjonalnej, dynamicznej aplikacji webowej do wizualizacji danych hydrologicznych i meteorologicznych pochodzących z publicznego API IMGW. Główne cele:

* Integracja z otwartymi danymi rządowymi (IMGW)
* Dynamiczne przetwarzanie i prezentacja danych
* Responsywność i estetyczna prezentacja front-endu
* Filtrowanie, wyszukiwanie i paginacja wyników
* Wersjonowanie kodu oraz dokumentacja projektu na GitHub

## 2. Zakres funkcjonalny systemu

* Pobieranie danych z 4 różnych API IMGW (hydro, meteo, warningshydro, warningsmeteo)
* Renderowanie kart z dynamicznym tłem (kolor w zależności od poziomu wody)
* Filtrowanie danych według województwa i wyszukiwanie po nazwie stacji
* Paginacja wyników z licznikiem aktualnie wyświetlanych stacji
* Routing bez rozszerzenia `.php` dzięki `.htaccess`
* Dedykowana strona błędu 404
* Rozdzielenie nagłówków i stopki w osobnych plikach PHP (`header.php`, `footer.php`)
* Obsługa błędów API i komunikaty dla użytkownika

## 3. Technologie i narzędzia

| Obszar          | Technologia / Narzędzie         |
| --------------- | ------------------------------- |
| Frontend        | HTML5, CSS3, Bootstrap 5, Emoji |
| Backend         | PHP 8.2, Apache (XAMPP)         |
| JS / API        | JavaScript (ES6+), Fetch API    |
| Edytor          | Visual Studio Code              |
| Kontrola wersji | Git, GitHub, Git Bash           |

## 4. Struktura katalogów i plików

```
stan-rzek-w-polsce/
├── index.php
├── .htaccess
├── js/
│   └── main.js
├── style/
│   └── style.css
├── includes/
│   ├── header.php
│   └── footer.php
├── pages/
│   ├── stacje.php
│   ├── ostrzezenia.php
│   ├── ostrzezenia_meteo.php
│   ├── pogoda.php
│   └── 404.php
└── README.md
```

## 5. Źródła danych API IMGW

* `https://danepubliczne.imgw.pl/api/data/hydro/`
* `https://danepubliczne.imgw.pl/api/data/meteo/`
* `https://danepubliczne.imgw.pl/api/data/warningshydro`
* `https://danepubliczne.imgw.pl/api/data/warningsmeteo`

Dane są ładowane dynamicznie i przetwarzane w JS przy każdorazowym przeładowaniu strony.

## 6. Logika działania aplikacji

* Pobieranie danych za pomocą `fetch()`
* Dynamiczne tworzenie kart HTML i ich stylizacja
* Filtrowanie i paginacja danych w `main.js`
* Komunikaty w przypadku błędów API
* Oddzielenie renderowania danych, nawigacji i obsługi błędów

## 7. Routing i .htaccess

* Usunięcie rozszerzeń `.php` z adresów
* Obsługa błędnych ścieżek przez przekierowanie do `pages/404.php`
* Dodatkowe reguły przyjaznych aliasów (np. `/home`, `/stacje` itp.)

## 8. Obsługa błędów

* Wyświetlanie informacji o braku danych
* Komunikaty o błędzie API (np. brak odpowiedzi)
* Stylizowana strona 404 z linkiem do strony głównej
* Blokada paginacji, gdy wyników jest mniej niż 30

## 9. Stylizacja i wygląd

* Czysty, jasny motyw z ikonami emoji
* Kolorowanie kart w zależności od poziomu wody
* Responsive layout oparty na Bootstrap
* Intuicyjna nawigacja przy użyciu przycisków `btn-outline-*`

## 10. Strona główna i UX

* Duże przyciski: 🌊 Stacje, 🌩 Pogoda, ⚠ Ostrzeżenia, ℹ O projekcie
* Przejrzyste tytuły i czytelne nagłówki
* Nawigacja dostosowana do urządzeń mobilnych

## 11. Modułowość PHP

* Nagłówek i stopka w osobnych plikach (`includes/`)
* Każda podstrona (np. `ostrzezenia.php`) ładuje te komponenty przez `include`

## 12. Pagina i licznik stacji

* Wyniki wyświetlane po 30 na stronę
* Dynamiczny licznik „Pokazano X z Y stacji”
* Paginacja dostępna tylko przy odpowiednio dużych zbiorach

## 13. Testowanie funkcjonalności

| Test | Opis                            |
| ---- | ------------------------------- |
| TC1  | Ładowanie danych z API – ✔︎     |
| TC2  | Filtrowanie i wyszukiwanie – ✔︎ |
| TC3  | Paginacja i licznik – ✔︎        |
| TC4  | Obsługa błędu 404 – ✔︎          |
| TC5  | Obsługa błędu fetch – ✔︎        |
| TC6  | Routing bez `.php` – ✔︎         |

## 14. Problemy napotkane i rozwiązania

| Problem                          | Rozwiązanie                                         |
| -------------------------------- | --------------------------------------------------- |
| `.htaccess` ignorowany przez Git | `git rm --cached` i ponowne dodanie                 |
| Branch main vs master            | Usunięcie `main`, praca na `master`                 |
| Strona 404 nie działa            | Dopisanie pełnych reguł `.htaccess` i test w XAMPP  |
| Brak paginacji                   | Dodano funkcję `renderPagination()`                 |
| Złe formatowanie nazw            | Funkcja `capitalizeEach()` poprawiająca tytuły kart |

## 15. README.md

* Cel projektu, technologie, autor
* Lokalna instalacja (XAMPP + Apache)
* Link do repozytorium i danych API

## 16. Możliwości rozwoju

* Historia danych hydrologicznych (archiwum)
* Interaktywna mapa stacji z Leaflet.js
* Tryb ciemny
* Eksport danych do CSV
* Panel logowania + zapis ulubionych stacji

## 17. Efekty projektu

* Kompletny system do przeglądania danych z API IMGW
* Czytelny kod PHP/JS z komponentami Bootstrap
* Responsywność i dobra użyteczność
* Kompletna dokumentacja i historia wersji

## 18. Podsumowanie

Projekt zakończony sukcesem – wdrożono wszystkie założenia funkcjonalne. Aplikacja jest gotowa do przeniesienia na serwer produkcyjny lub dalszego rozwoju. Dokumentacja, struktura i kod zostały przygotowane zgodnie z najlepszymi praktykami.

**Data zakończenia prac: 28 czerwca 2025 r.**
