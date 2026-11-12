# Projekt Główny — planer kuchni 3D

[Otwórz planer](https://bartas93.github.io/Ogrodniki-rzut/kuchnia3d.html) · [Rzut domu](https://bartas93.github.io/Ogrodniki-rzut/?variant=E2) · [Ergonomia kuchni](kuchnia-E2-ergonomia.md)

Stan koncepcji: 12.11.2026. Podstawa zakupowa: **Castorama, GoodHome Caraway**, z wyposażeniem Soto i Pebre tam, gdzie potwierdzono kartę produktu. Pozycje wymagające wykonania na wymiar lub dalszego doboru są opisane w panelu każdej szafki. To propozycja do zaplanowania, z cenami, kompletacją i dostępnością do sprawdzenia przed zamówieniem.

## Obsługa

Wybierz szafkę na modelu lub liście. „Otwórz i pokaż” otwiera moduł i ustawia kamerę przed nim; „Zobacz” przy przegrodzie pokazuje pojedynczą szufladę. Przeciąganie obraca widok; kółko lub dwa palce przybliżają. Na telefonie panele przełącza się przyciskami pod modelem. Dostępne są widoki z góry i z przodu, oznaczenia, wymiary, sprzęty codzienne oraz PNG aktualnego widoku.

W panelu można zmienić mechanizm, liczbę półek, przypisać przedmioty do przegród, zmienić ich ilości i dodać notatki. Zmiana mechanizmu zachowuje zawartość: przypisania do usuniętych przegród wymagają ponownego wskazania miejsca. Cofnij/Ponów obejmuje edycję wyposażenia. Lista wyposażenia pozwala zmienić zakładaną liczbę sztuk, gabaryty i dodać własne pozycje; pokazuje też, gdzie trafiły.

Zapis automatyczny działa **lokalnie w tej przeglądarce**, pod osobnym kluczem `ogrodniki-kuchnia3d-v1`. Nie modyfikuje zapisów rzutu, nie synchronizuje własnych przesunięć mebli z 2D i nie przesyła planu na serwer. Kopię oraz przenoszenie między urządzeniami zapewnia JSON. CSV zawiera wszystkie moduły z ich statusem, EAN i kartą produktu, przypisania oraz brakujące pozycje. Wydruk zawiera zestawienie modułów, zawartości, notatek i sprzętów. Bez WebGL pozostają lista, planowanie oraz zapis/odczyt, bez widoku i PNG 3D.

## Układ i proponowana zawartość

Model zachowuje współrzędne i gabaryty domyślnej kuchni: zachodni ciąg 220 cm z narożnikiem, północny 390 cm, wyspa **170×90 cm**, przejścia od północy i zachodu **130 cm**. Ciąg północny 390 cm plus ślepy narożnik 60 cm daje 450 cm blatu. Nie przesuwano zlewu, płyty, lodówki ani wyspy w rzucie 2D.

| Kod | Powiązanie z ID rzutu | Moduł / propozycja przechowywania |
|---|---|---|
| W1 | E2-M71-E2 | Piekarnik 60; naczynia żaroodporne i formy w dolnej szufladzie, schowek nad piekarnikiem |
| W2 | E2-M71-E1 | Lodówka 60; wentylacja i fronty do doboru do AGD |
| W3 | E2-M71-E3 | Słupek zapasów 40, półki na suche produkty; **do dopasowania** |
| C1 | E2-M71-E4 | Ślepy niski narożnik 60; nie liczymy go jako dostępnego schowka |
| N1 | E2-M72-E1 | 60: przybory, folie, deski do krojenia |
| N2 | E2-M72-E2 | 80: zlew i segregacja, środki i worki poza rezerwą syfonu |
| N3 | E2-M72-E3 | Wnęka zmywarki 60, bez dodatkowego korpusu |
| N4 | E2-M72-E4 | 30: cargo na przyprawy, oleje i sosy |
| N5 | E2-M72-E5 | 60: płyta, szuflady na patelnie, rezerwa wentylacji nad nimi |
| N6A / N6B | E2-M72-E6 | Podział prawego metra na 2×50: pojemniki / naczynia do serwowania |
| I1 | E2-M73 | 80 od kuchni: garnki i pokrywki |
| I2 | E2-M73 | 60 od kuchni: sztućce, talerze duże/głębokie/małe i miski |
| I3 | E2-M73 | 30 od kuchni: pionowe blachy |
| R1 / R2 / R3 | E2-M73 | 80/60/30 od jadalni, głębokość 30: szklanki/kieliszki, kubki/bidony, tekstylia; **na wymiar** |
| BLAT | E2-M72 / E2-M73 | Ekspres, czajnik, Thermomix, dzbanek i noże |

To 17 modułów oraz odrębna karta sprzętów na blacie. Kody są trwałe w tym planerze, a ID E2 pozostają identyfikatorami rzutu domu. Nie nadano nowych numerów istniejącym obiektom E2.

Lista startowa obejmuje 28 kategorii / 233 sztuki, z których 230 ma proponowane przypisanie. Trzy sztuki dodatkowego małego AGD (np. airfryer/toster/grill) pozostawiono jawnie do znalezienia miejsca po podaniu modeli. Liczby i gabaryty są edytowalne; propozycja nie potwierdza, że wszystkie stosy i organizery zmieszczą się jednocześnie. Zawartość 3D jest symboliczna, liczby znajdują się w panelu i zestawieniu.

Ekspres i czajnik zajmują ostatnie 60 cm północnego blatu; pierwsze 40 cm za płytą pozostaje wolne. Thermomix, dzbanek i blok noży są na prawych 50 cm wyspy, pozostawiając około 120×90 cm roboczo. Gabaryty i położenia sprzętów można dopasować w karcie BLAT; kontrola zgłasza ich nachodzenie, wyjście poza blat i zajęcie rezerwy przygotowania. Zasilanie wyspy wymaga instalacji, bez przewodu przez przejście. Para i ruch robota wymagają wolnej przestrzeni zgodnie z instrukcjami wybranych urządzeń.

## Korpusy i potwierdzone źródła Castoramy

Karty sprawdzono 12.11.2026. Korpusy dolne mają **wysokość 72 cm, głębokość 57 cm, płytę 18 mm**; nóżki 15 cm dają 87 cm, a przyjęty blat 3 cm — wysokość gotową 90 cm. Model rezerwuje 60 cm głębokości na korpus, front i montaż. Wymiary rezerwacji nie są wymiarami samej płyty korpusu.

| Podstawa | EAN i karta produktu | Moduły / liczba korpusów |
|---|---|---|
| Caraway 30 | [3663602637417](https://www.castorama.pl/korpus-szafki-kuchennej-dolnej-goodhome-caraway-30-cm/3663602637417_CAPL.prd) | N4, I3 — 2 |
| Caraway 50 | [3663602637448](https://www.castorama.pl/korpus-szafki-kuchennej-dolnej-goodhome-caraway-50-cm/3663602637448_CAPL.prd) | N6A, N6B — 2 |
| Caraway 60 | [3663602637455](https://www.castorama.pl/korpus-szafki-kuchennej-dolnej-goodhome-caraway-60-cm/3663602637455_CAPL.prd) | N1, N5, I2 — 3 |
| Caraway 80 | [3663602637462](https://www.castorama.pl/korpus-szafki-kuchennej-dolnej-goodhome-caraway-80-cm/3663602637462_CAPL.prd) | N2, I1 — 2 |
| Panele do słupka AGD | [3663602637905](https://www.castorama.pl/panele-do-slupka-wysokiego-agd-goodhome-caraway/3663602637905_CAPL.prd) | W1 i W2 — dwie zabudowy do kompletacji, nie dwa gotowe korpusy |
| Soto standard 60 | [3663602479161](https://www.castorama.pl/korpus-szuflady-goodhome-soto-60-cm-antracyt/3663602479161_CAPL.prd) | Przykład: gł. 45, szer. zewn. 56,4, wys. 10,8 cm |
| Soto głęboka 60 | [3663602479277](https://www.castorama.pl/korpus-szuflady-glebokiej-goodhome-soto-60-cm-antracyt/3663602479277_CAPL.prd) | Przykład: gł. 45, szer. zewn. 56,4, bok 19 cm |
| Pebre cargo 30 | [3663602480150](https://www.castorama.pl/kosz-cargo-goodhome-pebre-30-cm/3663602480150_CAPL.prd) | N4: dwa poziomy, 26,4×48,6×48,4 cm |

Łącznie baza dziewięciu dolnych korpusów katalogowych. Dobór frontów, prowadnic, zawiasów, nóżek, blend, cokołów, paneli końcowych, blatów, mocowań i AGD pozostaje otwarty. Panele słupków bazują na boku 219×57 cm, po dodaniu nóżek 15 cm model ma 234 cm wysokości; potrzebne są półki, poprzeczki, fronty i wentylacja. Nie podano ilości paneli jako gotowej listy zakupowej.

**Wyjątki:** nie potwierdzono kompletnego wysokiego korpusu Caraway 40 cm dla W3 ani standardowych korpusów dolnych głębokości 30 cm dla R1–R3. Utrzymanie wyspy 90 cm oznacza płytki tył na wymiar albo rezygnację z tych schowków. Dwa pełne standardowe rzędy z frontami przekroczą 90 cm. Narożnik C1 wymaga panelu/blendy; jest niedostępny. Mechanizmy inne niż przytoczone przykłady są propozycjami do doboru w danej szerokości, bez deklaracji zgodności całego zestawu.

## Kontrole i ograniczenia

- Rzeczywisty WebGL, otwieranie pojedynczych szuflad i całych frontów, rzut z góry, dobór mechanizmu bez usuwania zawartości, zapis po przeładowaniu, własne przedmioty, gabaryty, import/eksport i tryb bez WebGL sprawdzone w Chromium. Telefon emulowany 412×915: rzeczywiste zdarzenia dotykowe pan/pinch, wybór szafki, podgląd szuflady, panele, lista i zapis. Brak testu na fizycznym telefonie.
- Kontrola pojemności porównuje gabaryt **jednej sztuki** z szacunkową rezerwą w przegrodzie. Nie układa wielu sztuk, nie liczy stosów, nośności ani zajętości przestrzeni przez okucia. Podziały frontów i rezerwy prowadnic są poglądowe. Zlew/syfon, płyta, wentylacja, rzeczywiste wysokości frontów i systemy mocowania wymagają projektu wykonawczego.
- Model sygnalizuje zawężenie przejścia przy otwartych frontach. Przykładowy wysuw szuflady 45 cm naprzeciw 45 cm pozostawia z 130 cm około 40 cm; przy otwartej zmywarce przyjętej na 72 cm i szufladzie — około 13 cm. Nie zakładać wygodnej komunikacji podczas jednoczesnego otwarcia. Dawne 60 cm skrzydła z analizy ergonomii było przybliżeniem; trzeba wstawić faktyczny model AGD.
- Brak zmiany konstrukcji domu, automatycznej synchronizacji geometrii z edytorem, zamawiania produktów lub zapisu w chmurze. Kolory i wygląd frontów są ilustracyjne.

Testy: `timeout 30s node tools/check_kitchen3d.mjs`, `timeout 60s node tools/check_kitchen_browser.js`, `timeout 60s node tools/check_kitchen_browser.js mobile`. Three.js 0.180.0 dołączony lokalnie, [licencja MIT](vendor/three/LICENSE); bez CDN i zewnętrznych tekstur.
