// Sprawdza rzeczywiste błędy pomijane przez raster oraz granice kontroli.
const assert = require('node:assert/strict'), model = require('./editor_model');
const audit = require('./audit_precision'), app = model(), state = app.state();
const result = audit(state, app);
assert.deepEqual(result.wallOverlaps.map(o => [o.furniture, o.wall, o.penetration]),
  [[103, 35, 23], [115, 48, 23], [141, 8, 23]]);
assert.equal(result.furnitureOverlaps.length, 0);
assert.equal(result.unsupportedWalls.length, 0);
// Cały zestaw przesunięty o 23 mm mieści się matematycznie, lecz bez zapasu montażowego.
const shifted = JSON.parse(JSON.stringify(state));
for (const id of [102, 103, 114, 115, 139, 140, 141]) shifted.furn.find(f => f.id === id).x -= 23;
assert.equal(audit(shifted, app).wallOverlaps.length, 0);
assert.equal(audit(shifted, app).furnitureOverlaps.length, 0);
// Styk nie jest penetracją; przejście nie jest murem; referencje nie są korpusami.
const fixture = {hidden: [], walls: [{id: 1, x1: 0, y1: 0, x2: 2000, y2: 0,
  t: 100, op: [{id: 2, type: 'open', pos: 1000, w: 800}]}], furn: [
  {id: 3, x: 200, y: 100, w: 100, d: 100, rot: 0},
  {id: 4, x: 1000, y: 0, w: 200, d: 100, rot: 0},
  {id: 5, x: 300, y: 0, w: 100, d: 100, rot: 0, ref: true}]};
assert.equal(audit(fixture, app).wallOverlaps.length, 0);
fixture.furn[0].y -= 1;
assert.equal(audit(fixture, app).wallOverlaps[0].penetration, 1);
fixture.walls[0].op[0].type = 'window';
assert.ok(audit(fixture, app).wallOverlaps.some(o => o.furniture === 4));
console.log('AUDIT_PRECISION_OK: 23 mm penetracje, przesunięcie zestawów, styki, otwory i referencje');
