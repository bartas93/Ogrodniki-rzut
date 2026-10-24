# Ogrodniki — koncepcja domu

Edytor rzutu parterowego domu z kontrolą ustawienia mebli, przejść i statystykami bryły oraz dachu kopertowego.

- **Uruchomienie:** otwórz `edytor-rzutu.html` w przeglądarce (Chrome / Edge). Nie wymaga instalacji ani serwera.
- **Warianty:** lista „Wariant” na górze albo przycisk „▦ Warianty” (miniatury wszystkich naraz) — rzut z PDF (zmieniony), A–E oraz udoskonalenia E1–E4. Każdy wariant zapisuje się osobno w przeglądarce.
- **Telefon (Android):** zoom dwoma palcami, przesuwanie jednym; przycisk „Podgląd” chroni rzut przed przypadkową edycją, „Panel” pokazuje szczegóły.
- **Zapis i przenoszenie:** „Zapisz JSON” / „Wczytaj JSON”.
- **Wymagania projektowe:** `wymagania-projektowe.md` (pełne notatki inwestora są prywatne i nie trafiają do repozytorium).
- **Dla agentów (Codex / Claude):** `AGENTS.md`.

E2 uwzględnia poprawki z 24.10.2026: zabudowy i drzwi, łazienkę z wanną o szerokości 195 cm, walk-in przy salonie, wnękę 35 cm, biurka 140×70 cm, węższą kotłownię i okap 1 m. Pozostałe warianty zachowują dotychczasowy układ.

Kontrola bez przeglądarki: `python tools/check_js.py` oraz `node tools/check_variant.js E2`. Opcjonalnie `node tools/check_variant.js E2 podglad.svg` zapisuje podgląd rzutu. Każde polecenie kontrolne powinno zakończyć się w 30 sekund.

Po aktualizacji do wersji zapisu v22 edytor pokaże nowe układy domyślne. Starsze ręczne edycje można przywrócić przez „Wczytaj JSON”; wcześniejsze zapisy v21 w przeglądarce nie są usuwane.
