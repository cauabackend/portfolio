import * as THREE from "three";

// Núcleo da seção Experiência (CONTEXTO.md §5.4) construído por código, no lugar
// do core.glb de 40 MB. A peça da referência é radialmente simétrica — discos
// concêntricos em cascata —, e isso é exatamente o que LatheGeometry faz de
// graça: revoluciona um perfil 2D (o corte lateral do anel, com bisel) em 360°.

const TAU = Math.PI * 2;
const SEG = 128;

// Gerador determinístico: a irregularidade dos recortes e das gravações precisa
// ser a mesma entre reloads, senão o objeto muda de forma a cada HMR.
function rng(seed: number) {
  let s = seed >>> 0;
  return () => ((s = (Math.imul(s, 1664525) + 1013904223) >>> 0) / 4294967296);
}

/* ------------------------------------------------------------------ texturas */

// Normal map derivado do brilho do canvas (Sobel). É o que transforma um
// desenho plano em gravação com relevo: sem ele o micro-texto lê como decalque
// impresso, com ele a luz corre pelas ranhuras.
function normalFromCanvas(canvas: HTMLCanvasElement, strength = 2.2) {
  const { width: w, height: h } = canvas;
  const src = canvas.getContext("2d")!.getImageData(0, 0, w, h).data;
  const out = new Uint8ClampedArray(w * h * 4);
  const lum = (x: number, y: number) => {
    const i = ((((y % h) + h) % h) * w + (((x % w) + w) % w)) * 4;
    return (src[i] * 0.299 + src[i + 1] * 0.587 + src[i + 2] * 0.114) / 255;
  };
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const dx = (lum(x - 1, y) - lum(x + 1, y)) * strength;
      const dy = (lum(x, y - 1) - lum(x, y + 1)) * strength;
      const len = Math.hypot(dx, dy, 1);
      const i = (y * w + x) * 4;
      out[i] = ((dx / len) * 0.5 + 0.5) * 255;
      out[i + 1] = ((dy / len) * 0.5 + 0.5) * 255;
      out[i + 2] = (1 / len) * 0.5 * 255 + 127.5;
      out[i + 3] = 255;
    }
  }
  const tex = new THREE.DataTexture(out, w, h, THREE.RGBAFormat);
  tex.needsUpdate = true;
  return tex;
}

// Micro-texto: blocos de 2–3px que à distância leem como legenda gravada. Não
// tem fonte nem string — texto de verdade nesse tamanho vira borrão e custa
// atlas; o que o olho reconhece é o RITMO de palavras curtas numa linha.
function microText(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  rand: () => number,
  size = 3,
) {
  let cursor = 0;
  while (cursor < width) {
    const word = 8 + rand() * 22;
    if (cursor + word > width) break;
    ctx.fillRect(x + cursor, y, word, size);
    cursor += word + 3 + rand() * 4;
  }
}

// Mostrador central: anéis finos, coroa de ticks, blocos de legenda e uma
// trilha de circuito. É o único ponto de cor da peça (§5.4 usa tokens neutros;
// aqui o tom entra pelo vidro, muito dessaturado).
function dialCanvas(tint: string, ink: string, seed: number) {
  const S = 512;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = S;
  const ctx = canvas.getContext("2d")!;
  const rand = rng(seed);
  const c = S / 2;

  ctx.fillStyle = tint;
  ctx.fillRect(0, 0, S, S);

  ctx.strokeStyle = ink;
  ctx.fillStyle = ink;

  // anéis de referência
  for (const r of [0.96, 0.92, 0.9, 0.68, 0.655, 0.36, 0.34]) {
    ctx.lineWidth = r > 0.9 ? 2 : 1.2;
    ctx.beginPath();
    ctx.arc(c, c, r * c, 0, TAU);
    ctx.stroke();
  }

  // coroa de ticks, um em cada dez mais longo
  for (let i = 0; i < 180; i++) {
    const a = (i / 180) * TAU;
    const long = i % 10 === 0;
    const r0 = 0.9 * c;
    const r1 = (long ? 0.79 : 0.85) * c;
    ctx.lineWidth = long ? 2 : 1;
    ctx.beginPath();
    ctx.moveTo(c + Math.cos(a) * r0, c + Math.sin(a) * r0);
    ctx.lineTo(c + Math.cos(a) * r1, c + Math.sin(a) * r1);
    ctx.stroke();
  }

  // legendas em arco, na coroa entre os anéis
  for (let i = 0; i < 5; i++) {
    ctx.save();
    ctx.translate(c, c);
    ctx.rotate(rand() * TAU);
    ctx.translate(0, -0.755 * c);
    microText(ctx, -40 - rand() * 30, 0, 60 + rand() * 60, rand, 3);
    ctx.restore();
  }

  // bloco de dados no miolo: 4–6 linhas empilhadas
  const lines = 4 + Math.floor(rand() * 3);
  for (let i = 0; i < lines; i++) {
    microText(ctx, c - 0.22 * c, c - 0.16 * c + i * 9, 0.44 * c * (0.5 + rand() * 0.5), rand, 3.5);
  }

  // trilhas de circuito: segmentos ortogonais com um pad na ponta
  ctx.lineWidth = 1.6;
  for (let i = 0; i < 7; i++) {
    const a = rand() * TAU;
    let x = c + Math.cos(a) * 0.42 * c;
    let y = c + Math.sin(a) * 0.42 * c;
    ctx.beginPath();
    ctx.moveTo(x, y);
    for (let step = 0; step < 3; step++) {
      const len = 12 + rand() * 34;
      if (rand() < 0.5) x += rand() < 0.5 ? len : -len;
      else y += rand() < 0.5 ? len : -len;
      ctx.lineTo(x, y);
    }
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(x, y, 2.6, 0, TAU);
    ctx.fill();
  }

  return canvas;
}

// Aro: ranhuras verticais (variam só em u) + janelas. Constante ao longo de v
// de propósito — v percorre o perfil inteiro do lathe (topo, bisel, lateral,
// fundo), então qualquer conteúdo que varie em v cairia numa face imprevisível.
function ringCanvas(seed: number) {
  const W = 1024;
  const H = 32;
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d")!;
  const rand = rng(seed);

  ctx.fillStyle = "#f4f6f7";
  ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = "#5f6d74";
  for (let i = 0; i < 150; i++) {
    const x = (i / 150) * W;
    if (rand() < 0.25) continue;
    ctx.fillRect(x, 0, rand() < 0.15 ? 5 : 2, H);
  }
  return canvas;
}

/* ---------------------------------------------------------------- materiais */

function makeMaterials() {
  const disposables: { dispose(): void }[] = [];
  const tex = (canvas: HTMLCanvasElement, repeat = 1) => {
    const t = new THREE.CanvasTexture(canvas);
    t.colorSpace = THREE.SRGBColorSpace;
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    t.repeat.set(repeat, 1);
    t.anisotropy = 8;
    disposables.push(t);
    return t;
  };
  const normal = (canvas: HTMLCanvasElement, repeat = 1, strength?: number) => {
    const t = normalFromCanvas(canvas, strength);
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    t.repeat.set(repeat, 1);
    disposables.push(t);
    return t;
  };

  // CRISTAL. Quase incolor e bem transparente, ao contrário de um "vidro
  // fosco" cinza: na referência o corpo some e o que desenha a peça são as
  // ARESTAS brancas. Por isso o segredo não está aqui e sim na geometria —
  // muitos anéis finos, cada um com bisel, multiplicam as arestas que pegam a
  // faixa de reflexo do softbox (CrystalEnvironment).
  //
  // Sem `transmission`: além do passe de render extra por frame, ele não
  // enxerga outros objetos transparentes — num empilhado de discos de vidro um
  // disco não apareceria através do outro, que é justamente a leitura da
  // referência. Blend comum com depthWrite: false entrega isso de graça.
  const crystal = new THREE.MeshPhysicalMaterial({
    color: 0xccd8dd,
    metalness: 0.1,
    roughness: 0.02,
    clearcoat: 1,
    clearcoatRoughness: 0.02,
    transparent: true,
    opacity: 0.62,
    depthWrite: false,
    side: THREE.DoubleSide,
    envMapIntensity: 2.0,
    ior: 1.6,
  });

  const ringMarks = ringCanvas(11);
  const crystalEtched = crystal.clone();
  crystalEtched.roughnessMap = tex(ringMarks, 2);
  crystalEtched.normalMap = normal(ringMarks, 2, 1.1);
  crystalEtched.normalScale = new THREE.Vector2(0.35, 0.35);
  crystalEtched.roughness = 0.16;

  const dial = (tint: string, ink: string, seed: number) => {
    const canvas = dialCanvas(tint, ink, seed);
    return new THREE.MeshPhysicalMaterial({
      map: tex(canvas),
      normalMap: normal(canvas, 1, 2.6),
      normalScale: new THREE.Vector2(0.5, 0.5),
      roughnessMap: tex(canvas),
      roughness: 0.55,
      metalness: 0.25,
      clearcoat: 1,
      clearcoatRoughness: 0.18,
      envMapIntensity: 1.6,
      // iridescência baixa: é o brilho pérola do mostrador da referência, e
      // some se passar disso (vira mancha de óleo)
      iridescence: 0.35,
      iridescenceIOR: 1.5,
    });
  };

  // dois tons, como na referência: um pérola quente e um azul frio
  const dialWarm = dial("#f0ece4", "rgba(96,104,110,0.5)", 5);
  const dialCool = dial("#e2eaef", "rgba(70,92,110,0.55)", 19);

  const chrome = new THREE.MeshStandardMaterial({
    color: 0xa8adad,
    metalness: 1,
    roughness: 0.09,
    envMapIntensity: 1.6,
  });

  const gem = new THREE.MeshPhysicalMaterial({
    color: 0x9fc4dd,
    metalness: 0,
    roughness: 0.02,
    clearcoat: 1,
    transparent: true,
    opacity: 0.7,
    envMapIntensity: 3.2,
    ior: 1.7,
  });

  return { crystal, crystalEtched, dialWarm, dialCool, chrome, gem, disposables };
}

type Materials = ReturnType<typeof makeMaterials>;

/* ---------------------------------------------------------------- geometria */

// Corte lateral de uma banda anelar, com bisel nos quatro cantos. O bisel não é
// enfeite: é ele que vira a linha branca de reflexo. Canto reto some contra o
// fundo claro da página.
function band(r0: number, r1: number, h: number, arc = TAU) {
  const y = h / 2;
  const bevel = Math.min(0.018, h * 0.3, (r1 - r0) * 0.3);
  return new THREE.LatheGeometry(
    [
      new THREE.Vector2(r0, -y + bevel),
      new THREE.Vector2(r0 + bevel, -y),
      new THREE.Vector2(r1 - bevel, -y),
      new THREE.Vector2(r1, -y + bevel),
      new THREE.Vector2(r1, y - bevel),
      new THREE.Vector2(r1 - bevel, y),
      new THREE.Vector2(r0 + bevel, y),
      new THREE.Vector2(r0, y - bevel),
      new THREE.Vector2(r0, -y + bevel),
    ],
    Math.max(10, Math.round((SEG * arc) / TAU)),
    0,
    arc,
  );
}

// [r interno, r externo, altura, deslocamento no eixo]. Muitos anéis FINOS em
// terraço, não poucos e grossos: a densidade de arestas é o que faz a peça ler
// como cristal lapidado em vez de arruela de acrílico.
// Alturas baixas de propósito: anel alto demais lê como banda de pneu, não como
// terraço lapidado — e a peça passa metade do giro de perfil.
const TERRACES: [number, number, number, number][] = [
  [0.955, 1.0, 0.17, 0.0],
  [0.905, 0.945, 0.11, 0.032],
  [0.845, 0.895, 0.145, 0.012],
  [0.8, 0.836, 0.085, 0.048],
  [0.72, 0.79, 0.165, 0.022],
  [0.665, 0.71, 0.1, 0.058],
  [0.6, 0.655, 0.14, 0.036],
  [0.545, 0.59, 0.085, 0.068],
  [0.47, 0.535, 0.13, 0.048],
  [0.415, 0.46, 0.075, 0.076],
];

function discAssembly(m: Materials, dialMat: THREE.Material, seed: number) {
  const group = new THREE.Group();
  const face = new THREE.Group();
  face.rotation.x = -Math.PI / 2; // o eixo do lathe é Y; a face passa a olhar +Z
  group.add(face);
  const rand = rng(seed);

  TERRACES.forEach(([r0, r1, h, y], i) => {
    // só os anéis largos levam gravação; nos finos a ranhura vira ruído
    const mat = r1 - r0 > 0.05 && i % 2 === 0 ? m.crystalEtched : m.crystal;
    const mesh = new THREE.Mesh(band(r0, r1, h), mat);
    mesh.position.y = y;
    face.add(mesh);
  });

  // Casca parcial por fora do aro: a assimetria é o que faz ler como
  // equipamento montado, e não como arruela torneada.
  const shell = new THREE.Mesh(band(1.0, 1.075, 0.22, Math.PI * 0.55), m.crystalEtched);
  shell.rotation.y = rand() * TAU;
  face.add(shell);

  // Grampos no aro, com falhas — o vão irregular é metade do efeito.
  const clamps = new THREE.InstancedMesh(
    new THREE.BoxGeometry(0.09, 0.25, 0.07),
    m.crystal,
    24,
  );
  const dummy = new THREE.Object3D();
  let n = 0;
  for (let i = 0; i < 24; i++) {
    if (rand() < 0.55) continue;
    const a = (i / 24) * TAU;
    dummy.position.set(Math.cos(a) * 0.975, 0.03, Math.sin(a) * 0.975);
    dummy.rotation.set(0, -a, 0);
    dummy.updateMatrix();
    clamps.setMatrixAt(n++, dummy.matrix);
  }
  clamps.count = n;
  face.add(clamps);

  // Mostrador gravado + calota de cristal por cima. A calota é o que faz o
  // centro brilhar como lente, em vez de tampa chapada.
  //
  // Mostrador nos DOIS lados: a peça gira 360°, e com face única metade da
  // volta mostrava só o verso liso do disco — a gravação, que é o detalhe que
  // a referência tem, sumia na maior parte do tempo.
  const capR = 1.0;
  const capPhi = 0.41;
  const capGeo = new THREE.SphereGeometry(capR, 96, 32, 0, TAU, 0, capPhi);
  capGeo.translate(0, -capR * Math.cos(capPhi), 0);

  for (const side of [1, -1]) {
    const dial = new THREE.Mesh(new THREE.CircleGeometry(0.4, 96), dialMat);
    dial.rotation.x = (side * -Math.PI) / 2;
    dial.position.y = 0.1 * side;
    face.add(dial);

    const cap = new THREE.Mesh(capGeo, m.crystal);
    cap.scale.y = side;
    cap.position.y = 0.108 * side;
    face.add(cap);
  }

  return group;
}

// A peça vazada da referência: aro largo com nervuras radiais, sem lente.
// Deliberadamente NÃO é uma gaiola esférica — isso repetiria a esfera
// geodésica do Stack (§5.3) na seção seguinte.
function openRing(m: Materials, seed: number) {
  const group = new THREE.Group();
  const face = new THREE.Group();
  face.rotation.x = -Math.PI / 2;
  group.add(face);
  const rand = rng(seed);

  for (const [r0, r1, h, y] of [
    [0.94, 1.0, 0.2, 0.0],
    [0.885, 0.93, 0.14, 0.04],
    [0.83, 0.875, 0.12, 0.014],
  ] as const) {
    const mesh = new THREE.Mesh(band(r0, r1, h), m.crystalEtched);
    mesh.position.y = y;
    face.add(mesh);
  }

  // Nervuras: poucas e largas. Muitas e finas leem como pá de turbina.
  const ribCount = 11;
  const ribs = new THREE.InstancedMesh(
    new THREE.BoxGeometry(0.46, 0.055, 0.085),
    m.crystal,
    ribCount,
  );
  const dummy = new THREE.Object3D();
  for (let i = 0; i < ribCount; i++) {
    const a = (i / ribCount) * TAU;
    dummy.position.set(Math.cos(a) * 0.62, 0.02, Math.sin(a) * 0.62);
    dummy.rotation.set(0, -a, 0);
    dummy.updateMatrix();
    ribs.setMatrixAt(i, dummy.matrix);
  }
  face.add(ribs);

  face.add(new THREE.Mesh(band(0.33, 0.4, 0.24), m.crystalEtched));

  const shell = new THREE.Mesh(band(1.0, 1.08, 0.26, Math.PI * 0.7), m.crystalEtched);
  shell.rotation.y = rand() * TAU;
  face.add(shell);

  return group;
}

/* -------------------------------------------------------------- composição */

export function buildCore() {
  const m = makeMaterials();
  const parts = new THREE.Group();

  // TREVO, como a referência: as três peças em triângulo em volta do centro,
  // tangentes pelas bordas. Não é decoração — é o que resolve dois problemas de
  // uma vez.
  //
  // 1. Montagem em vez de sobreposição: com os centros afastados por mais que a
  //    soma dos raios, nenhuma peça atravessa a outra em ângulo NENHUM do giro,
  //    e cada uma fica livre pra ter a inclinação que quiser.
  // 2. Discos quase paralelos (a tentativa anterior) ficam de perfil todos ao
  //    mesmo tempo, e a cada meia volta a peça inteira sumia numa lasca. Com as
  //    normais bem diferentes entre si, sempre há uma face aberta pra câmera.
  const layout: [THREE.Group, number, THREE.Vector3, THREE.Euler][] = [
    [discAssembly(m, m.dialWarm, 7), 0.84, new THREE.Vector3(0.02, 0.98, -0.1), new THREE.Euler(-0.5, 0.34, 0.12)],
    [openRing(m, 3), 0.9, new THREE.Vector3(-0.86, -0.5, 0.02), new THREE.Euler(0.18, 0.95, 0.28)],
    [discAssembly(m, m.dialCool, 23), 0.66, new THREE.Vector3(0.88, -0.52, 0.16), new THREE.Euler(-0.28, -0.62, -0.16)],
  ];
  for (const [part, scale, position, rotation] of layout) {
    part.scale.setScalar(scale);
    part.position.copy(position);
    part.rotation.copy(rotation);
    parts.add(part);
  }

  // Rolamento e cristal ocupam o vão do meio do trevo — o único lugar onde
  // cabe algo sem encostar nas três peças.
  const bearing = new THREE.Mesh(new THREE.SphereGeometry(0.22, 64, 40), m.chrome);
  bearing.position.set(0, -0.02, 0.06);
  parts.add(bearing);

  const gem = new THREE.Mesh(new THREE.OctahedronGeometry(0.17), m.gem);
  gem.scale.set(1, 1.4, 1);
  gem.position.set(0.02, -0.05, -0.32);
  gem.rotation.set(0.4, 0.7, 0.2);
  parts.add(gem);

  // Esfera envolvente de verdade (união das esferas das peças), não a diagonal
  // da bounding box: a diagonal superestima muito uma composição espalhada e a
  // peça sairia com metade do tamanho no quadro. Como o arrasto gira livre em
  // todos os eixos, a esfera é a única medida em que nenhum ângulo estoura o
  // enquadramento — e por isso o objeto é recentrado NELA, não no centro da caixa.
  parts.updateMatrixWorld(true);
  const bounds = new THREE.Sphere(new THREE.Vector3(), 0);
  let first = true;
  parts.traverse((node) => {
    const mesh = node as THREE.Mesh;
    if (!mesh.isMesh) return;
    mesh.geometry.computeBoundingSphere();
    const s = mesh.geometry.boundingSphere!.clone().applyMatrix4(mesh.matrixWorld);
    if (first) {
      bounds.copy(s);
      first = false;
    } else {
      bounds.union(s);
    }
  });
  parts.position.copy(bounds.center).negate();

  const object = new THREE.Group();
  object.add(parts);

  return { object, radius: bounds.radius, disposables: m.disposables };
}

export function disposeCore(object: THREE.Object3D, extra: { dispose(): void }[] = []) {
  object.traverse((node) => {
    const mesh = node as THREE.Mesh;
    if (!mesh.isMesh) return;
    mesh.geometry.dispose();
    const material = mesh.material;
    // materiais são compartilhados entre as peças; dispose repetido é inócuo
    if (Array.isArray(material)) material.forEach((mat) => mat.dispose());
    else material.dispose();
  });
  extra.forEach((d) => d.dispose());
}
