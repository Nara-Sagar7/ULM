"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, ContactShadows, PerspectiveCamera, Float, OrbitControls } from "@react-three/drei";
import { useRef, useMemo, useEffect, useState, Suspense } from "react";
import * as THREE from "three";

function PremiumCar({ progress = 0, hovered = false }: { progress?: number; hovered?: boolean }) {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.getElapsedTime();
    // subtle orbit + progress influence
    group.current.rotation.y = -0.38 + Math.sin(t * 0.14) * 0.12 + progress * 0.55;
    group.current.position.y = Math.sin(t * 0.5) * 0.035;
  });

  const bodyOffset = progress * 0.55;
  const wheelOffset = progress * 1.25;
  const engineOffset = progress * 0.55;
  const cabinOffset = progress * 0.35;

  return (
    <group ref={group} position={[0, -0.22, 0]}>
      {/* body */}
      <Float speed={1.1} rotationIntensity={0.06} floatIntensity={0.1}>
        <group position={[0, 0.2 + bodyOffset * 0.35, 0]}>
          {/* main lower body - gunmetal metallic */}
          <mesh castShadow receiveShadow position={[0, 0.32, 0]}>
            <boxGeometry args={[3.35, 0.72, 1.62]} />
            <meshPhysicalMaterial
              color="#181a1f"
              metalness={0.92}
              roughness={0.18}
              clearcoat={1}
              clearcoatRoughness={0.14}
              envMapIntensity={1.1}
            />
          </mesh>
          {/* shoulder line highlight */}
          <mesh position={[0, 0.62, 0]}>
            <boxGeometry args={[3.3, 0.06, 1.64]} />
            <meshStandardMaterial color="#2a2e35" metalness={0.85} roughness={0.25} />
          </mesh>
          {/* cabin */}
          <group position={[0, cabinOffset, 0]}>
            <mesh castShadow position={[-0.12, 0.98, 0]}>
              <boxGeometry args={[1.68, 0.52, 1.18]} />
              <meshPhysicalMaterial color="#0e1013" metalness={0.88} roughness={0.22} clearcoat={0.9} envMapIntensity={0.8} />
            </mesh>
            {/* glass */}
            <mesh position={[0.48, 0.98, 0]}>
              <boxGeometry args={[0.92, 0.42, 1.2]} />
              <meshPhysicalMaterial color="#9bc7e8" transparent opacity={0.18} roughness={0.02} metalness={0.08} transmission={0.96} thickness={0.08} envMapIntensity={0.6} />
            </mesh>
            {/* pillars */}
            <mesh position={[0.05, 0.98, 0.58]}>
              <boxGeometry args={[0.08, 0.46, 0.04]} />
              <meshStandardMaterial color="#0a0a0b" />
            </mesh>
            <mesh position={[0.05, 0.98, -0.58]}>
              <boxGeometry args={[0.08, 0.46, 0.04]} />
              <meshStandardMaterial color="#0a0a0b" />
            </mesh>
          </group>
          {/* headlights - with bloom */}
          <mesh position={[1.68, 0.30, 0.50]}>
            <boxGeometry args={[0.07, 0.22, 0.34]} />
            <meshStandardMaterial color="#fff6d6" emissive="#ffe9a8" emissiveIntensity={hovered ? 2.6 : 1.2} />
          </mesh>
          <mesh position={[1.68, 0.30, -0.50]}>
            <boxGeometry args={[0.07, 0.22, 0.34]} />
            <meshStandardMaterial color="#fff6d6" emissive="#ffe9a8" emissiveIntensity={hovered ? 2.6 : 1.2} />
          </mesh>
          {/* DRL strip */}
          <mesh position={[1.68, 0.18, 0]}>
            <boxGeometry args={[0.04, 0.04, 1.1]} />
            <meshStandardMaterial color="#ffe9a8" emissive="#ffe9a8" emissiveIntensity={0.9} />
          </mesh>
          {/* tail lights */}
          <mesh position={[-1.68, 0.34, 0.52]}>
            <boxGeometry args={[0.06, 0.18, 0.30]} />
            <meshStandardMaterial color="#ff2a2a" emissive="#ff1a1a" emissiveIntensity={1.4} />
          </mesh>
          <mesh position={[-1.68, 0.34, -0.52]}>
            <boxGeometry args={[0.06, 0.18, 0.30]} />
            <meshStandardMaterial color="#ff2a2a" emissive="#ff1a1a" emissiveIntensity={1.4} />
          </mesh>
          {/* exhaust tips */}
          <mesh position={[-1.70, 0.10, 0.30]}>
            <cylinderGeometry args={[0.06, 0.06, 0.08, 12]} />
            <meshStandardMaterial color="#8b8d93" metalness={0.95} roughness={0.15} />
          </mesh>
          <mesh position={[-1.70, 0.10, -0.30]}>
            <cylinderGeometry args={[0.06, 0.06, 0.08, 12]} />
            <meshStandardMaterial color="#8b8d93" metalness={0.95} roughness={0.15} />
          </mesh>
          {/* door handle */}
          <mesh position={[0.35, 0.45, 0.82]}>
            <boxGeometry args={[0.28, 0.05, 0.02]} />
            <meshStandardMaterial color="#c8cdd4" metalness={0.92} roughness={0.18} />
          </mesh>
          <mesh position={[-0.35, 0.45, 0.82]}>
            <boxGeometry args={[0.28, 0.05, 0.02]} />
            <meshStandardMaterial color="#c8cdd4" metalness={0.92} roughness={0.18} />
          </mesh>
          {/* side mirror */}
          <mesh position={[0.78, 0.72, 0.78]}>
            <boxGeometry args={[0.12, 0.08, 0.10]} />
            <meshStandardMaterial color="#0f1114" />
          </mesh>
          <mesh position={[0.78, 0.72, -0.78]}>
            <boxGeometry args={[0.12, 0.08, 0.10]} />
            <meshStandardMaterial color="#0f1114" />
          </mesh>
          <pointLight position={[0, -0.18, 0]} intensity={7} distance={4.5} color="#D4A853" decay={2} />
        </group>
      </Float>

      {/* wheels */}
      {[
        [1.08, -0.26, 0.78],
        [1.08, -0.26, -0.78],
        [-1.08, -0.26, 0.78],
        [-1.08, -0.26, -0.78],
      ].map((pos, i) => {
        const isFront = i < 2;
        const xOff = isFront ? wheelOffset * 0.42 : -wheelOffset * 0.42;
        const zOff = (pos[2] > 0 ? 1 : -1) * wheelOffset * 0.50;
        return (
          <group key={i} position={[pos[0] + xOff, pos[1] - wheelOffset * 0.06, pos[2] + zOff]}>
            {/* tyre */}
            <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
              <cylinderGeometry args={[0.38, 0.38, 0.34, 28]} />
              <meshStandardMaterial color="#09090b" roughness={0.88} metalness={0.08} />
            </mesh>
            {/* tyre sidewall detail */}
            <mesh rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.30, 0.30, 0.345, 28]} />
              <meshStandardMaterial color="#141518" roughness={0.9} />
            </mesh>
            {/* rim - multi spoke */}
            <group rotation={[0, 0, Math.PI / 2]}>
              <mesh>
                <cylinderGeometry args={[0.24, 0.24, 0.35, 16]} />
                <meshStandardMaterial color="#e8e9ec" metalness={0.96} roughness={0.14} envMapIntensity={1.2} />
              </mesh>
              {/* 5 spokes */}
              {Array.from({ length: 5 }).map((_, s) => (
                <mesh key={s} rotation={[0, 0, (s * Math.PI * 2) / 5]} position={[0, 0, 0]}>
                  <boxGeometry args={[0.06, 0.38, 0.02]} />
                  <meshStandardMaterial color="#c8cdd4" metalness={0.9} roughness={0.2} />
                </mesh>
              ))}
              {/* center cap */}
              <mesh>
                <cylinderGeometry args={[0.06, 0.06, 0.36, 16]} />
                <meshStandardMaterial color="#D4A853" metalness={0.8} roughness={0.25} />
              </mesh>
            </group>
            {/* brake disc */}
            <mesh rotation={[0, 0, Math.PI / 2]} position={[pos[2] > 0 ? 0.19 : -0.19, 0, 0]}>
              <cylinderGeometry args={[0.20, 0.20, 0.04, 20]} />
              <meshStandardMaterial color="#c9a87a" metalness={0.88} roughness={0.28} />
            </mesh>
            {/* caliper */}
            <mesh position={[pos[2] > 0 ? 0.22 : -0.22, 0.08, 0]}>
              <boxGeometry args={[0.04, 0.12, 0.14]} />
              <meshStandardMaterial color="#c0392b" roughness={0.4} metalness={0.2} />
            </mesh>
            {/* suspension arm */}
            {(progress > 0.25 || true) && (
              <group position={[0, 0.42, 0]}>
                <mesh>
                  <boxGeometry args={[0.07, 0.38, 0.07]} />
                  <meshStandardMaterial color="#7a7d84" metalness={0.82} roughness={0.28} />
                </mesh>
                {/* spring */}
                {progress > 0.35 && (
                  <mesh position={[0.10, 0, 0]}>
                    <cylinderGeometry args={[0.06, 0.06, 0.36, 10]} />
                    <meshStandardMaterial color="#D4A853" metalness={0.6} roughness={0.35} wireframe={false} />
                  </mesh>
                )}
              </group>
            )}
            {/* brake line */}
            {progress > 0.5 && (
              <mesh position={[0, 0.20, pos[2] > 0 ? 0.12 : -0.12]}>
                <cylinderGeometry args={[0.015, 0.015, 0.30, 8]} />
                <meshStandardMaterial color="#111111" />
              </mesh>
            )}
          </group>
        );
      })}

      {/* engine bay */}
      <group position={[0.92, 0.30 + engineOffset * 0.85, 0]}>
        <mesh castShadow>
          <boxGeometry args={[0.96, 0.46, 0.74]} />
          <meshStandardMaterial color="#25282e" metalness={0.72} roughness={0.32} />
        </mesh>
        <mesh position={[0, 0.25, 0]}>
          <boxGeometry args={[0.78, 0.08, 0.56]} />
          <meshStandardMaterial color="#D4A853" metalness={0.62} roughness={0.28} />
        </mesh>
        {/* engine cover detail */}
        <mesh position={[0, 0.30, 0]}>
          <boxGeometry args={[0.40, 0.02, 0.28]} />
          <meshStandardMaterial color="#0a0a0b" />
        </mesh>
        <mesh position={[0, 0.31, 0]}>
          <planeGeometry args={[0.32, 0.08]} />
          <meshBasicMaterial color="#D4A853" transparent opacity={0.0} />
        </mesh>
        {progress > 0.55 && (
          <>
            <mesh position={[0.28, 0.08, 0.30]}>
              <cylinderGeometry args={[0.09, 0.09, 0.22, 14]} />
              <meshStandardMaterial color="#2c7aa8" metalness={0.4} roughness={0.3} />
            </mesh>
            <mesh position={[-0.28, 0.06, -0.30]}>
              <boxGeometry args={[0.16, 0.16, 0.16]} />
              <meshStandardMaterial color="#a93226" metalness={0.3} roughness={0.5} />
            </mesh>
            {/* hoses */}
            <mesh position={[0.05, 0.10, 0.22]} rotation={[0, 0, Math.PI / 6]}>
              <cylinderGeometry args={[0.025, 0.025, 0.45, 8]} />
              <meshStandardMaterial color="#1a1a1a" />
            </mesh>
          </>
        )}
      </group>

      {/* transmission */}
      <group position={[-0.18, 0.10 + engineOffset * 0.55, 0]}>
        <mesh>
          <boxGeometry args={[0.78, 0.24, 0.46]} />
          <meshStandardMaterial color="#1d1f23" metalness={0.76} roughness={0.30} />
        </mesh>
        {/* driveshaft */}
        {progress > 0.45 && (
          <mesh position={[-0.55, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.04, 0.04, 0.70, 12]} />
            <meshStandardMaterial color="#4a4d53" metalness={0.85} roughness={0.25} />
          </mesh>
        )}
      </group>

      {/* exhaust */}
      {progress > 0.4 && (
        <group position={[-0.65, -0.10 + progress * 0.15, 0.35]}>
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.05, 0.05, 1.2, 12]} />
            <meshStandardMaterial color="#5a5d64" metalness={0.78} roughness={0.32} />
          </mesh>
        </group>
      )}
      {progress > 0.4 && (
        <group position={[-0.65, -0.10 + progress * 0.15, -0.35]}>
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.05, 0.05, 1.2, 12]} />
            <meshStandardMaterial color="#5a5d64" metalness={0.78} roughness={0.32} />
          </mesh>
        </group>
      )}

      {/* chassis rails when exploded */}
      {progress > 0.35 && (
        <>
          <mesh position={[0, -0.05, 0.45]}>
            <boxGeometry args={[2.8, 0.06, 0.06]} />
            <meshStandardMaterial color="#2a2d33" metalness={0.8} roughness={0.25} />
          </mesh>
          <mesh position={[0, -0.05, -0.45]}>
            <boxGeometry args={[2.8, 0.06, 0.06]} />
            <meshStandardMaterial color="#2a2d33" metalness={0.8} roughness={0.25} />
          </mesh>
        </>
      )}
    </group>
  );
}

function WorkshopFloor() {
  return (
    <>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.64, 0]} receiveShadow>
        <planeGeometry args={[18, 18]} />
        <meshStandardMaterial color="#0c0d0f" roughness={0.94} metalness={0.06} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.635, 0]}>
        <planeGeometry args={[8, 0.025]} />
        <meshStandardMaterial color="#D4A853" emissive="#D4A853" emissiveIntensity={0.55} transparent opacity={0.45} />
      </mesh>
      <gridHelper args={[14, 28, "#1c1f24", "#131418"]} position={[0, -0.63, 0]} />
      {/* lift platform */}
      <mesh position={[0, -0.60, 0]} receiveShadow>
        <boxGeometry args={[4.2, 0.08, 2.2]} />
        <meshStandardMaterial color="#1a1d21" roughness={0.85} metalness={0.15} />
      </mesh>
      <mesh position={[-1.9, -0.45, 0.9]} >
        <boxGeometry args={[0.08, 0.35, 0.08]} />
        <meshStandardMaterial color="#2a2d33" />
      </mesh>
      <mesh position={[1.9, -0.45, 0.9]} >
        <boxGeometry args={[0.08, 0.35, 0.08]} />
        <meshStandardMaterial color="#2a2d33" />
      </mesh>
      <mesh position={[-1.9, -0.45, -0.9]} >
        <boxGeometry args={[0.08, 0.35, 0.08]} />
        <meshStandardMaterial color="#2a2d33" />
      </mesh>
      <mesh position={[1.9, -0.45, -0.9]} >
        <boxGeometry args={[0.08, 0.35, 0.08]} />
        <meshStandardMaterial color="#2a2d33" />
      </mesh>
    </>
  );
}

export function CarScene({
  progress = 0,
  interactive = false,
  className,
  transparent = false,
}: {
  progress?: number;
  interactive?: boolean;
  className?: string;
  transparent?: boolean;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [webglFailed, setWebglFailed] = useState(false);

  useEffect(() => setMounted(true), []);

  // Detect WebGL support early - fallback to static image if unavailable (fixes white blank on devices without WebGL)
  useEffect(() => {
    if (!mounted) return;
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl") || canvas.getContext("webgl2");
      if (!gl) setWebglFailed(true);
    } catch {
      setWebglFailed(true);
    }
  }, [mounted]);

  const isLowPower = useMemo(() => {
    if (typeof navigator === "undefined") return false;
    // @ts-ignore
    const mem = (navigator as any).deviceMemory;
    return mem && mem <= 4;
  }, []);

  // Prevent SSR / hydration mismatch: Canvas + R3F events require DOM
  // Next.js 16 + Turbopack + React 19 will crash with
  // "Cannot read properties of null (reading 'addEventListener')" in
  // @react-three/fiber events if eventSource is null on first connect.
  if (!mounted) {
    return <div ref={containerRef} className={className} style={{ background: "#0c0d10" }} aria-hidden />;
  }

  // WebGL not available -> static fallback (fixes white screens in screenshots)
  if (webglFailed) {
    return (
      <div ref={containerRef} className={className} style={{ background: "#0c0d10", overflow: "hidden" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/gallery/photo-4.jpg"
          alt="Workshop vehicle - 3D fallback"
          style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.85 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
        <div className="absolute bottom-3 left-3 text-[10px] tracking-[0.14em] text-white/60 bg-black/50 border border-white/10 rounded-full px-3 py-1 backdrop-blur">3D FALLBACK • WEBGL UNAVAILABLE</div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className={className} style={{ background: transparent ? "transparent" : "#0c0d10" }}>
      <Canvas
        shadows={!isLowPower}
        dpr={[1, isLowPower ? 1.35 : 1.5]}
        gl={{
          antialias: !isLowPower,
          alpha: transparent,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.12,
          powerPreference: "high-performance",
          stencil: false,
        }}
        onCreated={({ gl }) => {
          gl.setClearColor(transparent ? "#000000" : "#0c0d10", transparent ? 0 : 1);
        }}
        camera={{ position: [4.6, 2.2, 4.8], fov: 34 }}
        style={{ background: transparent ? "transparent" : "#0c0d10", width: "100%", height: "100%" }}
        frameloop={interactive ? "always" : "demand"}
        // FIX: Explicit eventSource prevents R3F from calling addEventListener on null
        // See: https://github.com/pmndrs/react-three-fiber/issues/3320
        // @ts-expect-error - RefObject<HTMLDivElement | null> is compatible at runtime, fiber expects RefObject<HTMLElement>
        eventSource={containerRef}
        eventPrefix="client"
        fallback={
          <div style={{ background: "#0c0d10", color: "white", display: "grid", placeItems: "center", height: "100%" }}>
            Loading 3D...
          </div>
        }
        onError={(e) => {
          console.error("Canvas WebGL error", e);
          setWebglFailed(true);
        }}
      >
          <ambientLight intensity={0.55} />
          <directionalLight castShadow={!isLowPower} position={[6.5, 9, 4.5]} intensity={1.65} shadow-mapSize={[1024, 1024]} shadow-bias={-0.00012} shadow-camera-near={0.5} shadow-camera-far={20} />
          <directionalLight position={[-5, 7, -4]} intensity={0.75} color="#8fb4ff" />
          <spotLight position={[0, 7.5, 0]} intensity={140} angle={0.55} penumbra={0.75} decay={2} distance={14} castShadow={!isLowPower} shadow-mapSize={[512, 512]} />
          <spotLight position={[3, 5, 3]} intensity={45} angle={0.4} penumbra={0.6} color="#FFE9A8" decay={2} />

          <PerspectiveCamera makeDefault position={[4.8, 2.0, 5.0]} fov={32} />
          <fog attach="fog" args={["#0A0A0B", 9, 19]} />

          <WorkshopFloor />
          <Suspense fallback={null}>
            <Environment preset="studio" environmentIntensity={0.6} background={false} />
          </Suspense>
          <PremiumCar progress={progress} hovered={interactive} />
          <ContactShadows position={[0, -0.60, 0]} opacity={0.45} scale={10} blur={isLowPower ? 1.5 : 2.4} far={4} color="#000000" />
          {interactive && <OrbitControls enablePan={false} minDistance={3} maxDistance={8} minPolarAngle={Math.PI / 6} maxPolarAngle={Math.PI / 2.4} autoRotate autoRotateSpeed={0.35} enableDamping dampingFactor={0.06} />}
      </Canvas>
      {/* Subtle overlay to ensure dark blending during Environment load */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-transparent to-black/20" />
    </div>
  );
}
