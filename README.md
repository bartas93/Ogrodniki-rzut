# Ogrodniki — koncepcja domu

Edytor rzutu parterowego domu z kontrolą ustawienia mebli, przejść i statystykami bryły oraz dachu kopertowego.

- **Uruchomienie:** otwórz `edytor-rzutu.html` w przeglądarce (Chrome / Edge). Nie wymaga instalacji ani serwera.
- **Warianty:** lista „Wariant” na górze albo przycisk „▦ Warianty” (miniatury wszystkich naraz) — rzut z PDF (zmieniony), A–E oraz udoskonalenia E1–E4. Każdy wariant zapisuje się osobno w przeglądarce.
- **Domyślnie E2:** każde uruchomienie otwiera E2 z jego zapisanymi edycjami, także po wcześniejszym oglądaniu innego wariantu. Kolejne zmiany projektu dotyczą E2, chyba że wskażesz inaczej.
- **E2S — kuchnia na południu:** osobna kopia E2, odbita w osi północ–południe. Kuchnia ze spiżarnią jest na dole rzutu, salon na górze, wejście nadal od wschodu. Odbicie obejmuje cały dom; oryginalne E2 pozostaje bez zmian. Wybierz E2S z listy lub przez „▦ Warianty”.
- **Telefon (Android):** zoom dwoma palcami, przesuwanie jednym; przycisk „Podgląd” chroni rzut przed przypadkową edycją, „Panel” pokazuje szczegóły.
- **Zapis i przenoszenie:** „Zapisz JSON” / „Wczytaj JSON”.
- **Wymagania projektowe:** `wymagania-projektowe.md` (pełne notatki inwestora są prywatne i nie trafiają do repozytorium).
- **Dla agentów (Codex / Claude):** `AGENTS.md`.

E2 uwzględnia poprawki z 24.10.2026: zabudowy i drzwi, łazienkę z wanną o szerokości 195 cm, walk-in przy salonie, wnękę 35 cm, biurka 140×70 cm, węższą kotłownię i okap 1 m. Pozostałe warianty zachowują dotychczasowy układ.

Druga seria poprawek E2: ściana warstwowa 41,2 cm (silikat 18 + EPS 20), jedno okno pralni, rzeczywiste moduły i narożniki PAX, wyposażenie kuchni i pralni, detale łazienek oraz większa sypialnia. [Zakres punktów 1–18 i uwagi wykonawcze](e2-wykonczenie.md). Szczegóły wybranego mebla lub wysokości okna są dostępne w panelu po kliknięciu elementu. Przy stole można włączyć widok 280 cm z 10 zajętymi krzesłami.

Kontrola bez przeglądarki: `python tools/check_js.py` oraz `node tools/check_variant.js E2`. Opcjonalnie `node tools/check_variant.js E2 podglad.svg` zapisuje podgląd rzutu. Każde polecenie kontrolne powinno zakończyć się w 30 sekund.

Kopia południowa: `node tools/check_variant.js E2S` oraz `node tools/check_e2_south.js`. Druga kontrola sprawdza odbicie mebli, ich stref, zawiasów drzwi i niezależność kopii od późniejszych zmian E2. Dodanie E2S zachowuje klucz zapisu v23 i istniejące edycje pozostałych wariantów.

Po aktualizacji do wersji zapisu v23 edytor pokaże nowe układy domyślne. Starsze ręczne edycje można przywrócić przez „Wczytaj JSON”; wcześniejsze zapisy v21/v22 w przeglądarce nie są usuwane. Import starego JSON przywraca dawny układ, bez automatycznego nakładania nowych poprawek.
