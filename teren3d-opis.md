# Pochylenie terenu w obu widokach 3D

24.11.2026. Panel **Teren i poziom posadzki** w `dom3d.html` i `wnetrze3d.html`. Publiczna strona zawiera kod obsługi, bez rzeczywistych danych NMT inwestora. Prawdziwy teren wczytuje się automatycznie z lokalnego planu działki zawierającego wysokości albo przyciskiem **Wczytaj plan działki / NMT JSON**. Import dotyczy wysokości. Położenia tarasów w bryle nadal pochodzą z lokalnego planera lub z bazowych rezerw.

## Geometria i poziomy

- Siatka naturalnego NMT jest próbkowana w osiach domu z uwzględnieniem przesunięcia jego środka i obrotu całego układu. Wysokości źródłowe pozostają w mapowym układzie, a rzędne nie są obracane z geometrią. Nie podstawiamy nachylonej płaszczyzny na podstawie obrazu ani starego profilu TXT.
- Fragment obejmuje obrys i około 20 m otoczenia z każdej strony; siatka wynikowa ma krok 1 m i wartości w środkach komórek. Biliniowe próbkowanie źródła i interpolacja nie zwiększają dokładności NMT. Mesh jest trójkątny, bez powiększania wysokości (1:1). Braki i miejsca poza zasięgiem pozostają dziurami — nie są sztucznie wyrównywane. Niepełny zasięg pod domem jest zgłaszany.
- Podłoga jest pozioma: jej powierzchnia w modelu wypada na Y=0. Ludzik stoi na niej, a nie na naturalnym terenie. Ściany, meble, otwory i obrys domu nie są pochylane ani przesuwane w rzucie. Zmiana rzędnej zmienia wysokości terenu względem poziomego modelu.
- Bez wybranej rzędnej panel proponuje najwyższą próbkowaną wysokość NMT pod obrysem +0,30 m, zaokrągloną w górę do centymetra. **To jawne założenie wizualizacji, nie zatwierdzony poziom ±0,00 ani decyzja o fundamentach.** Można wpisać własną rzędną w tym samym układzie wysokości lub wrócić do propozycji. Najwyższa próbka nie jest potwierdzeniem najwyższego punktu gruntu w terenie.
- Półprzezroczysty pas pod obrysem pokazuje wyłącznie różnicę poziomów. Nie przedstawia konstrukcji fundamentu, podpiwniczenia, nasypu ani muru oporowego. NMT nie jest automatycznie usuwany pod domem, podnoszony do tarasów ani niwelowany. Jeśli grunt wychodzi nad posadzkę/taras, pozostaje widoczny i jest zgłaszany.

## Odczyty i ograniczenia

Panel podaje przedział próbkowanych wysokości pod obrysem, różnicę, narożniki NW/NE/SW/SE w osiach projektu, roboczą rzędną posadzki i różnice względem NMT w środku zewnętrznych otworów drzwiowych. Tarasy sprawdzane są próbkowo. Znak dodatni przy otworze oznacza, że posadzka jest wyżej niż naturalny teren; nie jest wysokością gotowego stopnia. W bryle taras leży 3,5 cm poniżej zera modelu. Przekroje zachód–wschód i północ–południe idą przez środek obrysu, w osiach projektu; nie są odwzorowaniem każdej krawędzi ani profilem podjazdu.

Datę pomiaru i układ wysokości trzeba zweryfikować w źródle; nieznany układ jest jawnie oznaczany. Nie łączyć z rzędnymi starego profilu o nieustalonym układzie. Siatka i narożniki są podstawą koncepcji, nie zastępują aktualnej mapy do projektowania, geotechniki i pomiaru geodety.

Opracowania wymagają: wybór ±0,00, posadowienie, roboty ziemne, odwodnienie, kontakt ze skarpą, ewentualne mury oporowe oraz połączenia z wejściami, tarasem, parkingiem i drogą. Model nie dodaje samoczynnie schodów lub ramp i nie deklaruje bezprogowego wejścia. Poziomów nie zatwierdzono przez samo wyświetlenie. Dotychczasowy audyt 2D nie sprawdza tych zależności wysokościowych.

## Prywatność i zapis

`dom3d-teren.mjs` waliduje i przelicza dane, `dom3d-teren-scene.mjs` tworzy powierzchnię, `dom3d-teren-panel.mjs` obsługuje oba widoki. Oddzielny wspólny klucz `ogrodniki-teren3d-v1`, schema1, zapisuje roboczą rzędną i ewentualny import lokalnego fragmentu. Bez importu NMT jest odczytywany z `ogrodniki-dzialka-v1`. „Odśwież lokalny plan” wraca do tego źródła i propozycji rzędnej. Widoczność Teren ma osobne ustawienie w każdym widoku, bez zależności od mebli i ścian. Bez NMT wnętrze nie pokazuje sztucznego otoczenia; bryła zachowuje poglądową płaszczyznę z komunikatem braku danych.

Eksport terenu JSON i opcjonalne `terrain`/`terrainSettings` w JSON obu widoków zawierają względną siatkę wokół domu i wysokości NMT. Nie zawierają identyfikatora działki, granic, nazw, notatek, współrzędnych geodezyjnych ani modelu całego otoczenia. **Rzeczywiste wysokości nadal są prywatne**: pliku nie dodawać do publicznego repozytorium. Pliki inwestora pozostają w ignorowanym `dzialka-prywatna/`. PNG uwzględnia aktualny teren; bez WebGL dostępne pozostają profile i wartości, obok wcześniejszego widoku 2D. Strona nie wysyła danych. Nie zmienia zapisów E2, działki, kuchni ani referencji; nie migruje geometrii. Stare pliki 3D bez terenu są nadal przyjmowane.

Testy: `timeout 30s node tools/check_dom3d_terrain.mjs`; `timeout 60s node tools/check_dom3d_terrain_browser.js` oraz osobno `... mobile`. Fixtures są syntetyczne. Kontrole obejmują rotację/translację, środki komórek, przerwy NMT, powierzchnię o zmiennych wysokościach, rzędne i ostrzeżenia, profile, import/eksport/trwałość, oba modele, niezależną widoczność, człowieka i niezmienność źródeł. Testy Chromium desktop/dotyk 412 px nie zastępują sprawdzenia fizycznego telefonu.
