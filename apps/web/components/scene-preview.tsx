"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Mesh } from "three";

function FloatingNode() {
  const ref = useRef<Mesh>(null);

  useFrame((state) => {
    if (!ref.current) {
      return;
    }

    ref.current.rotation.y += 0.01;
    ref.current.position.y = Math.sin(state.clock.elapsedTime) * 0.15;
  });

  return (
    <mesh ref={ref} position={[0, 0.2, 0]}>
      <boxGeometry args={[1.4, 1.4, 1.4]} />
      <meshStandardMaterial color="#38bdf8" metalness={0.5} roughness={0.2} />
    </mesh>
  );
}

export function ScenePreview() {
  return (
    <div className="glass-panel h-[320px] overflow-hidden rounded-3xl">
      <Canvas camera={{ position: [3.5, 2.5, 4.2], fov: 45 }}>
        <color attach="background" args={["#050816"]} />
        <ambientLight intensity={1.3} />
        <directionalLight position={[3, 4, 5]} intensity={2} />
        <gridHelper args={[12, 12, "#334155", "#172033"]} />
        <FloatingNode />
      </Canvas>
    </div>
  );
}
