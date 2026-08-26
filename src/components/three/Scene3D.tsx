import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { usePortfolio } from '../../context/PortfolioContext';

// Color map for Three.js hex values matching theme
const THEME_3D_COLORS: Record<string, number> = {
  white: 0xffffff,
  cyan: 0x00f0ff,
  green: 0x00ff88,
  yellow: 0xffd000,
  red: 0xff3366,
};

export const Scene3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme, performanceTier, activeSection } = usePortfolio();

  const sceneRef = useRef<{
    renderer: THREE.WebGLRenderer;
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    headParticles: THREE.Points;
    neuralLines: THREE.LineSegments;
    ambientDust: THREE.Points;
    outerRing1: THREE.LineLoop;
    outerRing2: THREE.LineLoop;
    geoCore: THREE.LineSegments;
    clock: THREE.Clock;
    targetSection: string;
    mouse: THREE.Vector2;
    targetMouse: THREE.Vector2;
    currentThemeColor: THREE.Color;
    targetThemeColor: THREE.Color;
    animationId: number;
    cleanup: () => void;
  } | null>(null);

  // Re-sync theme color when theme changes
  useEffect(() => {
    if (sceneRef.current) {
      const hex = THEME_3D_COLORS[theme] || 0xffffff;
      sceneRef.current.targetThemeColor.setHex(hex);
    }
  }, [theme]);

  // Re-sync active section
  useEffect(() => {
    if (sceneRef.current) {
      sceneRef.current.targetSection = activeSection;
    }
  }, [activeSection]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Determine particle count based on tier
    let headParticleCount = 4500;
    let dustParticleCount = 1200;
    if (performanceTier === 'saver') {
      headParticleCount = 1200;
      dustParticleCount = 400;
    } else if (performanceTier === 'medium') {
      headParticleCount = 2800;
      dustParticleCount = 800;
    }

    // --- Scene & Camera Setup ---
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050505, 0.035);

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 9.5);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: performanceTier !== 'saver',
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, performanceTier === 'high' ? 2 : 1.5));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x000000, 0);
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    const clock = new THREE.Clock();
    const mouse = new THREE.Vector2(0, 0);
    const targetMouse = new THREE.Vector2(0, 0);

    const currentThemeColor = new THREE.Color(THEME_3D_COLORS[theme] || 0xffffff);
    const targetThemeColor = new THREE.Color(THEME_3D_COLORS[theme] || 0xffffff);

    // --- 1. Procedural Holographic Cyber-Head / AI Core Geometry ---
    const headPositions = new Float32Array(headParticleCount * 3);
    const headOriginals = new Float32Array(headParticleCount * 3);
    const headRandoms = new Float32Array(headParticleCount * 3);
    const headSizes = new Float32Array(headParticleCount);

    for (let i = 0; i < headParticleCount; i++) {
      const i3 = i * 3;
      // Synthesizing human-like facial & neural cranial point structure
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);

      // Anatomical shaping factors: chin taper, forehead curve, cranial dome
      let r = 1.9 + Math.sin(phi * 3) * 0.2;
      let y = Math.cos(phi) * 2.2;
      let x = Math.sin(phi) * Math.sin(theta) * 1.5;
      let z = Math.sin(phi) * Math.cos(theta) * 1.7;

      // Facial front flattening and nose/eye hollow ridge
      if (z > 0.4) {
        z *= 1.25;
        // Jaw / chin tapering downwards
        if (y < -0.3) {
          x *= 0.65;
          z *= 0.85;
        }
        // Eye socket indentation
        if (y > 0.1 && y < 0.6 && Math.abs(x) < 0.9 && Math.abs(x) > 0.15) {
          z *= 0.88;
        }
      }

      // Add high-density neural brain core inside
      if (i % 4 === 0) {
        x = (Math.random() - 0.5) * 1.6;
        y = (Math.random() - 0.5) * 1.8 + 0.3;
        z = (Math.random() - 0.5) * 1.5;
      }

      headPositions[i3] = x;
      headPositions[i3 + 1] = y;
      headPositions[i3 + 2] = z;

      headOriginals[i3] = x;
      headOriginals[i3 + 1] = y;
      headOriginals[i3 + 2] = z;

      headRandoms[i3] = Math.random() * 2 - 1;
      headRandoms[i3 + 1] = Math.random() * 2 - 1;
      headRandoms[i3 + 2] = Math.random() * 2 - 1;

      headSizes[i] = Math.random() * 0.045 + 0.02;
    }

    const headGeo = new THREE.BufferGeometry();
    headGeo.setAttribute('position', new THREE.BufferAttribute(headPositions, 3));
    headGeo.setAttribute('size', new THREE.BufferAttribute(headSizes, 1));

    // Particle texture generator (soft circular glow)
    const createParticleTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext('2d');
      if (!ctx) return new THREE.Texture();
      const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
      grad.addColorStop(0.25, 'rgba(255, 255, 255, 0.8)');
      grad.addColorStop(0.6, 'rgba(255, 255, 255, 0.2)');
      grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 64, 64);
      const texture = new THREE.CanvasTexture(canvas);
      return texture;
    };

    const particleTexture = createParticleTexture();

    const headMaterial = new THREE.PointsMaterial({
      size: 0.055,
      color: currentThemeColor,
      map: particleTexture,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const headParticles = new THREE.Points(headGeo, headMaterial);
    scene.add(headParticles);

    // --- 2. Neural Wireframe Network (Dynamic connections) ---
    const lineIndices: number[] = [];
    const lineCount = performanceTier === 'saver' ? 80 : 180;
    for (let i = 0; i < lineCount; i++) {
      const idx1 = Math.floor(Math.random() * (headParticleCount * 0.4));
      const idx2 = (idx1 + Math.floor(Math.random() * 15) + 1) % headParticleCount;
      lineIndices.push(idx1, idx2);
    }

    const neuralLineGeo = new THREE.BufferGeometry();
    neuralLineGeo.setAttribute('position', new THREE.BufferAttribute(headPositions, 3));
    neuralLineGeo.setIndex(lineIndices);

    const neuralLineMaterial = new THREE.LineBasicMaterial({
      color: currentThemeColor,
      transparent: true,
      opacity: 0.22,
      blending: THREE.AdditiveBlending,
    });

    const neuralLines = new THREE.LineSegments(neuralLineGeo, neuralLineMaterial);
    scene.add(neuralLines);

    // --- 3. Geometric Wireframe Core (Dodecahedron & Icosahedron) ---
    const icosaGeo = new THREE.IcosahedronGeometry(2.1, 1);
    const icosaWire = new THREE.WireframeGeometry(icosaGeo);
    const geoCoreMat = new THREE.LineBasicMaterial({
      color: currentThemeColor,
      transparent: true,
      opacity: 0.18,
      blending: THREE.AdditiveBlending,
    });
    const geoCore = new THREE.LineSegments(icosaWire, geoCoreMat);
    scene.add(geoCore);

    // --- 4. Holographic Orbital Tech Rings ---
    const createOrbitalRing = (radius: number) => {
      const ringPoints: THREE.Vector3[] = [];
      const segments = 90;
      for (let i = 0; i <= segments; i++) {
        const theta = (i / segments) * Math.PI * 2;
        ringPoints.push(new THREE.Vector3(Math.cos(theta) * radius, 0, Math.sin(theta) * radius));
      }
      const ringGeo = new THREE.BufferGeometry().setFromPoints(ringPoints);
      const ringMat = new THREE.LineBasicMaterial({
        color: currentThemeColor,
        transparent: true,
        opacity: 0.28,
        blending: THREE.AdditiveBlending,
      });
      return new THREE.LineLoop(ringGeo, ringMat);
    };

    const outerRing1 = createOrbitalRing(3.2);
    outerRing1.rotation.x = Math.PI * 0.35;
    outerRing1.rotation.y = Math.PI * 0.15;
    scene.add(outerRing1);

    const outerRing2 = createOrbitalRing(3.8);
    outerRing2.rotation.x = -Math.PI * 0.25;
    outerRing2.rotation.z = Math.PI * 0.4;
    scene.add(outerRing2);

    // --- 5. Ambient Floating Cyber Dust ---
    const dustPositions = new Float32Array(dustParticleCount * 3);
    for (let i = 0; i < dustParticleCount * 3; i += 3) {
      dustPositions[i] = (Math.random() - 0.5) * 20;
      dustPositions[i + 1] = (Math.random() - 0.5) * 20;
      dustPositions[i + 2] = (Math.random() - 0.5) * 16 - 2;
    }
    const dustGeo = new THREE.BufferGeometry();
    dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPositions, 3));
    const dustMat = new THREE.PointsMaterial({
      size: 0.035,
      color: currentThemeColor,
      map: particleTexture,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const ambientDust = new THREE.Points(dustGeo, dustMat);
    scene.add(ambientDust);

    // --- Mouse & Touch Tracking ---
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetMouse.set(x, y);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // --- Window Resize Handling ---
    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;

      // Adjust camera distance for mobile screens
      if (width < 768) {
        camera.position.z = 11.5;
      } else {
        camera.position.z = 9.5;
      }

      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    const resizeObserver = new ResizeObserver(() => handleResize());
    resizeObserver.observe(container);
    handleResize();

    // --- Animation Loop ---
    let animationId: number;

    const animate = () => {
      if (document.hidden) {
        animationId = requestAnimationFrame(animate);
        return;
      }

      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse interpolation
      mouse.x += (targetMouse.x - mouse.x) * 0.05;
      mouse.y += (targetMouse.y - mouse.y) * 0.05;

      // Smooth color transitions
      currentThemeColor.lerp(sceneRef.current?.targetThemeColor || currentThemeColor, 0.05);
      headMaterial.color.copy(currentThemeColor);
      neuralLineMaterial.color.copy(currentThemeColor);
      geoCoreMat.color.copy(currentThemeColor);
      (outerRing1.material as THREE.LineBasicMaterial).color.copy(currentThemeColor);
      (outerRing2.material as THREE.LineBasicMaterial).color.copy(currentThemeColor);
      dustMat.color.copy(currentThemeColor);

      // Current section transformations
      const sec = sceneRef.current?.targetSection || 'home';
      let targetRotY = elapsedTime * 0.25 + mouse.x * 0.6;
      let targetRotX = mouse.y * 0.35;
      let targetScale = 1.0;
      let targetPosY = 0;
      let targetPosX = 0;

      if (sec === 'home') {
        targetScale = 1.0;
        targetPosY = 0.1;
        targetPosX = 0.5; // Offset slightly for desktop HUD balance
        if (window.innerWidth < 1024) targetPosX = 0;
      } else if (sec === 'about') {
        targetScale = 1.25;
        targetRotY = elapsedTime * 0.15;
        targetPosX = -1.2;
        if (window.innerWidth < 1024) targetPosX = 0;
      } else if (sec === 'skills') {
        targetScale = 0.95;
        targetPosY = -0.4;
        targetPosX = 1.3;
        if (window.innerWidth < 1024) targetPosX = 0;
      } else if (sec === 'projects') {
        targetScale = 1.1;
        targetPosY = 0.2;
        targetPosX = -1.4;
        if (window.innerWidth < 1024) targetPosX = 0;
      } else if (sec === 'experience') {
        targetScale = 0.85;
        targetPosY = 0;
        targetPosX = 0;
      } else if (sec === 'contact') {
        targetScale = 1.35;
        targetPosY = -0.3;
        targetPosX = 0;
      }

      // Group rotation & position lerp
      headParticles.rotation.y += (targetRotY - headParticles.rotation.y) * 0.05;
      headParticles.rotation.x += (targetRotX - headParticles.rotation.x) * 0.05;
      headParticles.position.x += (targetPosX - headParticles.position.x) * 0.04;
      headParticles.position.y += (targetPosY - headParticles.position.y) * 0.04;
      headParticles.scale.setScalar(
        headParticles.scale.x + (targetScale - headParticles.scale.x) * 0.04
      );

      neuralLines.rotation.copy(headParticles.rotation);
      neuralLines.position.copy(headParticles.position);
      neuralLines.scale.copy(headParticles.scale);

      geoCore.rotation.x = elapsedTime * 0.12;
      geoCore.rotation.y = elapsedTime * 0.18;
      geoCore.position.copy(headParticles.position);
      geoCore.scale.copy(headParticles.scale);

      // Rings rotation
      outerRing1.rotation.z += 0.008;
      outerRing1.position.copy(headParticles.position);
      outerRing2.rotation.y += 0.006;
      outerRing2.position.copy(headParticles.position);

      // Particle physics pulse & mouse repulsion
      const positions = headGeo.attributes.position.array as Float32Array;
      const pulseSpeed = elapsedTime * 2.5;

      for (let i = 0; i < headParticleCount; i++) {
        const i3 = i * 3;
        const ox = headOriginals[i3];
        const oy = headOriginals[i3 + 1];
        const oz = headOriginals[i3 + 2];

        // Harmonic breath ripple
        const breath = Math.sin(pulseSpeed + oy * 2.0) * 0.035;
        const rx = headRandoms[i3];
        const ry = headRandoms[i3 + 1];
        const rz = headRandoms[i3 + 2];

        // Hover repulsion
        const dx = ox - mouse.x * 2.0;
        const dy = oy - mouse.y * 2.0;
        const distSq = dx * dx + dy * dy;
        let repel = 0;
        if (distSq < 1.8) {
          repel = (1.8 - distSq) * 0.15;
        }

        positions[i3] = ox + rx * breath + dx * repel;
        positions[i3 + 1] = oy + ry * breath + dy * repel;
        positions[i3 + 2] = oz + rz * breath;
      }

      headGeo.attributes.position.needsUpdate = true;
      neuralLineGeo.attributes.position.needsUpdate = true;

      // Slowly rotate dust
      ambientDust.rotation.y = elapsedTime * 0.02;
      ambientDust.rotation.x = elapsedTime * 0.01;

      renderer.render(scene, camera);
      animationId = requestAnimationFrame(animate);
    };

    animate();

    const cleanup = () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', handleMouseMove);
      resizeObserver.disconnect();
      headGeo.dispose();
      headMaterial.dispose();
      neuralLineGeo.dispose();
      neuralLineMaterial.dispose();
      geoCore.geometry.dispose();
      geoCoreMat.dispose();
      outerRing1.geometry.dispose();
      outerRing2.geometry.dispose();
      dustGeo.dispose();
      dustMat.dispose();
      particleTexture.dispose();
      renderer.dispose();
    };

    sceneRef.current = {
      renderer,
      scene,
      camera,
      headParticles,
      neuralLines,
      ambientDust,
      outerRing1,
      outerRing2,
      geoCore,
      clock,
      targetSection: activeSection,
      mouse,
      targetMouse,
      currentThemeColor,
      targetThemeColor,
      animationId,
      cleanup,
    };

    return () => {
      if (sceneRef.current) {
        sceneRef.current.cleanup();
      }
    };
  }, [performanceTier]);

  return (
    <div
      ref={containerRef}
      id="three-canvas-container"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    />
  );
};
