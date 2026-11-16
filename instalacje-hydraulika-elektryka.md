# Instalacje — hydraulika, podłogówka i sterowanie oświetleniem

Aktualizacja 16.11.2026, zapis v37. Dotyczy Projektu Głównego E2. Ściany, otwory, meble, ich identyfikatory i obrys domu pozostają bez zmian. Kopia **Projekt główny 2026-11-16** pozostaje niezależna, bez automatycznego dodawania nowych warstw.

## Czy uwzględniono pozostałe instalacje?

Pompa ciepła, rolety, przygotowanie PV, AC, POŚ i przyszły LPG były już uwzględnione jako program lub rezerwy. Ta aktualizacja doprecyzowuje bramę, furtkę, monitoring, automatykę i zasilanie urządzeń. Nie oznacza to zakończonego projektu każdej instalacji. W panelu **Branże… → Zakres instalacji i otwarte decyzje** widoczne są potrzeby i pozostałe uzgodnienia.

| Zakres | Co jest na warstwach | Co pozostaje do ustalenia |
|---|---|---|
| Pompa ciepła i CWU | Moduł, zasobnik, wyjście tras, zasilanie i przewody sterowania | OZC, modele, hydraulika, potrzeba bufora, jednostka zewnętrzna i serwis |
| Woda i uzdatnianie | ZW/CWU, przyłącza urządzeń, filtr, zmiękczacz, odcięcie, kran ogrodowy, decyzja o cyrkulacji | Wymiary, ciśnienie, trasy, czas oczekiwania na CWU, zgodność popłuczyn z POŚ |
| Kanalizacja i POŚ | Odpływy, piony wentylujące, schemat główny, rezerwa prądu i alarmu POŚ | Model, rzędne, średnice, spadki, grunt, odbiornik i rozmieszczenie na działce |
| Podłogówka | Strefy pomieszczeń, rozdział i propozycje czujników/termostatów | Pętle, rozstaw, długości, przepływy, układ rozdzielaczy i warstwy posadzki |
| Rekuperacja i okap | Centrala, strefy kanałów, nawiewy/wywiewy, potrzeba czerpni i wyrzutni, decyzja o okapie | Bilans, akustyka, wyloty, izolacja, wyciąg lub pochłaniacz |
| Rolety zewnętrzne | Rezerwy przy 13 przeszkleniach oraz osobne punkty sterowania lokalnego | Skrzynki, nadproża, napędy, blokady kierunków i trasy do automatyki |
| Przyszła PV | Pion tras dach–falownik–rozdzielnica oraz rezerwa komunikacji/pomiaru | Moc, model, przewody, zabezpieczenia, połacie i dostępne miejsce; magazyn energii osobno |
| Brama i furtka | Potrzeby napędu, fotokomórek/listwy, sygnału stanu, domofonu IP, elektrozaczepu i przycisku wyjścia | Położenie wjazdu i furtki, urządzenia, odległości, przekroje i rozwiązania bezpieczeństwa |
| Monitoring | Cztery propozycje kamer pod okapem, rezerwa trasy kamery bramy, LAN/PoE, rejestrator i UPS | Ogniskowe, kadry, nocna widoczność, martwe pola, pełna liczba kamer i miejsce szafki |
| Smart home i alarmy | Program centrali, tras sterowania, czujników, odcięcia wody i lokalnej obsługi urządzeń | System i topologia, liczba/miejsca modułów, pełny plan alarmu i detekcji |
| Elektryka | Rozdzielnica, propozycje lamp/gniazd/włączników, zasilanie AGD, PC, CWU, uzdatniania, POŚ i przyszłej AC; wejście przyłącza, uziemienie i połączenia wyrównawcze | Moc, obwody, przekroje, zabezpieczenia, strefy mokre, dobór osprzętu i ocena instalacji odgromowej |
| Przyszły LPG | Rezerwa kotła, gazu/spalin, kondensatu i detekcji | Zbiornik, wentylacja, brodzik/poziom podłogi i zgodność pomieszczenia |
| Ogród i opcje | Program tras do oświetlenia/ewentualnego podlewania oraz opcjonalna rezerwa ładowania auta | Plan zagospodarowania i decyzja o zakresie. Nie zlecono zakupu ładowarki ani urządzeń ogrodowych |

Symbole bramy, furtki, przyłącza, POŚ i dalszych tras przy obwodzie domu są **punktami programu**, nie ich wybranym położeniem na działce. Cztery kamery przy narożnikach nie potwierdzają pełnego pokrycia posesji. Nie dopasowywano urządzeń do istniejących regałów w technicznym dla pozornego wykazania ich zmieszczenia.

## Osobne warstwy

Aktualny bazowy stan zawiera **247 elementów instalacyjnych**:

| Warstwa | Elementy | Obsługa |
|---|---:|---|
| Instalacje | 80 | Rekuperacja, sieć, monitoring, automatyka i przyszłe przygotowania; nadal filtrowane według branż |
| Hydraulika | 47 | Woda, kanalizacja, uzdatnianie oraz urządzenia ogrzewania/CWU |
| Podłogówka | 19 | 12 stref pomieszczeń, rozdzielacz/strefa zasilania i 5 propozycji sterowania temperaturą |
| Elektryka | 101 | Lampy, włączniki, zestawy gniazd, przyłącza urządzeń i lokalne sterowanie rolet |

Przyciski **Wentylacja**, **Hydraulika**, **Podłogówka**, **Elektryka** oraz **Sieć i rezerwy** działają niezależnie i pozwalają łączyć branże. Nie ma nadrzędnego przycisku „Instalacje”. Z listy **Widok** można wybrać np. **Tylko hydraulika**, **Tylko elektryka**, **Wszystkie instalacje** albo **Bez instalacji**. **Tylko instalacje** pokazuje wszystkie branże bez mebli, a **Pokaż wszystko** dodaje meble i pozostałe nakładki. W panelu Warstwy stara techniczna warstwa Instalacje jest opisana jako „Wentylacja, sieć i rezerwy”; nie jest rodzicem hydrauliki. Dane i własne nazwy warstw są zachowane.

Podłogówka ma przezroczyste pola stref cieplnych i oznaczenia CO…; **nie narysowano fikcyjnych pętli rur**. Kolor całego pomieszczenia nie wyznacza prowadzenia rur pod stałą zabudową, wanną lub urządzeniami. Spiżarnia ma delikatniejsze oznaczenie i nadal wymaga decyzji o ogrzewaniu. Liczba rzeczywistych pętli może być większa niż liczba stref; wynika z obliczeń i geometrii podłogi.

## Kolory i legenda elektryki

Legenda jest automatycznie widoczna pod rzutem, gdy włączona jest elektryka. Nie zasłania planu; można ją zwinąć. Pełna legenda jest dodawana także do PNG, w osobnym pasie poniżej rysunku.

| Typ | Kolor |
|---|---|
| Lampa / grupa światła | Ochra |
| Włącznik jednej grupy | Niebieski |
| Włącznik dwóch grup | Fioletowy |
| Włącznik trzech lub więcej grup | Różowy |
| Gniazdo pojedyncze | Zielony |
| Zestaw dwóch gniazd | Turkusowy |
| Zestaw trzech lub więcej gniazd | Granatowy |
| Sterowanie roletą | Brązowy |
| Przyłącze / zasilanie | Czerwony |
| Trasa elektryczna | Szary |

Fioletowe linie powiązań włącznik–lampa zachowują osobne oznaczenie. Liczba grup i gniazd opisuje propozycję funkcjonalną, nie dobrany model osprzętu ani napięcie obwodu. Ta zmiana jest wyłącznie zmianą widoku w v37; identyfikatory, przypisania, geometria i snapshot pozostają.

## Który włącznik steruje którą lampą?

Warstwa Elektryka zawiera **26 punktów lub grup oświetlenia**, **20 punktów sterowania światłem** i **30 przypisań kanał–grupa światła**. Dodatkowo są punkty sterowania roletami. Liczby nie oznaczają wybranych modeli opraw ani liczby obwodów w rozdzielnicy.

- Lampa ma symbol koła z krzyżykiem, włącznik — kwadratu, gniazda — koła z dwiema kreskami. Punkty przyłączeniowe urządzeń mogą mieć osobny symbol ogólny.
- Wybierz włącznik: panel pokazuje jego kanały A/B/C oraz lampy z pełnymi ID. Linie na rzucie prowadzą do przypisanych lamp.
- **Pokaż powiązania na rzucie** dopasowuje widok do włącznika i jego lamp. Z listy **Linie** można wybrać zaznaczony element, wszystkie powiązania lub ich ukrycie.
- Wybierz lampę: panel pokazuje wszystkie sterujące nią włączniki i kanały, także przy sterowaniu z kilku miejsc.
- W kanale rozwiń **Zmień przypisane lampy** i zaznacz odpowiednie oprawy/grupy. Można przypisać jedną lub kilka. Zmiana jest zapisywana, działa po odświeżeniu i w eksporcie/importcie JSON.
- Wyszukiwarka przyjmuje pełne ID `E2-I…`, a także jednoznaczny symbol, np. `W61`, `L-LUST1` lub `E2-W61`. Gdy symbol jest wspólny dla kilku elementów, należy użyć ID albo listy.

Usunięcie lampy nie kasuje po cichu jej przypisania: panel włącznika pokazuje brakującą lampę i pozwala usunąć powiązanie. Lampa bez włącznika oraz pusty kanał mają informację w panelu. Oznaczone połączenia to **relacje sterowania**, nie trasy kabli, schemat zacisków, dobór łączników schodowych/krzyżowych ani zasilaczy LED. Podświetlenie lamp oznacza wybór/powiązanie w edytorze, nie rzeczywisty stan urządzenia.

Rozmieszczenie jest propozycją: punkty przy drzwiach odnoszą się do ich ID i strony klamki, a część gniazd do zabudowy lub ściany. Trzeba sprawdzić położenie względem skrzydeł, opasek, szaf, wysokości blatów, stref mokrych oraz wybranego osprzętu. Nie podano przekrojów, zabezpieczeń ani uniwersalnych wysokości. Sterowanie tradycyjne i automatyka pozostają do wyboru; lokalne funkcje mają działać bez chmury.

## Migracja i kontrole

V37 czyta v36 i starsze klucze; oryginałów nie usuwa. Z v36 rozdziela branże i dodaje nowe punkty, bez ponawiania poprawek ścian/mebli. Istniejące numery, nazwy, uwagi i przesunięcia są zachowane. Tylko domyślne programowe pozycje części lamp/gniazd otrzymują czytelniejsze kotwice; własne punkty i warstwy pozostają. `installationRevision:2` zapobiega ponownemu dodawaniu i nadpisywaniu przypisań.

Testy `tools/check_installation_layers.js` oraz `tools/check_installation_layers_browser.js` (osobno desktop/mobile) sprawdzają warstwy, 30 przypisań, edycję i odczyt, relacje odwrotne, kotwice, brakujące lampy, migrację rzeczywistego v36 i pełny JSON/PNG z powiązaniami. Weryfikacja telefonu dotyczy emulacji Chromium 412 × 915 px. Dotychczasowe testy geometrii, kopii referencyjnej, miarki i aplikacji pozostają.

## Domyślna tabela sterowania

Poniższa tabela opisuje publiczną bazę v37. Własne edycje w przeglądarce mogą być inne; aktualne przypisania pokazuje panel i eksport JSON.

| Włącznik | Kanał | Sterowane lampy / grupy |
|---|---|---|
| W59 — E2-I322 | A · Światło główne | L59 — E2-I240 |
| W59 — E2-I322 | B · Jadalnia | L-STOL — E2-I311 |
| W59 — E2-I322 | C · Wyspa | L-WYSPA — E2-I310 |
| W60 — E2-I323 | A · Światło główne | L60 — E2-I242 |
| W61 — E2-I324 | A · Światło główne | L61 — E2-I244 |
| W61 — E2-I324 | B · Lustro | L-LUST1 — E2-I313 |
| W62 — E2-I325 | A · Światło główne | L62 — E2-I246 |
| W62 — E2-I325 | B · Lampa przy wyjściu ogrodowym | L-OGR — E2-I320 |
| W63 — E2-I326 | A · Światło główne | L63 — E2-I248 |
| W64 — E2-I327 | A · Światło główne | L64 — E2-I250 |
| W65 — E2-I328 | A · Światło główne | L65 — E2-I252 |
| W65 — E2-I328 | B · Lampa przed wejściem | L-WEJ — E2-I317 |
| W66 — E2-I329 | A · Światło główne | L66 — E2-I254 |
| W67 — E2-I330 | A · Światło główne | L67 — E2-I256 |
| W68 — E2-I331 | A · Światło główne | L68 — E2-I258 |
| W68 — E2-I331 | B · Lustro | L-LUST2 — E2-I314 |
| W69 — E2-I332 | A · Światło główne | L69 — E2-I260 |
| W70 — E2-I333 | A · Światło główne | L70 — E2-I262 |
| W-KUCH — E2-I334 | A · Kuchnia | L-KUCH — E2-I308 |
| W-KUCH — E2-I334 | B · Blat | L-BLAT — E2-I309 |
| W-KUCH — E2-I334 | C · Taras zachodni | L-TARW — E2-I318 |
| W-TARS — E2-I335 | A · Taras południowy | L-TARS — E2-I319 |
| W-HOL1 — E2-I336 | A · Oświetlenie korytarza | L-HOL — E2-I312 |
| W-HOL2 — E2-I337 | A · Oświetlenie korytarza | L-HOL — E2-I312 |
| W-HOL3 — E2-I338 | A · Oświetlenie korytarza | L-HOL — E2-I312 |
| W-NOC1 — E2-I339 | A · Główne w sypialni | L67 — E2-I256 |
| W-NOC1 — E2-I339 | B · Własna lampka | L-NOC1 — E2-I315 |
| W-NOC2 — E2-I340 | A · Główne w sypialni | L67 — E2-I256 |
| W-NOC2 — E2-I340 | B · Własna lampka | L-NOC2 — E2-I316 |
| W-STR — E2-I341 | A · Strych | L-STR — E2-I321 |
