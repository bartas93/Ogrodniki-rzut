# Audyt Projektu Głównego — 12.11.2026

[Edytor domu](https://bartas93.github.io/Ogrodniki-rzut/) · [Kuchnia 3D](https://bartas93.github.io/Ogrodniki-rzut/kuchnia3d.html) · [Plan szafek i źródła Castoramy](kuchnia3d-plan.md)

**Werdykt ponownego review:** projekt ma sensowny program i zachowane dojścia, ale **nie jest gotowy do zamawiania zabudów i stolarki**. Precyzyjna kontrola wykryła trzy rzeczywiste penetracje ścian przez PAX, niewidoczne w standardowej kontroli rastrowej. Ponadto pozostają istotne ograniczenia suszarki, spania w salonie, ościeżnicy O43 i otwierania wyposażenia. Poniżej oddzielono wykazane błędy, kompromisy użytkowe i kwestie niepotwierdzone.

**Audytowana baza:** Projekt Główny / E2, rewizja zapisu v34, publiczny commit `0511b4f0e4e4647fc9f71eb19b2c6eb40c8a4da1`, zgodny z `origin/main` przed tym review. Obejmuje domyślną geometrię aplikacji, **bez dostępu do prywatnych zmian zapisanych wyłącznie w przeglądarce użytkownika**. Układu domu podczas review nie zmieniano; propozycje poniżej nie są zatwierdzonymi zmianami.

[Pełne wyniki pomiarów i scenariuszy w JSON](audyt-projekt-glowny.json) zawierają SHA256 audytowanego pliku edytora. Snapshot jest dowodem tego review; przyszłe zmiany rzutu wymagają jego ponownego wygenerowania.

**Wynik kontroli rastrowej 50 mm:** wszystkie 12 opisanych pomieszczeń dostępne od głównego wejścia O10; w stanach codziennym, dwóch hokerów i stołu dla 10 osób brak problemów wykrywanych przez ten kontroler. W stanie codziennym dziewięć mebli ma uwagi, przy stole dla 10 osób — dziesięć. **„0 problemów” w panelu nie obejmuje trzech błędów 23 mm ujawnionych poniżej.** To ograniczenie kontroli, nie dowód poprawnego montażu domu.

## Najpierw do rozwiązania

| Kolejność | Ustalenie | Ocena i zalecenie |
|---|---|---|
| 1 | **M103/S35, M115/S48, M141/S8: po 23 mm mebla w ścianie** | Potwierdzony błąd geometrii. Przeprojektować trzy zestawy PAX z zapasem na montaż i otwarcie frontów. Samo przesunięcie pojedynczego korpusu powoduje kolizję z sąsiednim |
| 2 | **O43: po 25 mm ściany przy otworze** | Otwór i modelowe światło istnieją, lecz typowa szeroka opaska może się nie zmieścić. Dobrać system i detal narożników przed murowaniem; nie powiększać otworu w ciemno |
| 3 | **M89: rozstawiona suszarka odcina O4** | Potwierdzony problem użytkowy, wcześniej zaakceptowany. Złożyć ją przed obsługą prania/PAX i wyjściem albo zaprojektować suszenie poza tym pasem |
| 4 | **M75/M76: pola spania nachodzą na siebie 40 cm** | Jednoczesne spanie niepotwierdzone. Najpierw ustalić model i mechanizm narożnika; nie zakładać dwóch równocześnie rozłożonych łóżek |
| 5 | **Piekarnik między słupkami** | Brak sąsiadującego blatu na gorącą blachę; wyspa po drugiej stronie przejścia 120 cm. Zaprojektować rzeczywiste miejsce odkładcze lub zmienić kolejność zabudowy |
| 6 | **Nawis wyspy 40 cm** | Wymaga dobranego podparcia i mocowania. Wymiary i render nie potwierdzają nośności |
| 7 | **Urządzenia techniczne: tylko 20 mm między symbolicznymi zbiornikami** | Niepotwierdzona wykonalność instalacji i wymiany. Dobór modeli, izolacji, rur i serwisu ma pierwszeństwo przed maksymalizowaniem regałów |
| 8 | **Fronty pralni i otwarte drzwi łazienek** | Potwierdzone przewężenia podczas używania: 32,5 cm przy dwóch przeciwległych frontach PAX i około 38 cm przy łazienkowym skrzydle w korytarzu. Użytkowanie naprzemienne lub zmiana rozwiązania |

## Nowe ustalenie: szafy nie mieszczą się w trzech wnękach

Sprawdzono przecięcia prostokątów mebli z gotowymi licami ścian w milimetrach, niezależnie od rastra i od przycięcia kontrolowanego obrysu o 20 mm. Dla ścian osiowych uwzględniono wycięcia drzwi i przejść. Nie stwierdzono innych dodatnich przecięć korpus–korpus w stanie codziennym.

| Pokój / zestaw | Gotowa wnęka x [mm] | Obrys zestawu x [mm] | Dostępna / zajęta szerokość | Wynik |
|---|---|---|---|---|
| Pokój 3, M102 + M103 | 10950–12700 | 10975–12723 | 1750 / 1748 mm | M103 wchodzi w S35 o 23 mm na głębokości 600 mm |
| Pokój 2, M114 + M115 | 5950–7700 | 5975–7723 | 1750 / 1748 mm | M115 wchodzi w S48 o 23 mm na głębokości 600 mm |
| Gabinet, M139 + M140 + M141 | 14950–17200 | 14975–17223 | 2250 / 2248 mm | M141 wchodzi w wewnętrzne lico S8 o 23 mm na głębokości 600 mm |

W każdym zestawie pozostawiono 25 mm od lewej, ale na oba końce łącznie jest tylko 2 mm wolnej szerokości. Przesunięcie **całego** zestawu o 23 mm w lewo usuwa matematyczne przenikanie, lecz daje 2 mm z lewej i zero z prawej. To nadal niewiarygodny zapas na krzywiznę ścian, montaż, blendę i otwarcie drzwi przy narożniku. **Nie rekomenduję takiej korekty jako rozwiązania wykonawczego.** Nie należy też zwężać wymiaru sklepowego PAX w edytorze.

Rozsądne kierunki: w pokojach zmiana zestawu 100+75 na 100+50, w gabinecie 100+75+50 na 100+50+50; odzyskane około 25 cm wykorzystać na zapasy montażowe/blendy lub dodatkowy otwarty schowek. Alternatywą jest powiększenie wnęk albo zabudowa na wymiar. Dobór frontów i wymaganego luzu musi poprzedzać ostateczne rozstawienie korpusów. To propozycje do decyzji, **bez utraty obecnych zapisanych edycji i bez wdrożenia zmian w rzucie**.

Te błędy są odrębne od trzech uwag M118/M119/M120 o 25% strefy przy ścianie. Tam niezależna kontrola nie wykazała przenikania korpusu; ostrzeżenie strefy wynika z sposobu zamykania regionów rastrem przy otwartym przejściu O44.

## Review pomieszczenie po pomieszczeniu

| Obszar | Co działa | Problemy i zalecenia |
|---|---|---|
| **Wejście / wiatrołap, 5,85 m²** | Siedzisko 80 cm, duża szafa przesuwna 225×65; wejście bez przechodzenia przez kuchnię; techniczne dostępne z wiatrołapu | Skrócenie ławki zmniejszyło miejsce do jednoczesnego rozbierania dzieci. Nie ma osobno wymiarowanego ociekacza na mokre buty i wieszania mokrych kurtek — wyznaczyć je bez zajmowania przejścia. Drzwi O10 otwierają się na zewnątrz: podest, stopnie, zadaszenie i próg pozostają niezweryfikowane |
| **Hol i korytarz** | Nominalny pas 120 cm; pokoje i gabinet dostępne z części suchej | Skrzydła łazienek zwężają go do około 38 cm. To świadomie zachowany kompromis, ale niewygodny przy dzieciach i nocnym użytkowaniu. Rozważyć wnękę albo odpowiednie drzwi przesuwne; nie odwracać ich po prostu do łazienki. O43 i pozostałe ciasne opaski do detalu |
| **Salon** | Układ U, TV na wschodzie, zachowane podejście do HST w sprawdzonych stanach | M75 i M76 oddziela miejscami 3 cm — nie jest to przejście ani bezpieczny zapas ruchu mechanizmów. Nakładanie rezerw spania 40 cm. M75 skierowana na południe ma TV z boku; sprawdzić komfort oglądania z konkretnego miejsca. Stolik częściowo zabiera dojście do narożnika. Wymiary ramion i wysokości oparcia M76 nadal poglądowe |
| **Jadalnia** | Stół złożony 160×90; stany stołu i hokerów rozpatrywane osobno zgodnie z decyzją użytkownika | 10 miejsc to układ 5+5 po 56 cm na osobę, bez miejsc przy krótszych bokach; ciasny wariant okazjonalny. Do M75 tylko 70 cm od południowej krawędzi zamkniętego stołu, mniej niż jego rezerwa krzeseł 90 cm. Po zajęciu krzeseł nie zakładać pełnej drogi za plecami. Wygodniejszy codzienny cel: 4–6, okazjonalnie 8; dla 10 potrzebne przestawienie |
| **Kuchnia** | Robocze przejścia 120/120 cm, 100 cm od wschodu; trójkąt i blat przygotowania opisane niżej | Brak blatu obok piekarnika; konflikt pracy otwartych frontów; 40 cm po prawej od płyty ma pozostać wolne. Drzwi O23 i otwarty front końcowego słupka wymagają wspólnego sprawdzenia, nie tylko kontroli zamkniętych korpusów. Potwierdzić wentylację lodówki/płyty i podparcie wyspy. Airfryer/toster/grill nadal bez konkretnego miejsca — nie zabierać im automatycznie blatu przygotowania |
| **Spiżarnia, 4,07 m²** | Regały po dwóch stronach, boczny blat, przejście około 100 cm; dostęp bezpośrednio z kuchni | 60 cm głębokości półek utrudnia dostęp do tylnych zapasów i widoczność dat. Rozważyć płytsze półki na drobne produkty, głębokie na większe pojemniki. O23 otwiera się do części dziennej, więc nie zastawia spiżarni, lecz wymaga wolnego pola po stronie kuchni. Bez okna potrzebuje zaprojektowanej wentylacji; nie jest automatycznie chłodnym magazynem |
| **Łazienka z prysznicem, około 5,1 m²** | Kabina 130×90, WC obok umywalki; korpusy mieszczą się po zwężeniu pomieszczenia | Przed kabiną geometrycznie 77,5 cm do południowej ściany; wystarczy tylko przy dopasowanym wejściu i braku skrzydła w tym pasie. Dobrać zamknięcie przesuwne/składane i faktyczne światło wejścia. Przed WC około 94,5 cm do ściany; pas stelaża 90 cm, ale strefa użytkowa kontrolera ma 80 cm szerokości — nie mylić tych wielkości. Wentylacja, transfer powietrza, miejsce na ręcznik i rewizje do rozrysowania |
| **Pralnia, 12,83 m²** | PAX płytkie 100+50 oraz głębokie szafy; zlew, pralka, suszarka, robot; zamknięty główny pas 132,5 cm | Najwięcej konfliktów ruchomych elementów w domu: M89 blokuje wyjście i obsługę urządzeń; dwa przeciwległe fronty zostawiają 32,5 cm; O29 może krzyżować się z dolnym frontem. 90 cm między blatem M88 a frontami M90/M91 również wymaga otwierania naprzemiennego. Sprawdzić wyjmowanie urządzeń i ścieżkę ich wynoszenia, nie tylko miejsce przed pralką. Brak sprawdzonego miejsca na rozłożoną deskę do prasowania |
| **Kotłownia / gospodarcze, 8,99 m²** | Brodzik dla psa, cztery regały i dostęp od wejścia; przewężenie 85 cm | 20 mm pomiędzy symbolicznymi urządzeniami to największa niepewność techniczna, nie potwierdzone miejsce na osprzęt. Modele rekuperatora i źródła ciepła mogą wymusić redukcję regałów. Sprawdzić wysunięcie filtrów, armaturę, demontaż, odpływ brodzika i ograniczenie hałasu do pokoju 3. Zapasów nie składować w polu serwisowym |
| **Pokój 3, 12,44 m²** | Biurko 140×70, sofa i wnęka na ubrania; spanie zachowuje dojście | M103 przenika ścianę. Oś O6 jest 55 cm na prawo od osi biurka; obecna relacja nie jest symetryczna. Biurko zabiera 12% strefy sofy. Dla stałego pokoju dziecka ocenić wygodę i trwałość codziennego spania na sofie oraz miejsce na zabawę; to nie jest w pełni sprawdzony układ z osobnym łóżkiem |
| **Pokój 2, 12,02 m²** | Biurko 140×70 w rogu, sofa przy wschodniej ścianie; wyposażenie dostępne także po rozłożeniu | M115 przenika ścianę. Przy spaniu M117 około 17% strefy krzesła zajęte; jednoczesna nauka i pełne rozłożenie łóżka niewygodne. Biurko ustawione przy bocznej ścianie ma okno z boku, nie nad całą powierzchnią. Ocenić miejsce na normalne łóżko i zabawę odpowiednio do wieku |
| **Sypialnia, 13,81 m²** | Łóżko 180×200 z ramą 190×210, nominalne dojścia po 80 cm, garderoba dostępna | Między stopą łóżka a łóżeczkiem tylko 5 cm: trzeba obchodzić bokiem. Od łóżeczka do TV 80 cm; pełna droga przed stopą łóżka nie istnieje. Warto sprawdzić wariant bez łóżeczka i docelowe odkładanie rzeczy, ładowarki oraz przewijanie. O45 ma już wystarczający otwór w modelu, lecz opaska przy 7,5 cm wymaga doboru |
| **Łazienka z wanną, około 4,9 m²** | Wanna 180×80, umywalka 60, strefa WC szerokości 90 cm zachowana | Po ostatnim przesunięciu wanny odstęp jej korpusu od umywalki wynosi **102,5 cm**, nie dawne 92,5. Wzdłuż WC jest miejsce, lecz nie rozrysowano grzejnika, kosza i wieszaków — nie dodawać ich w strefę 90 cm. Dobrać rewizję syfonu i baterię do wybranej wanny; samo obrysowanie półek nie zapewnia dostępu serwisowego |
| **Garderoba, 3,60 m²** | Układ L i przejście nominalne 100 cm zachowane po skróceniu; końcowy regał 40 zamiast niepasującego PAX50 | 100 cm dotyczy zamkniętych frontów; front 50 cm zmniejsza lokalny pas do około 50 cm. Sprawdzić kąty otwarcia narożnika i wyjmowanie koszy. Lustro i sejf nie mają osobno potwierdzonego miejsca. Nie traktować blend jako schowków |
| **Gabinet, 11,97 m²** | Osobne wejście z holu, biurko 140×70, sofa pod południowym oknem; spanie dostępne | M141 przenika zewnętrzną ścianę od wnętrza. Rozłożona M143 zajmuje około 18% strefy krzesła M142. Parapet 90 cm porównać z oparciem sofy; dolne FIX ogranicza kolizję, ale mycie okna wymaga dostępu. Wschodnie okno przy monitorze wymaga osłon przeciw olśnieniu |

Powierzchnie z rastra służą porównaniu pomieszczeń; suma niezaokrąglonych regionów to **około 140,3 m²**, podczas gdy **189,36 m²** to powierzchnia zabudowy. Wymaganie „180–200 m²” było preferencją bez jednoznacznie ustalonego rodzaju powierzchni. Jeżeli miało oznaczać powierzchnię użytkową, ten projekt jej nie osiąga; nie należy porównywać 189,36 m² zabudowy z takim celem. Normowy obmiar, progi i rozliczenie stref wymagają osobnego zestawienia projektowego.

## Scenariusze używania — wynik powtórzonej kontroli

Poniższa tabela dotyczy kontrolera rastrowego; **trzy penetracje PAX pozostają niezależnie od pozytywnego wyniku tej tabeli**. „Uwagi” oznaczają liczbę mebli z uwagami, nie liczbę wszystkich komunikatów.

| Stan | Problemy rastrowe | Meble z uwagami | Pomieszczenia bez dojścia od O10 |
|---|---|---:|---:|
| Stół złożony, hokery odstawione | 0 | 9 | 0 |
| Dwa zajęte hokery, stół nieużywany | 0 | 9 | 0 |
| Stół 280 cm / 10 zajętych miejsc, hokery odstawione | 0 | 10 | 0 |
| Rozłożona M75 / M101, każda osobno | 0 | 9 | 0 |
| Rozłożona M117 / M143, każda osobno | 0 | 10 | 0 |
| M75 + M101 + M117 + M143 jednocześnie | 0 | 11 | 0 |
| Zachowawcza rezerwa M76, osobno lub z M101/M117/M143 | Pole rozkładania zamkniętej M75 zajęte w 58%; nie potwierdza jednoczesnego rozłożenia M75 | 9 / 11 | 0 |
| Próba M75 + zachowawcza rezerwa M76 jednocześnie | Dwie testowe bryły spania nachodzą na siebie; oczekiwany negatywny wynik | 9 | 0 |
| M89 jako rzeczywista przeszkoda | Obsługa M88/M90/M91 zablokowana w 37/87/81%; wyjście O4 niedostępne drogą 75 cm | Nie jest stanem bezproblemowym | Pralnia osiągalna, wyjście ogrodowe odcięte |

Nie sprawdzono rzeczywistych ruchów wszystkich frontów, uchwytów i okuć w 3D ani przenoszenia dużych przedmiotów przez zakręty. Dostęp kołem 75 cm nie oznacza swobodnego mijania dwóch osób, drogi dla wózka ani możliwości wyniesienia dowolnego zasobnika.

## Wcześniejsze poprawki obecne w audytowanej bazie

| Element | Wynik |
|---|---|
| O23 spiżarni | Skrzydło do kuchni/salonu, zawias od południa; odkłada się od strony salonu, poza północnymi szafkami |
| M71 / M72 | Nowy słupek 60 za piekarnikiem; E3 niska szafka z blatem 40; końcowe E6 to słupek 60, przed nim nowy otwarty regał dolny 40 z blatem (E7). Numery istniejących modułów zachowane |
| O21 / O20 na zachodzie | Środki obniżone o 60/70 cm: y3600/y5350. Wyjście poniżej nowego słupka; legowiska przesunięte o 55 cm pod obniżone okno, poza łuk drzwi |
| M80 / M81 spiżarni | Regały 2×90×60 jak M82 oraz blat 90×60 zamiast regału |
| O29 pralni | Środek x9600: przesunięcie o 20 cm w prawo |
| O45 sypialni | Usunięte nakładanie otworu na S50; środek x10975 (+17,5 cm), otwór100 cm i rezerwa światła90 cm |
| Garderoba / łazienka | Ściana przesunięta10 cm na południe; garderoba krótsza, łazienka dłuższa. Przejście100 cm zachowane. PAX50 na końcu zastąpiony regałem40, żeby pozostawić blendy i tolerancje |
| M143 | Sofa obrócona dłuższym bokiem pod południowe okno, rozkłada się na północ |
| Kotłownia | Urządzenia i brodzik zachowane. Cztery regały:90×60,50×60 na zachodzie,90×50 na południu i 40×35 na wschodzie. Przewężenie do brodzika85 cm; narożnik obsługi częściowo wspólny |
| M113 / O39 | Ławka80 cm, lewy koniec bez zmian; O39 przesunięte40 cm w lewo do x16300. Między końcem ławki i początkiem otworu10 cm |
| Robot | Przeniesiony do pralni przy boku M91; rezerwa40×45 cm, front na wschód,110,2 cm do przeciwległych szaf. Nowy domyślny ID M147; wyszukanie dawnego E2-M113-E1 prowadzi do nowego miejsca |
| O6 | Okno pokoju3 przesunięte50 cm w prawo, środek x12200; wymiary i wysokości bez zmian |
| M83 | Położenie oraz 130×90 bez zmian, etykieta i symbol kabiny zamkniętej; przesuwne/składane drzwi do doboru |
| M73 | Blat170×100 cm,120 cm do zabudowy północnej i zachodniej,100 cm od wschodu. Dwa hokery od jadalni, nawis40 cm; bez tylnych szafek w miejscu na nogi |

## Drzwi — otwór a światło

Wcześniejszy rysunek używał jednej szerokości do otworu i skrzydła. Teraz `w` opisuje **otwór budowlany**, a model uwzględnia po 50 mm rezerwy na ościeżnicę i montaż z każdej strony oraz 50 mm u góry. Pole skrzydła ma dodatkowe20 mm względem światła, jako przybliżenie przylgi. Ościeżnice są przeszkodami dla przejścia. Etykiety na rzucie pokazują światło z oznaczeniem „św.”, panel pokazuje oba wymiary i ostrzeżenia narożników. Zmniejszenie otworu poniżej minimum jest wykrywane.

Przyjęte minimum porównawcze:80 cm do pomieszczeń i 90 cm wejście główne, wysokość światła co najmniej200 cm. Podstawa: [WT, §62, §75, §79 — tekst jednolity](https://eli.gov.pl/api/acts/DU/2022/1225/text.html). Potwierdzenie przepisów właściwych dla daty realizacji oraz doboru stolarki pozostaje częścią projektu wykonawczego. Światło modelowe nie jest potwierdzeniem rzeczywistego światła dowolnego produktu.

| ID | Otwór budowlany [cm] | Światło modelu [cm] | Wysokość światła [cm] | Odcinek do sąsiednich ścian/otworów [cm] |
|---|---:|---:|---:|---|
| O4 | 90 | 80 | 205 | 5 / 20 |
| O10 | 100 | 90 | 205 | 30 / 72.5 |
| O21 | 100 | 90 | 225 | 50 / 290 |
| O23 | 90 | 80 | 205 | 65 / 65 |
| O28 | 90 | 80 | 205 | 125 / 95 |
| O29 | 100 | 90 | 205 | 60 / 70 |
| O30 | 90 | 80 | 205 | 5 / 5 |
| O39 | 90 | 80 | 205 | 90 / 45 |
| O41 | 100 | 90 | 205 | 100 / 65 |
| O43 | 90 | 80 | 205 | 2.5 / 2.5 |
| O45 | 100 | 90 | 205 | 7.5 / 7.5 |
| O46 | 90 | 80 | 205 | 5 / 100 |
| O52 | 90 | 80 | 205 | 65 / 5 |
| O58 | 90 | 80 | 205 | 5 / 5 |

**O45:** wcześniej otwór x10350–11250 nachodził na gotowe lico S50 kończące się na x10400. Nowy otwór x10475–11475 leży między licami10400 i 11550; pozostaje po 7,5 cm. Rezerwa światła90 cm jest wolna od innych ścian. Trzeba dobrać opaskę i mocowanie do tych7,5 cm; szeroki dekoracyjny zestaw może nie pasować.

**O43 — najwyższy priorytet przy doborze ościeżnicy:** zatoka między gotowymi licami ma 95 cm, otwór90, pozostaje po 2,5 cm. Nie ma zapasu na dowolną opaskę. Dla porównania katalog PORTA SYSTEM 80 podaje otwór88 cm i światło80,2 cm, a wymiar zewnętrzny zestawu z opaską może wynosić94,6 cm: w zatoce95 cm zostałoby tylko2 mm z każdej strony! To wymaga konkretnego rozwiązania bez szerokiej opaski, detalu przy narożniku lub zmiany krótkiej ścianki/wnęki. Samo zwiększanie dziury pogorszy problem. **Nie traktować O43 jako gotowego do zamówienia.** Źródło wymiarów: [katalog PORTA 2026, tabele wymiarów](https://www.porta.com.pl/phavi/at/upl/2026/0414/0412-pl_katalog-porta-2026.pdf). Wymiar88 cm z katalogu nie oznacza, że każdy produkt „80” pasuje do każdego otworu90 cm.

**Inne ciasne miejsca:** O4 ma 5 cm do narożnika, O30 po 5 cm, O46 po stronie zachodniej5 cm, O52 przy południowej ścianie5 cm, O58 po 5 cm. Minimalne światło jest zachowane w przyjętym modelu, lecz opaski, klamki i montaż wymagają doboru. Przy O23 północny słupek kończy się5 cm przed początkiem otworu — zweryfikować opaskę i wystający uchwyt. O30 pozostaje otworem90 cm dla światła80; powiększenie go do 100 kolidowałoby z powrotami ścian. O43 i O58 delikatnie wycentrowano, O4 przesunięto5 cm dla rezerwy przy narożniku.

Dla drzwi wewnętrznych przyjęto otwór210 cm, nie wymiar zamówieniowy nadproża. Po wyborze zestawu potrzebne są wysokość od **gotowej posadzki**, wymagane tolerancje i ewentualne systemowe uzupełnienie nadmiaru otworu. HST O14 ma otwór200×230 cm; **rzeczywistego światła czynnej części nie potwierdzono**, bo zależy od podziału i profilu. Nie przyjmować automatycznie metra przejścia.

## Ważne ograniczenia funkcjonalne

| Priorytet | Miejsce | Ustalenie i dalszy krok |
|---|---|---|
| Wysoki | M89, pralnia | Po włączeniu rozłożonej suszarki jako rzeczywistej przeszkody O4 nie jest osiągalne od O10. Strefa M88 zajęta37%, PAX M90/M91 odpowiednio87/81%. Używać suszarki składanej/chowanej, suszenia ściennego lub wyznaczyć inne miejsce. Pozostawiona jako wcześniej zaakceptowana referencja; standardowa kontrola jej nie zalicza |
| Wysoki | M75/M76 | Konserwatywne pola spania nachodzą na siebie40 cm. Po rozłożeniu rezerwy M76 pole rozkładania M75 zablokowane58%. Dostęp do zamkniętej sofy pozostaje, ale nie ma potwierdzenia jednoczesnego spania. Wymagany model narożnika i jego rzeczywiste rozkładanie |
| Wysoki | O43 | Skrajnie ciasny detal opaski opisany wyżej; ustalić go przed murowaniem i zamówieniem drzwi |
| Wysoki | Nawis wyspy40 cm | Dobrać materiał, grubość, wsporniki i mocowanie do korpusów. Sam render nie potwierdza nośności ani bezpiecznego opierania się o blat |
| Średni | O28/O46, korytarz | Drzwi łazienek otwierają się na zewnątrz zgodnie z przyjętym wymaganiem. Przy skrzydle modelowym82 cm z korytarza120 cm zostaje lokalnie około38 cm, więc otwarte drzwi nie pozwalają na wygodne mijanie. Do rozważenia wnęka drzwiowa lub zgodne z wymaganiami rozwiązanie przesuwne; nie zmieniano zaakceptowanego kierunku |
| Średni | Stół M74 | Rozstaw56 cm na osobę przy układzie5+5 jest ciasny, okazjonalny. Po stronie holu nominalnie80 cm. Część strefy krzeseł zajęta przez M75:19% codziennie i 16% przy 10 osobach. Nie jest to wygodny stół dla10 dorosłych bez kompromisów |
| Średni | Wyspa / stół | Przy dwóch zajętych hokerach do blatu nieużywanego, złożonego stołu75 cm. Przy rozłożonym stole do obrysu jego zajętych krzeseł od wyspy75 cm;21% standardowej strefy obsługi wyspy jest wtedy zajęte. Nie sumować tych dwóch przejść ani nie uznawać jednoczesnego siedzenia naprzeciw siebie za wygodne. Przełącznik jadalni przy M73 i w3D pokazuje alternatywne stany |
| Średni | Kotłownia, regały | Cztery regały dają około1,43 m² powierzchni obrysu półek na poziom, zamiast około0,99 m² dawnego regału i PAX. To rozkład zagęszczony, nie dowód matematycznego maksimum. Dostęp do dolnego regału częściowo zajęty28%, do krótszego zachodniego8% — wspólny narożnik obsługi; nie liczyć całego frontu jako wolnego stanowiska |
| Średni | Urządzenia techniczne | Przejście w przewężeniu85 cm zachowane, ale rzeczywistych modeli, przyłączy, filtrów, wymiany zasobnika i szerokości demontażu nie dobrano. Nie zapełniać rezerwy serwisowej luźnymi zapasami; przy ciężkich regałach sprawdzić mocowanie i nośność |
| Średni | Robot w pralni | Rezerwa40×45 dotyczy kompaktowej stacji, nie każdego modelu z myciem mopów. Przed frontem110,2 cm; pole wyjazdu100 cm sprawdzone. Gniazdo zaplanować przy boku M91, poza rozbryzgiem i bez przewodu przez przejście; instalacji nie rozrysowano. Duża stacja może wymagać zmiany układu |
| Średni | Prysznic M83 | Kabina130×90 pozostaje w tym samym miejscu. Zalecane przesuwne/składane zamknięcie bez łuku na umywalkę. Szerokość faktycznego wejścia, brodzik, odpływ, hydroizolacja, bateria i dostęp do syfonu do konkretnego zestawu; poprzednie „otwarte100 cm” nie potwierdza światła drzwi nowej kabiny |
| Średni | Sypialnia | Zachowane nominalne80 cm po obu bokach łóżka. Między stopą ramy i łóżeczkiem tylko5 cm, więc nie ma tam przejścia; komunikacja prowadzi bokami i od wschodu łóżeczka, około80 cm do wystającego TV. Przy podnoszeniu dziecka potrzebny rzeczywisty model łóżeczka i ocena wygody |
| Średni | Garderoba | Przejście100 cm pozostało po skróceniu. Regał40 zamiast PAX50 jest rezerwacją do doboru; nie skalowano korpusu IKEA. Pozostałe PAX oraz narożnik zachowały wymiary. Sprawdzić kąty otwarcia i montaż przy wybranych frontach |
| Niższy | M101 / M116 | Biurko zajmuje12% dojścia do sofy M101. Przy rozłożonej M117 ograniczona strefa krzesła M116. Nie zakładać równoczesnego pełnego używania stanowiska i łóżka |
| Niższy | M143 / O17 | Sofa pod południowym oknem, rozkłada się do środka; sprawdzone bez kolizji. Parapet90 cm porównać z oparciem konkretnej sofy i otwieraniem okna; przy obecnym planie dolne pola są stałe |
| Niższy | Spiżarnia | Korytarz roboczy pomiędzy północnymi i południowymi regałami100 cm, przy blacie bocznym125 cm szerokości wolnego wnętrza. W narożnikach końce regałów mają ograniczony dostęp; nie deklarować ich jako pełnej pojemności na duże sprzęty |

Dodatkowe ostrzeżenia kontrolera: trzy korytarzowe PAX mają25% zajęcia strefy przy ścianie, umywalka M127 ma 6% przy ścianie w rastrze50 mm, stolik zajmuje10% strefy dojścia do M76. Nie zmniejszano stref ani progów w celu usunięcia ostrzeżeń. Blendy są referencjami geometrycznymi i nie są pojemnością szaf.

## Kuchnia po zmianach — ergonomia

Trójkąt między środkami frontów lodówki, zlewu i płyty pozostaje **1,22 /1,60 /2,69 m**, łącznie5,51 m; wyspa nie przecina tych boków. Między zlewem i płytą90 cm blatu (w tym nad zmywarką), po prawej od płyty40 cm przed wysokim słupkiem, dodatkowo około120×100 cm wyspy po odjęciu pasa sprzętów. Po lewej od zlewu60 cm z częściowo zajętym przez ekspres blatem. Czajnik na niskiej szafce W3; Thermomix, dzbanek i noże na prawym pasie50 cm wyspy.

**120 cm jest rozsądnym przejściem roboczym dla tej koncepcji**, ale nie daje wygodnego mijania przy otwartych urządzeniach. Przy otwartej zmywarce założonej na 72 cm pozostaje48 cm; przy wysuwie45 cm po obu stronach30 cm, a przy zmywarce naprzeciw szuflady tylko3 cm. Mechanizmy muszą być zamykane przed przejściem. Dobór AGD może zmienić te wartości.

Słupek za piekarnikiem zwiększa przechowywanie, lecz nie tworzy blatu przy piekarniku. Gorącą blachę nadal przenosi się przez120 cm przejścia na wyspę. Rozważyć półkę wysuwaną/system odkładczy zgodny ze słupkiem albo urządzenie ustawione bliżej blatu. Nie dodano niepotwierdzonego mechanizmu jako gotowego produktu.

Płyta ma po prawej40 cm do słupka — ten blat zostawić pusty. Sprawdzić wymagane odległości konkretnej płyty od pionowego boku, wentylację szuflad, osłonę i prowadzenie okapu. Lodówka wymaga potwierdzenia zawiasu oraz pełnego otwarcia przy sąsiednich wysokich frontach. Ekspres i czajnik wymagają gniazd i odstępów od wody/pary. Zasilanie wyspy bez przedłużacza przez przejście. Model nie układa przewodów w instalacji budynku.

Korpusy kuchni są oparte na Castoramie. Korpus40 cm ma potwierdzoną kartę Caraway; słupki to zestawy do kompletacji z paneli, nie kompletne zamówienie. Tylnych szafek R1–R3 nie ma w nowym układzie, bo nawis służy kolanom; ich stare przypisania w planerze zostały zachowane do przeniesienia.

## Pomieszczenia i światło dzienne

Poniższe powierzchnie są przybliżone z rastra50 mm. Suma okien/HS to pole **otworów brutto**, górna granica pola w świetle ościeżnic. Nie odjęto profili ani nie uwzględniono okapu100 cm, zacienienia i orientacji działki. Porównanie1:8 dotyczy przede wszystkim pomieszczeń pobytu; nie jest automatycznym wymaganiem dla każdej spiżarni czy łazienki. W pozostałych pomieszczeniach wymagania doświetlenia wynikają z funkcji i projektu.

| Pomieszczenie | Pow. orientacyjna [m²] | Otwory | Pole otworów brutto [m²] | 1/8 powierzchni [m²] |
|---|---:|---|---:|---:|
| Salon + kuchnia + jadalnia + komunikacja | 44.76 | O2, O13, O14, O19, O20 | 13.15 | 5.60 |
| Spiżarnia | 4.07 | — | 0.00 | 0.51 |
| Łazienka (prysznic) | 5.12 | — | 0.00 | 0.64 |
| Pralnia / suszarnia | 12.83 | O5 | 1.44 | 1.60 |
| Pokój 3 | 12.44 | O6 | 2.25 | 1.56 |
| Kotłownia / gospodarcze | 8.99 | O7 | 0.36 | 1.12 |
| Wiatrołap | 5.85 | O9 | 0.36 | 0.73 |
| Pokój 2 | 12.02 | O15 | 2.25 | 1.50 |
| Sypialnia | 13.81 | O16 | 2.70 | 1.73 |
| Łazienka (wanna) | 4.88 | — | 0.00 | 0.61 |
| Garderoba | 3.60 | — | 0.00 | 0.45 |
| Gabinet | 11.97 | O11, O17 | 3.15 | 1.50 |

W pokojach i salonie pole brutto ma rezerwę względem1:8, lecz bez wymiarów profili nie potwierdza spełnienia wymagania. Pralnia ma tylko1,44 m² otworu przy około12,8 m² podłogi: jeśli będzie pomieszczeniem stałej pracy/pobytu, to mniej niż1:8 już przed odjęciem ram. Ustalić funkcję oraz ewentualną potrzebę większego przeszklenia. Małe okno kotłowni i wiatrołapu nie potwierdza doświetlenia do pracy; nie są zaprojektowane jako pomieszczenia stałego pobytu.

O6 po przesunięciu ma środek12200 mm, biurko M100 środek11650 mm. Nakłada się na szerokość biurka, ale oś okna jest55 cm na prawo od osi biurka. To możliwe użytkowo; ewentualne centrowanie biurka byłoby osobną decyzją i wymaga ponownego sprawdzenia sofy oraz odblasków na monitorze. Nie przesuwałem go automatycznie.

## Aktualizacja pralni — płytkie PAX z drzwiami

Dawne M145/M146 to teraz PAX **100 + 50 cm**, trzy rozwierane fronty 50 cm, wysokość 236,4 cm. Korpusy nominalnie „35 cm” mają według kart IKEA faktycznie **35,5 cm** głębokości. Przykładowy front FORSAND ma 1,8 cm; przyjęto 2 cm rezerwy frontu i **37,5 cm** całej głębokości, bez wystającego uchwytu. Rzeczywiste szerokości 99,8 i 49,8 cm, bez skalowania korpusów do dawnych BILLY80.

Zabudowa x8500–8875, y2550–3548 oraz3550–4048. Do szaf po przeciwnej stronie pozostaje **132,5 cm**. Po otwarciu jednego frontu nominalnie82,5 cm; przy dwóch przeciwległych około32,5 cm, dlatego fronty otwierać naprzemiennie. Również dolnego frontu i drzwi O29 nie traktować jako swobodnie używanych równocześnie — ich pola mogą się krzyżować. Kontroler korpusów i stref nie modeluje osobnych łuków wszystkich frontów. Nie zmniejszano jego progów ani stref, brak nowych problemów i niedostępnych pomieszczeń w sprawdzonych stanach.

Szafy kotwić do ściany; montaż, zawiasy, półki i uchwyty zgodnie z instrukcjami producenta. Zachowane dotychczasowe ID oraz własne nazwy/notatki. Wcześniejsze ograniczenie rozłożonej suszarki nadal obowiązuje.

Źródła IKEA sprawdzone 12.11.2026: [PAX100×35×236](https://www.ikea.com/pl/pl/p/pax-obudowa-szafy-bialy-00214572/), [PAX50×35×236](https://www.ikea.com/pl/pl/p/pax-obudowa-szafy-bialy-40214565/), [FORSAND50×229](https://www.ikea.com/pl/pl/p/forsand-drzwi-bialy-60391091/). To dobór gabarytów, bez potwierdzenia stanu magazynowego lub zlecenia zakupu.

## Instalacje, przechowywanie i rozbieżności danych

**Wentylacja łazienek:** w modelu brak wybranego sposobu transferu przez drzwi. Jako punkt odniesienia §79 ust.1 przywołanego [tekstu WT z 2022 r.](https://eli.gov.pl/api/acts/DU/2022/1225/text.html) wskazuje 0,022 m², czyli 220 cm² otworów w dolnej części drzwi. Podcięcie 2 cm przy szerokości 80 cm daje najwyżej 160 cm² geometrycznie, więc **nie należy zakładać, że dowolne podcięcie wystarczy**. Dobór kratki/podcięcia według wolnego przekroju, przepływów i przepisów właściwych dla inwestycji; nie wykonano pełnego przeglądu wszystkich nowelizacji. Przywołane parametry nie są potwierdzeniem zgodności całego budynku.

**Przechowywanie:** nie ma kompletnego, zwymiarowanego przydziału dla drabiny, rozłożonej deski do prasowania, walizek o rzeczywistych gabarytach, choinki, sejfu i wszystkich rzeczy dla psów. Są deklarowane przeznaczenia szaf, ale nie model objętości i ciężaru zawartości. Rowery, narzędzia i opony przewidziano poza bryłą — program gospodarczy domu zależy więc także od osobnego magazynu. Przed zwiększaniem liczby regałów warto zrobić inwentarz dużych rzeczy i sprawdzić, przez które drzwi można je wnieść.

**Dane wymagające uporządkowania przy kolejnym wdrożeniu zmian:**

- `storagePlan` w modelu nadal mówi o robocie pod ławką, mimo że rzeczywista stacja M147 jest już w pralni. Geometria stacji jest aktualna; ogólna notatka jest historyczna.
- M128 zachował notatkę o odstępie 92,5 cm i niezmienionej garderobie. Aktualna geometria daje **102,5 cm**, a garderoba została skrócona o 10 cm.
- M134 jest regałem 40 cm, lecz odziedziczone metadane `joinery.nominalWidth` nadal opisują dawny PAX50. Nie stosować tych metadanych jako listy zakupowej.
- Planer kuchni 3D i rzut 2D mają osobne zapisy. Ręczne przesunięcie mebla w jednym nie aktualizuje drugiego. Review dotyczy spójnej bazy domyślnej, nie dowolnych zapisów użytkownika.

To problemy opisu/modelu danych, odrębne od trzech fizycznych kolizji szaf. Nie naprawiano ich przez migrację przy samym zleceniu audytu.

**Decyzje wpływające na budżet i wygodę:** przed dalszym zagęszczaniem wyposażenia ustalić docelową powierzchnię użytkową, codzienne łóżka dzieci oraz potrzebę magazynowania na strychu. Właz, ewentualne schody strychowe i pole ich rozłożenia nie mają potwierdzonego miejsca w rzucie. Dla pompy ciepła należy potwierdzić, czy faktycznie potrzebne są trzy osobne urządzenia narysowane jako Ø59 cm; zintegrowany zestaw może zmienić układ, lecz wymaga doboru instalacyjnego. Nie oceniano kosztu ani opłacalności wariantów bez modeli urządzeń i obmiaru.

## Kwestie, których rzut nie rozstrzyga

- **Wentylacja:** dwa pomieszczenia kąpielowe, pralnia i spiżarnia potrzebują zaprojektowanych wywiewów oraz drogi transferu powietrza. Dobrać otwory/kratki drzwiowe do aktualnych wymagań i przepływów. Okap kuchenny nie może tłoczyć tłuszczu do zwykłej rekuperacji; ustalić oddzielny wyrzut albo obieg zamknięty i bilans powietrza.
- **Woda i kanalizacja:** sprawdzić spadki, piony, odpowietrzenie, rewizje WC, syfony wanny i brodzików. Samo przesunięcie stelaża lub wanny nie potwierdza możliwości prowadzenia odpływu w posadzce. Odpływ brodzika psa zabezpieczyć przed sierścią; pralka, zlew, robot myjący i stelaże muszą mieć dostępne zawory i rewizje.
- **Konstrukcja:** przeniesienie otworów O20/O21 i powiększenie otworów drzwiowych wymagają dobranych nadproży, oparć, słupków i koordynacji z wieńcem. Ściana zewnętrzna ma 412 mm, z warstwą silikatu180 mm; rzut nie jest obliczeniem nośności ani projektem więźby/wiązarów. Przy obrysie17,824×10,624 m konstruktor musi rozstrzygnąć podparcia dachu.
- **Wilgoć i elektryka:** hydroizolacja, strefy gniazd przy natrysku, odpływy i ochrona urządzeń w pralni do projektu instalacyjnego. Płytkie PAX zastąpiły BILLY; przeznaczone do suchej części pralni i mocowania do ściany, bez deklaracji odporności na zalewanie. Robot nie może stać w rozbryzgu ani blokować wyjmowania pralki.
- **Akustyka:** kotłownia sąsiaduje z pokojem3; wymaga oceny hałasu, drgań i izolacji instalacji. Drzwi, podcięcia i przejścia przewodów wpływają na izolacyjność pokoi i gabinetu. Rysunek150 mm ściany nie jest pomiarem akustyki.
- **Termika i stolarka:** U przegród i mostki przy nadprożach/progach wymagają obliczeń. Okap100 cm może ograniczać słońce i światło; nie przeprowadzono analizy nasłonecznienia. Potwierdzić parapety, wysokości oparć, klamki, podziały FIX/uchylne oraz bezpieczne otwieranie nad meblami.
- **Przechowywanie:** sprawdzić nośność i kotwienie regałów, rzeczywiste wysokości oraz otwieranie wszystkich frontów PAX. Liczba przypisanych naczyń nie jest potwierdzeniem upakowania stosów, organizerów ani udźwigu szuflad. Regały50×60 i 40×35 kotłowni to rezerwacje do doboru, nie zweryfikowane modele do zamówienia.

## Weryfikacja i zakres review

- Niezależna kontrola `tools/audit_precision.js`: **3 penetracje ścian po 23 mm, 0 przecięć korpus–korpus, 0 ścian pominiętych jako ukośne** w stanie codziennym. Uwzględnia widoczne korpusy i ściany osiowe z wycięciami drzwi/przejść; nie uwzględnia pionowych otwarć, okuć ani wszystkich wydłużeń końców ścian. Sprawdzone testem z rzeczywistym modelem i przykładami styku, przenikania 1 mm, przejścia i referencji.
- Wymiary pochodzą z modelu liczbowego, nie z odrysowania obrazka. Sprawdzono14 otworów drzwiowych, styki z prostopadłymi ścianami, rezerwy ram, skrzydła, korpusy i strefy, pomieszczenia, wybrane stany spania i alternatywne użycie jadalni. Dostęp badano także **wyłącznie od głównego wejścia O10**, żeby inne wejścia nie maskowały odciętej komunikacji wewnętrznej.
- Po aktywowaniu rezerwy M76 widoczny pozostaje konflikt z rozkładaniem M75; nie zmieniano kontroli, by go ukryć. Rozłożenie pozostałych sof sprawdzone oddzielnie oraz w dotychczasowych scenariuszach testowych.
- Test migracji używa rzeczywistych publicznych stanów v23/v32. Aktualizacje v33/v34 zachowują własne nazwy, notatki, niewskazane obiekty, wcześniejsze kopie, ID konstrukcji i modułów. Nowe obiekty otrzymują wolne numery. Inne warianty nie zmieniły geometrii.
- Edytor i kuchnia 3D: Chromium na komputerze i emulowany telefon412×915, działanie przycisków, wybór stanów jadalni, zapis, identyfikatory, JSON/CSV/PNG/wydruk; starsza kuchnia v1 zachowana przy przejściu do v2. Brak testu na fizycznym telefonie i pomiarów na budowie.
- Kontrola rastrowa50 mm nie wykrywa wszystkich wystających uchwytów, tolerancji, przestrzeni nad meblami ani wymagań instalacyjnych. Warunki pozytywne raportu odnoszą się do podanych scenariuszy i rezerwacji, a nie dowolnego jednoczesnego otwarcia/rozłożenia całego wyposażenia.

Odtworzenie: `timeout 30s node tools/audit_main_project.js` (JSON), `timeout 30s node tools/check_audit_precision.js`, `timeout 30s node tools/check_project_revision.js`, `timeout 30s node tools/check_variant.js E2`. **Audyt zwraca obecnie kod 1, bo znalazł trzy błędy domu; to oczekiwany wynik ustaleń, nie awaria skryptu.** Standardowe testy geometrii mogą jednocześnie przechodzić, bo bazują na mniej dokładnej kontroli. Scenariusz rozłożonej suszarki i negatywna próba wspólnego spania są raportowane osobno. Numery brył „Rozłożenie M…” są tymczasowymi obiektami testowymi, nie nowymi ID zapisanymi w domu.

Ponowne review obejmowało odczyt aktualnego `origin/main`, kontrolę liczbową i widok aktualnego E2 w Chromium na komputerze oraz emulowanym telefonie 412×915. Nie przeprowadzono nowego fizycznego testu okuć ani pomiarów budowlanych. Wcześniejsze sprawdzenie funkcji edytora i planera: `timeout 60s node tools/check_browser.js`, `timeout 60s node tools/check_kitchen_browser.js` oraz osobno `mobile` i `legacy`.
