"use client";

import { useEffect } from "react";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";

// Environment de estúdio próprio da peça de cristal (§5.4).
//
// O RoomEnvironment (usado no Hero e no Stack) é quase uniforme e claro: bom
// pra metal escovado, péssimo pra cristal. Cristal só lê como cristal quando o
// que ele reflete tem CONTRASTE — é o reflexo de uma faixa branca no bisel que
// vira a aresta brilhante, e é o reflexo de uma zona escura que dá volume à
// face inclinada. Sobre um environment uniforme, vidro incolor some.
//
// Então: um domo em gradiente (claro em cima, escuro embaixo) + três softboxes
// retangulares, como numa mesa de still de produto.

function gradientDome() {
  const canvas = document.createElement("canvas");
  canvas.width = 4;
  canvas.height = 256;
  const ctx = canvas.getContext("2d")!;
  const grad = ctx.createLinearGradient(0, 0, 0, 256);
  // Claro quase todo: o material é praticamente espelhado, então o domo É a cor
  // da peça. Um gradiente que escurece de verdade embaixo (testado com
  // #3d4548) faz o cristal ler como chumbo. As zonas escuras aqui são só o
  // suficiente pra separar a face de cima da face de baixo.
  grad.addColorStop(0, "#ffffff");
  grad.addColorStop(0.45, "#eef3f5");
  grad.addColorStop(0.72, "#a9b4b9");
  grad.addColorStop(1, "#5c666b");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 4, 256);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function buildStudio() {
  const scene = new THREE.Scene();
  const disposables: { dispose(): void }[] = [];

  const domeTex = gradientDome();
  const domeGeo = new THREE.SphereGeometry(12, 32, 24);
  const domeMat = new THREE.MeshBasicMaterial({ map: domeTex, side: THREE.BackSide });
  scene.add(new THREE.Mesh(domeGeo, domeMat));
  disposables.push(domeTex, domeGeo, domeMat);

  // [largura, altura, x, y, z, brilho] — o brilho acima de 1 é o que estoura a
  // faixa de reflexo no bisel em vez de deixá-la cinza.
  const boxes: [number, number, number, number, number, number][] = [
    [7, 7, 5, 6, 5, 5.5], // chave, alto à direita
    [4, 10, -7, 1.5, 3, 2.6], // preenchimento lateral, vertical (vira o risco fino)
    [9, 3.5, -1, -5, -6, 1.6], // rebatedor baixo, atrás: separa a silhueta
  ];
  for (const [w, h, x, y, z, level] of boxes) {
    const geo = new THREE.PlaneGeometry(w, h);
    const mat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(level, level, level),
    });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(x, y, z);
    mesh.lookAt(0, 0, 0);
    scene.add(mesh);
    disposables.push(geo, mat);
  }

  return { scene, disposables };
}

export function CrystalEnvironment({ intensity = 1 }: { intensity?: number }) {
  const gl = useThree((s) => s.gl);
  const scene = useThree((s) => s.scene);

  useEffect(() => {
    const pmrem = new THREE.PMREMGenerator(gl);
    const studio = buildStudio();
    const env = pmrem.fromScene(studio.scene, 0.02);
    // three é imperativo: o env map só existe como propriedade da cena.
    /* eslint-disable react-hooks/immutability */
    scene.environment = env.texture;
    scene.environmentIntensity = intensity;
    return () => {
      scene.environment = null;
      /* eslint-enable react-hooks/immutability */
      env.dispose();
      studio.disposables.forEach((d) => d.dispose());
      pmrem.dispose();
    };
  }, [gl, scene, intensity]);

  return null;
}
