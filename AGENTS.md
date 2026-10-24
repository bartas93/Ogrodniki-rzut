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
| `tools/browser_report.js` | Raport kontroli wariantu do uruchomienia w przeglądarce (patrz §6). |

## 2. Najważniejsze decyzje i preferencje użytkownika (stan na 2026-10-23)

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
- Aktualnie rozwijany jest **wariant E** (pochodna D) i jego udoskonalenia **E1–E4**. Pozostałe warianty zostają do porównania — nie zmieniaj ich bez prośby.
  - `variantE(o)` przyjmuje opcje: `exit` (drzwi z pralni do ogrodu + miejsce na suszarkę), `baths` (prysznic + WC dla gości
    przy salonie, wanna przy sypialniach), `office` (gabinet od północy, pokój 3 od południa). E3 = `{baths}`, E4 = wszystkie trzy.
  - `variantE2()` to osobna funkcja: wyjście z pralni oraz poprawki z 24.10.2026 opisane w §7 `wymagania-projektowe.md` (wanna w łazience o szerokości 195 cm, walk-in przy salonie, zabudowy, biurka 140×70, okap 1 m). Nie przenoś tych zmian do E/E1/E3/E4.
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
  variant: 'E',                      // klucz z VARIANTS
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
3. Ściany zewnętrzne: grubość 200, oś 100 mm od lica; działowe 150 (lica ±75). Licz lica, nie osie, gdy sprawdzasz miejsce na meble.
4. Wnęka na szafę przy drzwiach: krótka ściana prostopadła (np. `W(5875,5650,5875,6350)`) obok ościeżnicy, szafa w lico.
5. **Po każdej zmianie geometrii wariantu podbij `LS`** (`ogrodniki-rzut-vNN`). Inaczej przeglądarka wczyta stary zapis z localStorage
   i zmiany nie będą widoczne. Uprzedź użytkownika, że ręczne edycje trzeba odzyskać z JSON.
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
