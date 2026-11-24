# Cały dom — wnętrze 3D

Aktualizacja: 24.11.2026. Strona `wnetrze3d.html`, wejście **Cały dom 3D** w Projekcie Głównym oraz linki z widoku zewnętrznego i planera kuchni.

Model korzysta z bieżącego lokalnego zapisu E2 (`ogrodniki-rzut-v37:E2`). Przy jego braku lub nieprawidłowych danych pobiera publiczną bazę `wnetrze3d-baza.json`, generowaną z konstruktora przez `timeout 30s node tools/export_wnetrze3d.js`. Publiczna baza zawiera 12 etykiet pomieszczeń i 79 mebli/urządzeń. Obrys domu 17,824 × 10,624 m pozostaje bez zmian. Model nie obejmuje innych wariantów ani instalacji przestrzennych. Zmiana źródła nie nadpisuje lokalnego rzutu.

## Oglądanie i skala człowieka

- Obrót myszą lub jednym palcem, zoom kółkiem lub dwoma palcami; dwa palce, prawy przycisk albo Shift przesuwają kamerę. Przyciski całego domu, rzutu z góry, drugiej strony i przybliżania pomieszczeń.
- Dach i strop zdjęte. Przekrój ścian regulowany 0,60–2,80 m. Wyższe fragmenty otworów są przycinane razem ze ścianą; pełna wysokość mebli pozostaje. Osobna widoczność ścian, otworów, mebli, nazw pomieszczeń, ID oraz elementów referencyjnych (np. rozstawiona suszarka M89).
- „Dodaj ludzika” / „Przestaw ludzika”: następne kliknięcie lub stuknięcie wskazuje punkt na płaszczyźnie podłogi. Przeciągnięcie i gest dwóch palców nie ustawiają postaci. Widok z góry ułatwia wybór punktu zasłoniętego meblem.
- Mały plan zawsze pozwala wskazać pozycję, także bez WebGL. Alternatywą są pola X/Y rzutu w metrach, dla obsługi klawiaturą. Punkt musi być we wnętrzu obrysu. Wzrost 120–210 cm, kierunek 0–360°, przybliżenie postaci i usunięcie. Domyślny wzrost 175 cm jest ustawieniem widoku, nie daną inwestora.
- Kontrola pozycji: koło Ø44 cm kontra rzeczywiste części obrysów mebli, ściany i przerwy drzwiowe z rezerwą ościeżnic. Pozycja w kolizji pozostaje widoczna i dostaje ostrzeżenie. To pomoc do oglądania, nie kontrola dojścia ani dostępności; nie bada ruchu, łuków drzwi i frontów, stref obsługi lub wymaganych szerokości przejść. Obrysy mebli referencyjnych nie uczestniczą w ostrzeżeniach, podobnie jak w bazowej kontroli 2D. Ukrycie mebli nie wyłącza sprawdzenia pozycji.

## Wierność i uproszczenia

Współrzędne ścian, otworów, mebli i części narożnych pochodzą z danych liczbowych rzutu. Zachowano istniejące ID, obroty oraz obrys narożnika M76 3050 × 2200 mm. Nie zmieniono geometrii domu ani zaakceptowanych ograniczeń audytu. Rzeczywiste obrysy PAX narożnych są kształtem L. Stan rozłożonego stołu i hokerów pochodzi z zapisu E2; dodatkowe części stołu przedstawiają krzesła, nie powiększenie blatu. Nie dodano automatycznie nowych miejsc siedzących do korpusów źródłowych.

Bryły wyposażenia są uproszczone: kuchnia pokazuje źródłowe moduły, słupki i niskie blaty, zlew, płytę, piekarnik i lodówkę; pralnia urządzenia pod blatem, łazienki ceramikę, wannę i prysznic, pokoje sofy, łóżka, szafy i biurka. Nie jest to model konkretnego produktu ani pełny projekt stolarki. Wyposażenie wewnętrzne szaf oraz mechanizmy kuchni nadal planuje się w osobnym planerze kuchni. Ręczne zmiany w tym planerze nie są automatycznie synchronizowane z rzutem ani całym domem 3D.

Wysokości zapisane w danych są odczytywane (np. PAX 2364 mm, moduły kuchni 900/2340 mm). Pozostałe wysokości, faktury, kolory, fronty, nogi mebli, ceramika i sprzęty techniczne są umownymi bryłami do oceny skali. W panelu zaznaczenia wysokość bez danych jest opisana jako poglądowa. Modele urządzeń technicznych pozostają niewybrane, a ich schemat nie potwierdza zmieszczenia kompletnej instalacji i obsługi. Podłoga ma wspólne poglądowe wykończenie. Model nie zastępuje przekrojów, projektu wykonawczego, audytu przejść 2D ani analizy kolizji instalacji. Pełna wysokość wnętrza 2,80 m jest założeniem koncepcji.

## Zapis i dane

Własny klucz `ogrodniki-wnetrze3d-v1`, schema1: ustawienia i jeden ludzik. Odczyt geometrii jest niezależny; przycisk „Wczytaj aktualny rzut” odświeża źródło. JSON przenosi zwalidowaną, ograniczoną do geometrii kopię domu i widok; po imporcie ta kopia pozostaje źródłem do ponownego wczytania rzutu. PNG zapisuje bieżący model z ludzikiem i etykietami; przy braku WebGL działa plan 2D, ustawianie postaci, zapis JSON i eksport SVG. Zapisy E2, kuchni, działki i referencji nie są zmieniane. Nazwy są renderowane jako tekst, a w SVG escapowane. Eksport pomija notatki, instalacje, georeferencję i kontekst działki. Po wczytaniu NMT dodaje jego lokalny fragment i roboczą rzędną posadzki; taki plik pozostaje prywatny. [Panel terenu](teren3d-opis.md) jest wspólny dla wnętrza i bryły. Podłoga pozostaje pozioma na ±0,00; człowiek stoi na podłodze, a teren zmienia wysokość względem niej. Warstwa Teren jest niezależna od mebli. Działa lokalny Three.js 0.180.0 / MIT, bez CDN i wysyłania danych.

## Weryfikacja

`timeout 30s node tools/check_wnetrze3d.mjs`: porównanie wszystkich 79 obrysów z silnikiem edytora, obroty, części narożne, otwory, hokery i rozłożony stół, skala pozycji, walidacja, ponowny odczyt i prywatność.

`timeout 60s node tools/check_wnetrze3d_browser.js` oraz osobno `... mobile`: Chromium z WebGL, telefon 412 px i prawdziwe zdarzenia dotykowe, brak przypadkowej pozycji przy przeciąganiu, ustawienie postaci w wybranym punkcie podłogi i minimapy, wzrost, obrót, przekrój, pokoje, widoczność, JSON/PNG, przeładowanie, nieprawidłowy import, fallback SVG i niezmienność zapisów źródłowych. Emulacja telefonu nie zastępuje testu na fizycznym urządzeniu.
