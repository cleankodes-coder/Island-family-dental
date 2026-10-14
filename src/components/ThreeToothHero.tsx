import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export const ThreeToothHero: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [webglSupported, setWebglSupported] = useState(true);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Check WebGL availability
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance'
      });
    } catch (e) {
      console.warn("WebGL not supported:", e);
      setWebglSupported(false);
      return;
    }

    const width = container.clientWidth || 400;
    const height = container.clientHeight || 400;

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.5);

    // Group for tooth and floating accents
    const toothGroup = new THREE.Group();
    scene.add(toothGroup);

    // Porcelain Dental Crown & Roots Geometry
    // We create a refined geometric organic representation of a molar tooth
    const crownMat = new THREE.MeshPhysicalMaterial({
      color: 0xfafafa,
      emissive: 0x162c54,
      emissiveIntensity: 0.04,
      roughness: 0.18,
      metalness: 0.04,
      clearcoat: 0.5,
      clearcoatRoughness: 0.1,
      transmission: 0.05, // subtle translucency like natural tooth enamel
      ior: 1.52,
      reflectivity: 0.6
    });

    // Main Crown (rounded, sculpted)
    const crownGeom = new THREE.CylinderGeometry(1.4, 1.1, 1.8, 32, 16);
    // Sculpt crown cusps by deforming vertices
    const pos = crownGeom.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const y = pos.getY(i);
      const x = pos.getX(i);
      const z = pos.getZ(i);
      if (y > 0.4) {
        // Cusp lobes
        const angle = Math.atan2(z, x);
        const cuspWave = Math.sin(angle * 4) * 0.15;
        pos.setY(i, y + cuspWave);
      }
    }
    crownGeom.computeVertexNormals();
    const crownMesh = new THREE.Mesh(crownGeom, crownMat);
    crownMesh.position.y = 0.5;
    toothGroup.add(crownMesh);

    // Crown Cap / Top Occlusal surface
    const capGeom = new THREE.SphereGeometry(1.35, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.35);
    const capMesh = new THREE.Mesh(capGeom, crownMat);
    capMesh.position.y = 1.0;
    toothGroup.add(capMesh);

    // Root 1 (Mesial)
    const root1Geom = new THREE.ConeGeometry(0.55, 2.0, 24);
    const root1Mesh = new THREE.Mesh(root1Geom, crownMat);
    root1Mesh.rotation.z = Math.PI - 0.15;
    root1Mesh.rotation.x = 0.05;
    root1Mesh.position.set(-0.55, -1.0, 0);
    toothGroup.add(root1Mesh);

    // Root 2 (Distal)
    const root2Geom = new THREE.ConeGeometry(0.52, 1.9, 24);
    const root2Mesh = new THREE.Mesh(root2Geom, crownMat);
    root2Mesh.rotation.z = Math.PI + 0.18;
    root2Mesh.rotation.x = -0.05;
    root2Mesh.position.set(0.55, -0.95, 0);
    toothGroup.add(root2Mesh);

    // Root 3 (Palatal subtle tap)
    const root3Geom = new THREE.ConeGeometry(0.45, 1.6, 20);
    const root3Mesh = new THREE.Mesh(root3Geom, crownMat);
    root3Mesh.rotation.z = Math.PI;
    root3Mesh.rotation.x = -0.22;
    root3Mesh.position.set(0, -0.85, -0.4);
    toothGroup.add(root3Mesh);

    // Subtle protective aura ring (represents preventive dental shield)
    const ringGeom = new THREE.TorusGeometry(2.3, 0.02, 16, 100);
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0x7daed6,
      roughness: 0.3,
      metalness: 0.8,
      transparent: true,
      opacity: 0.6
    });
    const ringMesh = new THREE.Mesh(ringGeom, ringMat);
    ringMesh.rotation.x = Math.PI / 2.3;
    toothGroup.add(ringMesh);

    // Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    // Key light (soft warm white)
    const keyLight = new THREE.DirectionalLight(0xfffaf0, 1.8);
    keyLight.position.set(4, 5, 5);
    scene.add(keyLight);

    // Island Family Dental Navy/Sky rim light
    const rimLight = new THREE.DirectionalLight(0x7daed6, 2.2);
    rimLight.position.set(-5, 2, -4);
    scene.add(rimLight);

    // Gentle fill light
    const fillLight = new THREE.DirectionalLight(0x204270, 0.9);
    fillLight.position.set(0, -4, 4);
    scene.add(fillLight);

    // Pointer-responsive rotation variables
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouseX = x * 0.45;
      mouseY = y * 0.35;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Resize handler
    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener('resize', handleResize);

    // Animation loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      if (!prefersReducedMotion) {
        // Idle floating and gentle rotation
        toothGroup.position.y = Math.sin(elapsedTime * 1.2) * 0.12;
        ringMesh.rotation.z = elapsedTime * 0.25;

        targetRotationY = mouseX + Math.sin(elapsedTime * 0.4) * 0.15;
        targetRotationX = mouseY + Math.cos(elapsedTime * 0.5) * 0.08;

        // Smooth lerp
        toothGroup.rotation.y += (targetRotationY - toothGroup.rotation.y) * 0.05;
        toothGroup.rotation.x += (targetRotationX - toothGroup.rotation.x) * 0.05;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (renderer.domElement.parentElement) {
        renderer.domElement.parentElement.removeChild(renderer.domElement);
      }
      renderer.dispose();
      crownGeom.dispose();
      root1Geom.dispose();
      root2Geom.dispose();
      root3Geom.dispose();
      ringGeom.dispose();
      crownMat.dispose();
      ringMat.dispose();
    };
  }, []);

  if (!webglSupported) {
    return (
      <div className="w-full h-full min-h-[380px] flex items-center justify-center p-8 bg-[#F5F8FC] rounded-3xl border border-slate-200">
        <div className="w-48 h-48 rounded-full bg-[#162C54]/10 flex items-center justify-center p-8">
          <img
            src="/assets/tooth_icon.svg"
            alt="Tooth Emblem Sculpture"
            className="w-full h-full object-contain filter drop-shadow-md"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full min-h-[400px] flex items-center justify-center select-none">
      <div
        ref={mountRef}
        className="w-full h-full min-h-[400px] cursor-grab active:cursor-grabbing"
        title="Interactive 3D Dental Sculpture — Move cursor to rotate"
      />
      
      {/* Refined subtle interactive cue */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[11px] font-medium text-slate-500 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full border border-slate-200/80 pointer-events-none shadow-xs whitespace-nowrap">
        <span>Interactive 3D Sculpture · Pointer Responsive</span>
      </div>
    </div>
  );
};
