"use client";

import { useGLTF, Clone } from "@react-three/drei";
import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Preload for fast subsequent loads
useGLTF.preload("/models/car-draco.glb");

export function RealCar({
  progress = 0,
  hovered = false,
}: {
  progress?: number;
  hovered?: boolean;
}) {
  const group = useRef<THREE.Group>(null);
  const { scene } = useGLTF("/models/car-draco.glb");

  // Clone to avoid mutating original
  const cloned = useMemo(() => {
    const c = scene.clone(true);
    // The GLB has scale 0.0001 and rotation 90deg X - already in nodes
    // But we need to center it: the model is at origin, but small
    // Scale up to match our procedural size: procedural body is 3.35 units long
    // ToyCar GLB at scale 0.0001 is about 1.5 units long, so we scale up 2x
    c.scale.set(1.8, 1.8, 1.8);
    // Ensure shadows
    c.traverse((obj: any) => {
      if (obj.isMesh) {
        obj.castShadow = true;
        obj.receiveShadow = true;
        // Enhance material for professional look
        if (obj.material) {
          obj.material.envMapIntensity = 1.0;
          obj.material.needsUpdate = true;
        }
      }
    });
    return c;
  }, [scene]);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.getElapsedTime();
    // Same subtle orbit as procedural, but no explode (real car is single mesh)
    group.current.rotation.y = -0.38 + Math.sin(t * 0.14) * 0.12;
    group.current.position.y = Math.sin(t * 0.5) * 0.035;
  });

  // For explode, we can't explode single mesh, so we just lift slightly
  const yOffset = progress * 0.15;

  return (
    <group ref={group} position={[0, -0.22 + yOffset, 0]}>
      <primitive object={cloned} />
      {/* Subtle underglow for premium feel */}
      <pointLight position={[0, -0.18, 0]} intensity={7} distance={4.5} color="#D4A853" decay={2} />
    </group>
  );
}
