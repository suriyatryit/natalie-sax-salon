"use client";

import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles } from "@react-three/drei";
import * as THREE from "three";

function LuxurySculpture() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const innerMeshRef = useRef<THREE.Mesh>(null!);
  const [hovered, setHovered] = useState(false);

  useFrame((state, delta) => {
    // Continuous sensual floating rotation
    meshRef.current.rotation.x += delta * 0.22;
    meshRef.current.rotation.y += delta * 0.35;
    meshRef.current.rotation.z += delta * 0.1;

    innerMeshRef.current.rotation.x -= delta * 0.15;
    innerMeshRef.current.rotation.y += delta * 0.25;

    // Organic response to cursor coordinates
    const targetX = (state.pointer.x * Math.PI) / 6;
    const targetY = (state.pointer.y * Math.PI) / 6;
    meshRef.current.rotation.x = THREE.MathUtils.lerp(
      meshRef.current.rotation.x,
      meshRef.current.rotation.x + targetY * 0.1,
      0.05
    );
    meshRef.current.rotation.y = THREE.MathUtils.lerp(
      meshRef.current.rotation.y,
      meshRef.current.rotation.y + targetX * 0.1,
      0.05
    );
  });

  return (
    <group
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <Float
        speed={2.2}
        rotationIntensity={0.8}
        floatIntensity={1.4}
        floatingRange={[-0.1, 0.1]}
      >
        {/* Main Molten Rose-Gold Torus Knot (Sculpted Silk Coiffure) */}
        <mesh ref={meshRef} scale={hovered ? 1.08 : 1.0}>
          <torusKnotGeometry args={[1.05, 0.34, 180, 48, 2, 3]} />
          <meshPhysicalMaterial
            color="#e8a598"
            emissive="#590d22"
            emissiveIntensity={hovered ? 0.35 : 0.18}
            metalness={0.92}
            roughness={0.14}
            clearcoat={1.0}
            clearcoatRoughness={0.08}
            reflectivity={0.9}
          />
        </mesh>

        {/* Inner champagne crystal aura ring */}
        <mesh ref={innerMeshRef} scale={0.68}>
          <torusGeometry args={[1.2, 0.04, 32, 100]} />
          <meshStandardMaterial
            color="#f7e7ce"
            emissive="#dfb15b"
            emissiveIntensity={0.6}
            metalness={0.95}
            roughness={0.1}
          />
        </mesh>

        {/* Orbiting Champagne & Ruby Spheres */}
        <FloatingPearls />
      </Float>
    </group>
  );
}

function FloatingPearls() {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y -= delta * 0.18;
      groupRef.current.rotation.z += delta * 0.08;
    }
  });

  const pearls = [
    { pos: [1.8, 0.6, 0.4] as [number, number, number], size: 0.14, color: "#f7e7ce", emissive: "#ffd166" },
    { pos: [-1.7, -0.8, 0.5] as [number, number, number], size: 0.18, color: "#e8a598", emissive: "#e61c5d" },
    { pos: [0.7, 1.9, -0.6] as [number, number, number], size: 0.11, color: "#ff4d6d", emissive: "#e61c5d" },
    { pos: [-1.2, 1.4, 0.8] as [number, number, number], size: 0.15, color: "#f7e7ce", emissive: "#fff2db" },
    { pos: [1.4, -1.3, -0.5] as [number, number, number], size: 0.16, color: "#e8a598", emissive: "#800f2f" },
  ];

  return (
    <group ref={groupRef}>
      {pearls.map((pearl, idx) => (
        <mesh key={idx} position={pearl.pos}>
          <sphereGeometry args={[pearl.size, 32, 32]} />
          <meshPhysicalMaterial
            color={pearl.color}
            emissive={pearl.emissive}
            emissiveIntensity={0.4}
            metalness={0.95}
            roughness={0.12}
            clearcoat={1.0}
          />
        </mesh>
      ))}
    </group>
  );
}

export default function HeroCanvas() {
  return (
    <div className="w-full h-full relative cursor-grab active:cursor-grabbing">
      <Canvas
        camera={{ position: [0, 0, 4.2], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        dpr={[1, 2]}
      >
        {/* Sensual Studio Lighting: Warm champagne key, rose fill, crimson neon back-rim */}
        <ambientLight intensity={0.8} color="#fff1e6" />
        <directionalLight position={[4, 5, 4]} intensity={2.8} color="#fff6ea" />
        <directionalLight position={[-4, -3, -2]} intensity={1.4} color="#e8a598" />
        <pointLight position={[0, -2, -1.5]} intensity={4.5} color="#e61c5d" distance={12} />
        <pointLight position={[2, 3, 2]} intensity={2.0} color="#f7e7ce" distance={10} />

        <LuxurySculpture />

        {/* Floating stardust / champagne shimmer */}
        <Sparkles
          count={50}
          scale={5.5}
          size={2.2}
          speed={0.45}
          color="#f7e7ce"
          opacity={0.65}
        />
      </Canvas>
    </div>
  );
}
