"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Bounds, Center } from "@react-three/drei";
import * as THREE from "three";
import { StudioEnvironment } from "./three/StudioEnvironment";
import { Model } from "./RobotHead";

// SEM ANIMACAO - decisao do usuario (2026-09-01), substitui o IDLE do 5.1.
//
// Por que: head_final.glb e uma malha unica fundida, sem bones, sem morph
// targets e sem olhos/mandibula como objetos separados. Da pra transformar a
// cabeca inteira (girar, inclinar), mas nao pra deformar partes dela - piscar,
// mover o olho ou abrir a mandibula exigem geometria que o arquivo nao tem.
// Simular a piscada com um plano na frente da orbita foi rejeitado, e com
// razao: e overlay, nao animacao do modelo.
//
// Para animar de verdade o caminho e no Blender: separar olhos/palpebras/
// mandibula como objetos proprios (ou criar shape keys) e reexportar o .glb -
// ai useAnimations/refs por peca passam a valer. Enquanto isso, pose fixa.
export default function HeadScene() {
  return (
    <Canvas
      className="!absolute inset-0"
      camera={{ position: [0, 0, 3.4], fov: 32 }}
      // dpr ate 2.5 tira o serrilhado das bordas finas das placas em telas
      // HiDPI; NeutralToneMapping preserva o branco/gunmetal em vez de puxar
      // pro sepia do ACES, que e o padrao do R3F.
      dpr={[1, 2.5]}
      gl={{
        antialias: true,
        alpha: true,
        toneMapping: THREE.NeutralToneMapping,
        toneMappingExposure: 1.05,
      }}
      // cena estatica: renderiza sob demanda em vez de queimar GPU a 60fps
      frameloop="demand"
    >
      <StudioEnvironment />
      {/* Chave suave por cima do environment - so o suficiente pra desenhar a
          forma; o volume vem do reflexo, nao de luz direta forte. */}
      <ambientLight intensity={0.25} />
      <directionalLight position={[2.4, 3.2, 3]} intensity={1.1} />
      <directionalLight position={[-3, 1, -2]} intensity={0.45} color="#dfe1df" />
      <Suspense fallback={null}>
        <Bounds fit clip margin={1.05}>
          <Center>
            <Model />
          </Center>
        </Bounds>
      </Suspense>
    </Canvas>
  );
}
