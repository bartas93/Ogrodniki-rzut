# Projekt Główny — snapshot i warstwa instalacji, 16.11.2026

**Aktualny zakres v37:** [Hydraulika, Podłogówka, Elektryka i przypisania włącznik–lampa](instalacje-hydraulika-elektryka.md). Nakładka ma obecnie247 elementów w4 warstwach i8 branżach. Poniższy pierwotny zakres157 elementów opisuje bazę v36; nowy dokument aktualizuje liczbę elementów, filtry, zasilanie, monitoring i automatykę. Obsługa kopii referencyjnej pozostaje bez zmian.

## Kopia referencyjna

Wariant **Projekt główny 2026-11-16** (`E2REF20261116`) jest kopią sprzed dodania instalacji. Pozostaje tylko do odczytu: wybór elementów, ID, pomiary i eksport są dostępne; przesuwanie, usuwanie i zmiany wymiarów są zablokowane. Nie wywołuje aktualnego konstruktora E2 i nie synchronizuje się z nim.

- [Otwórz kopię](https://bartas93.github.io/Ogrodniki-rzut/?variant=E2REF20261116).
- [Zamrożony publiczny JSON](snapshots/projekt-glowny-2026-11-16.json) zawiera stan opublikowanego projektu przed tą aktualizacją. Taka sama baza jest osadzona w HTML, więc kopia działa także bez serwera.
- Przy pierwszym otwarciu nowej wersji aplikacja zachowuje wcześniejszy zapis E2 z danej przeglądarki, jeśli istnieje. Obejmuje własne edycje po odpowiednich migracjach. Ta lokalna kopia jest zapisana osobno w `ogrodniki-reference-2026-11-16` i ma pierwszeństwo przed publiczną bazą. Źródło jest widoczne w panelu kopii.
- Bez wcześniejszego zapisu E2 źródłem jest zamrożona wersja opublikowana. Kopie z różnych urządzeń mogą się różnić, jeśli zawierały różne ręczne edycje; nie są przesyłane na serwer. JSON pozwala zachować konkretną kopię poza pamięcią przeglądarki.
- Kolejne zmiany E2, reset E2 i aktualizacje instalacji nie zmieniają kopii. Przy braku możliwości zapisu do pamięci przeglądarki panel kopii informuje o potrzebie eksportu JSON.

## Obsługa warstwy

Nad rzutem jest stale widoczny pasek **Widok**, również na telefonie:

- **Meble** — pokazuje lub ukrywa meble, ich opisy, ID i strefy. To ustawienie widoku; meble pozostają w kontroli kolizji i dojść.
- **Wentylacja**, **Hydraulika**, **Podłogówka**, **Elektryka**, **Sieć i rezerwy** — niezależne przełączniki. Nie ma nadrzędnego przycisku „Instalacje”. Lista **Widok** pozwala wybrać np. **Tylko hydraulika**.
- **Tylko instalacje** — pokazuje wszystkie branże na tle ścian, ukrywa meble, nazwy/kolory pomieszczeń, dach, strefy, podkład i wizualizację przejść.
- **Pokaż wszystko** — odsłania wszystkie warstwy, meble i branże oraz przywraca nazwy/kolory pomieszczeń, dach, strefy i przejścia.
- **Branże…** — otwiera panel i przewija do filtrów instalacji.

Wybór widoku zapisuje się osobno dla wariantu i przeżywa odświeżenie. Eksport PNG przedstawia wybrany widok, a JSON nadal zawiera wszystkie elementy. Wyszukanie ID ukrytego mebla ponownie go pokazuje. Kopia referencyjna pozostaje bez nowej warstwy instalacji i bez możliwości edycji geometrii. Zmiana dotyczy ustawień widoku w v36; nie wymaga resetu ani kolejnej migracji projektu.

[Bieżący Projekt Główny](https://bartas93.github.io/Ogrodniki-rzut/) ma warstwę **Instalacje**, przycisk na pasku oraz siedem filtrów branżowych w panelu. Domyślnie widoczna jest wentylacja; przycisk **Wszystkie** pokazuje cały program, a **Tylko wentylacja** przywraca czytelny widok początkowy. Wyłączenie warstwy nie usuwa danych.

Punkt lub trasę można wskazać na rzucie, wybrać z listy branży albo wyszukać po ID, np. `E2-I151`. Panel pokazuje nazwę, poziom prowadzenia, ograniczenia i własne uwagi. Numer jest trwały; zmiana nazwy lub przesunięcia go nie zmienia. Można przesunąć adnotację myszą, klawiaturą lub przez pola X/Y, a na telefonie wybrać ją stuknięciem w trybie Podgląd. Przesunięcie adnotacji nie przesuwa urządzenia.

Punkty przy urządzeniach i roletach odnoszą się do istniejących ID mebli, wyposażenia lub otworów. Podążają za ich położeniem; usunięcie powiązanego obiektu ukrywa jego adnotację zamiast wymyślać zastępczą lokalizację. Dane pozostają w JSON, żeby można było odtworzyć odniesienie. Własne przesunięcia i uwagi zachowują się przy zapisie/odczycie. JSON zawiera pełny stan i instalacje; PNG pokazuje aktualnie włączone branże i oznaczenia. Kopia referencyjna nie ma nowej warstwy.

## Zakres 157 elementów koncepcyjnych

| Branża | Zawartość |
|---|---|
| Wentylacja i okap | Centrala przy istniejącej rezerwie M108, potrzeba osobnych tras czerpni/wyrzutni, strefa prowadzenia nad stropem, wstępne nawiewy i wywiewy oraz rozgałęzienia. Okap jako decyzja między niezależnym wyciągiem z kompensacją powietrza a pochłaniaczem. |
| Woda i uzdatnianie | Wejście wodociągu, odcięcie i filtr, rezerwa zmiękczacza i CWU; punkty ZW/CWU przy zlewach, umywalkach, wannie, prysznicu, WC, pralce, zmywarce i brodziku psa; strefy tras i kran ogrodowy. |
| Kanalizacja i POŚ | Odpływy przy urządzeniach, dwie proponowane strefy pionów wentylujących ponad dach, schemat odpływu do POŚ i punkt koordynacji skroplin/kondensatu. Lokalizacja i rzędna wyjścia z domu pozostają do projektu. |
| Ogrzewanie | Istniejąca rezerwa modułu pompy, trasa do jednostki zewnętrznej, rezerwa rozdzielacza, główna strefa tras i potrzeby ogrzewania pomieszczeń. Spiżarnia jako decyzja o ogrzewaniu. Bez narysowanych fikcyjnych pętli. |
| Elektryka | Rezerwa rozdzielnicy i tras; grupy potrzeb oświetlenia i gniazd w pomieszczeniach, zasilanie AGD, rekuperatora, robota i codziennych sprzętów na blacie. Uwzględniono zasilanie wyspy, uziemienie i połączenia wyrównawcze jako zakres projektu. |
| LAN i sterowanie | Rezerwa szafki sieciowej/automatyki, punkty biurek i TV, propozycja AP, trasy do bramy/domofonu, program czujników zalania i dymu. Nie jest to komplet rozmieszczenia ochrony. |
| Przyszłe przygotowania | PV z pionem do poddasza/dachu, możliwość AC w strefach mieszkalnych, przyszły LPG z rezerwą przewodu powietrzno-spalinowego, punkty rolet przy przeszkleniach. Nie zatwierdzono montażu wszystkich jednostek AC. |

## Granice opracowania

To **schemat programu instalacji do koordynacji**, nie dokumentacja wykonawcza ani potwierdzona trasa każdej rury i kabla. Przerywana linia oznacza strefę lub relację na rzucie. Skrzyżowania mogą dotyczyć różnych poziomów; model 2D nie rozstrzyga kolizji w pionie. Wspólna strefa kanałów wentylacji nie oznacza połączenia nawiewu z wywiewem.

Nie dobrano mocy, przekrojów, przepływów, średnic, spadków kanalizacji, układu pętli, modeli urządzeń, opraw ani pełnej liczby gniazd i łączników. Lokalizacje rozdzielnic, uzdatniania, rozdzielacza i falownika wymagają sprawdzenia dostępnej ściany, głębokości obudów i serwisu. Nie usuwano regałów ani nie zmieniano ustawienia technicznego dla pozornego potwierdzenia ich zmieszczenia.

Warstwa nie wycina otworów w stropie, dachu i ścianach. Rezerwy pionów trzeba sprawdzić na przekrojach z konstruktorem. Kanały nad stropem skoordynować z ociepleniem i strychem; centrala na zimnym poddaszu wymaga warunków zgodnych z instrukcją. Wentylacja kotłowni przy LPG wymaga osobnej oceny i nie jest potwierdzona wywiewem sufitowym.

Lokalizacji zbiornika LPG, POŚ, jednostek zewnętrznych, przyłącza i studzienek nie wyznaczono bez planu działki i rzędnych. Nadal obowiązują [ustalenia przygotowania instalacji](instalacje-przygotowanie.md), w tym zgodność popłuczyn zmiękczacza z konkretną POŚ. Wyloty kanalizacji i spalin, czerpnia, wyrzutnia oraz PV wymagają wspólnej koordynacji na dachu i elewacjach.

Ściany, otwory, meble, istniejące ID i gabaryt **17,824 × 10,624 m** pozostają takie jak przed dodaniem warstwy. Elementy instalacji są osobną kolekcją, nie fikcyjnymi meblami ani przeszkodami na podłodze. Dotychczasowe ograniczenia audytu pozostają aktualne; kontrola mebli nie zatwierdza instalacji. Kuchnia 3D i inne warianty nie otrzymały zmian geometrii.

Zapis v36 czyta v35 i starsze wersje. Z v35 dodaje wyłącznie kolekcję instalacji i jej ustawienia; nie ponawia wcześniejszych korekt geometrii. Oryginały starych zapisów pozostają. Znacznik `installationRevision:1` zapobiega ponownemu dodawaniu usuniętych elementów lub nadpisywaniu własnych uwag.

## Kontrole

- `timeout 30s node tools/check_installations.js`: publiczny snapshot, kopia ręcznych edycji v35, pierwszy link do innego wariantu, niezależność, numery, kotwice, usunięte odniesienia, siedem branż i niezmieniony obrys.
- `timeout 60s node tools/check_installations_browser.js` oraz osobno `... mobile`: filtry, wybór dotykiem, ID, własne uwagi i przesunięcia, zapis po odświeżeniu, JSON/PNG, ukrywanie i odkrywanie warstwy oraz niezmienność kopii.
- Istniejące kontrole składni, migracji, wnęk, geometrii, miarki i przepływów edytora. Telefon sprawdzany w Chromium przy 412 × 915 px; nie jest to fizyczny test urządzenia.
