# Instalacje — przygotowania i możliwość zmiany źródła ciepła

Ustalenia z 13.11.2026, Projekt Główny. Dokument dotyczy rezerw przestrzeni, tras i założeń do projektów branżowych. Nie przedstawia wykonanych przyłączy ani uzgodnionej geometrii urządzeń na rzucie.

## Ustalone potrzeby

- Cztery osoby, wodociąg, częste korzystanie z wanny; planowany zmiękczacz/filtr wody.
- Przydomowa oczyszczalnia ścieków; technologia i model jeszcze niewybrane.
- Rolety zewnętrzne.
- Fotowoltaika w przyszłości: obecnie przygotowanie podłączeń.
- Możliwa klimatyzacja: obecnie przygotowanie podłączeń.
- Możliwość przyszłej zmiany pompy ciepła na kocioł zasilany LPG. Brak sieci gazowej; inwestor wyjaśnił, że chodzi o duży zbiornik na działce, nie małe butle wymienne.

Wodna podłogówka, pompa powietrze–woda i osobny zasobnik CWU klasy 300 l to dotychczasowe rekomendacje do porównania ofert, nie zatwierdzony komplet urządzeń. Moc wymaga OZC. Zasobnik musi spełnić oczekiwany pobór i czas odtworzenia ciepłej wody, nie tylko mieć liczbę300 w nazwie. Nie ustalono budżetu ani ostatecznych modeli pompy, rekuperatora i uzdatniania.

## 1. Oczyszczalnia zmienia dobór uzdatniania i odpływów

Zmiękczacz jonowymienny podczas regeneracji odprowadza popłuczyny zawierające sól. **Nie potwierdzono możliwości podłączenia ich do planowanej POŚ.** Potrzebne są zgodne warunki producentów obu urządzeń: objętość i dawka soli na regenerację, częstotliwość oraz sposób dawkowania dopływu. Sama informacja „dla 4 osób” nie rozstrzyga dopuszczalnego obciążenia oczyszczalni. [Aquahome/Viessmann — zgodność z przydomową oczyszczalnią](https://aquahome.pl/blog/zmiekczacz-wody-a-przydomowa-oczyszczalnia-sciekow/).

Jeżeli wybrana POŚ nie dopuszcza takiego dopływu, trzeba zmienić zestaw lub zaprojektować oddzielny, prawnie dopuszczalny sposób zagospodarowania popłuczyn. Nie wskazano takiego odbiornika; nie zakłada się automatycznego rozsączania solanki w gruncie ani włączania jej do deszczówki. Przyszły kondensat z kotła LPG wymaga osobnego uzgodnienia z producentem POŚ, w tym oceny neutralizacji; neutralizacja kwasowości nie rozwiązuje kwestii soli ze zmiękczacza.

Do przygotowania:

- miejsce na filtr i zmiękczacz, bypass, dojście do uzupełniania soli i serwisu; dobór według twardości oraz chwilowych poborów w dwóch łazienkach;
- osobno opisany przewidywany odpływ regeneracji z właściwym sposobem przyłączenia; odbiornik do uzgodnienia przed podłączeniem;
- bilans ścieków dla 4 osób, jednorazowego zrzutu z wanny, pralni i brodzika psa, a po dopuszczeniu także regeneracji;
- dobór technologii POŚ i odbiornika po sprawdzeniu warunków gruntowo-wodnych i terenu;
- trasa kanalizacji, wentylacja instalacji, dostęp do serwisu i opróżniania oraz rezerwa zasilania/alarmu, jeśli wybrana POŚ ma dmuchawę lub pompę.

## 2. Przygotowanie pod rolety zewnętrzne

Wybrać rodzaj skrzynki i napędu przed ostatecznym zamówieniem okien i wykonaniem detali nadproży/elewacji. Skoordynować kasety, prowadnice, rewizję, izolację i montaż okna, także przy HST. Rysunek412 mm ściany z EPS 200 mm nie potwierdza automatycznie miejsca na każdą skrzynkę. [Aluprof — systemy rolet, w tym podtynkowe](https://aluprof.com/files/downloads/kompendium_wiedzy_o_systemach_rolet_bram_i_moskitier_pl.pdf).

Przewidzieć zasilanie przy każdym planowanym napędzie, miejsca lokalnych przycisków, trasy sterowania i odpowiednią rezerwę rozdzielnicy. Liczbę żył i sposób prowadzenia uzgodnić z napędami oraz wyborem sterowania przewodowego/radiowego/centralnego. Przy preferowanym Home Assistant ustalić interfejs automatyki i zachować możliwość obsługi lokalnej. Nie dobrano jeszcze napędów ani przewodów wykonawczych.

## 3. Przygotowanie pod przyszłą fotowoltaikę

- Wyznaczyć dostępne połacie dachu kopertowego, uwzględnić okap, konstrukcję i planowane przejścia instalacji. Trasę ewentualnego przewodu spalinowego LPG skoordynować z modułami PV i ich zacienieniem.
- Przygotować dostępne, szczelne przepusty i trasy z dachu/poddasza do miejsca falownika, z pilotami; oddzielić trasy obwodów energetycznych i komunikacji zgodnie z projektem elektrycznym.
- Przewidzieć suchą, dostępną strefę dla falownika, z chłodzeniem i odstępami producenta, poza rozbryzgiem z brodzika i bez zasłaniania regałami. Sama wolna powierzchnia ściany nie jest kompletną strefą montażu. [Przykład wymagań montażowych falownika Fronius](https://manuals.fronius.com/html/4204260315/pl.html).
- Zostawić rezerwę rozdzielnicy i trasę AC falownik–rozdzielnica oraz komunikację do pomiaru energii/sterowania. Koordynować uziemienie, ochronę przepięciową i ewentualną instalację odgromową.
- Moc przyłączeniową, przekroje, liczbę stringów i aparaturę dobrać do późniejszej instalacji. Nie wpisano przypadkowego kabla jako uniwersalnego rozwiązania. Nie wybrano falownika ani mocy PV.

## 4. Przygotowanie pod możliwą klimatyzację

Wstępnie wyznaczyć strefy chłodzenia: część dzienna, sypialnie i ewentualnie gabinet, następnie miejsca jednostek wewnętrznych/zewnętrznych oraz tras. Liczba urządzeń nie została uzgodniona. Przewidzieć przepusty, dostępne drogi instalacji, zasilanie, komunikację i odpływy skroplin, preferencyjnie grawitacyjne tam, gdzie jest to możliwe; odbiornik i sposób włączenia odpływów do uzgodnienia.

Puste trasy i przepusty można przygotować przed wyborem sprzętu. Jeśli mają zostać ułożone również rury chłodnicze, ich średnice, izolację, długości i różnice poziomów trzeba uzgodnić z planowanymi urządzeniami. Nie dobrano jednego uniwersalnego kompletu rur dla dowolnej przyszłej klimatyzacji. Miejsca jednostek zewnętrznych skoordynować z pompą ciepła, dostępem do serwisu, oknami i przyszłym LPG.

## 5. Przyszła zmiana pompy ciepła na LPG

**Technicznie możliwa przy wodnej instalacji ogrzewania.** Podłogówkę i rozdzielacze można zachować, dobierając źródło i automatykę. Zasobnik pośredni z wężownicą można przewidzieć do współpracy z oboma źródłami, po sprawdzeniu parametrów i zgodności sterowania. Nie jest to obietnica zamiany urządzeń bez zmian hydrauliki, automatyki i projektu.

Do zachowania opcji potrzebne są:

1. Rezerwa miejsca na kondensacyjny kocioł LPG z zamkniętą komorą oraz dostęp do przyłączy CO/CWU, prądu, sterowania i odpływu kondensatu.
2. Koncepcja doprowadzenia gazu z zewnętrznego zbiornika: trasa, wejście do budynku, armatura i miejsce zbiornika wraz z dostępem do tankowania. To osobny projekt instalacji zbiornikowej.
3. Trasa przewodu powietrzno-spalinowego; sposób zakończenia zależy od urządzenia i usytuowania. Nie potwierdzono możliwości wyrzutu przez obecną elewację.
4. Weryfikacja posadzki względem terenu oraz ewentualnych zagłębień, kanałów i studzienek. W technicznym jest brodzik psa; jego odpływ i przekrój podłogi trzeba ocenić w wariancie LPG. Nie wykazano ani pełnej zgodności tego połączenia, ani konieczności usunięcia brodzika.
5. Wentylacja odpowiednia dla LPG, skoordynowana z rekuperacją oraz możliwością gromadzenia gazu nisko przy podłodze. Sam anemostat wywiewny pod sufitem nie potwierdza gotowości kotłowni do LPG.
6. Wspólny plan lokalizacji zbiornika LPG, elementów POŚ, rowów/studzienek, tras kablowych, pompy i klimatyzacji. Warunki odległościowe zależą m.in. od wielkości zbiornika i sposobu posadowienia; brak potwierdzonej lokalizacji.

Podstawa do weryfikacji: [WT, tekst jednolity 2022, §157, §170 i §179](https://eli.gov.pl/api/acts/DU/2022/1225/text.html). LPG wymaga oceny poziomu pomieszczenia i obniżeń oraz odległości zbiornika od m.in. studzienek. Pełną aktualność przepisów, norm i dopuszczalność rozwiązania trzeba potwierdzić w projekcie właściwym dla daty instalacji.

Opcja techniczna nie gwarantuje przyszłej możliwości prawnej ani opłacalności paliwa. [Informacja MRiT o EPBD](https://www.gov.pl/web/rozwoj-technologia/dyrektywa-w-sprawie-charakterystyki-energetycznej-budynkow-epbd) opisuje kierunek budynków bezemisyjnych, w tym wymagania dla nowych budynków od 2030 r.; nie jest to automatyczny nakaz usuwania każdego istniejącego kotła gazowego w 2030 r. Warto przygotować rezerwy przestrzeni i tras, a zakup dodatkowego źródła i zbiornika rozpatrzyć, gdy pojawi się konkretna potrzeba.

## Kolejność koordynacji

Najpierw dane OZC, twardość wody i parametry odprowadzania ścieków; następnie zgodny zestaw POŚ–zmiękczacz i układ technicznego z rezerwą PV/LPG. Równolegle ustalenie rolet z oknami oraz stref klimatyzacji. Dopiero na tej podstawie zwymiarowanie urządzeń i tras na rysunku oraz projekty branżowe. Wszystkie instalacje nie zostały jeszcze pomieszczone i zweryfikowane w obecnym rzucie8,99 m².
