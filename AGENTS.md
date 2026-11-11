# Ogrodniki — instrukcja dla agenta (Codex / Claude)

Repozytorium służy do projektowania koncepcji parterowego domu jednorodzinnego.
Sercem jest **edytor rzutu w jednym pliku HTML** (`edytor-rzutu.html`): ściany, drzwi, okna, meble ze strefami użytkowymi,
automatyczna kontrola kolizji i przejść, statystyki bryły i dachu kopertowego, kilka wariantów domu.

Przeczytaj ten plik w całości, zanim cokolwiek zmienisz.

## 1. Pliki

| Plik | Co to jest |
|---|---|
| `edytor-rzutu.html` | Aplikacja (HTML + SVG + vanilla JS, bez zależności i bez builda). Otwierasz w przeglądarce. |
| `index.html` | Przekierowanie na edytor (dla GitHub Pages). |
| `wymagania-projektowe.md` | **Wymagania i decyzje inwestora** (wersja publiczna) — przeczytaj przed pracą projektową. Część jest historyczna; gdy coś wygląda nieaktualnie, zapytaj użytkownika. |
| `ogrodniki_raport_planowanej_budowy_*.md` | Pełne, **prywatne** notatki inwestora (działka, dokumenty, finanse, oferty). Istnieje tylko lokalnie u użytkownika, jest w `.gitignore` — **nigdy go nie commituj** ani nie przepisuj z niego danych do plików repo. |
| `Ogrodniki (2).pdf` | Pierwotny rzut z Revita (wektorowy). Źródło geometrii „rzutu z PDF”. |
| `Ogrodniki (2).rvt` | Model Revit (~30 MB) — tylko lokalnie, w `.gitignore` (może zawierać metadane autora). |
| `Ogrodniki2.png` | Zrzut rzutu (raster). **Nie odrysowuj z niego geometrii** — użyj PDF. |
| `rzut-ogrodniki-*.json` | Eksporty stanu edytora zrobione przez użytkownika (przycisk „Zapisz JSON”). |
| `tools/pdf_extract.py` | Wyciąga ściany, drzwi (skrzydła + łuki), teksty i zielone meble z PDF w mm. |
| `tools/render_pdf_tiles.py` | Renderuje fragment PDF z siatką mm (do czytania mebli/drzwi). |
| `tools/check_js.py` | `node --check` dla skryptu edytora. |
| `tools/check_variant.js` | Kontrola geometrii, dojść i miniatury bez przeglądarki; opcjonalny podgląd SVG. |
| `tools/check_e2_south.js` | Sprawdza odbicie geometrii/stref/zawiasów i niezależność kopii E2S. |
| `tools/check_r1.js` | Kontrakt R1: wejście północne, trzy pokoje, mniejsza bryła, wyposażenie i dojścia. |
| `R1-koncepcja.md` | Program, wymiary i założenia nowego wariantu R1. |
| `e2-wykonczenie.md` | Zakres poprawek po audycie, moduły, wysokości i pozostałe decyzje wykonawcze E2. |
| `tools/browser_report.js` | Raport kontroli wariantu do uruchomienia w przeglądarce (patrz §6). |

## 2. Najważniejsze decyzje i preferencje użytkownika (stan na 2026-11-10)

- **Bez garażu** (decyzja 18.10.2026). Parter, prosta bryła (prostokąt), dach kopertowy / wielospadowy symetryczny 25–40°.
- Cel: jak najniższy koszt budowy przy wygodnym układzie → zwarty prostokąt, mało ścian zewnętrznych, bez koszy dachowych.
- Program: wiatrołap, salon + kuchnia z wyspą + jadalnia, spiżarnia, 2 łazienki (wanna; prysznic), pralnia/suszarnia,
  kotłownia/gospodarcze, sypialnia rodziców z garderobą, 2 pokoje, gabinet.
- Wymiary i zasady, o które prosił użytkownik:
  - łóżko rodziców **180×200, 80 cm dojścia z obu stron**, 1,0–1,2 m od łóżka do TV; łóżeczko dziecięce może stać pod TV,
  - garderoba: szafy po obu stronach, przejście **100 cm** (kontrola „ścisła”),
  - **szafy PAX głębokości 60 cm**, standardowe regały stalowe 60 cm i regały 35 cm (spiżarnia),
  - korytarz **120 cm**,
  - salon: TV na ścianie wschodniej (prawej), **sofa rozkładana + narożnik L w układzie U** otwartym na TV,
    wyjścia na taras: od zachodu przy kuchni i od południa (drzwi przesuwne/HS) przy ścianie z TV, dużo okien,
  - stół 4-os. rozkładany do 8–10 os. (strefa „po rozłożeniu” = tylko podgląd),
  - w pokojach **biurko przy oknie**, szafy **we wnękach przy drzwiach** (krótka ścianka obok drzwi),
  - gabinet z wejściem **z holu za wiatrołapem** (nie przez mokry wiatrołap),
  - wiatrołap z dużą szafą + ławką/szafką na buty (siedzisko),
  - kotłownia: urządzenia (pompa, zasobnik, bufor), rekuperator, **brodzik do mycia psa**, reszta na szafy/regały; wejście z wiatrołapu,
  - pralnia/suszarnia: jak najwięcej szaf PAX, blat pod oknem; przejście między szafami może być węższe (~75–80 cm),
  - **drzwi do łazienek otwierane na zewnątrz (na korytarz), drzwi wejściowe na zewnątrz**,
  - ścianka instalacyjna 20 cm za WC/umywalką.
- **Domyślnym i aktualnie rozwijanym wariantem jest E2. Każde polecenie zmiany projektu dotyczy E2, chyba że użytkownik wyraźnie wskaże inny wariant.** Link bez parametru i nieznany `variant` otwiera E2, zachowując jego zapisane edycje; ostatnio oglądany wariant nie zmienia tego wyboru. Pozostałe warianty zostają do porównania — nie zmieniaj ich bez prośby.
  - `variantE(o)` przyjmuje opcje: `exit` (drzwi z pralni do ogrodu + miejsce na suszarkę), `baths` (prysznic + WC dla gości
    przy salonie, wanna przy sypialniach), `office` (gabinet od północy, pokój 3 od południa). E3 = `{baths}`, E4 = wszystkie trzy.
  - `variantE2()` to osobna funkcja: wyjście z pralni oraz poprawki z 24.10.2026 opisane w §7 `wymagania-projektowe.md` (wanna w łazience o szerokości 195 cm, walk-in przy salonie, zabudowy, biurka 140×70, okap 1 m). Nie przenoś tych zmian do E/E1/E3/E4.
  - **Nowszy §8 wymagań aktualizuje §7:** ściana warstwowa 412 mm przy zachowanych licach wnętrz, modułowe PAX i narożniki 1102×1102, sypialnia +200 mm kosztem gabinetu. Suszarka stojąca i zewnętrzne otwieranie łazienek są świadomie zaakceptowane. Pralnia ma urządzenia pod blatem. Przeczytaj `e2-wykonczenie.md` przed dalszymi zmianami E2.
  - **E2 10.11.2026 (§11 wymagań):** narożnik 230×151 długim bokiem na zachodzie, krótkim na południu; druga sofa również na zachodzie, frontem do TV, by zachować rozłączne pola spania. WC walk-in obok umywalki na północnej ścianie. Sofa pokoju 3 przy wschodniej ścianie, frontem na zachód. Zachowaj identyfikatory 75/76/86/87/101 i nie przenoś zmian do E2S. Szczegóły na końcu `e2-wykonczenie.md`. `loadSavedVariant` migruje v23 do v24 i nadpisuje tylko te pięć obiektów E2, pozostałe edycje/warstwy i inne warianty zachowuje. Nie usuwa starych zapisów. Nowe v24 ma pierwszeństwo, import JSON nadal odtwarza wskazany plik. Kontrola `tools/check_e2_november.js`. Test E2S porównuje jego zamrożony konstruktor przed/po odbiciu, nie aktualne E2.
  - `variantE2South()` buduje **E2S**, niezależną kopię E2 z kuchnią na południu (cały dom odbity północ–południe, wejście nadal na wschodzie). Ma skopiowany konstruktor stanu E2 z 24.10.2026 i na końcu wywołuje `mirrorPlanNorthSouth(s,10200)`. Nie synchronizuj go automatycznie z E2. Szczegóły w §9 wymagań. Domyślny nadal E2.
  - `variantR1()` to **nowa, mniejsza koncepcja** z wejściem północnym, salonem i trzema pokojami (sypialnia + dwa dodatkowe, bez czwartego gabinetu). Zachowuje dwie łazienki, pralnię, techniczne, spiżarnię i garderobę. Obrys gotowy 15,174×9,824 m (149,07 m²). Nie jest kopią/odbiciem E2; nie przenoś zmian między wariantami. Wymagania §10 i `R1-koncepcja.md`. Domyślny nadal E2.
  - `variantE1()` to osobna funkcja: E skrócone o 45 cm (pokój 2 o 20 cm węższy, wiatrołap 2,00 m, kotłownia 2,75 m).
- Użytkownik ogląda rzuty także na **Androidzie (Pixel 9 Pro / Pixel 6 Pro, ok. 412 px szerokości)** — każda zmiana UI musi działać na telefonie (§7).

## 3. Architektura edytora (`edytor-rzutu.html`)

Jeden plik: `<style>`, markup (pasek górny, narzędzia, `<svg id="cv">`, panel boczny) i jeden `<script>` (IIFE).

> **Uwaga:** linia ~165 to `const UNDER = {href:'data:image/png;base64,…'}` — kilkadziesiąt kB w jednej linii (podkład z PDF).
> Nie czytaj całego pliku naraz; szukaj po nagłówkach `/* ---------- … ---------- */` i czytaj fragmenty (offset/limit, grep).

Kolejność sekcji w skrypcie:

| Sekcja | Zawartość |
|---|---|
| `LS`, `PALETTE`, `UNDER` | klucz localStorage (wersjonowany!), kolory, podkład PDF |
| `buildBase()` | „Rzut z PDF (zmieniony)” — ściany z wektorów PDF, później modyfikowane (krótszy salon, okna, wyjścia na taras) |
| biblioteka mebli: `Z()`, `LIB`, `LIBK`, `makeFurn()` | typowe wymiary sklepowe + strefy użytkowe |
| `drawingFurniture(s)` | meble rzutu bazowego (z zielonych obiektów PDF, potem zmieniane) |
| warianty: `vb()`, `variantA()` … `variantE()`, `VARIANTS`, `freshState()` | budowa wariantów |
| `defaults(s)` | uzupełnienie/naprawa stanu (wywoływane przy wczytaniu) |
| historia: `checkpoint()`, `doUndo()`, `doRedo()`, `save()` | undo/redo, zapis per wariant |
| geometria: `geom()`, `segDist()`, `quad()`, `fT()`, `furnBodies()`, `zoneLocal()`, `furnZones()`, `snapBox()`, `edt()`, `computeExt()`, `wallPieces()` | |
| analiza: `analyse()`, `analyseFurn()` | raster 50 mm, obrys, pomieszczenia, przejścia, kontrola mebli |
| widok, przyciąganie, miarka, przesuwanie | `fit()`, `snap()`, `measureSnap()`, `buildMovers()` |
| rysowanie | `drawWalls()`, `opShape()` (drzwi/okna/HS/przejście), `drawFurn()`, `drawRoof()`, `drawDims()`, `renderStats()`, `renderPass()` |
| panel, warstwy, zdarzenia, pasek górny | `renderPanel()`, `renderLayers()`, obsługa myszy/klawiatury, eksport/import |

### Model danych (`S`)

```js
S = {
  variant: 'E2',                     // klucz z VARIANTS; domyślny wariant
  walls: [{ id, x1,y1,x2,y2,        // OŚ ściany w mm; (0,0) = lewy górny narożnik lica zewn.; x → wschód, y → POŁUDNIE (w dół)
            t,                       // grubość mm (zewn. 200, działowe 150)
            ext,                     // ściana zewnętrzna
            layer,                   // warstwa ('' = główna)
            op: [{ id, type,         // 'door' | 'window' | 'slide' (przesuwne/HS) | 'open' (przejście bez drzwi)
                   pos,              // środek otworu, mm od początku ściany (x1,y1)
                   w,                // szerokość otworu
                   hinge,            // 0 = zawias od strony początku ściany, 1 = od końca
                   side }] }],       // 1 = skrzydło otwiera się w stronę normalnej n, -1 = przeciwnie
  rooms: [{ id, name, x, y, layer }],  // ETYKIETA = punkt startowy zalewania; powierzchnia liczona automatycznie
  furn: [{ id, key, name, x, y,     // środek mebla (mm)
           rot,                      // 0/90/180/270
           w, d,                     // szerokość wzdłuż frontu, głębokość
           layer, ref, parts,        // ref = element „z rysunku”, nie jest przeszkodą ani nie jest sprawdzany
           z: [ /* strefy */ ] }],
  hidden: [], nextId, set: {grid, pitch, overhang, rate, newT, newExt, minPass}, ui: {...}
}
```

**Kierunki (najczęstsze źródło błędów):**
- Normalna ściany: `d = (x2-x1, y2-y1)/L`, `n = (-d.y, d.x)`.
  - ściana pozioma rysowana w prawo (x rośnie): `n` wskazuje **południe** → `side: 1` = skrzydło na południe, `-1` = na północ,
  - ściana pionowa rysowana w dół (y rośnie): `n` wskazuje **zachód** → `side: 1` = na zachód, `-1` = na wschód,
  - ściany zewnętrzne w wariantach: górna →x, prawa ↓y, dolna ←x, lewa ↑y (dla dolnej `n` = północ = do środka, dla lewej `n` = wschód = do środka).
- Mebel: lokalne `+y` = **przód** (front). `rot: 0` → tył przy ścianie północnej, przód na południe;
  `90` → tył na wschód; `180` → tył na południe; `270` → tył na zachód.
- Łóżko: tył = wezgłowie. Strefy `left/right` = boki łóżka, `c0: 450` przycina je przy wezgłowiu (szafki nocne).

### Strefy mebli (`Z(s, d, l, opts)`)

| Pole | Znaczenie |
|---|---|
| `s` | strona: `front` / `back` / `left` / `right` (lokalnie) |
| `d` | głębokość strefy (mm) |
| `k` | `use` (musi być wolna i osiągalna przejściem), `unfold` (tylko wolna — np. rozłożona sofa), `info` (tylko podgląd, np. stół po rozłożeniu) |
| `st` | odsunięcie od mebla (np. dojście za rozłożoną sofą) |
| `ex` | poszerzenie w bok |
| `c0`/`c1` | przycięcie od początku/końca (narożniki zabudowy, szafki nocne) |
| `rect` | prostokąt w mm układu mebla (strefy nieregularne, np. narożnik L) |
| `strict` | „ścisła” — zajęcie > 3 % = problem (garderoba 100 cm) |
| `off` | strefa wyłączona w panelu |

### Kontrola (`analyseFurn`)

- Raster 50 mm. Ściany z wyciętymi drzwiami/przejściami = przeszkody, okna = ściana. Meble (bez `ref`) = przeszkody.
- **Przejście**: obszar osiągalny od drzwi zewnętrznych kołem o średnicy `set.minPass` (domyślnie 750 mm);
  przy drzwiach przejście jest wymuszone (drzwi 80–90 cm są OK).
- Mebel: **problem** gdy wchodzi w ścianę / poza budynek / w pole skrzydła drzwi / nachodzi na inny mebel,
  gdy strefa jest zajęta > 35 % (lub > 3 % przy `strict`), albo strefa `use` nie ma dojścia.
  **Uwaga** (pomarańczowa) gdy strefa zajęta 3–35 %.
- Pomieszczenia: zalewanie od etykiety (drzwi traktowane jak ściana). „⚠ brak dojścia” = brak przejścia w pomieszczeniu.

## 4. Jak dodać / zmienić wariant

1. Warianty buduje się w funkcjach `variantX()` przy pomocy `vb()`:
   - `W(x1,y1,x2,y2,t,{ext, op:[[type, środek_na_osi, szerokość, hinge, side], …]})` — **środek podajesz we współrzędnej
     wzdłuż ściany (x dla poziomych, y dla pionowych)**, `vb` sam liczy `pos`.
   - `R(nazwa, x, y)` — etykieta pomieszczenia (punkt musi leżeć wewnątrz pomieszczenia, nie w ścianie).
   - `F(key, x1,y1,x2,y2, rot, {name, z, parts, ref})` — mebel po prostokącie obrysu w świecie; `w/d` liczone z obrotu.
   - Pomocnicze modyfikatory stref: `zUnfold(n)`, `zAisle`, `zSvc(side)`, `zBed80`, `zLaundry`, `zIsland`, `zC0(n)`, `zC1(n)`; nazwy: `pax(cm)`, `LAUNDRY`, `PUFA`, `DEV`.
2. Dopisz wpis w `VARIANTS` (klucz, nazwa z wymiarami, `build`).
3. Starsze warianty: ściany zewnętrzne 200, oś 100 mm od lica. E2: zewnętrzne **412 mm**, osie przesunięte na zewnątrz o 106 mm, dotychczasowe wewnętrzne lica zachowane; tablica `buildUp` opisuje materiały od wnętrza. Wewnętrzne 150 mm w E2 to gotowa grubość z wykończeniem. Licz lica, nie osie, gdy sprawdzasz miejsce na meble.
4. Wnęka na szafę przy drzwiach: krótka ściana prostopadła (np. `W(5875,5650,5875,6350)`) obok ościeżnicy, szafa w lico.
5. **Po każdej zmianie geometrii wariantu podbij `LS`** (`ogrodniki-rzut-vNN`). Inaczej przeglądarka wczyta stary zapis z localStorage
   i zmiany nie będą widoczne. Uprzedź użytkownika, że ręczne edycje trzeba odzyskać z JSON.
   Dodanie nowego klucza wariantu, np. E2S, nie wymaga zmiany `LS`, jeśli istniejące warianty nie zmieniły geometrii — nowy klucz nie ma jeszcze starych zapisów.
6. Kopia wariantu (np. „E jako kopia D”): skopiuj funkcję, zmień nazwę i wpis w `VARIANTS`; nie modyfikuj oryginału.

## 5. Zasady pracy (wnioski z dotychczasowych sesji)

- **Geometria tylko z wektorów PDF** (`tools/pdf_extract.py`) albo z liczb od użytkownika — nigdy „na oko” z PNG
  (pierwszy odrys z PNG miał złe kierunki drzwi i wymyślone meble; użytkownik to wychwycił).
- Elementy niejednoznaczne oznaczaj jako `ref: true` z nazwą „… (do wyjaśnienia)” i **zapytaj** zamiast zgadywać.
- Każdą zmianę układu zweryfikuj kontrolą (§6). Cel: **0 problemów, wszystkie pomieszczenia osiągalne**; uwagi opisz użytkownikowi.
- Typowe pułapki znalezione przez kontrolę: skrzydło drzwi zahacza o mebel; szafa/sofa zwęża wejście do pokoju poniżej 75 cm;
  łóżeczko odcina dojście do boku łóżka; strefy w narożniku zabudowy kuchennej (użyj `c0/c1`); wyspa zamyka kuchnię.
- Raportuj liczby: obrys, pow. zabudowy, dach, szerokości przejść, szerokości drzwi (etykiety cm na rzucie).
- Komunikacja z użytkownikiem po polsku, konkretnie, z wymiarami. Nie zmieniaj nieproszonych wariantów.
- Polecenia diagnostyczne uruchamiaj z twardym limitem czasu: zwykle `timeout 30s`, test przeglądarkowy maks. 60 s. Dłuższe zadania dziel na etapy; nie czekaj 10 minut bez wyniku. `yield_time_ms` nie zastępuje timeoutu. Limit procesu nie obejmuje oczekiwania na zgodę lub uruchomienie narzędzia — nie ponawiaj zawieszonego żądania bez diagnozy.
- Wymagania (`wymagania-projektowe.md`) traktuj jako wiążące, ale część jest historyczna — w razie wątpliwości pytaj.
- Repozytorium jest **publiczne**: nie dodawaj danych identyfikujących działkę, właścicieli, dokumentów, kwot ani kontaktów.

## 6. Weryfikacja

1. Składnia: `python tools/check_js.py` → `SYNTAX_OK`.
   Szybka kontrola geometrii bez przeglądarki: `timeout 30s node tools/check_variant.js E2` (kolizje, dojścia, etykiety, miniatura; kod wyjścia 1 przy problemach). Opcjonalny trzeci argument zapisuje podgląd SVG.
   Kontrola uwzględnia również rozłożony stół 280 cm i 10 zajętych krzeseł. Raster 50 mm nie zastępuje wymiarowania wykonawczego ani analizy 3D; wyposażenie wbudowane (`equipment`) sprawdzane jest przez obrys całej zabudowy.
   E2S: `timeout 30s node tools/check_variant.js E2S` oraz `timeout 15s node tools/check_e2_south.js`.
   R1: `timeout 30s node tools/check_variant.js R1` oraz `timeout 15s node tools/check_r1.js`. Etykieta stanu stołu wynika z opcjonalnego `arrangements.label` (R1: 240 cm / 8 osób; E2/E2S: 280 cm / 10 osób).
2. Otwórz `edytor-rzutu.html` w przeglądarce (lokalnie lub przez narzędzie przeglądarki agenta), wklej `tools/browser_report.js`
   do konsoli i wywołaj `report('E')`. Sprawdź: „Meble z problemem 0 / N”, „Pomieszczenia bez dojścia brak ✓”.
3. Rzuć okiem na rzut (zrzut ekranu) — kontrola nie wykryje np. dziwnego układu czy nielogicznej funkcji.
4. Uwaga: w podglądzie z `data:` URL localStorage jest wyłączony — każde otwarcie buduje warianty od zera (to dobrze do testów).

Polecenia pomocnicze:

```bash
python tools/check_js.py
python tools/pdf_extract.py "Ogrodniki (2).pdf" > geometria.txt
python tools/render_pdf_tiles.py "Ogrodniki (2).pdf" 10000 -200 15400 5300 kafel.png 600
```

Na Windows w Git Bash długie heredoki z Pythonem potrafią się uciąć — zapisuj skrypty do pliku narzędziem do zapisu plików, potem uruchamiaj.

## 7. Funkcje edytora (dla użytkownika i do testów)

- Narzędzia: **V** zaznacz/przesuń (ściana przesuwa się prostopadle, sąsiednie się rozciągają), **W** ściana (liczba + Enter = długość),
  **D** drzwi, **O** okno, **P** etykieta pomieszczenia, **M** meble (biblioteka, **R** obrót), **L** miarka (przyciąga do narożników/krawędzi;
  Shift = poziomo/pionowo, Alt = bez przyciągania).
- Panel: właściwości ściany/otworu (typ: drzwi, okno, przesuwne/HS, przejście), mebla (wymiary, strefy, kontrola), warstwy.
- Pasek: wariant, podkład PDF (tylko rzut bazowy), wymiary, kolory pomieszczeń, dach, strefy, przejścia, siatka, JSON, PNG, Reset (bieżący wariant).
- Statystyki: obrys, pow. zabudowy, obwód, zwartość, pow. pomieszczeń, ściany; dach kopertowy (kąt, okap, pow. połaci, kalenica);
  komunikacja (wejście, meble z problemem/uwagami, pomieszczenia bez dojścia); koszt = stawka zł/m² × pow. zabudowy (stawkę wpisuje użytkownik).
- **▦ Warianty**: nakładka z miniaturami wszystkich wariantów (rzut, wymiary, pow. zabudowy, wynik kontroli); klik = otwarcie wariantu.
  `thumbFor(v)` tymczasowo podmienia globalne `S`/`A`/`EXT`, liczy `analyse()` i rysuje uproszczony SVG — po zmianach w `analyse()` sprawdź, że miniatury działają.
- **Telefon / dotyk**: dwa palce = zoom i przesuwanie (`startPinch`/`doPinch`), jeden palec na pustym polu = przesuwanie widoku.
  Przycisk **Podgląd** (`viewOnly`, domyślnie włączony na urządzeniach z `pointer: coarse`): przeciągnięcie zawsze przesuwa widok,
  stuknięcie zaznacza element i otwiera panel — rzutu nie da się przypadkiem zmienić palcem. Na wąskim ekranie (≤ 800 px) pasek górny
  przewija się poziomo, panel boczny jest ukryty (przycisk **Panel**), miniatury są w jednej kolumnie.
- Test dotyku w przeglądarce agenta: wysyłaj `PointerEvent` z `pointerType:'touch'` na `#cv` (kilka `pointerId` = kilka palców);
  `setPointerCapture` jest owinięte w `capture(e)`, bo dla syntetycznych zdarzeń rzuca wyjątek.

## 8. Publikacja

Repozytorium: https://github.com/bartas93/Ogrodniki-rzut (publiczne). GitHub Pages z gałęzi `main`, katalog główny:
https://bartas93.github.io/Ogrodniki-rzut/ — `index.html` przekierowuje na edytor. Zmiany trafiają na stronę po `git push`.
Prywatne notatki i model Revit są w `.gitignore`; przed każdym commitem sprawdź `git status`, czy nie dodajesz danych wrażliwych.


### Publikacja przy niedziałającym Git w środowisku

Jeżeli Git nie dociera do proxy, a integracja GitHuba działa, zapisuj pliki etapami: `github_create_blob` osobno dla każdego zmienionego pliku, następnie `github_create_tree` z małymi wpisami `{path,mode,type,sha}` zamiast pełnego `content`, `github_create_commit` i `github_update_ref` z `expected_sha` bieżącego `main` oraz `force:false`. Zweryfikuj nowy HEAD po aktualizacji. Przed zapisem porównaj SHA blobu z `git hash-object plik`. Duże zbiorcze wywołania create_tree z pełną zawartością wcześniej nie zwracały wyniku; zapis pojedynczego HTML przez create_blob został sprawdzony. Każdy etap ma osobny limit oczekiwania; po niejednoznacznym wyniku najpierw sprawdź stan zdalny. Sukces aktualizacji main nie oznacza jeszcze potwierdzonego wdrożenia Pages. Diagnostyka 10.11.2026: create_blob działa dla małego pliku i całego HTML; create_tree również z samymi SHA, update_file i create_commit nie zwróciły wyniku w limitach 15–20 s. Nie traktuj ścieżki etapowej jako potwierdzonego rozwiązania, dopóki HEAD main faktycznie się nie zmieni. Ponawianie tych samych operacji bez nowych danych nie rozwiązuje problemu.


### R2/R3, linki i ID (11.11.2026)

R2 i R3 mają zamrożone, osobne konstruktory oparte na siatce R1; nie zastępuj ich wywołaniem `variantR1()`. R2 zmienia pas zaplecza i kuchnię; R3 odbija cały plan wschód–zachód. Opis: `R2-R3-koncepcje.md`. Testy: `tools/check_r2_r3.js` i `tools/check_variant.js R2/R3`.

`variantFromUrl()` wybiera E2 bez poprawnego parametru; `switchVariant()` zapisuje poprzedni wariant i aktualizuje adres oraz historię. `index.html` zachowuje query/hash. Zapis v24 i migracja z v23 pozostają; nowe warianty nie resetują starych.

ID korzystają z istniejących `id`, a wyposażenie otrzymuje lokalne `equipment[].id` oraz `nextEquipmentId` w `defaults`. Nie przeliczaj numerów z indeksów tablicy; zachowuj je przy zmianie konstruktorów. `elementRecords`, `findElement`, `drawIds` obsługują wyszukiwanie i widoczne oznaczenia. `nextId` musi być większe od wszystkich istniejących numerów także przy imporcie JSON. Test UI: `timeout 60s node tools/check_browser.js` (Playwright + Chromium), obejmuje telefon 412 px, zapis, schowek i eksport.

Sprawdzona 11.11.2026 droga sieciowa: sandbox nie łączy się z `proxy:8080`, ale zatwierdzone polecenie poza sandboxem poprawnie wykonuje `git ls-remote` i `git fetch` przy zachowanym proxy/TLS. W pierwszej kolejności stosuj tę udokumentowaną ścieżkę środowiska zamiast zakładać awarię całej sieci. Sam udany odczyt nie potwierdza uwierzytelnienia push.


### Miarka na telefonie

Miarka dotykowa działa również przy `viewOnly`. `pointerdown` tworzy kandydat stuknięcia (`ptr.measureTap`), a punkt jest przyjmowany dopiero na `pointerup`, jeśli palec nie przesunął się o więcej niż 6 px. Przeciągnięcie przesuwa widok, drugi palec odrzuca kandydat i rozpoczyna pinch; oba gesty zachowują wcześniej wybrany punkt A. Nie przenoś zatwierdzania punktu na `pointerdown`, bo doda to przypadkowe pomiary podczas zoomu. Pasek `measureBar` pokazuje wynik i przyciski bez otwierania panelu. Test regresji: `timeout 60s node tools/check_mobile_measure.js` (Playwright + Chromium); sprawdza też niezmienność zapisanego projektu i obsługę myszy.


### Aktualne E2-M75 — U w salonie (11.11.2026)

Najnowszy §14 wymagań zastępuje wcześniejsze ustawienie M75 z §11: sofa obrócona do `rot:0`, korpus x=200–2200, y=6270–7240 mm. Górne ramię U otwartego na TV na wschodzie. M76 i wszystkie inne obiekty bez zmian. Między korpusami 46 cm (nie przejście), po rozłożeniu sofy 3 cm; dojście do sofy od wschodu w pasie 60×140 cm. Test `check_e2_november.js` obejmuje także równoczesne rozłożenie i migrację.

Aktualny zapis **v25**. `loadSavedVariant` najpierw odczytuje v25; z v24 migruje tylko geometrię/strefy/opis E2-M75 (zachowuje nazwę, warstwę, wymiary i wszystkie inne edycje), a z v23 nadal aktualizuje pięć wcześniejszych obiektów. Nie kasuje dawnych zapisów. Inne warianty przenoszone bez zmian; import JSON odtwarza plik. Testy przeglądarkowe używają bieżącego v25. Nie resetuj całych wariantów przy drobnej zmianie geometrii.


### Aktualne korekty sześciu punktów E2 — zapis v26

Najnowszy §15 wymagań zastępuje wcześniejsze położenia: usuń O3, M101 do północy, M143 do rogu SW gabinetu, O52 do sypialni wzdłuż południowej ściany, M117 do SE pokoju 2 i M116 do SW, M74 wschód–zachód. `applyE2NovemberRoomEdits` działa na istniejących ID po zbudowaniu E2 i podczas migracji; nie zmieniaj z tego powodu innych konstruktorów ani nie przeliczaj numerów po usunięciu O3. Przy 10 krzesłach stół ma układ 5+5 (ciasne 56 cm na osobę), co chroni legowiska i przejście 80 cm od wschodu. Zostały ostrzeżenia M101 12% + trzy PAX; po rozłożeniu M117 także strefa krzesła M116 17%.

Aktualny `LS` to **v26**, odczyt starszych: v25, v24, v23. Z v25 migrowane są tylko O3/O52 i M74/M101/M116/M117/M143; ręczne edycje M75 pozostają. V24/v23 najpierw otrzymują poprzednie poprawki, następnie aktualne. V26 ma pierwszeństwo i nie podlega ponownej migracji; oryginały nie są kasowane. Nazwy, warstwy, wymiary i pozostałe obiekty są zachowywane. `tools/check_e2_room_updates.js` sprawdza ID, geometrię, zakres migracji, pięć rozłożonych miejsc spania oraz stół, także jednocześnie.


### Zlicowanie S42 — zapis v27

Najnowszy §16: S42 kończy się na osi S54 (x=13725, y=5650), zamiast x=14025. `alignE2Wall42` działa po konstruktorze E2 i przy odczycie starszych zapisów. `computeExt` wyrównuje zewnętrzne lico połączenia na x=13800. Otwory/ID bez zmian. Aktualny zapis v27, starsze klucze v26/v25/v24/v23. Migracja z v26 dotyka wyłącznie x2 S42 — nie wywołuj ponownie `applyE2NovemberRoomEdits` dla v26. Test zakresu migracji i lic narożnika jest w `tools/check_e2_room_updates.js`. Wyspy nie przesuwano; pytanie o ergonomię było prośbą o poradę.


### Wyspa M73 — zapis v28

Najnowszy §17: wyspa 170×90 (+30 cm), x=2100–3800, y=2100–3000 mm. `enlargeE2Island` działa tylko dla M73 typu island w E2. Północ/zachód: 130 cm do zabudowy; wschód: 90 cm; stół zamknięty: 135 cm, rozłożony z 10 krzesłami: 75 cm. Nie zmieniaj stref ani progów kontroli.

Aktualny zapis **v28**; odczyt v27/v26/v25/v24/v23. Z v27 migruje tylko M73: szerokość, x/y i aktualny opis (własna nazwa i notatki zachowane). Nie powtarzaj z v27 ani wcześniejszego skrócenia S42, ani sześciu korekt mebli. Starsze wersje otrzymują tylko należne migracje. Test `tools/check_e2_island.js` sprawdza prześwity, zakres migracji, priorytet v28 i niezależność wariantów.


### Okno O5 — zapis v29

Najnowszy §18: O5 pralni poszerzone 90 -> 120 cm. Środek x=8600, wysokość/parapet po 120 cm bez zmian, 30 cm ściany do O4 i 49,8 cm do wysokiego PAX. `enlargeE2Window5` modyfikuje wyłącznie `w` istniejącego O5 typu window, w E2. Aktualny zapis v29, starsze v28/v27/v26/v25/v24/v23. Z v28 nie ponawiaj zmian wyspy, ściany ani wcześniejszych mebli. Własne edycje v29 mają pierwszeństwo; nie odtwarzaj usuniętego O5. Test szerokości, odstępów i zakresu migracji: `tools/check_e2_room_updates.js`.
