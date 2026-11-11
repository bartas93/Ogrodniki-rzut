# Kuchnia E2 — ergonomia po korekcie

Układ L z osobną wyspą jest sensowny. Zachowane 130 cm między wyspą a północnym blatem i zachodnimi słupkami daje wygodne miejsce do pracy. Poprawiono kolejność sprzętów i skrócono najdłuższy bok trójkąta pracy, bez przesuwania ścian, zlewu, zmywarki ani wyspy.

![Układ kuchni i trójkąt pracy](kuchnia-E2.svg)

## Trójkąt pracy

Pomiar między **środkami frontów** lodówki, szafki zlewu i płyty; odcinki proste, nie symulacja kroków człowieka. Orientacyjna reguła projektowa to około 1,2–2,7 m na bok i 4–8 m łącznie; nie jest to potwierdzenie spełnienia norm ani dostępności.

| Odcinek | Przed korektą | Po korekcie |
| --- | ---: | ---: |
| Lodówka → zlew | 1,64 m | 1,22 m |
| Zlew → płyta | 1,90 m | 1,60 m |
| Płyta → lodówka | 3,18 m | 2,69 m |
| Suma | 6,72 m | 5,51 m |

Wyspa nie przecina tych odcinków. Najdłuższy bok nadal jest przy górnej granicy reguły; trójkąt nie zastępuje oceny blatów i otwierania urządzeń.

## Kolejność mebli i sprzętów

**M71, zachodnia ściana, od południa:** piekarnik 60 → lodówka 60 → dostępny słupek zapasów 40 → niski ślepy narożnik 60 cm. Lodówka E1 i piekarnik E2 zamienione miejscami, ich ID zachowane. Zawiasy lodówki proponowane od południa, przy piekarniku, uchwyt od północy. Pełne otwarcie i wyjmowanie szuflad trzeba sprawdzić dla konkretnego modelu.

W poprzednim rzucie opisano 100 cm wysokiej szafy na zapasy, ale 60 cm jej frontu zasłaniał północny blat. Pozostaje realnie dostępne 40 cm, a zasłonięty odcinek jest teraz oznaczony jako niski, ślepy narożnik, bez deklarowania dostępnej wysokiej szafy. Nowy narożnik ma własne ID E4; istniejący słupek zachowuje E3. Blat odkładczy lodówki to 60 cm po lewej stronie zlewu. Gorące blachy z piekarnika można odkładać na wyspę naprzeciw, ale wymaga to przeniesienia przez przejście 130 cm — blat bezpośrednio obok piekarnika byłby wygodniejszy.

**M72, północna ściana, od zachodu:** blat 60 → zlew 80 → zmywarka 60 → szuflady 30 → płyta 60 → blat 100 cm. Płyta E5 przesunięta o 30 cm w lewo, bez zmiany jej ID. Wymaga to odpowiedniego położenia okapu i zasilania. Krawędź płyty jest 10 cm na prawo od krawędzi otworu okiennego; wymagania wybranego sprzętu i szczegóły okapu trzeba sprawdzić wykonawczo.

Między zlewem a płytą pozostaje **90 cm ciągłego blatu przygotowania**, w tym 60 cm nad zmywarką. Wcześniej było 120 cm: skrócenie jest świadomym kompromisem na rzecz krótszej drogi od lodówki i większego blatu po prawej. Wyspa **170×90 cm**, bez zlewu i płyty, daje dodatkową dużą powierzchnię przygotowania. Zmywarka nadal bezpośrednio przy zlewie; naczynia i sztućce warto trzymać w sąsiednich szufladach i wyspie.

Na prawym blacie 100 cm zostawić pierwsze **40 cm przy płycie wolne** na odstawianie. Końcowe 60 cm przeznaczyć na wybrany sprzęt codzienny, np. ekspres lub Thermomix; zmieszczenie obu zależy od ich wymiarów i wymaganych odstępów. Pozostałego małego AGD nie należy stale ustawiać na blacie przygotowania. Używanie go w spiżarni jest możliwością do osobnego sprawdzenia pod kątem miejsca, wentylacji i zasilania, nie gotowym projektem instalacji.

## Prześwity i ograniczenia

- Wyspa → północny blat oraz zachodnia zabudowa: **130 cm** przy zamkniętych frontach. Po otwarciu drzwi urządzenia na około 60 cm zostaje około **70 cm**, bez wygodnego mijania. Nie otwierać zmywarki jako stałego elementu pracy dwóch osób.
- Od wschodu wyspy: **90 cm**. Do zamkniętego stołu: **135 cm**; do zajętych krzeseł przy stole dla dziesięciu osób: **75 cm**, układ okazjonalny, bez komfortowej obsługi wyspy z tej strony.
- Miary dotyczą obrysów w modelu. Uchwyty, rzeczywiste fronty, instalacje, wysokość okapu i mechanizmy drzwi wymagają doboru wykonawczego. Edytor nie symuluje otwierania poszczególnych urządzeń w zabudowie.
- Kontrola rastra 50 mm: zero problemów i wszystkie pomieszczenia dostępne, również w sprawdzonych stanach rozłożonych mebli. Pozostają wcześniejsze ostrzeżenia M101 oraz trzech PAX; nie są skutkiem korekty kuchni. Przy rozłożonej sofie M117 pozostaje wcześniejsza uwaga o strefie krzesła M116.

Zapis v30 przenosi z v29 tylko wyposażenie i opis M71/M72 w E2. Zachowuje własne nazwy, obrysy obu zabudów, pozostałe edycje i wszystkie inne warianty; kopie starszych zapisów pozostają. Bieżący v30 nie jest ponownie korygowany. Import JSON nadal odtwarza zawartość pliku.

Kontrola: `node tools/check_e2_kitchen.js`, `node tools/check_e2_room_updates.js`, `node tools/check_e2_island.js`, `node tools/check_variant.js E2` oraz testy przeglądarkowe.
