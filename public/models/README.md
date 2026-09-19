# 3D Models - Optimization Needed per Section 06 & 35
car-draco.glb = 5.55 MB (Khronos ToyCar) - EXCEEDS 5MB budget per Section 26:1798
TODO: Replace with Sketchfab premium car (<5MB) + Draco compress:
  gltf-transform draco input.glb output.glb --method edgebreaker --quantize-position 14 --quantize-normal 10 --quantize-texcoord 12
  or gltfpack -i input.glb -o output.glb -cc -tc -noq
LOD strategy per Section 06:528
  LOD0: car-draco.glb (desktop ~80k polys) - current procedural fallback is primary
  LOD1: car-lod1.glb (tablet ~40k)
  LOD2: car-lod2.glb (mobile ~15k)
Site uses procedural PremiumCar in CarScene.tsx as primary fallback per Section 10 & 34 - no blocking.
