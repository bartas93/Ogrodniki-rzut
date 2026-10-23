// Raport kontroli wariantu — wklej w konsoli przeglądarki (albo uruchom narzędziem do wykonywania JS w karcie),
// gdy edytor-rzutu.html jest otwarty. Przełącza wariant, klika każdy mebel i zbiera komunikaty z panelu.
// Wynik: obrys, powierzchnie, dach, podsumowanie komunikacji, PROBLEMY (czerwone) i uwagi (pomarańczowe), pomieszczenia.
// Użycie: report('E')  — klucze wariantów: base, A, B, C, D, E, E1, E2, E3, E4 (patrz VARIANTS w edytorze)
window.report = (v) => {
  const sel = document.querySelector('#sVar'); sel.value = v; sel.dispatchEvent(new Event('change'));
  const out = [], seen = new Set(), sv = document.querySelector('#cv');
  for (const el of [...document.querySelectorAll('#gFurn rect.hit')]) {
    const id = el.dataset.f; if (seen.has(id)) continue; seen.add(id);
    const t = document.querySelector(`#gFurn rect.hit[data-f="${id}"]`), r = t.getBoundingClientRect();
    const o = {clientX: r.left + r.width/2, clientY: r.top + r.height/2, button: 0, bubbles: true, pointerId: 1};
    t.dispatchEvent(new PointerEvent('pointerdown', o)); sv.dispatchEvent(new PointerEvent('pointerup', o));
    const name = document.querySelector('#pFName')?.value;
    const bad = [...document.querySelectorAll('#props ul.msgs:not([style]) li')].map(l => l.textContent);
    const warn = [...document.querySelectorAll('#props ul.msgs[style] li')].map(l => l.textContent);
    if (bad.length) out.push('PROBLEM ' + name + ': ' + bad.join('; '));
    if (warn.length) out.push('uwaga ' + name + ': ' + warn.join('; '));
  }
  const kv = document.querySelector('#kvBody').innerText.split('\n'), g = k => { const i = kv.indexOf(k); return i >= 0 ? kv[i+1] : ''; };
  const roof = document.querySelector('#kvRoof').innerText.split('\n'), gr = k => { const i = roof.indexOf(k); return i >= 0 ? roof[i+1] : ''; };
  const rooms = [...document.querySelectorAll('#gLabels text')].map(t => t.textContent), rr = [];
  for (let i = 0; i < rooms.length; i += 2) rr.push(rooms[i] + ' ' + rooms[i+1]);
  return [
    `${v} | ${g('Obrys (lica zewn.)')} | zabudowa ${g('Pow. zabudowy')} | obwód ${g('Obwód ścian zewn.')} | zwartość ${g('Zwartość P/(4√A)')} | netto ${g('Pow. pomieszczeń')} | dach ${gr('Pow. połaci')}`,
    document.querySelector('#kvPass').innerText.replace(/\n/g, ' '),
    out.join('\n'),
    'POMIESZCZENIA: ' + rr.join(' | '),
    'OTWORY (cm): ' + [...document.querySelectorAll('#gOps text')].map(t => t.textContent).join(','),
  ].join('\n');
};
