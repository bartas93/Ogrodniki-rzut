# Audyt Projektu Głównego — 12.11.2026

[Edytor domu](https://bartas93.github.io/Ogrodniki-rzut/) · [Kuchnia 3D](https://bartas93.github.io/Ogrodniki-rzut/kuchnia3d.html) · [Plan szafek i źródła Castoramy](kuchnia3d-plan.md)

**Wynik:** układ ma dostęp do wszystkich pomieszczeń od głównego wejścia O10 i zero wykrytych problemów korpusów/stref w trzech stanach: codziennym, z dwoma zajętymi hokerami oraz z rozłożonym stołem i odstawionymi hokerami. W stanie codziennym dziewięć mebli ma uwagi, przy stole dla 10 osób — dziesięć; pozostają też miejsca wymagające szczególnego doboru ościeżnic. Najważniejsze: bardzo ciasne opaski O43, konflikt rozłożonej suszarki z pralnią, niepotwierdzone jednoczesne spanie M75/M76 i podparcie nawisu wyspy. To audyt koncepcji, z podanymi poniżej granicami kontroli.

## Co poprawiono podczas audytu

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
| Średni | Robot w pralni | Rezerwa40×45 pasuje do kompaktowej stacji, nie do każdego modelu z myciem mopów. Przed frontem110,2 cm; pole wyjazdu100 cm sprawdzone. Gniazdo przy boku M91, poza rozbryzgiem i bez przewodu przez przejście. Duża stacja może wymagać zmiany układu |
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

## Kwestie, których rzut nie rozstrzyga

- **Wentylacja:** dwa pomieszczenia kąpielowe, pralnia i spiżarnia potrzebują zaprojektowanych wywiewów oraz drogi transferu powietrza. Dobrać otwory/kratki drzwiowe do aktualnych wymagań i przepływów. Okap kuchenny nie może tłoczyć tłuszczu do zwykłej rekuperacji; ustalić oddzielny wyrzut albo obieg zamknięty i bilans powietrza.
- **Woda i kanalizacja:** sprawdzić spadki, piony, odpowietrzenie, rewizje WC, syfony wanny i brodzików. Samo przesunięcie stelaża lub wanny nie potwierdza możliwości prowadzenia odpływu w posadzce. Odpływ brodzika psa zabezpieczyć przed sierścią; pralka, zlew, robot myjący i stelaże muszą mieć dostępne zawory i rewizje.
- **Konstrukcja:** przeniesienie otworów O20/O21 i powiększenie otworów drzwiowych wymagają dobranych nadproży, oparć, słupków i koordynacji z wieńcem. Ściana zewnętrzna ma 412 mm, z warstwą silikatu180 mm; rzut nie jest obliczeniem nośności ani projektem więźby/wiązarów. Przy obrysie17,824×10,624 m konstruktor musi rozstrzygnąć podparcia dachu.
- **Wilgoć i elektryka:** hydroizolacja, strefy gniazd przy natrysku, odpływy i ochrona urządzeń w pralni do projektu instalacyjnego. Płytkie PAX zastąpiły BILLY; przeznaczone do suchej części pralni i mocowania do ściany, bez deklaracji odporności na zalewanie. Robot nie może stać w rozbryzgu ani blokować wyjmowania pralki.
- **Akustyka:** kotłownia sąsiaduje z pokojem3; wymaga oceny hałasu, drgań i izolacji instalacji. Drzwi, podcięcia i przejścia przewodów wpływają na izolacyjność pokoi i gabinetu. Rysunek150 mm ściany nie jest pomiarem akustyki.
- **Termika i stolarka:** U przegród i mostki przy nadprożach/progach wymagają obliczeń. Okap100 cm może ograniczać słońce i światło; nie przeprowadzono analizy nasłonecznienia. Potwierdzić parapety, wysokości oparć, klamki, podziały FIX/uchylne oraz bezpieczne otwieranie nad meblami.
- **Przechowywanie:** sprawdzić nośność i kotwienie regałów, rzeczywiste wysokości oraz otwieranie wszystkich frontów PAX. Liczba przypisanych naczyń nie jest potwierdzeniem upakowania stosów, organizerów ani udźwigu szuflad. Regały50×60 i 40×35 kotłowni to rezerwacje do doboru, nie zweryfikowane modele do zamówienia.

## Weryfikacja i zakres review

- Wymiary pochodzą z modelu liczbowego, nie z odrysowania obrazka. Sprawdzono14 otworów drzwiowych, styki z prostopadłymi ścianami, rezerwy ram, skrzydła, korpusy i strefy, pomieszczenia, wybrane stany spania i alternatywne użycie jadalni. Dostęp badano także **wyłącznie od głównego wejścia O10**, żeby inne wejścia nie maskowały odciętej komunikacji wewnętrznej.
- Po aktywowaniu rezerwy M76 widoczny pozostaje konflikt z rozkładaniem M75; nie zmieniano kontroli, by go ukryć. Rozłożenie pozostałych sof sprawdzone oddzielnie oraz w dotychczasowych scenariuszach testowych.
- Test migracji używa rzeczywistych publicznych stanów v23/v32. Aktualizacje v33/v34 zachowują własne nazwy, notatki, niewskazane obiekty, wcześniejsze kopie, ID konstrukcji i modułów. Nowe obiekty otrzymują wolne numery. Inne warianty nie zmieniły geometrii.
- Edytor i kuchnia 3D: Chromium na komputerze i emulowany telefon412×915, działanie przycisków, wybór stanów jadalni, zapis, identyfikatory, JSON/CSV/PNG/wydruk; starsza kuchnia v1 zachowana przy przejściu do v2. Brak testu na fizycznym telefonie i pomiarów na budowie.
- Kontrola rastrowa50 mm nie wykrywa wszystkich wystających uchwytów, tolerancji, przestrzeni nad meblami ani wymagań instalacyjnych. Warunki pozytywne raportu odnoszą się do podanych scenariuszy i rezerwacji, a nie dowolnego jednoczesnego otwarcia/rozłożenia całego wyposażenia.

Odtworzenie: `timeout 30s node tools/audit_main_project.js` (JSON), `timeout 30s node tools/check_project_revision.js`, `timeout 30s node tools/check_variant.js E2`. Weryfikacja UI: `timeout 60s node tools/check_browser.js`, `timeout 60s node tools/check_kitchen_browser.js` oraz osobno `mobile` i `legacy`.
