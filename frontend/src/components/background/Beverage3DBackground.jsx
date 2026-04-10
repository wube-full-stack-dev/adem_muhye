import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const Beverage3DBackground = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // ========== SCENE SETUP ==========
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a2a1a); // Deep green
    scene.fog = new THREE.FogExp2(0x0a2a1a, 0.008);

    // ========== CAMERA ==========
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
    camera.position.set(0, 2, 8);
    camera.lookAt(0, 0, 0);

    // ========== RENDERER ==========
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.current.appendChild(renderer.domElement);

    // ========== LIGHTS ==========
    const ambientLight = new THREE.AmbientLight(0x404060, 0.6);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffeedd, 1);
    mainLight.position.set(5, 10, 7);
    scene.add(mainLight);

    const fillLight = new THREE.PointLight(0x44aa66, 0.5);
    fillLight.position.set(0, -2, 0);
    scene.add(fillLight);

    const rimLight = new THREE.PointLight(0xffaa66, 0.8);
    rimLight.position.set(-3, 2, -4);
    scene.add(rimLight);

    // ========== FLOATING BOTTLES ==========
    const bottleColors = [0xcc3333, 0x33cc33, 0x3399ff, 0xffaa33];
    const bottles = [];

    bottleColors.forEach((color, i) => {
      const geometry = new THREE.CylinderGeometry(0.4, 0.35, 1.2, 32);
      const material = new THREE.MeshStandardMaterial({
        color: color,
        metalness: 0.3,
        roughness: 0.2,
        emissive: color,
        emissiveIntensity: 0.1,
        transparent: true,
        opacity: 0.9,
      });
      const bottle = new THREE.Mesh(geometry, material);

      // Position bottles in a circle
      const angle = (i / bottleColors.length) * Math.PI * 2;
      bottle.position.x = Math.cos(angle) * 3;
      bottle.position.z = Math.sin(angle) * 3 - 2;
      bottle.position.y = Math.sin(angle) * 0.5;

      bottle.userData = {
        speed: 0.005,
        angle: angle,
        radius: 3,
      };

      scene.add(bottle);
      bottles.push(bottle);
    });

    // ========== BUBBLES ==========
    const bubbleCount = 300;
    const bubbleGeometry = new THREE.BufferGeometry();
    const bubblePositions = new Float32Array(bubbleCount * 3);
    const bubbleSpeeds = [];

    for (let i = 0; i < bubbleCount; i++) {
      bubblePositions[i * 3] = (Math.random() - 0.5) * 12;
      bubblePositions[i * 3 + 1] = Math.random() * 8 - 2;
      bubblePositions[i * 3 + 2] = (Math.random() - 0.5) * 10 - 3;
      bubbleSpeeds.push(0.005 + Math.random() * 0.015);
    }

    bubbleGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(bubblePositions, 3),
    );

    const bubbleMaterial = new THREE.PointsMaterial({
      color: 0x88ccff,
      size: 0.08,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
    });

    const bubbles = new THREE.Points(bubbleGeometry, bubbleMaterial);
    scene.add(bubbles);

    // ========== SPARKLES ==========
    const sparkleCount = 200;
    const sparkleGeometry = new THREE.BufferGeometry();
    const sparklePositions = new Float32Array(sparkleCount * 3);

    for (let i = 0; i < sparkleCount; i++) {
      sparklePositions[i * 3] = (Math.random() - 0.5) * 14;
      sparklePositions[i * 3 + 1] = (Math.random() - 0.5) * 7;
      sparklePositions[i * 3 + 2] = (Math.random() - 0.5) * 10 - 2;
    }

    sparkleGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(sparklePositions, 3),
    );

    const sparkleMaterial = new THREE.PointsMaterial({
      color: 0xffdd88,
      size: 0.05,
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending,
    });

    const sparkles = new THREE.Points(sparkleGeometry, sparkleMaterial);
    scene.add(sparkles);

    // ========== ANIMATION ==========
    let time = 0;
    let mouseX = 0;
    let mouseY = 0;

    window.addEventListener("mousemove", (event) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = (event.clientY / window.innerHeight) * 2 - 1;
    });

    const animate = () => {
      requestAnimationFrame(animate);
      time += 0.016;

      // Animate bottles
      bottles.forEach((bottle, idx) => {
        bottle.rotation.y += 0.01;
        bottle.rotation.x = Math.sin(time * 0.8 + idx) * 0.1;
        bottle.position.y += Math.sin(time * 1.2 + idx) * 0.003;
      });

      // Animate bubbles (rising)
      const positions = bubbles.geometry.attributes.position.array;
      for (let i = 0; i < bubbleCount; i++) {
        positions[i * 3 + 1] += bubbleSpeeds[i];
        if (positions[i * 3 + 1] > 4) {
          positions[i * 3 + 1] = -2;
          positions[i * 3] = (Math.random() - 0.5) * 12;
          positions[i * 3 + 2] = (Math.random() - 0.5) * 10 - 3;
        }
      }
      bubbles.geometry.attributes.position.needsUpdate = true;

      // Camera parallax
      camera.position.x += (mouseX * 0.3 - camera.position.x) * 0.05;
      camera.position.y += (-mouseY * 0.2 - camera.position.y) * 0.05;
      camera.lookAt(0, 0.5, 0);

      // Rotate sparkles
      sparkles.rotation.y += 0.002;
      sparkles.rotation.x += 0.001;

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed top-0 left-0 w-full h-full -z-10"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
      }}
    />
  );
};

export default Beverage3DBackground;
