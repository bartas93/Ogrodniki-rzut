// Obrót układu zabudowy w metrach; granice i NMT pozostają w układzie mapy.
export function rotatePoint([x,y],angle=0){const a=angle*Math.PI/180,c=Math.cos(a),s=Math.sin(a);return [c*x-s*y,s*x+c*y];}
export function inversePoint(p,angle=0){return rotatePoint(p,-angle);}
export function elementCorners(e,angle=0){return [[e.x,e.y],[e.x+e.w,e.y],[e.x+e.w,e.y+e.h],[e.x,e.y+e.h]].map(p=>rotatePoint(p,angle));}
export function bounds(points){const x=Math.min(...points.map(p=>p[0])),y=Math.min(...points.map(p=>p[1]));return {x,y,w:Math.max(...points.map(p=>p[0]))-x,h:Math.max(...points.map(p=>p[1]))-y};}
export function suggestLayoutAngle(p){let x=0,y=0;for(let i=0;i<p.length;i++){const a=p[i],b=p[(i+1)%p.length],dx=b[0]-a[0],dy=b[1]-a[1],length=Math.hypot(dx,dy);if(length<.2||Math.abs(dx)<Math.abs(dy))continue;const theta=Math.atan2(dy,dx);x+=length*Math.cos(2*theta);y+=length*Math.sin(2*theta);}return Math.hypot(x,y)>.01?Math.atan2(y,x)*90/Math.PI:0;}
