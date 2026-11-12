import * as THREE from './vendor/three/three.module.min.js';
import {MODULES,BY_ID,slotsFor,dailyIssues} from './kuchnia-model.mjs';
const mm=v=>v/1000,world=v=>(v-200)/1000;
export class KitchenScene{
 constructor(host,plan,hooks={}){
  this.host=host;this.plan=plan;this.hooks=hooks;this.opened=new Set();this.onlySlots=new Map();this.progress=new Map();this.animations=new Map();this.modules=new Map();this.pickables=[];this.labels=[];this.options={labels:true,dimensions:true,appliances:true};this.points=new Map();this.theta=.65;this.elevation=.46;this.radius=7.2;this.target=new THREE.Vector3(2.1,1.0,1.3);this.raf=0;this.ready=false;
  this.scene=new THREE.Scene();this.scene.background=new THREE.Color('#efeee6');
  this.camera=new THREE.PerspectiveCamera(39,1,.05,60);
  this.renderer=new THREE.WebGLRenderer({antialias:true,alpha:false,preserveDrawingBuffer:true,powerPreference:'low-power'});
  this.renderer.setPixelRatio(Math.min(devicePixelRatio,1.6));this.renderer.shadowMap.enabled=true;this.renderer.shadowMap.type=THREE.PCFSoftShadowMap;this.renderer.toneMapping=THREE.ACESFilmicToneMapping;this.renderer.toneMappingExposure=1.15;host.prepend(this.renderer.domElement);
  this.materials=this.palette();this.scene.add(new THREE.HemisphereLight(0xfffcf2,0x938974,2.7));const key=new THREE.DirectionalLight(0xfff3dc,3.2);key.position.set(2,6,3);key.castShadow=true;key.shadow.mapSize.set(1024,1024);key.shadow.camera.left=-5;key.shadow.camera.right=5;key.shadow.camera.top=5;key.shadow.camera.bottom=-5;key.shadow.normalBias=.03;key.shadow.bias=-.0003;this.scene.add(key);
  const fill=new THREE.DirectionalLight(0xe7f0ff,1.3);fill.position.set(1,4,-3);this.scene.add(fill);
  this.staticRoot=new THREE.Group();this.scene.add(this.staticRoot);this.dynamic=new THREE.Group();this.scene.add(this.dynamic);this.dimensionRoot=new THREE.Group();this.scene.add(this.dimensionRoot);
  this.buildRoom();this.buildDimensions();this.setPlan(plan);this.resizeObserver=new ResizeObserver(()=>this.resize());this.resizeObserver.observe(host);this.resize();this.bind();this.ready=true;this.hooks.onReady?.();
  this.renderer.domElement.addEventListener('webglcontextlost',e=>{e.preventDefault();this.ready=false;document.querySelector('#noWebGL').hidden=false;});
  this.renderer.domElement.addEventListener('webglcontextrestored',()=>{this.ready=true;document.querySelector('#noWebGL').hidden=true;this.invalidate();});
 }
 palette(){
  const mat=(c,extra={})=>new THREE.MeshStandardMaterial({color:c,roughness:.65,...extra});
  const canvas=document.createElement('canvas');canvas.width=128;canvas.height=512;const ctx=canvas.getContext('2d');ctx.fillStyle='#bba17e';ctx.fillRect(0,0,128,512);let seed=20;const random=()=>{seed=(seed*16807)%2147483647;return (seed-1)/2147483646;};
  for(let i=0;i<170;i++){const x=random()*128;ctx.strokeStyle=`rgba(${random()>.5?'91,62,30':'247,225,187'},${.03+random()*.08})`;ctx.lineWidth=.3+random();ctx.beginPath();ctx.moveTo(x,0);for(let y=0;y<530;y+=25)ctx.lineTo(x+Math.sin(y/130+i)*random()*2,y);ctx.stroke();}
  const grain=new THREE.CanvasTexture(canvas);grain.colorSpace=THREE.SRGBColorSpace;grain.wrapS=grain.wrapT=THREE.RepeatWrapping;
  return {front:mat('#e9e6d9'),wood:mat('#fff5df',{map:grain}),inside:mat('#ece6d7'),counter:mat('#e6decc',{roughness:.38}),floor:mat('#d5d0c1'),wall:mat('#f1eee5'),dark:mat('#353a32'),metal:mat('#818981',{metalness:.7,roughness:.32}),glass:mat('#aec6bb',{transparent:true,opacity:.46,roughness:.2}),black:mat('#171e1c',{roughness:.27,metalness:.2}),green:mat('#93a48a'),white:mat('#f9f8ed'),grey:mat('#777c77'),plinth:mat('#99917f')};
 }
 box(parent,x,y,z,w,h,d,material,shadow=true){const mesh=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),material);mesh.position.set(x,y,z);mesh.castShadow=shadow;mesh.receiveShadow=true;parent.add(mesh);return mesh;}
 cylinder(parent,x,y,z,r,h,material,rTop=r){const mesh=new THREE.Mesh(new THREE.CylinderGeometry(rTop,r,h,24),material);mesh.position.set(x,y,z);mesh.castShadow=true;mesh.receiveShadow=true;parent.add(mesh);return mesh;}
 line(parent,points,color='#9c9e88'){const line=new THREE.Line(new THREE.BufferGeometry().setFromPoints(points.map(p=>new THREE.Vector3(...p))),new THREE.LineBasicMaterial({color,transparent:true,opacity:.72}));parent.add(line);return line;}
 buildRoom(){const r=this.staticRoot,M=this.materials;
  this.box(r,2.3,-.045,1.7,5.1,.08,3.9,M.floor,false);
  for(let x=-.2;x<4.9;x+=.6)this.line(r,[[x,.001,-.2],[x,.001,3.65]],'#bdbbac');for(let z=-.2;z<3.7;z+=.6)this.line(r,[[-.2,.001,z],[4.85,.001,z]],'#bdbbac');
  this.box(r,-.075,1.4,1.65,.15,2.8,3.45,M.wall);this.box(r,.65,1.4,-.075,1.3,2.8,.15,M.wall);this.box(r,3.65,1.4,-.075,1.7,2.8,.15,M.wall);this.box(r,2.05,.55,-.075,1.5,1.1,.15,M.wall);this.box(r,2.05,2.55,-.075,1.5,.5,.15,M.wall);
  for(const x of [1.3,2.8])this.box(r,x,1.7,-.02,.045,1.22,.07,M.white);for(const y of [1.1,2.3])this.box(r,2.05,y,-.02,1.54,.045,.07,M.white);this.box(r,2.05,1.7,-.04,1.45,1.15,.015,M.glass,false);
  this.box(r,2.05,1.65,-.16,1.45,1.15,.02,M.green,false);
  this.box(r,2.25,.885,.3,4.5,.03,.6,M.counter);this.box(r,2.75,.885,2.35,1.7,.03,.9,M.counter);
  this.box(r,1.6,.904,.3,.59,.012,.43,M.metal);this.box(r,1.6,.912,.3,.52,.012,.36,M.dark);
  this.cylinder(r,1.6,1.025,.075,.018,.25,M.metal);this.box(r,1.6,1.14,.16,.035,.035,.19,M.metal);this.cylinder(r,1.6,1.105,.245,.018,.07,M.metal);
  this.box(r,3.2,.907,.3,.59,.012,.49,M.black);for(const x of [3.04,3.36])for(const z of [.17,.43]){const ring=new THREE.Mesh(new THREE.TorusGeometry(.085,.002,6,32),M.grey);ring.rotation.x=-Math.PI/2;ring.position.set(x,.917,z);r.add(ring);}
  this.box(r,3.2,1.69,.22,.62,.11,.44,M.dark);this.box(r,3.2,2.245,.1,.23,1.0,.22,M.dark);
  this.box(r,3.605,.58,2.5,.015,.1,.14,M.dark);this.box(r,3.615,.58,2.5,.008,.075,.1,M.white);
 }
 dimension(a,b,label,anchor){this.line(this.dimensionRoot,[a,b]);const axis=Math.abs(a[0]-b[0])>.01?2:0;for(const p of [a,b]){const c=[...p],d=[...p];c[axis]-=.045;d[axis]+=.045;this.line(this.dimensionRoot,[c,d]);}const el=document.createElement('span');el.className='dim-label';el.textContent=label;document.querySelector('#sceneLabels').append(el);this.labels.push({el,point:new THREE.Vector3(...anchor),dimension:true});}
 buildDimensions(){this.dimension([.6,.03,1.65],[1.9,.03,1.65],'130 cm',[1.25,.06,1.65]);this.dimension([3.95,.03,.6],[3.95,.03,1.9],'130 cm',[3.95,.06,1.25]);this.dimension([1.9,.03,3.05],[3.6,.03,3.05],'170 cm',[2.75,.06,3.05]);}
 clearDynamic(){this.dynamic.traverse(o=>{if(o.geometry)o.geometry.dispose();});this.dynamic.clear();for(const l of this.labels.filter(l=>!l.dimension))l.el.remove();this.labels=this.labels.filter(l=>l.dimension);this.modules.clear();this.pickables=[];if(this.outline){this.scene.remove(this.outline);this.outline.geometry.dispose();this.outline.material.dispose();this.outline=null;}}
 setPlan(plan){this.plan=plan;this.clearDynamic();for(const m of MODULES)if(m.kind!=='counter')this.buildModule(m);this.buildDaily();this.select(this.selected||'I2');this.updateClearance();this.invalidate();}
 position(m,g){if(m.axis==='west'){g.position.set(world(m.x),0,world(m.y+m.w/2));g.rotation.y=Math.PI/2;}else if(m.axis==='islandNorth'){g.position.set(world(m.x+m.w/2),0,world(m.y+m.d));g.rotation.y=Math.PI;}else g.position.set(world(m.x+m.w/2),0,world(m.y));}
 buildModule(m){const g=new THREE.Group();g.userData.moduleId=m.id;this.dynamic.add(g);this.position(m,g);const M=this.materials,w=mm(m.w),d=mm(m.d)-.01,h=mm(m.h),t=.018,high=m.h>1000,bodyTop=high?h:.87,front=high?M.wood:M.front,c=this.plan.configs[m.id],slots=slotsFor(m,c),motions=[];
  this.modules.set(m.id,{root:g,motions,m});this.pickables.push(g);
  this.box(g,0,.075,d/2,w-.05,.15,d-.07,M.plinth);
  this.box(g,-w/2+t/2,(bodyTop+.15)/2,d/2,t,bodyTop-.15,d,M.inside);this.box(g,w/2-t/2,(bodyTop+.15)/2,d/2,t,bodyTop-.15,d,M.inside);this.box(g,0,(bodyTop+.15)/2,.009,w,bodyTop-.15,.018,M.inside);this.box(g,0,.159,d/2,w,.018,d,M.inside);this.box(g,0,bodyTop-.009,d/2,w,.018,d,M.inside);
  if(m.kind==='blind'){this.box(g,0,.51,d-.009,w,.72,.018,M.wood);this.addLabel(m,g);return;}
  const addHandle=(parent,x,y,z,vertical=false)=>this.box(parent,x,y,z,vertical?.009:Math.min(.16,w*.4),vertical?.16:.009,.02,M.dark,false);
  const door=(bottom,height,count=1)=>{for(let i=0;i<count;i++){const dw=w/count,hinge=new THREE.Group(),right=i===1;hinge.position.set(right?w/2:-w/2,bottom,d);g.add(hinge);const x=(right?-1:1)*dw/2;this.box(hinge,x,height/2,0,dw-.003,height-.003,.02,front);addHandle(hinge,(right?-1:1)*(dw-.04),height*.55,.023,high);motions.push({node:hinge,type:'door',sign:right?1:-1});}};
  const tray=(s,type='drawer')=>{const yy=mm(s.y),hh=mm(s.h),root=new THREE.Group();root.position.set(0,yy,0);g.add(root);this.box(root,0,hh/2,d,w-.004,hh-.004,.02,front);addHandle(root,0,hh-.035,d+.023);const dw=w-.06,depth=d-.07;
   this.box(root,0,.035,d-depth/2,dw,.018,depth,M.wood);this.box(root,-dw/2,.08,d-depth/2,.015,Math.min(.15,hh-.03),depth,M.wood);this.box(root,dw/2,.08,d-depth/2,.015,Math.min(.15,hh-.03),depth,M.wood);this.box(root,0,.08,d-depth,dw,Math.min(.15,hh-.03),.015,M.wood);
   if(type==='vertical')for(let x=-dw/2+.07;x<dw/2-.03;x+=.07)this.box(root,x,.32,d-depth/2,.009,.6,depth,M.wood);
   this.contents(root,m,s,.06);motions.push({node:root,type:'slide',travel:Math.min(.45,d-.05),slotId:s.id});
  };
  if(c.mechanism==='drawers3'||c.mechanism==='drawers2'||c.mechanism==='hobdrawers'){
   if(c.mechanism==='hobdrawers')this.box(g,0,.82,d,w,.1,.018,front);
   for(const s of slots)tray(s);
  }else if(c.mechanism==='vertical')tray(slots[0],'vertical');
  else if(c.mechanism==='cargo'){
   const root=new THREE.Group();g.add(root);this.box(root,0,(bodyTop+.15)/2,d,w-.004,bodyTop-.153,.02,front);addHandle(root,0,bodyTop-.05,d+.023);
   for(const s of slots){const y=mm(s.y);this.box(root,0,y+.015,d/2,w-.065,.018,d-.065,M.wood);this.contents(root,m,s,y+.03);for(const x of [-w/2+.04,w/2-.04])this.box(root,x,y+.08,d/2,.008,.14,d-.065,M.metal);}
   motions.push({node:root,type:'slide',travel:Math.min(.45,d-.05)});
  }else if(c.mechanism==='inner'){
   for(const s of slots){const y=mm(s.y),root=new THREE.Group();root.position.y=y;g.add(root);this.box(root,0,.02,d/2,w-.07,.02,d-.08,M.wood);this.box(root,0,.09,d-.03,w-.07,.14,.02,M.wood);this.contents(root,m,s,.04);motions.push({node:root,type:'slide',travel:Math.min(.25,d-.1)});}door(.15,bodyTop-.15,w>.65?2:1);
  }else if(c.mechanism==='shelves'||c.mechanism==='sinkShelf'){
   for(const s of slots){const y=mm(s.y);this.box(g,0,y+.009,d/2,w-.035,.018,d-.04,M.inside);this.contents(g,m,s,y+.025);}door(.15,bodyTop-.15,w>.65?2:1);
  }else if(c.mechanism==='bins'){
   const root=new THREE.Group();g.add(root);this.box(root,0,.465,d,w-.004,.63,.02,front);addHandle(root,0,.73,d+.023);this.box(root,0,.16,d/2,w-.05,.02,d-.08,M.wood);for(const x of [-.22,0,.22])this.box(root,x,.35,d*.6,.18,.35,.28,M.grey);this.box(g,0,.825,d,w,.09,.018,front);motions.push({node:root,type:'slide',travel:.45});
  }else if(c.mechanism==='oven'){
   tray(slots[0]);door(1.52,h-1.52,1);this.box(g,0,1.2,d,w-.02,.6,.025,M.black);this.box(g,0,1.18,d+.017,w-.1,.4,.012,M.glass);addHandle(g,0,1.39,d+.045);for(const x of [-.18,.18])this.cylinderHorizontal(g,x,1.44,d+.04,.022,.018,M.metal);
   this.contents(g,m,slots[1],1.54);
  }else if(c.mechanism==='fridge'){
   for(const y of [.2,.65,1.05,1.45,1.9,2.28])this.box(g,0,y,d/2,w-.05,.012,d-.05,M.white);
   door(.15,h-.15);for(const y of [.55,.85,1.2,1.6])this.box(g,0,y,d/2,w-.08,.12,d-.12,M.glass);
  }else if(c.mechanism==='dishwasher'){
   const root=new THREE.Group();root.position.set(0,.15,d);g.add(root);this.box(root,0,.36,0,w-.004,.72,.02,front);addHandle(root,0,.67,.026);motions.push({node:root,type:'drop'});
   for(const y of [.35,.65]){this.box(g,0,y,d/2,w-.06,.015,d-.07,M.metal);for(let x=-w/2+.06;x<w/2-.03;x+=.05)this.box(g,x,y+.06,d/2,.003,.11,d-.07,M.metal);}
  }
  this.addLabel(m,g);
 }
 cylinderHorizontal(parent,x,y,z,r,depth,material){const mesh=this.cylinder(parent,x,y,z,r,depth,material);mesh.rotation.x=Math.PI/2;return mesh;}
 contents(parent,m,s,baseY){const assignments=this.plan.assignments.filter(a=>a.moduleId===m.id&&a.slotId===s.id),M=this.materials;let index=0;
  for(const a of assignments.slice(0,3)){const item=this.plan.inventory.find(i=>i.id===a.itemId),x=(index++-(Math.min(assignments.length,3)-1)/2)*Math.min(.2,mm(m.w-90)/3),z=mm(m.d)*.55,scale=Math.min(1,(m.w-70)/500);
   if(/plates|soup|bowls|salads|mugs|glasses|wine/.test(a.itemId)){
    const plate=/plates|soup/.test(a.itemId),count=plate?Math.min(a.qty,5):Math.min(a.qty,2);
    for(let i=0;i<count;i++){const yy=baseY+.018+i*(plate?.014:.08);this.cylinder(parent,x+(plate?0:i*.08),yy,z,(plate?.13:.055)*scale,plate?.012:.075,M.white,plate?.13*scale:.06*scale);}
   }else if(/pots|pans|lids/.test(a.itemId)){this.cylinder(parent,x,baseY+.065,z,.11*scale,.1,M.metal);this.box(parent,x+.16*scale,baseY+.09,z,.17*scale,.018,.025,M.dark);}
   else if(/trays|boards/.test(a.itemId)&&this.plan.configs[m.id].mechanism==='vertical'){for(let i=0;i<Math.min(3,a.qty);i++)this.box(parent,-.07+i*.06,baseY+.23,z,.014,.4,.3,M.grey);}
   else if(/cutlery|utensils/.test(a.itemId)){for(let i=0;i<5;i++)this.box(parent,x-.07+i*.035,baseY+.025,z,.014,.012,.2,M.metal);}
   else if(/spices|oils|dryfood/.test(a.itemId)){for(let i=0;i<2;i++)this.cylinder(parent,x+(i-.5)*.07,baseY+.07,z,.025,.13,M.green);}
   else this.box(parent,x,baseY+.055,z,Math.min(.17,mm(m.w-80)/3),.1,Math.min(.22,mm(m.d-70)),/linen/.test(a.itemId)?M.green:M.white);
   // Zawartość jest symbolem, nie próbą upakowania wszystkich sztuk w modelu.
  }
 }
 addLabel(m,g){const el=document.createElement('button');el.className='scene-label';el.textContent=m.id+' · '+m.w/10;el.setAttribute('aria-label',m.id+' '+m.name);el.onclick=()=>this.hooks.select?.(m.id);document.querySelector('#sceneLabels').append(el);const p=new THREE.Vector3(0,mm(m.h)+.08,mm(m.d)*.75);g.updateMatrixWorld(true);p.applyMatrix4(g.matrixWorld);this.labels.push({el,point:p,moduleId:m.id});}
 buildDaily(){const g=new THREE.Group();g.userData.moduleId='BLAT';this.dynamic.add(g);this.pickables.push(g);this.applianceRoot=g;const M=this.materials;
  for(const a of this.plan.daily){const root=new THREE.Group();root.position.set(world(a.x+a.w/2),.9,world(a.y+a.d/2));g.add(root);const w=mm(a.w),d=mm(a.d),h=mm(a.h);
   if(a.id==='coffee'){this.box(root,0,h/2,0,w,h,d,M.dark);this.box(root,0,h*.67,d/2+.004,w*.4,h*.18,.012,M.black);this.box(root,0,h*.27,d/2+.015,w*.75,.02,.06,M.metal);this.cylinder(root,0,h*.28,d/2+.02,w*.11,h*.15,M.white);}
   if(a.id==='kettle'){this.cylinder(root,0,h/2,0,w*.4,h,M.metal,w*.33);this.cylinder(root,0,h+.004,0,w*.34,.015,M.dark);this.box(root,w*.45,h*.5,0,w*.1,h*.5,d*.6,M.dark);}
   if(a.id==='mixer'){this.box(root,0,h*.11,0,w,.22*h,d,M.white);this.cylinder(root,0,h*.56,-d*.08,w*.31,h*.65,M.metal,w*.38);this.cylinder(root,0,h*.91,-d*.08,w*.42,.03,M.dark);this.box(root,0,h*.2,d*.41,w*.4,h*.2,.018,M.black);}
   if(a.id==='pitcher'){this.cylinder(root,0,h*.48,0,w*.4,h*.94,M.glass);this.cylinder(root,0,h*.96,0,w*.42,.025,M.white);}
   if(a.id==='knifeBlock'){this.box(root,0,h*.35,0,w,h*.7,d,M.wood);for(let i=0;i<4;i++)this.box(root,-w*.3+i*w*.2,h*.8,0,w*.12,h*.4,d*.14,M.dark);}
  }
  const cord=new THREE.CatmullRomCurve3([new THREE.Vector3(3.47,.91,2.25),new THREE.Vector3(3.58,.915,2.28),new THREE.Vector3(3.62,.87,2.3),new THREE.Vector3(3.62,.58,2.5)]);const cable=new THREE.Mesh(new THREE.TubeGeometry(cord,18,.004,6,false),M.dark);g.add(cable);
  g.visible=this.options.appliances;
 }
 select(id){this.selected=id;for(const l of this.labels)if(l.moduleId)l.el.classList.toggle('selected',l.moduleId===id);if(this.outline){this.scene.remove(this.outline);this.outline.geometry.dispose();this.outline.material.dispose();this.outline=null;}const entry=this.modules.get(id);if(entry){this.outline=new THREE.BoxHelper(entry.root,0x6b8655);this.outline.material.depthTest=false;this.outline.material.transparent=true;this.outline.material.opacity=.65;this.scene.add(this.outline);}this.invalidate();}
 isOpen(id){return this.opened.has(id);}
 toggle(id){if(BY_ID[id]?.kind==='blind'||id==='BLAT')return;this.onlySlots.delete(id);if(this.opened.has(id))this.opened.delete(id);else this.opened.add(id);this.updateClearance();this.invalidate();this.hooks.onOpening?.();}
 openSlot(id,slotId){this.opened.add(id);this.onlySlots.set(id,slotId);this.progress.set(id,0);this.animations.delete(id);this.updateClearance();this.invalidate();this.hooks.onOpening?.();}
 toggleAll(){const open=MODULES.some(m=>!['blind','counter'].includes(m.kind)&&!this.opened.has(m.id));this.opened.clear();this.onlySlots.clear();if(open)for(const m of MODULES)if(!['blind','counter'].includes(m.kind))this.opened.add(m.id);this.updateClearance();this.invalidate();this.hooks.onOpening?.();return open;}
 updateClearance(){const node=document.querySelector('#clearance'),issues=dailyIssues(this.plan),north=[...this.opened].map(id=>BY_ID[id]).filter(m=>m?.run==='Ściana z oknem'),island=[...this.opened].map(id=>BY_ID[id]).filter(m=>m?.axis==='islandNorth');let min=1300;
  for(const n of north)for(const i of island)if(Math.min(n.x+n.w,i.x+i.w)>Math.max(n.x,i.x))min=Math.min(min,1300-(n.kind==='dishwasher'?720:450)-450);
  if(min<750)issues.unshift('Między otwartymi frontami naprzeciw siebie zostaje w modelu około '+Math.round(min/10)+' cm. Zamknij je, aby wygodnie przejść.');else if(this.opened.has('N3'))issues.unshift('Opuszczony front zmywarki zajmuje w modelu 72 cm; z przejścia 130 cm zostaje około 58 cm. Zweryfikuj swój model.');node.textContent=issues.join(' ');node.hidden=!issues.length;}
 option(key,value){this.options[key]=value;this.dimensionRoot.visible=this.options.dimensions&&!this.detailView;if(this.applianceRoot)this.applianceRoot.visible=this.options.appliances;this.invalidate();}
 resize(){const w=this.host.clientWidth,h=this.host.clientHeight;if(!w||!h)return;this.renderer.setSize(w,h);this.camera.aspect=w/h;this.camera.updateProjectionMatrix();this.invalidate();}
 updateCamera(){this.elevation=THREE.MathUtils.clamp(this.elevation,.05,1.55);this.radius=THREE.MathUtils.clamp(this.radius,1,12);this.camera.position.set(this.target.x+this.radius*Math.sin(this.theta)*Math.cos(this.elevation),this.target.y+this.radius*Math.sin(this.elevation),this.target.z+this.radius*Math.cos(this.theta)*Math.cos(this.elevation));this.camera.lookAt(this.target);this.camera.updateMatrixWorld();}
 view(key){this.detailView=false;this.dimensionRoot.visible=this.options.dimensions;const presets={perspective:[.65,.46,7.2,2.1,1,1.3],top:[0,1.53,6.6,2.25,0,1.55],north:[0,.08,6.8,2.25,1.1,.5],west:[Math.PI/2,.14,5.6,.3,1.1,1.2]};const p=presets[key]||presets.perspective;[this.theta,this.elevation,this.radius]=p;this.target.set(...p.slice(3));this.hooks.onView?.(key);this.invalidate();}
 focus(id){const e=this.modules.get(id);if(!e)return;this.detailView=true;this.dimensionRoot.visible=false;this.hooks.onView?.('detail');const p=e.root.localToWorld(new THREE.Vector3(0,mm(e.m.h)*.5,mm(e.m.d)));this.target.copy(p);this.theta=e.m.axis==='west'?Math.PI/2:e.m.axis==='islandNorth'?Math.PI:0;this.elevation=e.m.h>1000?.22:.55;this.radius=e.m.h>1000?3.5:1.7;this.invalidate();}
 zoom(factor){this.radius*=factor;this.invalidate();}
 pan(dx,dy){const factor=this.radius/this.host.clientHeight,right=new THREE.Vector3().setFromMatrixColumn(this.camera.matrix,0),up=new THREE.Vector3().setFromMatrixColumn(this.camera.matrix,1);this.target.addScaledVector(right,-dx*factor).addScaledVector(up,dy*factor);this.target.x=THREE.MathUtils.clamp(this.target.x,-.5,5);this.target.z=THREE.MathUtils.clamp(this.target.z,-.5,4);this.target.y=THREE.MathUtils.clamp(this.target.y,0,2.4);}
 bind(){const canvas=this.renderer.domElement;canvas.addEventListener('contextmenu',e=>e.preventDefault());canvas.addEventListener('wheel',e=>{e.preventDefault();this.zoom(Math.exp(e.deltaY*.001));},{passive:false});
  canvas.addEventListener('pointerdown',e=>{canvas.setPointerCapture(e.pointerId);this.points.set(e.pointerId,{x:e.clientX,y:e.clientY});this.tap={x:e.clientX,y:e.clientY,id:e.pointerId,valid:this.points.size===1};if(this.points.size>1)this.tap.valid=false;this.panMode=e.button===2||e.shiftKey;this.multi=this.multiState();});
  canvas.addEventListener('pointermove',e=>{const old=this.points.get(e.pointerId);if(!old)return;const dx=e.clientX-old.x,dy=e.clientY-old.y;this.points.set(e.pointerId,{x:e.clientX,y:e.clientY});if(Math.hypot(e.clientX-this.tap.x,e.clientY-this.tap.y)>6)this.tap.valid=false;
   if(this.points.size===2){this.tap.valid=false;const next=this.multiState();if(this.multi){this.radius*=this.multi.distance/Math.max(5,next.distance);this.pan(next.x-this.multi.x,next.y-this.multi.y);}this.multi=next;}
   else if(this.panMode)this.pan(dx,dy);else{this.theta-=dx*.007;this.elevation+=dy*.005;}this.invalidate();
  });
  const end=e=>{const tap=this.tap&&this.tap.valid&&this.tap.id===e.pointerId&&this.points.size===1;this.points.delete(e.pointerId);this.multi=null;if(e.type==='pointerup'&&tap){const r=canvas.getBoundingClientRect(),mouse=new THREE.Vector2((e.clientX-r.left)/r.width*2-1,-(e.clientY-r.top)/r.height*2+1),ray=new THREE.Raycaster();ray.setFromCamera(mouse,this.camera);const hit=ray.intersectObjects(this.pickables,true)[0];if(hit){let o=hit.object;while(o&&!o.userData.moduleId)o=o.parent;if(o)this.hooks.select?.(o.userData.moduleId);}}if(this.tap)this.tap.valid=false;};canvas.addEventListener('pointerup',end);canvas.addEventListener('pointercancel',end);
  this.host.addEventListener('keydown',e=>{const keys=['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','+','-'];if(!keys.includes(e.key)||e.target!==this.host)return;e.preventDefault();if(e.key==='ArrowLeft')this.theta-=.1;if(e.key==='ArrowRight')this.theta+=.1;if(e.key==='ArrowUp')this.elevation+=.08;if(e.key==='ArrowDown')this.elevation-=.08;if(e.key==='+')this.radius*=.9;if(e.key==='-')this.radius*=1.1;this.invalidate();});
 }
 multiState(){if(this.points.size!==2)return null;const [a,b]=[...this.points.values()];return {distance:Math.hypot(a.x-b.x,a.y-b.y),x:(a.x+b.x)/2,y:(a.y+b.y)/2};}
 invalidate(){if(!this.raf)this.raf=requestAnimationFrame(()=>this.frame());}
 frame(){this.raf=0;const now=performance.now();let active=false;for(const [id,e] of this.modules){const target=this.opened.has(id)?1:0,last=this.progress.get(id)||0;let animation=this.animations.get(id);if(!animation||animation.target!==target){animation={target,from:last,start:now};this.animations.set(id,animation);}const t=Math.min(1,(now-animation.start)/450),next=t===1?target:animation.from+(target-animation.from)*(1-Math.pow(1-t,3));this.progress.set(id,next);if(next!==target)active=true;for(const motion of e.motions){const amount=this.onlySlots.has(id)&&motion.slotId&&this.onlySlots.get(id)!==motion.slotId?0:next;if(motion.type==='door')motion.node.rotation.y=motion.sign*amount*Math.PI*.55;if(motion.type==='slide')motion.node.position.z=amount*motion.travel;if(motion.type==='drop')motion.node.rotation.x=amount*Math.PI/2;}}
  this.updateCamera();this.outline?.update();this.renderer.render(this.scene,this.camera);this.positionLabels();if(active)this.invalidate();
 }
 positionLabels(){const width=this.host.clientWidth,height=this.host.clientHeight;for(const l of this.labels){const point=l.point.clone().project(this.camera),visible=point.z>-1&&point.z<1&&Math.abs(point.x)<1&&Math.abs(point.y)<1&&(l.dimension?this.options.dimensions&&!this.detailView:this.options.labels);l.el.hidden=!visible;if(visible){l.el.style.left=(point.x+1)*width/2+'px';l.el.style.top=(-point.y+1)*height/2+'px';}}}
 png(){this.renderer.render(this.scene,this.camera);return this.renderer.domElement.toDataURL('image/png');}
}
