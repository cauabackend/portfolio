"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useReducedMotion } from "motion/react";
import * as THREE from "three";
import { CrystalEnvironment } from "./three/CrystalEnvironment";
import { buildCore, disposeCore } from "./core-geometry";

const BASE_SPIN = 0.16; // rad/s
// Pose de apresentação: a composição já é construída olhando pra câmera
// (core-geometry.ts), então basta uma inclinação de três quartos. Fica num
// grupo INTERNO e fixo — o giro acontece por fora dela (ver o yaw abaixo).
const POSE_X = 0.2;
const POSE_Y = -0.16;

// Núcleo da seção Experiência (CLAUDE.md §5.4): geometria procedural com giro
// contínuo e arrasto, mesmo modelo de interação da esfera do Stack (§5.3).
function Core({ still }: { still: boolean }) {
  const yaw = useRef<THREE.Group>(null);
  const pitch = useRef<THREE.Group>(null);
  const gl = useThree((s) => s.gl);
  const invalidate = useThree((s) => s.invalidate);
  const viewport = useThree((s) => s.viewport);

  // O raio é da esfera envolvente, não da bounding box: como o arrasto gira
  // livre em todos os eixos, é a única medida que garante que nenhum ângulo
  // corte o objeto.
  const { object, radius, disposables } = useMemo(() => buildCore(), []);
  useEffect(() => () => disposeCore(object, disposables), [object, disposables]);

  // viewport é reativo ao resize: o enquadramento se refaz sozinho quando a
  // seção muda de proporção no breakpoint.
  const scale = (0.94 * Math.min(viewport.width, viewport.height)) / 2 / radius;

  // partem do zero: a pose de apresentação vive num grupo próprio, mais interno
  const spinY = useRef(0);
  const spinX = useRef(0);
  const velY = useRef(0);
  const velX = useRef(0);
  const dragging = useRef(false);
  const lastX = useRef(0);
  const lastY = useRef(0);
  const lastT = useRef(0);

  // O arrasto alimenta uma velocidade angular que decai por atrito — é o que dá
  // o "peso" e a continuidade. Sem trava de eixo: gira livre para todos os lados.
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
      // A inércia é rad/s, então precisa do tempo real entre eventos: derivar do
      // delta em pixels sozinho faz o mesmo gesto render menos impulso num mouse
      // de 1000 Hz do que num de 60 Hz, e um último evento de 1px (comum ao parar
      // a mão) mata o arremesso.
      const dt = Math.max(e.timeStamp - lastT.current, 8) / 1000;
      lastX.current = e.clientX;
      lastY.current = e.clientY;
      lastT.current = e.timeStamp;
      spinY.current += dx * 0.0065;
      spinX.current += dy * 0.0065;
      velY.current = (dx * 0.0065) / dt;
      velX.current = (dy * 0.0065) / dt;
      // com prefers-reduced-motion o loop roda sob demanda: sem isto o arrasto
      // não desenharia frame nenhum
      invalidate();
    };
    const up = (e: PointerEvent) => {
      dragging.current = false;
      el.releasePointerCapture?.(e.pointerId);
    };

    el.addEventListener("pointerdown", down);
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerup", up);
    el.addEventListener("pointercancel", up);
    return () => {
      el.removeEventListener("pointerdown", down);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerup", up);
      el.removeEventListener("pointercancel", up);
    };
  }, [gl, invalidate]);

  useFrame((_, delta) => {
    if (!yaw.current || !pitch.current) return;
    const d = Math.min(delta, 0.05); // um frame perdido não deve dar um tranco

    if (!dragging.current && !still) {
      const friction = Math.exp(-2.4 * d);
      spinY.current += (BASE_SPIN + velY.current) * d;
      spinX.current += velX.current * d;
      velY.current *= friction;
      velX.current *= friction;
    }
    yaw.current.rotation.y = spinY.current;
    pitch.current.rotation.x = spinX.current;
  });

  // Três grupos aninhados, um eixo cada, e a ordem importa. O giro automático
  // fica no grupo MAIS EXTERNO, então acontece sempre no eixo Y do mundo — que
  // é o vertical da tela: gira lateralmente, como um prato giratório.
  // Aplicá-lo junto da pose (que inclina 66°) girava em torno do Y do próprio
  // objeto, e esse eixo, inclinado, aponta quase para a câmera — daí o giro ler
  // como ponteiro de relógio em vez de lateral.
  return (
    <group ref={yaw}>
      <group ref={pitch}>
        <group rotation={[POSE_X, POSE_Y, 0]}>
          <group scale={scale}>
            {/* sem <Center>: a peça já é recentrada na própria esfera
                envolvente (core-geometry.ts), que é o pivô certo pra um corpo
                que gira livre — o centro da bounding box não é. */}
            <primitive object={object} />
          </group>
        </group>
      </group>
    </group>
  );
}

export default function CoreScene() {
  const reduced = useReducedMotion();

  return (
    <Canvas
      className="!absolute inset-0"
      camera={{ position: [0, 0, 3.6], fov: 32 }}
      // dpr menor que o das cenas estáticas (2.5): aqui o frameloop roda
      // contínuo — deliberado, não drift
      dpr={[1, 2]}
      gl={{
        antialias: true,
        alpha: true,
        toneMapping: THREE.NeutralToneMapping,
        toneMappingExposure: 1.05,
      }}
      // sob reduced-motion nada gira sozinho, mas o arrasto ainda desenha
      // (o handler chama invalidate)
      frameloop={reduced ? "demand" : "always"}
    >
      {/* Environment próprio, não o StudioEnvironment do Hero/Stack: cristal
          incolor precisa refletir CONTRASTE pra aparecer (ver o arquivo). */}
      <CrystalEnvironment />
      {/* Sem shadow map: testado e revertido. Vidro transparente projeta sombra
          OPACA (o depth material ignora a opacidade), então a peça se
          auto-sombreava e virava um bloco cinza-chumbo. O volume aqui vem do
          contraste do environment, não de sombra projetada. */}
      <ambientLight intensity={0.3} />
      <directionalLight position={[2.6, 3.4, 3.2]} intensity={1.2} />
      <directionalLight position={[-3, 1, -2]} intensity={0.5} color="#dfe6ea" />
      <Core still={!!reduced} />
    </Canvas>
  );
}
