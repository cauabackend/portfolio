"use client";

import { useEffect } from "react";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

// Material metálico sem environment map fica preto onde não há luz direta —
// é o que dá o aspecto "chapado". RoomEnvironment é um estúdio procedural do
// próprio three: reflexo de metal de verdade, sem baixar HDR de CDN nenhum.
export function StudioEnvironment({ intensity = 1.15 }: { intensity?: number }) {
  const gl = useThree((s) => s.gl);
  const scene = useThree((s) => s.scene);

  useEffect(() => {
    const pmrem = new THREE.PMREMGenerator(gl);
    const room = new RoomEnvironment();
    const env = pmrem.fromScene(room, 0.04);
    // three é imperativo: o env map só existe como propriedade da cena.
    /* eslint-disable react-hooks/immutability */
    scene.environment = env.texture;
    scene.environmentIntensity = intensity;
    return () => {
      scene.environment = null;
      /* eslint-enable react-hooks/immutability */
      env.dispose();
      room.dispose?.();
      pmrem.dispose();
    };
  }, [gl, scene, intensity]);

  return null;
}
