// Kontrola prawdziwym silnikiem edytora, bez uruchamiania przeglądarki.
// Użycie: node tools/check_variant.js E2 [podglad.svg]
// Sprawdza kolizje, dostępność pomieszczeń i renderowanie miniatury.
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const html = fs.readFileSync(path.join(__dirname, '..', 'edytor-rzutu.html'), 'utf8');
const script = html.split('<script>')[1].split('</script>')[0];
const section = (start, end) => {
  const a = script.indexOf(start), b = script.indexOf(end, a + start.length);
  if (a < 0 || b < 0) throw new Error(`Brak sekcji edytora: ${start}`);
  return script.slice(a, b);
};
const nodes = new Map();
const document = {querySelector(selector) {
  if (!nodes.has(selector)) nodes.set(selector, {
    innerHTML: '', getBoundingClientRect: () => ({width:1600, height:1040}),
  });
  return nodes.get(selector);
}};
const context = vm.createContext({document, variant:process.argv[2] || 'E2'});
const source = script.slice(0, script.indexOf('/* ---------- widok ---------- */'))
  + section('/* ---------- widok ---------- */', '/* ---------- przyciąganie ---------- */')
  + section('/* ---------- rysowanie ---------- */', '/* ---------- panel właściwości ---------- */')
  + section('function variantStateFor(', 'function openThumbs(')
  + `
if (!VARIANTS[variant]) throw new Error('Nieznany wariant: ' + variant);
S = freshState(variant); normalize(); A = analyse();
const problems = S.furn.filter(f => A.fs.get(f.id)?.msgs.length)
  .map(f => ({name:f.name, messages:A.fs.get(f.id).msgs}));
const warnings = S.furn.filter(f => A.fs.get(f.id)?.warns.length)
  .map(f => ({name:f.name, messages:A.fs.get(f.id).warns}));
const unreachable = S.rooms.filter(r => !A.roomReach.has(A.rooms.get(r.id)?.reg?.k)).map(r => r.name);
const invalidLabels = S.rooms.filter(r => A.rooms.get(r.id)?.state !== 'ok').map(r => r.name);
const thumbnail = thumbFor(variant);
const scenarios = [];
if (S.furn.some(f=>f.arrangements)) {
  const keep = JSON.stringify(S);
  for (const f of S.furn.filter(f=>f.arrangements)) {
    S = JSON.parse(keep);
    const table = S.furn.find(x=>x.id===f.id);
    setArrangement(table,'expanded'); A = analyse();
    scenarios.push({name:'Stół 280 cm i 10 zajętych krzeseł',
      problems:S.furn.filter(x=>A.fs.get(x.id)?.msgs.length).map(x=>({name:x.name,messages:A.fs.get(x.id).msgs})),
      warnings:S.furn.filter(x=>A.fs.get(x.id)?.warns.length).map(x=>({name:x.name,messages:A.fs.get(x.id).warns})),
      unreachable:S.rooms.filter(r=>!A.roomReach.has(A.rooms.get(r.id)?.reg?.k)).map(r=>r.name)});
  }
  S = JSON.parse(keep); A = analyse();
}
const roof = roofRect(), width = roof.x2-roof.x1, depth = roof.y2-roof.y1;
view = {x:roof.x1-500, y:roof.y1-500, w:width+1000, h:depth+1000};
S.ui.zones = false; S.ui.pass = false;
drawRooms(); drawWalls(); drawOps(); drawFurn(); drawRoof();
globalThis.result = {variant, problems, warnings, unreachable, invalidLabels, hasEntry:A.hasEntry,
  bbox:A.bbox, area:(A.rect?(A.bbox.x2-A.bbox.x1)*(A.bbox.y2-A.bbox.y1):A.fpArea)/1e6, overhang:S.set.overhang, scenarios,
  roofArea:width*depth/Math.cos(S.set.pitch*Math.PI/180)/1e6,
  desks:S.furn.filter(f=>f.key==='desk').map(f=>[f.w,f.d]),
  thumbnailOk:thumbnail.svg.includes('<svg') && thumbnail.stats.includes('kontrola OK')};
globalThis.preview = '<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="'
  + Math.round(1600*view.h/view.w) + '" viewBox="' + [view.x,view.y,view.w,view.h].join(' ')
  + '" font-family="DejaVu Sans, sans-serif"><rect x="'+view.x+'" y="'+view.y+'" width="'+view.w+'" height="'+view.h+'" fill="white"/>'
  + ['gRoomFill','gWalls','gOps','gFurn','gRoof','gLabels'].map(id=>$('#'+id).innerHTML).join('') + '</svg>';
})();`;
vm.runInContext(source, context, {timeout:20000, filename:'edytor-kontrola.js'});
console.log(JSON.stringify(context.result, null, 2));
if (process.argv[3]) {
  // Atrybuty SVG 1.1 czytelne także dla rendererów bez obsługi CSS rgba/transparent.
  const preview = context.preview.replace(/fill="transparent"/g, 'fill="none"')
    .replace(/fill="rgba\(([^)]+)\)"/g, (_, rgba) => {
      const [r,g,b,a] = rgba.split(',');
      return `fill="rgb(${r},${g},${b})" fill-opacity="${a}"`;
    });
  fs.writeFileSync(process.argv[3], preview);
}
const r = context.result;
if (r.problems.length || r.unreachable.length || r.invalidLabels.length || !r.hasEntry || !r.thumbnailOk
    || r.scenarios.some(s=>s.problems.length || s.unreachable.length)) process.exitCode = 1;
