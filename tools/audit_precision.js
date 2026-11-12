// Niezależna kontrola prostokątów w mm, bez rastra i tolerancji 20 mm edytora.
// Ściany osiowe, bez wydłużeń końców na stykach; nie bada geometrii w pionie.
function auditPrecision(state, model) {
  const epsilon = 1e-7, hidden = new Set(state.hidden || []);
  const visible = item => !hidden.has(item.layer || '');
  const walls = [], unsupportedWalls = [];
  for (const wall of state.walls.filter(visible)) {
    if (wall.x1 !== wall.x2 && wall.y1 !== wall.y2) {
      unsupportedWalls.push(wall.id); continue;
    }
    const g = model.geom(wall), h = wall.t / 2;
    let segments = [[0, g.L]];
    for (const opening of wall.op.filter(o => o.type !== 'window')) {
      const start = opening.pos - opening.w / 2, end = opening.pos + opening.w / 2;
      segments = segments.flatMap(([a, b]) => end <= a || start >= b ? [[a, b]] :
        [[a, Math.min(b, start)], [Math.max(a, end), b]].filter(([a, b]) => b > a));
    }
    for (const [a, b] of segments) {
      const points = [[a, -h], [b, -h], [b, h], [a, h]].map(([u, v]) =>
        ({x: g.a.x + g.d.x * u + g.n.x * v, y: g.a.y + g.d.y * u + g.n.y * v}));
      walls.push({id: wall.id, x1: Math.min(...points.map(p => p.x)),
        x2: Math.max(...points.map(p => p.x)), y1: Math.min(...points.map(p => p.y)),
        y2: Math.max(...points.map(p => p.y))});
    }
  }
  const overlap = (a, b) => {
    const dx = Math.min(a.x2, b.x2) - Math.max(a.x1, b.x1);
    const dy = Math.min(a.y2, b.y2) - Math.max(a.y1, b.y1);
    return dx > epsilon && dy > epsilon ? {dx, dy, penetration: Math.min(dx, dy)} : null;
  };
  const furniture = state.furn.filter(f => visible(f) && !f.ref);
  const wallOverlaps = [], furnitureOverlaps = [];
  for (const f of furniture) for (const body of model.body(f)) for (const wall of walls) {
    const hit = overlap(body, wall);
    if (hit) wallOverlaps.push({furniture: f.id, wall: wall.id, ...hit});
  }
  for (let i = 0; i < furniture.length; i++) for (let j = i + 1; j < furniture.length; j++) {
    for (const a of model.body(furniture[i])) for (const b of model.body(furniture[j])) {
      const hit = overlap(a, b);
      if (hit) furnitureOverlaps.push({first: furniture[i].id, second: furniture[j].id, ...hit});
    }
  }
  return {wallOverlaps, furnitureOverlaps, unsupportedWalls};
}
module.exports = auditPrecision;
