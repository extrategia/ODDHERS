import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import gsap from 'gsap';
import { KNIGHT_CURVE } from '@/lib/knight-shape';
import { duration, ease } from '@/lib/motion';

/**
 * THE UNEXPECTED MOVE
 * Escena 3D del hero: un tablero, piezas que siguen trayectorias rectas y un caballo
 * (extruido desde la silueta del logotipo) que salta en L y deja una ruta lima.
 *
 * Three.js puro, sin wrappers: una sola escena, un solo bucle, pausado fuera de pantalla.
 */

export type KnightSceneApi = {
  /** Ejecuta el siguiente movimiento del recorrido. */
  move: () => void;
  /** Pausa o reanuda el render (p. ej. al salir del viewport). */
  setRunning: (on: boolean) => void;
  dispose: () => void;
};

type Options = {
  reduced: boolean;
  onMove?: (index: number, total: number) => void;
};

const NAVY = 0x122046;
const LIME = 0xc8ff3d;
const BONE = 0xf5f5f0;

type Cell = [number, number];
/** Recorrido cerrado del caballo: cada paso es un movimiento legal (2+1). */
const TOUR: Cell[] = [[-2, -1], [0, 0], [2, -1], [0, -2]];
const KNIGHT_HEIGHT = 2.7;

function knightShape() {
  const s = new THREE.Shape();
  s.moveTo(KNIGHT_CURVE.start[0], KNIGHT_CURVE.start[1]);
  for (const seg of KNIGHT_CURVE.segs) {
    if (seg[0] === 'L') {
      s.lineTo(seg[1][0], seg[1][1]);
      s.lineTo(seg[2][0], seg[2][1]);
    } else {
      s.bezierCurveTo(seg[1][0], seg[1][1], seg[2][0], seg[2][1], seg[3][0], seg[3][1]);
    }
  }
  return s;
}

function radialTexture(inner: string, outer: string) {
  const c = document.createElement('canvas');
  c.width = c.height = 128;
  const g = c.getContext('2d')!;
  const grad = g.createRadialGradient(64, 64, 0, 64, 64, 64);
  grad.addColorStop(0, inner);
  grad.addColorStop(1, outer);
  g.fillStyle = grad;
  g.fillRect(0, 0, 128, 128);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

export function createKnightScene(canvas: HTMLCanvasElement, { reduced, onMove }: Options): KnightSceneApi {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
  renderer.setClearColor(0x000000, 0);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.15;
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(NAVY, 9, 21);
  const pmrem = new THREE.PMREMGenerator(renderer);
  const envRT = pmrem.fromScene(new RoomEnvironment(), 0.04);
  scene.environment = envRT.texture;
  scene.environmentIntensity = 0.7;

  const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 60);
  const disposables: { dispose: () => void }[] = [envRT, pmrem];
  const keep = <T extends { dispose: () => void }>(o: T) => { disposables.push(o); return o; };

  /* ---------- Tablero ---------- */
  const N = 8;
  const pts: number[] = [];
  for (let i = -N; i <= N; i++) {
    pts.push(i + 0.5, 0, -N - 0.5, i + 0.5, 0, N + 0.5);
    pts.push(-N - 0.5, 0, i + 0.5, N + 0.5, 0, i + 0.5);
  }
  const gridGeo = keep(new THREE.BufferGeometry());
  gridGeo.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3));
  const gridMat = keep(new THREE.LineBasicMaterial({ color: 0x8ea2e0, transparent: true, opacity: 0.2 }));
  scene.add(new THREE.LineSegments(gridGeo, gridMat));

  /* ---------- Piezas convencionales (trayectorias rectas) ---------- */
  const pieceMat = keep(new THREE.MeshStandardMaterial({ color: 0x1d2f63, roughness: 0.55, metalness: 0.25 }));
  const cyl = keep(new THREE.CylinderGeometry(0.27, 0.3, 0.56, 40));
  const box = keep(new THREE.BoxGeometry(0.54, 1, 0.54));
  const pieces: { geo: THREE.BufferGeometry; cell: Cell; h: number; sy?: number }[] = [
    { geo: cyl, cell: [-3, -4], h: 0.28 }, { geo: cyl, cell: [-1, -4], h: 0.28 },
    { geo: cyl, cell: [1, -4], h: 0.28 }, { geo: cyl, cell: [3, -4], h: 0.28 },
    { geo: box, cell: [-1, -1], h: 0.5 }, // el obstáculo que el caballo salta (y que frena a la pieza de atrás)
    { geo: box, cell: [3, -2], h: 0.36, sy: 0.72 },
  ];
  const straight: number[] = [];
  for (const p of pieces) {
    const m = new THREE.Mesh(p.geo, pieceMat);
    m.position.set(p.cell[0], p.h, p.cell[1]);
    if (p.sy) m.scale.y = p.sy;
    scene.add(m);
    if (p.geo === cyl && p.cell[1] === -4) straight.push(p.cell[0], 0.006, -3.6, p.cell[0], 0.006, p.cell[0] === -1 ? -1.4 : 2.4);
  }
  const straightGeo = keep(new THREE.BufferGeometry());
  straightGeo.setAttribute('position', new THREE.Float32BufferAttribute(straight, 3));
  const straightMat = keep(new THREE.LineDashedMaterial({ color: BONE, transparent: true, opacity: 0.28, dashSize: 0.12, gapSize: 0.12 }));
  const straightLines = new THREE.LineSegments(straightGeo, straightMat);
  straightLines.computeLineDistances();
  scene.add(straightLines);

  /* ---------- Caballo: tres capas extruidas desde el logotipo ---------- */
  const shape = knightShape();
  const DS = 0.05, BT = 0.014, BS = 0.01, TC = 0.02;
  const slabGeo = keep(new THREE.ExtrudeGeometry(shape, {
    depth: DS, bevelEnabled: true, bevelThickness: BT, bevelSize: BS, bevelOffset: -BS, bevelSegments: 5, curveSegments: 16,
  }));
  const coreGeo = keep(new THREE.ExtrudeGeometry(shape, { depth: TC, bevelEnabled: false, curveSegments: 16 }));
  const bodyMat = keep(new THREE.MeshPhysicalMaterial({
    color: 0x15244f, metalness: 0.68, roughness: 0.3, clearcoat: 0.6, clearcoatRoughness: 0.22,
  }));
  const coreMat = keep(new THREE.MeshBasicMaterial({ color: LIME, toneMapped: false }));

  const knight = new THREE.Group();
  const front = new THREE.Mesh(slabGeo, bodyMat);
  front.position.z = TC / 2 + BT;
  const back = new THREE.Mesh(slabGeo, bodyMat);
  back.position.z = -TC / 2 - DS - BT;
  const core = new THREE.Mesh(coreGeo, coreMat);
  core.position.z = -TC / 2;
  knight.add(front, back, core);
  knight.scale.setScalar(KNIGHT_HEIGHT);
  scene.add(knight);

  /* ---------- Sombra de contacto y resplandor ---------- */
  const shadowTex = keep(radialTexture('rgba(3,7,20,.75)', 'rgba(3,7,20,0)'));
  const glowTex = keep(radialTexture('rgba(200,255,61,.55)', 'rgba(200,255,61,0)'));
  const planeGeo = keep(new THREE.PlaneGeometry(1, 1).rotateX(-Math.PI / 2));
  const shadowMat = keep(new THREE.MeshBasicMaterial({ map: shadowTex, transparent: true, depthWrite: false }));
  const glowMat = keep(new THREE.MeshBasicMaterial({ map: glowTex, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, opacity: 0.55, toneMapped: false }));
  const shadow = new THREE.Mesh(planeGeo, shadowMat);
  shadow.scale.set(2.6, 1, 2.6);
  shadow.position.y = 0.01;
  const glow = new THREE.Mesh(planeGeo, glowMat);
  glow.scale.set(4.2, 1, 4.2);
  glow.position.y = 0.008;
  scene.add(glow, shadow);

  /* ---------- Luces ---------- */
  const key = new THREE.DirectionalLight(BONE, 2.8);
  key.position.set(4, 6, 6);
  const rim = new THREE.DirectionalLight(LIME, 6);
  rim.position.set(-5, 3.5, -4);
  const rim2 = new THREE.DirectionalLight(0x9fb4ff, 2.2);
  rim2.position.set(6, 2.5, -5);
  const under = new THREE.PointLight(LIME, 1.8, 6, 2);
  scene.add(key, rim, rim2, under, new THREE.HemisphereLight(0x9fb4ff, NAVY, 0.5));

  /* ---------- Ruta lima y casilla destino ---------- */
  const stripGeo = keep(new THREE.PlaneGeometry(1, 0.075).rotateX(-Math.PI / 2).translate(0.5, 0, 0));
  const ringGeo = keep(new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(-0.5, 0, -0.5), new THREE.Vector3(0.5, 0, -0.5),
    new THREE.Vector3(0.5, 0, 0.5), new THREE.Vector3(-0.5, 0, 0.5),
  ]));
  type Trail = { group: THREE.Group; a: THREE.Mesh; b: THREE.Mesh; lenA: number; lenB: number; mats: THREE.Material[] };
  let trail: Trail | null = null;

  function makeTrail(from: Cell, to: Cell): Trail {
    const corner: Cell = Math.abs(to[0] - from[0]) === 2 ? [to[0], from[1]] : [from[0], to[1]];
    const group = new THREE.Group();
    const stripMat = new THREE.MeshBasicMaterial({ color: LIME, transparent: true, toneMapped: false });
    const lineMat = new THREE.LineBasicMaterial({ color: LIME, transparent: true, opacity: 0, toneMapped: false });
    const seg = (p: Cell, q: Cell) => {
      const m = new THREE.Mesh(stripGeo, stripMat);
      m.position.set(p[0], 0.014, p[1]);
      m.rotation.y = -Math.atan2(q[1] - p[1], q[0] - p[0]);
      m.scale.x = 0.0001;
      group.add(m);
      return m;
    };
    const a = seg(from, corner);
    const b = seg(corner, to);
    const ring = new THREE.LineLoop(ringGeo, lineMat);
    ring.position.set(to[0], 0.014, to[1]);
    group.add(ring);
    scene.add(group);
    return {
      group, a, b,
      lenA: Math.hypot(corner[0] - from[0], corner[1] - from[1]),
      lenB: Math.hypot(to[0] - corner[0], to[1] - corner[1]),
      mats: [stripMat, lineMat],
    };
  }
  function dropTrail(t: Trail) {
    scene.remove(t.group);
    t.mats.forEach((m) => m.dispose());
  }

  /* ---------- Estado ---------- */
  let index = 0;
  let busy = false;
  let running = false;
  let disposed = false;
  const pos = new THREE.Vector3(TOUR[0][0], 0, TOUR[0][1]);
  const focus = new THREE.Vector3(pos.x, 1.25, pos.z);
  const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
  const pose = { tilt: 0, squash: 1 };
  let portrait = false;

  function place() {
    knight.position.copy(pos);
    knight.scale.set(KNIGHT_HEIGHT, KNIGHT_HEIGHT * pose.squash, KNIGHT_HEIGHT);
    const lift = THREE.MathUtils.clamp(pos.y / 1.5, 0, 1);
    shadow.position.set(pos.x, 0.01, pos.z);
    shadowMat.opacity = 1 - lift * 0.6;
    shadow.scale.setScalar(2.6 + lift * 1.2);
    glow.position.set(pos.x, 0.008, pos.z);
    under.position.set(pos.x - 0.9, 0.35, pos.z - 0.9);
  }

  function frame() {
    pointer.x += (pointer.tx - pointer.x) * 0.06;
    pointer.y += (pointer.ty - pointer.y) * 0.06;
    focus.x += (pos.x - focus.x) * 0.045;
    focus.z += (pos.z - focus.z) * 0.045;

    const dist = portrait ? 1.08 : 1;
    camera.position.set(
      focus.x + (3.1 + pointer.x * 0.5) * dist,
      focus.y + (1.9 - pointer.y * 0.3) * dist,
      focus.z + 8.8 * dist,
    );
    camera.lookAt(focus.x, focus.y + 0.1, focus.z);

    // El caballo mira hacia la cámara con un leve giro para mostrar su espesor y el filo lima.
    const face = Math.atan2(camera.position.x - pos.x, camera.position.z - pos.z);
    knight.rotation.set(0, face - 0.38 + pointer.x * 0.22, pose.tilt);
    place();
    renderer.render(scene, camera);
  }

  function loop() {
    if (!running || disposed) return;
    frame();
    raf = requestAnimationFrame(loop);
  }
  let raf = 0;

  function renderOnce() {
    // En movimiento reducido no hay bucle: se asienta la cámara y se pinta un cuadro.
    focus.set(pos.x, 1.25, pos.z);
    frame();
  }

  function move() {
    if (busy || disposed) return;
    const from = TOUR[index];
    const next = (index + 1) % TOUR.length;
    const to = TOUR[next];
    const old = trail;
    const t = makeTrail(from, to);
    trail = t;
    index = next;
    onMove?.(next, TOUR.length);

    if (reduced) {
      if (old) dropTrail(old);
      t.a.scale.x = t.lenA;
      t.b.scale.x = t.lenB;
      (t.mats[1] as THREE.LineBasicMaterial).opacity = 1;
      pos.set(to[0], 0, to[1]);
      renderOnce();
      return;
    }

    busy = true;
    const state = { p: 0 };
    const tl = gsap.timeline({ onComplete: () => { busy = false; } });
    if (old) {
      tl.to(old.mats, { opacity: 0, duration: 0.3, ease: 'power1.out', onComplete: () => dropTrail(old) }, 0);
    }
    // Anticipación → salto en arco → asentamiento. Sin rebotes.
    tl.to(pose, { squash: 0.94, duration: 0.16, ease: 'power2.out' }, 0)
      .to(pose, { squash: 1, duration: 0.2, ease: 'power2.out' }, 0.16)
      .to(state, {
        p: 1,
        duration: duration.knight,
        ease: ease.knight,
        onUpdate: () => {
          pos.x = from[0] + (to[0] - from[0]) * state.p;
          pos.z = from[1] + (to[1] - from[1]) * state.p;
          pos.y = Math.sin(Math.PI * state.p) * 1.5;
          pose.tilt = Math.sin(Math.PI * 2 * state.p) * -0.07;
        },
      }, 0.16)
      .to(t.a.scale, { x: t.lenA, duration: 0.5, ease: 'power2.inOut' }, 0.2)
      .to(t.b.scale, { x: t.lenB, duration: 0.36, ease: 'power2.out' }, 0.7)
      .to(t.mats[1], { opacity: 1, duration: 0.3, ease: 'power1.out' }, 0.95)
      .to(pose, { squash: 0.97, duration: 0.1, ease: 'power2.out' }, 0.16 + duration.knight)
      .to(pose, { squash: 1, duration: 0.3, ease: 'power2.out' }, 0.26 + duration.knight);
  }

  /* ---------- Tamaño y puntero ---------- */
  function resize() {
    const w = canvas.clientWidth || 1;
    const h = canvas.clientHeight || 1;
    portrait = w / h < 0.95;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, portrait ? 1.5 : 1.75));
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    // Desplaza el encuadre: caballo a la derecha en escritorio, centrado y abajo en móvil.
    if (portrait || w < 768) camera.setViewOffset(w, h, 0, -h * 0.07, w, h);
    else camera.setViewOffset(w, h, -w * 0.26, -h * 0.03, w, h);
    camera.updateProjectionMatrix();
    if (!running) renderOnce();
  }
  const ro = new ResizeObserver(resize);
  ro.observe(canvas);

  const onPointer = (e: PointerEvent) => {
    if (e.pointerType === 'touch') return;
    pointer.tx = (e.clientX / window.innerWidth) * 2 - 1;
    pointer.ty = (e.clientY / window.innerHeight) * 2 - 1;
  };
  if (!reduced) window.addEventListener('pointermove', onPointer, { passive: true });

  function setRunning(on: boolean) {
    if (reduced || disposed || on === running) return;
    running = on;
    if (on) raf = requestAnimationFrame(loop);
    else cancelAnimationFrame(raf);
  }

  /* ---------- Arranque ---------- */
  resize();
  place();
  if (reduced) {
    move(); // estado final: caballo en su casilla con la ruta dibujada
  } else {
    focus.set(pos.x + 1, 1.25, pos.z);
    setRunning(true);
    gsap.delayedCall(0.9, move);
  }

  return {
    move,
    setRunning,
    dispose() {
      disposed = true;
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener('pointermove', onPointer);
      if (trail) dropTrail(trail);
      disposables.forEach((d) => d.dispose());
      renderer.dispose();
    },
  };
}
