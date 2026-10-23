"""Renderuje fragment rzutu z PDF w wysokiej rozdzielczości z siatką co 500 mm (czerwone x, niebieskie y).

Przydatne do odczytu mebli i drzwi „na oko” w tym samym układzie mm co edytor.

Użycie:  python tools/render_pdf_tiles.py "Ogrodniki (2).pdf" x0 y0 x1 y1 wynik.png [dpi]
Przykład: python tools/render_pdf_tiles.py "Ogrodniki (2).pdf" 10000 -200 15400 5300 tile.png 600
"""
import sys
import pdfplumber
from PIL import ImageDraw

X0, Y0 = -473.0, 2336.7
SX, SY = 20200 / 625.5, 10200 / 319.0

def tile(path, mx0, my0, mx1, my1, out, res=600):
    pg = pdfplumber.open(path).pages[0]
    bb = (X0 + mx0 / SX, Y0 + my0 / SY, X0 + mx1 / SX, Y0 + my1 / SY)
    im = pg.crop(bb, strict=False).to_image(resolution=res).original.convert('RGB')
    W, H = im.size
    d = ImageDraw.Draw(im)
    for mm in range(-8000, 21000, 500):
        if mx0 <= mm <= mx1:
            px = (mm - mx0) / (mx1 - mx0) * W
            d.line([(px, 0), (px, H)], fill=(255, 0, 0) if mm % 1000 == 0 else (255, 200, 200))
            if mm % 1000 == 0: d.text((px + 2, 2), str(mm), fill=(200, 0, 0))
    for mm in range(-8000, 12000, 500):
        if my0 <= mm <= my1:
            py = (mm - my0) / (my1 - my0) * H
            d.line([(0, py), (W, py)], fill=(0, 0, 255) if mm % 1000 == 0 else (200, 200, 255))
            if mm % 1000 == 0: d.text((2, py + 2), str(mm), fill=(0, 0, 200))
    im.save(out)
    print(out, im.size)

if __name__ == '__main__':
    a = sys.argv
    tile(a[1], *map(int, a[2:6]), a[6], int(a[7]) if len(a) > 7 else 600)
