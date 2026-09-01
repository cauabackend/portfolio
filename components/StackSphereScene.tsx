"use client";

import { Suspense, useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { useReducedMotion } from "motion/react";
import * as THREE from "three";
import { mergeVertices } from "three-stdlib";
import { stack } from "@/lib/resume";
import { StudioEnvironment } from "./three/StudioEnvironment";

const R = 1; // raio da esfera; todo o resto é relativo a ele
const ROD_RADIUS = 0.0105;
const JOINT_RADIUS = 0.03;
const BADGE_RADIUS = 0.118;
const BASE_SPIN = 0.13; // rad/s

// Icosaedro subdividido = mesma malha geodésica da referência (triângulos
// regulares). mergeVertices reindexa para que cada nó exista uma vez só —
// sem isso cada face traria vértices duplicados e as hastes viriam triplicadas.
function useGeodesic() {
  return useMemo(() => {
    const geo = mergeVertices(new THREE.IcosahedronGeometry(R, 1));
    const pos = geo.getAttribute("position");
    const index = geo.getIndex()!;

    const nodes: THREE.Vector3[] = [];
    for (let i = 0; i < pos.count; i++) {
      nodes.push(new THREE.Vector3().fromBufferAttribute(pos, i));
    }

    const seen = new Set<string>();
    const edges: [number, number][] = [];
    for (let f = 0; f < index.count; f += 3) {
      const tri = [index.getX(f), index.getX(f + 1), index.getX(f + 2)];
      for (let e = 0; e < 3; e++) {
        const a = tri[e];
        const b = tri[(e + 1) % 3];
        const key = a < b ? `${a}-${b}` : `${b}-${a}`;
        if (!seen.has(key)) {
          seen.add(key);
          edges.push([a, b]);
        }
      }
    }
    geo.dispose();

    // nós que ganham badge: espalhados uniformemente pela lista
    const step = nodes.length / stack.length;
    const badges = stack.map((tool, i) => ({ tool, node: nodes[Math.floor(i * step)] }));
    const badgeNodes = new Set(badges.map((b) => nodes.indexOf(b.node)));

    return { nodes, edges, badges, badgeNodes };
  }, []);
}

function Struts({ nodes, edges }: { nodes: THREE.Vector3[]; edges: [number, number][] }) {
  const ref = useRef<THREE.InstancedMesh>(null);

  useEffect(() => {
    const mesh = ref.current;
    if (!mesh) return;
    const m = new THREE.Matrix4();
    const q = new THREE.Quaternion();
    const up = new THREE.Vector3(0, 1, 0);
    const dir = new THREE.Vector3();
    const mid = new THREE.Vector3();
    const scale = new THREE.Vector3();

    edges.forEach(([i, j], n) => {
      const a = nodes[i];
      const b = nodes[j];
      dir.subVectors(b, a);
      const len = dir.length();
      mid.addVectors(a, b).multiplyScalar(0.5);
      q.setFromUnitVectors(up, dir.normalize());
      scale.set(1, len, 1);
      mesh.setMatrixAt(n, m.compose(mid, q, scale));
    });
    mesh.instanceMatrix.needsUpdate = true;
  }, [nodes, edges]);

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, edges.length]} castShadow>
      <cylinderGeometry args={[ROD_RADIUS, ROD_RADIUS, 1, 10]} />
      <meshStandardMaterial color="#c9cbc9" metalness={1} roughness={0.24} />
    </instancedMesh>
  );
}

function Joints({ nodes, skip }: { nodes: THREE.Vector3[]; skip: Set<number> }) {
  const points = useMemo(() => nodes.filter((_, i) => !skip.has(i)), [nodes, skip]);
  const ref = useRef<THREE.InstancedMesh>(null);

  useEffect(() => {
    const mesh = ref.current;
    if (!mesh) return;
    const m = new THREE.Matrix4();
    points.forEach((p, i) => mesh.setMatrixAt(i, m.makeTranslation(p.x, p.y, p.z)));
    mesh.instanceMatrix.needsUpdate = true;
  }, [points]);

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, points.length]} castShadow>
      <sphereGeometry args={[JOINT_RADIUS, 20, 20]} />
      <meshStandardMaterial color="#e3e5e3" metalness={1} roughness={0.14} />
    </instancedMesh>
  );
}

function Badge({ node, label, map }: { node: THREE.Vector3; label: string; map: THREE.Texture }) {
  const quaternion = useMemo(
    () => new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 0, 1), node.clone().normalize()),
    [node],
  );

  return (
    <group position={node} quaternion={quaternion}>
      {/* aro de metal escovado, como o bisel de um mostrador de instrumento */}
      <mesh castShadow>
        <torusGeometry args={[BADGE_RADIUS, 0.016, 14, 56]} />
        <meshStandardMaterial color="#cfd1cf" metalness={1} roughness={0.2} />
      </mesh>
      {/* mostrador; userData marca o alvo do teste de hover feito por frame */}
      <mesh position-z={0.004} userData={{ stackLabel: label }}>
        <circleGeometry args={[BADGE_RADIUS * 1.15, 56]} />
        <meshStandardMaterial color="#eff0ef" metalness={0.25} roughness={0.42} />
      </mesh>
      {/* logo: toneMapped=false mantém a cor de marca exata */}
      <mesh position-z={0.008}>
        <planeGeometry args={[BADGE_RADIUS * 1.3, BADGE_RADIUS * 1.3]} />
        <meshBasicMaterial map={map} transparent toneMapped={false} />
      </mesh>
    </group>
  );
}

function Globe({ still, onHover }: { still: boolean; onHover: (label: string | null) => void }) {
  const { nodes, edges, badges, badgeNodes } = useGeodesic();
  const group = useRef<THREE.Group>(null);
  const spinY = useRef(0.4);
  const spinX = useRef(-0.1);
  const velY = useRef(0);
  const velX = useRef(0);
  const dragging = useRef(false);
  const lastX = useRef(0);
  const lastY = useRef(0);
  const lastT = useRef(0);
  const pointerInside = useRef(false);
  const hoverTargets = useRef<THREE.Object3D[]>([]);
  const hoverLabel = useRef<string | null>(null);
  const gl = useThree((s) => s.gl);
  const camera = useThree((s) => s.camera);
  const raycaster = useMemo(() => new THREE.Raycaster(), []);

  const maps = useTexture(stack.map((t) => `/icons/stack/${t.icon}.svg`));
  useEffect(() => {
    // Texturas do three são objetos mutáveis por contrato da lib.
    /* eslint-disable react-hooks/immutability */
    for (const t of maps) {
      t.colorSpace = THREE.SRGBColorSpace;
      t.anisotropy = gl.capabilities.getMaxAnisotropy();
      t.needsUpdate = true;
    }
    /* eslint-enable react-hooks/immutability */
  }, [maps, gl]);

  // O arrasto alimenta uma velocidade angular que decai por atrito — é o que dá
  // o "peso" e a continuidade que faltavam ao giro fixo anterior. O giro por
  // scroll foi removido em 2026-09-01 a pedido do usuário (aqui e no núcleo da
  // Experiência): a página rolando mexia no objeto sem ninguém pedir.
  useEffect(() => {
    const el = gl.domElement;
    const down = (e: PointerEvent) => {
      dragging.current = true;
      lastX.current = e.clientX;
      lastY.current = e.clientY;
      lastT.current = e.timeStamp;
      velY.current = 0;
      velX.current = 0;
      el.setPointerCapture(e.pointerId);
    };
    const move = (e: PointerEvent) => {
      if (!dragging.current) return;
      const dx = e.clientX - lastX.current;
      const dy = e.clientY - lastY.current;
      // inércia em rad/s: sem o tempo real entre eventos, o mesmo gesto rende
      // menos impulso num mouse de alta taxa (ver nota igual no CoreScene)
      const dt = Math.max(e.timeStamp - lastT.current, 8) / 1000;
      lastX.current = e.clientX;
      lastY.current = e.clientY;
      lastT.current = e.timeStamp;
      spinY.current += dx * 0.0065;
      // o eixo vertical trava perto dos polos: passar de ±80° inverte a esfera
      // e o giro fica desorientador.
      spinX.current = THREE.MathUtils.clamp(spinX.current + dy * 0.0055, -1.35, 1.35);
      velY.current = (dx * 0.0065) / dt;
      velX.current = (dy * 0.0055) / dt;
    };
    const up = (e: PointerEvent) => {
      dragging.current = false;
      el.releasePointerCapture?.(e.pointerId);
    };

    const enter = () => {
      pointerInside.current = true;
    };
    const leave = () => {
      pointerInside.current = false;
    };

    el.addEventListener("pointerenter", enter);
    el.addEventListener("pointerleave", leave);
    el.addEventListener("pointerdown", down);
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerup", up);
    el.addEventListener("pointercancel", up);
    return () => {
      el.removeEventListener("pointerenter", enter);
      el.removeEventListener("pointerleave", leave);
      el.removeEventListener("pointerdown", down);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerup", up);
      el.removeEventListener("pointercancel", up);
    };
  }, [gl]);

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;

    // O hover é testado a cada frame, não só no pointermove do R3F: com a
    // esfera girando, o ícone passa por baixo de um cursor parado e nenhum
    // evento de mouse seria disparado — era esse o bug da legenda.
    if (hoverTargets.current.length === 0) {
      g.traverse((o) => {
        if (o.userData?.stackLabel) hoverTargets.current.push(o);
      });
    }
    let label: string | null = null;
    if (pointerInside.current && !dragging.current) {
      raycaster.setFromCamera(state.pointer, camera);
      const hit = raycaster.intersectObjects(hoverTargets.current, false)[0];
      label = (hit?.object.userData.stackLabel as string) ?? null;
    }
    if (label !== hoverLabel.current) {
      hoverLabel.current = label;
      onHover(label);
    }

    if (still) return;
    const d = Math.min(delta, 0.05); // um frame perdido não deve dar um tranco
    if (!dragging.current) {
      const friction = Math.exp(-2.4 * d);
      spinY.current += (BASE_SPIN + velY.current) * d;
      spinX.current = THREE.MathUtils.clamp(spinX.current + velX.current * d, -1.35, 1.35);
      velY.current *= friction;
      velX.current *= friction;
      // sem arrasto, o eixo vertical volta devagar pra vista de 3/4 de origem
      spinX.current += (-0.1 - spinX.current) * Math.min(1, d * 0.7);
    }
    g.rotation.y = spinY.current;
    g.rotation.x = spinX.current;
  });

  return (
    <group ref={group} rotation={[-0.1, 0.4, 0]}>
      <Struts nodes={nodes} edges={edges} />
      <Joints nodes={nodes} skip={badgeNodes} />
      {badges.map((b, i) => (
        <Badge key={b.tool.label} node={b.node} label={b.tool.label} map={maps[i]} />
      ))}
    </group>
  );
}

export default function StackSphereScene({
  onHover,
  active = true,
}: {
  onHover: (label: string | null) => void;
  active?: boolean;
}) {
  const reduced = useReducedMotion();

  return (
    <Canvas
      className="!absolute inset-0"
      camera={{ position: [0, 0.45, 5.1], fov: 30 }}
      dpr={[1, 2.5]}
      gl={{
        antialias: true,
        alpha: true,
        toneMapping: THREE.NeutralToneMapping,
        toneMappingExposure: 1.02,
      }}
      // fora da tela nada é desenhado: com "always" a esfera consumia GPU a
      // página inteira, e é isso que deixa a rolagem pesada
      frameloop={reduced || !active ? "demand" : "always"}
    >
      <StudioEnvironment intensity={1.25} />
      <ambientLight intensity={0.2} />
      <directionalLight position={[3, 4, 3]} intensity={1.2} />
      <directionalLight position={[-3, 1, -2]} intensity={0.4} color="#dfe1df" />
      <Suspense fallback={null}>
        <Globe still={!!reduced} onHover={onHover} />
      </Suspense>
    </Canvas>
  );
}
