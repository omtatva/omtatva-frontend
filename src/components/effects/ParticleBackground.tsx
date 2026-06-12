"use client";

import { useEffect, useRef } from "react";
import { shouldUseLightMode } from "@/lib/performance";

export default function ParticleBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || shouldUseLightMode()) return;

    let animationId = 0;
    let disposed = false;

    const init = async () => {
      const THREE = await import("three");
      if (disposed || !containerRef.current) return;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      camera.position.z = 50;

      const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: false,
        powerPreference: "low-power",
      });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.25));
      container.appendChild(renderer.domElement);

      const count = 500;
      const positions = new Float32Array(count * 3);
      const colors = new Float32Array(count * 3);

      for (let i = 0; i < count; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 120;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 120;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 80;

        const t = Math.random();
        colors[i * 3] = 0.29 + t * 0.2;
        colors[i * 3 + 1] = 0.56 + t * 0.15;
        colors[i * 3 + 2] = 0.89 + t * 0.1;
      }

      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

      const material = new THREE.PointsMaterial({
        size: 0.18,
        vertexColors: true,
        transparent: true,
        opacity: 0.5,
        blending: THREE.AdditiveBlending,
      });

      const particles = new THREE.Points(geometry, material);
      scene.add(particles);

      let mouseX = 0;
      let mouseY = 0;
      let visible = !document.hidden;

      const onMouseMove = (e: MouseEvent) => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
      };

      const onVisibility = () => {
        visible = !document.hidden;
      };

      window.addEventListener("mousemove", onMouseMove, { passive: true });
      document.addEventListener("visibilitychange", onVisibility);

      const animate = () => {
        animationId = requestAnimationFrame(animate);
        if (!visible) return;

        particles.rotation.y += 0.00025;
        camera.position.x += (mouseX * 2 - camera.position.x) * 0.015;
        camera.position.y += (-mouseY * 2 - camera.position.y) * 0.015;
        camera.lookAt(scene.position);
        renderer.render(scene, camera);
      };
      animate();

      const onResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };
      window.addEventListener("resize", onResize, { passive: true });

      return () => {
        cancelAnimationFrame(animationId);
        window.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("resize", onResize);
        document.removeEventListener("visibilitychange", onVisibility);
        renderer.dispose();
        geometry.dispose();
        material.dispose();
        if (container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
      };
    };

    let cleanup: (() => void) | undefined;
    init().then((fn) => {
      if (disposed) {
        fn?.();
      } else {
        cleanup = fn;
      }
    });

    return () => {
      disposed = true;
      cleanup?.();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 z-0 opacity-35"
      aria-hidden
    />
  );
}
