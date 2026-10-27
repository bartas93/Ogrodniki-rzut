# R1 — mniejszy dom z wejściem od północy

Data: 27.10.2026. Nowa propozycja koncepcyjna, niezależna od E2 i E2S. Północ odpowiada górnej krawędzi rzutu.

## Program i układ

Salon z kuchnią i jadalnią oraz **trzy pokoje poza salonem**: sypialnia i dwa pokoje dodatkowe. Jeden z nich może działać jako gabinet/gościnny; nie wydzielono czwartego pokoju. Zachowano dwie łazienki, garderobę, spiżarnię, pralnię i techniczne. Nie przeniesiono łóżeczka ani wyposażenia dla psów z E2.

- **Północ:** wejście do wiatrołapu; techniczne dostępne z wiatrołapu; obok pralnia, spiżarnia i łazienka z wanną.
- **Południowy zachód:** salon, kuchnia z wyspą i jadalnia; wyjście HST na południe oraz dodatkowe drzwi na zachód.
- **Wschód:** dwa pokoje o szerokości 3 m, z miejscem do spania, pracy i przechowywania.
- **Południe i środek:** sypialnia z osobną garderobą; obok druga łazienka z prysznicem.
- **Komunikacja:** otwarty hol oraz korytarz nocny 125 cm; łazienki z drzwiami przesuwnymi.

## Wielkość

| Parametr | R1 | E2 |
|---|---:|---:|
| Obrys po elewacji | 15,174×9,824 m | 17,824×10,624 m |
| Powierzchnia obrysu | 149,07 m² | 189,36 m² |
| Różnica zabudowy | około 21% mniej | punkt odniesienia |
| Dach z okapem 1 m, kąt 30° | około 234,48 m² | około 288,97 m² |

W R1 edytor sumuje około**121,4 m² wnętrz z komunikacją**. To obmiar koncepcyjny w rastrze 50 mm, nie normowe zestawienie powierzchni użytkowej. Obrys elewacji nie jest automatycznie wymiarem fundamentu. Przyjęto roboczo ścianę zewnętrzną 412 mm: tynk 15 + silikat 180 + klej 10 + EPS 200 + warstwa zbrojona 5 + tynk zewnętrzny 2 mm. Ściany wewnętrzne 150 mm oznaczają gotowe przegrody z wykończeniem; nośność i materiał do projektu.

| Pomieszczenie / strefa | Przybliżona powierzchnia z modelu |
|---|---:|
| Salon + kuchnia + jadalnia | 39,3 m² |
| Otwarty hol i korytarze | 13,7 m² |
| Sypialnia | 10,8 m² |
| Garderoba przy sypialni | 3,1 m² |
| Pokój 2 | 12,2 m² |
| Pokój 3 | 14,4 m² |
| Wiatrołap | 5,1 m² |
| Techniczne | 6,0 m² |
| Pralnia | 4,8 m² |
| Spiżarnia | 3,7 m² |
| Łazienka z wanną | 4,8 m² |
| Łazienka z prysznicem | 3,5 m² |

Etykieta wspólnej przestrzeni w edytorze obejmuje salon, kuchnię, jadalnię **i komunikację**, łącznie około 53,0 m². Zaokrąglenia poszczególnych pozycji mogą dawać różnicę w sumie.

## Wyposażenie i kompromisy

- Kuchnia: słupki z lodówką/piekarnikiem/zapasami, ciąg 365 cm ze zlewem, zmywarką i płytą, wyspa robocza 160×90 bez hokerów. Spiżarnia dostępna z holu obok kuchni.
- Stół 160×90 rozkładany do 240×90. Przycisk w panelu pokazuje stan z ośmioma zajętymi krzesłami. Przy tym ustawieniu około 13% tylnej strefy przejścia wyspy zajmuje krzesło; główny front roboczy pozostaje dostępny.
- Salon: sofa 220×95, fotel i stolik 110×60, TV na ścianie wschodniej. Uproszczono zestaw wypoczynkowy względem E2, żeby zachować przejścia w mniejszej bryle.
- Sypialnia: łóżko 180×200 w obrysie ramy 190×210; dojścia boczne ok. 90 i 85 cm, przed łóżkiem ok. 80 cm. Półka w wezgłowiu zastępuje szafki stojące, by nie blokować garderoby. Sypialnia jest kompaktowa, a razem z garderobą ma około 13,9 m².
- Pokoje dodatkowe: po jednym łóżku 90×200, biurku 140×70 i module PAX 100. Pokoje mogą zmieniać funkcję, ale podwójne łóżko lub rozkładana sofa wymagają ponownego sprawdzenia przejść.
- Pralnia: pralka, suszarka i zlew pod blatem, rezerwacja głębokości 70 cm; PAX 50 i miejsce na suszenie ścienne. Brak suszarki stojącej blokującej przejście.
- Techniczne: symboliczny moduł pompy, zasobnik CWU, rekuperator i regał. Bufor, zmiękczacz lub inne dodatkowe urządzenia nie zostały automatycznie uznane za mieszczące się w tej rezerwie.
- Duża łazienka: wanna 170×75, WC i umywalka 60. Mała: kabina 90×90, WC i kompaktowa umywalka 60×40. Przesuwne drzwi i rewizje wymagają rozwiązania wykonawczego.

## Sprawdzenie i dalszy projekt

Kontrola silnikiem edytora: stan codzienny bez wykrytych kolizji, ostrzeżeń i niedostępnych pomieszczeń. Stół rozłożony: bez wykrytych kolizji i braku dojścia, jedna uwaga dotycząca wyspy opisana powyżej. Sprawdzono również liczbę pokoi, północne wejście, zmniejszenie obrysu i wymiary biurek. Geometria wcześniejszych wariantów pozostaje bez zmian.

Wymiary pochodzą z nowej siatki projektowej, nie z odrysowania obrazu ani z pomiaru działki. To propozycja do rozmowy o układzie. Usytuowanie, poziomy terenu, doświetlenie, konstrukcja, posadowienie i instalacje wymagają opracowania dla wybranej lokalizacji. Nie przenosi się automatycznie ograniczeń planu miejscowego lub warunków gruntowych innego projektu.

## Uruchomienie i kontrola

W edytorze wybierz **R1 — mniejszy dom, wejście od północy, 3 pokoje**. Domyślnie aplikacja nadal otwiera E2. R1 zapisuje się niezależnie w przeglądarce, w istniejącej wersji v23.

```bash
timeout 10s python tools/check_js.py
timeout 15s node tools/check_r1.js
timeout 30s node tools/check_variant.js R1 R1.svg
```
