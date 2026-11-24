# Dom z zewnątrz — widok 3D

Aktualizacja 24.11.2026. [Otwórz model](https://bartas93.github.io/Ogrodniki-rzut/dom3d.html). Wejście także z Projektu Głównego i planu działki. Interaktywny podgląd bryły i wykończenia, z obsługą telefonu, bez buildu i zewnętrznego CDN. Lokalny Three.js0.180.0, licencjaMIT. Otwieraj przez HTTP(S), np.GitHub Pages; moduły i odczyt bazy wymagają serwera.

## Źródło i dokładność geometrii

`dom3d-baza.json` jest generowany przez `timeout 30s node tools/export_dom3d.js` z aktualnego konstruktora E2 za pomocą istniejącego silnika. Zawiera tylko geometrię ścian/otworów i parametry dachu, bez mebli, notatek użytkownika i danych działki. Kontrola porównuje bazę z bieżącym źródłem; po zmianie geometrii rzutu trzeba ją ponownie wygenerować.

Jeżeli w przeglądarce istnieje poprawny `ogrodniki-rzut-v37:E2`, strona odczytuje go zamiast bazy. Działa tylko odczyt; bez migracji, przywracania skasowanych obiektów i zapisu do edytora. „Wczytaj aktualny rzut” odświeża ten odczyt, przywraca kąt/okap z rzutu i zachowuje wykończenie oraz proponowaną wysokość 3D. Wczytany JSON3D jest osobną kopią geometrii do czasu ponownego użycia tego przycisku.

Gotowy obrys domyślny17,824×10,624m, powierzchnia189,362m². Zachowane numery ścian i16 otworów zewnętrznych:O2/O4/O5/O6/O7, O9/O10/O11, O13/O14/O15/O16/O17, O19/O20/O21. O3 pozostaje usunięte. Ściany są dzielone wokół rzeczywistych otworów; model nie przykrywa ich pełną ścianą z naklejoną szybą. Wysokości otworów i parapetów pochodzą ze stanu rzutu. Wymiary drzwi w panelu to otwór budowlany, nie deklaracja użytkowego światła.

Zewnętrzne narożniki mają połączenia ukośne w planie, bez szczelin i bez powiększania wymiarów budynku. Wewnątrz pokazano ściany jako tło za przeszkleniami; nie jest to planer wnętrz. Obsługiwany jest prostokątny obrys i ściany osiowe. Dla nietypowego, uszkodzonego lub nieobsługiwanego lokalnego rzutu strona pokazuje komunikat i publiczną bazę, zamiast deklarować zgodność błędnego modelu.

## Dach i wysokości

Dach kopertowy jest obliczany z gotowego obrysu, kąta i okapu. Baza:30° i1m okapu od elewacji. Powierzchnia połaci około288,97m², długość kalenicy7,20m. Cztery połacie są rzeczywistymi płaszczyznami z trójkątów; tekstura i nakrycia krawędzi są dekoracją.

**Robocza wysokość ściany do oparcia dachu:3,10m.** Nie jest ustaloną wysokością elewacji w projekcie budowlanym. W koncepcji wnętrze ma2,80m; przyjęta różnica0,30m jest wyłącznie rezerwą wizualizacji dla stropu/oparcia. Nie dobrano przekroju konstrukcji. Wysokość można zmieniać niezależnie w3D.

Przy H=3,10m, kącie30° i okapie1m: dolna krawędź dachu2,523m, kalenica6,167m względem podłogi modelu. Okap obniża się o `okap × tan(kąta)` względem oparcia na elewacji; model nie tworzy przypadkowej szczeliny nad ścianą. Nie są to geodezyjne rzędne ani normowa wysokość budynku. Posadzka±0,00, cokół, teren i fundamenty wymagają projektu i przekrojów. Ustawienia3D nie zmieniają parametrów dachu w edytorze2D.

## Taras, wygląd i instalacje

Taras zachodni, południowo-zachodni i część zadaszona odpowiadają rezerwom planera działki. Jeżeli dostępny jest zgodny lokalny zapis, można przejąć jego obrót i położenia tarasów. W modelu zachowywane są wyłącznie względne prostokąty tarasów i kąt; dla starszego planu bez kąta oblicza się sam kierunek granicy, bez kopiowania jej do modelu; nie pobiera się georeferencji, identyfikatora ani granic. Od 24.11 opcjonalny lokalny fragment NMT jest używany przez [panel terenu](teren3d-opis.md) i dołączany do prywatnego eksportu 3D. Bez takiego zapisu stosowane są domyślne rezerwy.

Zadaszenie zachodnie ma poglądową wolnostojącą konstrukcję. Jej wysokości, przekroje, połączenie z okapem, szczelność i obciążenia nie są zatwierdzone. Przy skrajnych parametrach dachu możliwe są konflikty wymagające zmiany zadaszenia; model nie zastępuje sprawdzenia konstrukcyjnego. RezerwyPAX i pozostałe umeblowanie nie są przebudowywane.

Tynk w ciepłej bieli, ceglasty dach, ciemna stolarka i drewniany taras są propozycją wykończenia. Barwy można zmieniać. Podziały szyb, profile, okucia i elementy blacharskie są uproszczone. Rynny i skrzynki rolet to propozycje rozmieszczenia, nie dokumentacja montażu. Rolety są domyślnie wyłączone; można je pokazać i opuścić. Przejścia wentylacji/spalin przez dach pozostają do projektu; model ich nie zatwierdza.

Bez lokalnego NMT teren jest płaski i poglądowy. Po wczytaniu wysokości oba widoki 3D pokazują naturalny teren w skali 1:1; rzędna poziomej posadzki jest regulowana i jawnie robocza. Nie zaprojektowano niwelacji, fundamentów, schodów ani murów oporowych. Światło i cienie służą czytelności bryły, nie analizie nasłonecznienia, zacienieniaPV i wpływu sąsiadów. Model nie potwierdzaMPZP, usytuowania i powierzchni biologicznie czynnej. Dokładne materiały działki nadal pozostają poza repozytorium.

## Obsługa i zapis

- Jeden palec lub lewy przycisk: obrót. Dwa palce: zoom i przesuwanie. Prawy przycisk lubShift: przesuwanie. Kółko i przyciski+/−: zoom. „Cały dom” ponownie kadruje model.
- Widoki: perspektywa, tarasSW, wejścieE, południe, zachód, północ i z góry. Kierunki odnoszą się do projektu; przy włączonym lokalnym planie działki kamera uwzględnia jego obrót.
- 10 niezależnych ustawień widoczności, wybór i kopiowanie pełnegoID otworu,3 kolory, parametry wysokości/dachu/okapu oraz rolety. Wymiary iID domyślnie ukryte dla czytelności.
- PNG obejmuje bieżący kadr, włączone etykiety i oznaczenie koncepcji. BezWebGL2 dostępny jest widok elewacji2D z eksportemSVG i wyborem otworów.
- Własny zapis `ogrodniki-dom3d-v1`, schema1. Zawiera ustawienia wyglądu i ewentualną zaimportowaną kopię geometrii. JSON do przenoszenia zawiera geometrię domu, wygląd, względne tarasy/obrót oraz opcjonalny lokalny fragment NMT i roboczą rzędną posadzki, bez georeferencji, granic i identyfikatora działki. Plik z NMT jest prywatny. Import jest walidowany przed podmianą modelu. RzutE2, planer kuchni, działka i snapshot16.11 nie są nadpisywane.

Testy: `timeout 30s node tools/check_dom3d.mjs`, `timeout 60s node tools/check_dom3d_browser.js` i osobno `... mobile`. Sprawdzają zgodność bazy zE2, wycięcia iID, powierzchnię oraz wysokości połaci, odczyt lokalnego rzutu, kamerę i gesty, warstwy/parametry, PNG/JSON, fallbackSVG i niezależność zapisów. Rzeczywistego urządzenia mobilnego nie testowano — sprawdzono mobilny Chromium z dotykiem.
