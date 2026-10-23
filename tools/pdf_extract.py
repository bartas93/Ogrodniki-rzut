"""Wyciąga geometrię rzutu z wektorowego PDF (Revit) w milimetrach.

Wypisuje:
  L  linie ścian (grubość linii 0.77 pt)            x1 y1 x2 y2
  F  skrzydła drzwi (grubość 0.55 pt)              x1 y1 x2 y2
  C  łuki drzwi (czarne krzywe, początek/środek/koniec)
  W  teksty (wymiary, opisy)                       tekst x0 y0 x1 y1
  GL / GC  zielone linie i krzywe mebli

Układ: (0,0) = lewy górny narożnik lica zewnętrznego budynku, x w prawo (wschód), y w dół (południe), mm.
Skala dobrana tak, by obrys zgadzał się z wymiarami 20 200 × 10 200 mm z rysunku.

Użycie:  python tools/pdf_extract.py "Ogrodniki (2).pdf" > geometria.txt
"""
import sys
import pdfplumber

X0, Y0 = -473.0, 2336.7            # lewy górny narożnik lica zewn. w układzie strony PDF
SX, SY = 20200 / 625.5, 10200 / 319.0   # mm na punkt PDF
GREEN = '(0.0, 0.65099, 0.0)'
BLACK = '(0.0, 0.0, 0.0)'

def mx(x): return round((x - X0) * SX)
def my(y): return round((y - Y0) * SY)

def main(path):
    pg = pdfplumber.open(path).pages[0]
    for o in sorted(pg.lines, key=lambda o: (o['top'], o['x0'])):
        lw, col = o['linewidth'], str(o.get('stroking_color'))
        if abs(lw - 0.77) < 0.02:
            print('L', mx(o['x0']), my(o['top']), mx(o['x1']), my(o['bottom']))
        elif abs(lw - 0.55) < 0.02:
            print('F', mx(o['x0']), my(o['top']), mx(o['x1']), my(o['bottom']))
        elif col == GREEN:
            print('GL', mx(o['x0']), my(o['top']), mx(o['x1']), my(o['bottom']))
    for o in pg.curves:
        col, p = str(o.get('stroking_color')), o['pts']
        if col == BLACK and len(p) >= 9:
            print('C', [(mx(a), my(b)) for a, b in (p[0], p[len(p) // 2], p[-1])])
        elif col == GREEN:
            print('GC', mx(o['x0']), my(o['top']), mx(o['x1']), my(o['bottom']))
    for w in pg.extract_words():
        print('W', repr(w['text']), mx(w['x0']), my(w['top']), mx(w['x1']), my(w['bottom']))

if __name__ == '__main__':
    main(sys.argv[1] if len(sys.argv) > 1 else 'Ogrodniki (2).pdf')
