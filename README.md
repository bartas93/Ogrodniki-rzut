# Ogrodniki — koncepcja domu

Edytor rzutu parterowego domu z kontrolą ustawienia mebli, przejść i statystykami bryły oraz dachu kopertowego.

- **Uruchomienie:** otwórz `edytor-rzutu.html` w przeglądarce (Chrome / Edge). Nie wymaga instalacji ani serwera.
- **Warianty:** lista „Wariant” na górze albo przycisk „▦ Warianty” (miniatury wszystkich naraz) — rzut z PDF (zmieniony), A–E oraz udoskonalenia E1–E4. Każdy wariant zapisuje się osobno w przeglądarce.
- **Domyślnie E2:** link bez parametru wariantu otwiera E2 z jego zapisanymi edycjami, także po wcześniejszym oglądaniu innego wariantu. Kolejne zmiany projektu dotyczą E2, chyba że wskażesz inaczej.
- **E2S — kuchnia na południu:** osobna kopia E2, odbita w osi północ–południe. Kuchnia ze spiżarnią jest na dole rzutu, salon na górze, wejście nadal od wschodu. Odbicie obejmuje cały dom; oryginalne E2 pozostaje bez zmian. Wybierz E2S z listy lub przez „▦ Warianty”.
- **R1 — mniejszy dom z wejściem od północy:** nowy układ z salonem i trzema pokojami, bez osobnego gabinetu. Obrys 15,174×9,824 m, 149,1 m² zabudowy — około 21% mniej niż E2. Zachowane dwie łazienki, pralnia, techniczne, spiżarnia i garderoba. [Opis R1](R1-koncepcja.md). Wybierz R1 z listy lub przez „▦ Warianty”; domyślny nadal E2.
- **Telefon (Android):** zoom dwoma palcami, przesuwanie jednym; przycisk „Podgląd” chroni rzut przed przypadkową edycją, „Panel” pokazuje szczegóły. **Miarka (ikona linijki):** stuknij punkt A i B — działa także w Podglądzie. W trakcie pomiaru możesz przesuwać i przybliżać rzut. Wynik, anulowanie punktu i czyszczenie pomiarów są dostępne na rzucie bez otwierania panelu.
- **Zapis i przenoszenie:** „Zapisz JSON” / „Wczytaj JSON”.
- **Wymagania projektowe:** `wymagania-projektowe.md` (pełne notatki inwestora są prywatne i nie trafiają do repozytorium).
- **Dla agentów (Codex / Claude):** `AGENTS.md`.

E2 uwzględnia poprawki z 24.10.2026: zabudowy i drzwi, łazienkę z wanną o szerokości 195 cm, walk-in przy salonie, wnękę 35 cm, biurka 140×70 cm, węższą kotłownię i okap 1 m. Pozostałe warianty zachowują dotychczasowy układ.

Druga seria poprawek E2: ściana warstwowa 41,2 cm (silikat 18 + EPS 20), jedno okno pralni, rzeczywiste moduły i narożniki PAX, wyposażenie kuchni i pralni, detale łazienek oraz większa sypialnia. [Zakres punktów 1–18 i uwagi wykonawcze](e2-wykonczenie.md). Szczegóły wybranego mebla lub wysokości okna są dostępne w panelu po kliknięciu elementu. Przy stole można włączyć widok 280 cm z 10 zajętymi krzesłami.

Kontrola bez przeglądarki: `python tools/check_js.py` oraz `node tools/check_variant.js E2`. Opcjonalnie `node tools/check_variant.js E2 podglad.svg` zapisuje podgląd rzutu. Każde polecenie kontrolne powinno zakończyć się w 30 sekund.

Kopia południowa: `node tools/check_variant.js E2S` oraz `node tools/check_e2_south.js`. Druga kontrola sprawdza odbicie mebli, ich stref, zawiasów drzwi i niezależność kopii od późniejszych zmian E2. Dodanie E2S zachowuje klucz zapisu v23 i istniejące edycje pozostałych wariantów.

R1: `node tools/check_variant.js R1` oraz `node tools/check_r1.js`. Sprawdzane są również rozłożony stół 240 cm i 8 zajętych krzeseł. R1 ma osobny zapis w v23; dodanie go nie resetuje istniejących wariantów.

Po aktualizacji do wersji zapisu v23 edytor pokaże nowe układy domyślne. Starsze ręczne edycje można przywrócić przez „Wczytaj JSON”; wcześniejsze zapisy v21/v22 w przeglądarce nie są usuwane. Import starego JSON przywraca dawny układ, bez automatycznego nakładania nowych poprawek.


E2 — korekta 10.11.2026: narożnik dłuższym bokiem przy ścianie zachodniej, WC obok umywalki na północnej ścianie walk-in, sofa pokoju 3 przy ścianie wschodniej. Drugą sofę salonu obrócono do TV, aby zachować rozłączne obrysy spania. Przy dziesięciu osobach przy stole krzesło zajmuje 13% strefy dojścia sofy (obok wcześniejszej uwagi o wyspie). [Szczegóły i ograniczenia](e2-wykonczenie.md). Zapis v24 przenosi z v23 pozostałe edycje i warianty, aktualizując tylko pięć wskazanych obiektów E2; kopia v23 pozostaje w przeglądarce. Test: `node tools/check_e2_november.js`.


Aktualizacja 11.11.2026:

- **[R2](https://bartas93.github.io/Ogrodniki-rzut/?variant=R2)** — wejście blisko środka północnej elewacji, salon SW. **[R3](https://bartas93.github.io/Ogrodniki-rzut/?variant=R3)** — wejście przy narożniku NE, salon SE. Oba: trzy pokoje poza salonem, 149,07 m² zabudowy, niezależne konstruktory i zapisy. [Układy i ograniczenia](R2-R3-koncepcje.md).
- **Linki:** `?variant=R1`, `?variant=R2` itd. Zwykły link i nieznany wariant otwierają E2. Zmiana wariantu aktualizuje adres; Wstecz/Dalej działa bez utraty edycji. Przekierowanie zachowuje parametry i fragment adresu.
- **ID elementów:** przełącznik na górze, pełny identyfikator i kopiowanie w panelu. S = ściana, O = otwór, M = mebel/urządzenie, P = pomieszczenie, np. `E2-M75`. Wyposażenie wewnątrz zabudowy: `E2-M69-E1` (rzeczywisty numer sprawdzisz w panelu). „Znajdź ID” przyjmuje pełny identyfikator lub skrót, np. `M75`; pełny przełącza wariant, zaznacza i przybliża element. Przy oddaleniu część etykiet jest ukryta, aby się nie nakładały. Przybliż rzut, aby zobaczyć więcej oznaczeń. Widoczne ID trafiają do PNG także na telefonie.
- Zapis pozostaje w przeglądarce (v24), oddzielnie dla wariantów. Nie wdrożono zapisu w chmurze. Numery wyposażenia są zapisane wewnątrz obiektów i zachowywane w JSON.

Testy nowych funkcji: `timeout 30s node tools/check_r2_r3.js`, `timeout 30s node tools/check_variant.js R2`, `timeout 30s node tools/check_variant.js R3`. Test przeglądarkowy: `timeout 60s node tools/check_browser.js` (wymaga Playwright i Chromium; ścieżkę przeglądarki można wskazać przez `CHROMIUM_PATH`).

Test miarki dotykowej: `timeout 60s node tools/check_mobile_measure.js` — dwa stuknięcia, przyciąganie do krawędzi, pan/pinch, tolerancja drżenia palca, anulowanie, czyszczenie i brak zmian geometrii.

E2 — najnowsze ustawienie salonu: **M75 obrócona poprzecznie nad narożnikiem M76**, tworząc U otwarte na TV na wschodzie. Pozostają rozłączne pola spania, dojście do sofy od wschodu oraz HST. Zapis v25 przenosi v24, zmieniając tylko ustawienie/strefy/opis M75; pozostałe edycje i warianty zostają. [Aktualny opis i odstępy](e2-wykonczenie.md#aktualizacja-e2-m75--u-w-salonie-11112026).

E2 — kolejna aktualizacja według ID: usunięte O3, przesunięta w górę M101, narożne ustawienia M143 oraz M117/M116, odwrócone O52 i obrócony M74. Stół dla 10 osób ma teraz ciasny układ 5+5 przy długich bokach. [Położenia i ograniczenia](wymagania-projektowe.md#15-e2--korekty-według-id-11112026). Zapis v26 zachowuje wcześniejsze edycje poza wskazanymi elementami i kopie starych zapisów. Test: `timeout 30s node tools/check_e2_room_updates.js`.

E2 — wyspa **M73: 170×90 cm**, odstęp od zabudowy na północy i zachodzie **130 cm**; od wschodu 90 cm, przy rozłożonym stole 75 cm. V28 przenosi pozostałe edycje bez zmian. Test: `timeout 30s node tools/check_e2_island.js`.

E2 — **ergonomia kuchni:** lodówka bliżej zlewu, płyta przesunięta 30 cm w lewo; trójkąt 1,22 / 1,60 / 2,69 m, blat przygotowania 90 cm oraz osobna wyspa. Dostępny słupek zapasów ma 40 cm, obok niski ślepy narożnik 60 cm. [Schemat, pomiary i ograniczenia](kuchnia-E2-ergonomia.md). V30 aktualizuje z v29 wyłącznie wyposażenie/opisy M71/M72, zachowując pozostałe edycje i starsze kopie. Test: `timeout 30s node tools/check_e2_kitchen.js`.

E2 — **M76 ma 305×220 cm** według korekty użytkownika. Dłuższy bok zachodni, krótszy południowy; M75 przesunięta w prawo i w górę, aby zachować U bez kolizji korpusów. HST dostępne. Funkcja spania nowego narożnika niepotwierdzona; konserwatywna rezerwa koliduje ze spaniem M75 przy jednoczesnym rozłożeniu. [Aktualne odstępy i uwagi](wymagania-projektowe.md#20-e2--rzeczywisty-gabaryt-narożnika-m76). V31 aktualizuje z v30 tylko M76/M75, zachowuje pozostałe edycje. Test: `timeout 30s node tools/check_e2_corner.js`.
