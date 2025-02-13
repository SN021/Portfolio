import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import gsap from "gsap";

const skills = [
  { imgSrc: "/images/figma.svg", label: "Figma" },
  { imgSrc: "/images/css3.svg", label: "CSS" },
  { imgSrc: "/images/javascript.svg", label: "JavaScript" },
  { imgSrc: "/images/nodejs.svg", label: "NodeJS" },
  { imgSrc: "/images/expressjs.svg", label: "ExpressJS" },
  { imgSrc: "/images/mongodb.svg", label: "MongoDB" },
  { imgSrc: "/images/react.svg", label: "React" },
  { imgSrc: "/images/tailwindcss.svg", label: "TailwindCSS" },
];

const SkillsSphere = () => {
  const containerRef = useRef(null);
  const hoveredSpriteRef = useRef(null);
  const tooltipRef = useRef(null);
  const rotationSpeed = useRef(0.002);
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const container = containerRef.current;
    const scene = new THREE.Scene();

    // Responsive camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 8; // Default camera position

    const setCameraPosition = () => {
      if (window.innerWidth < 768) {
        camera.position.z = 6; // Closer on mobile
      } else {
        camera.position.z = 8; // Further on larger screens
      }
    };
    setCameraPosition();

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.domElement.style.opacity = 0;
    renderer.localClippingEnabled = true;
    container.appendChild(renderer.domElement);

    // Fade in renderer with a smooth easing
    gsap.to(renderer.domElement, {
      opacity: 1,
      duration: 1.5,
      ease: "sine.inOut",
      overwrite: true,
    });

    const sphereGroup = new THREE.Group();
    scene.add(sphereGroup);

    // Responsive sphere radius and sprite scale
    let sphereRadius = 3;
    let spriteScale = 0.8;

    const updateSphereSize = () => {
      if (window.innerWidth < 768) {
        sphereRadius = 3;
        spriteScale = 0.8;
      } else {
        sphereRadius = 3.5;
        spriteScale = 1.0;
      }

      // Remove existing sprites
      while (sphereGroup.children.length > 0) {
        sphereGroup.remove(sphereGroup.children[0]);
      }

      const textureLoader = new THREE.TextureLoader();

      skills.forEach((skill, index) => {
        const phi = Math.acos(-1 + (2 * index) / skills.length);
        const theta = Math.sqrt(skills.length * Math.PI) * phi;

        const x = sphereRadius * Math.sin(phi) * Math.cos(theta);
        const y = sphereRadius * Math.sin(phi) * Math.sin(theta);
        const z = sphereRadius * Math.cos(phi);

        const texture = textureLoader.load(skill.imgSrc);
        const material = new THREE.SpriteMaterial({
          map: texture,
          transparent: true,
          opacity: 0.5,
        });

        const sprite = new THREE.Sprite(material);
        sprite.scale.set(spriteScale, spriteScale, spriteScale);
        sprite.position.set(x, y, z);
        sprite.userData = { label: skill.label, defaultScale: spriteScale };
        sphereGroup.add(sprite);
      });
    };
    updateSphereSize();

    // OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.15;
    controls.rotateSpeed = 0.5;
    controls.enableZoom = false;

    // Raycaster and mouse vector for hover effects
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let resizeTimeout;

    const onMouseMove = (event) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / container.clientWidth) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / container.clientHeight) * 2 + 1;

      // Update tooltip position
      setTooltipPosition({
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      });

      // Perform raycasting
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(sphereGroup.children);

      if (intersects.length > 0) {
        const hovered = intersects[0].object;
        if (hovered !== hoveredSpriteRef.current) {
          // Animate previous hover out
          if (hoveredSpriteRef.current) {
            gsap.to(hoveredSpriteRef.current.scale, {
              x: hoveredSpriteRef.current.userData.defaultScale,
              y: hoveredSpriteRef.current.userData.defaultScale,
              duration: 0.3,
              ease: "power3.out",
              overwrite: true,
            });
            gsap.to(hoveredSpriteRef.current.material, {
              opacity: 0.5,
              duration: 0.25,
              ease: "power3.out",
              overwrite: true,
            });
          }

          // Set new hover
          hoveredSpriteRef.current = hovered;
          setHoveredSkill(hovered.userData.label);

          gsap.to(hovered.scale, {
            x: spriteScale * 1.3,
            y: spriteScale * 1.3,
            duration: 0.3,
            ease: "power3.out",
            overwrite: true,
          });
          gsap.to(hovered.material, {
            opacity: 1,
            duration: 0.25,
            ease: "power3.out",
            overwrite: true,
          });

          // Slow down rotation for emphasis
          gsap.to(rotationSpeed, {
            current: 0.0005,
            duration: 1.2,
            ease: "power3.out",
            overwrite: true,
          });
        }
      } else if (hoveredSpriteRef.current) {
        // Animate hover-out
        gsap.to(hoveredSpriteRef.current.scale, {
          x: hoveredSpriteRef.current.userData.defaultScale,
          y: hoveredSpriteRef.current.userData.defaultScale,
          duration: 0.3,
          ease: "power3.inOut",
          overwrite: true,
        });
        gsap.to(hoveredSpriteRef.current.material, {
          opacity: 0.5,
          duration: 0.25,
          ease: "power3.inOut",
          overwrite: true,
        });
        hoveredSpriteRef.current = null;
        setHoveredSkill(null);

        // Restore original rotation speed
        gsap.to(rotationSpeed, {
          current: 0.002,
          duration: 1.2,
          ease: "power3.out",
          overwrite: true,
        });
      }
    };

    container.addEventListener("mousemove", onMouseMove);

    // Animation loop (only one call)
    const clipPlane = new THREE.Plane();
    const animate = () => {
      requestAnimationFrame(animate);
      sphereGroup.rotation.y += rotationSpeed.current;

      // Update clipping plane to clip fragments behind the camera
      const cameraDir = camera.position.clone().normalize();
      clipPlane.set(cameraDir, 0);
      renderer.clippingPlanes = [clipPlane];

      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Resize handler (debounced)
    const onWindowResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
        setCameraPosition();
        updateSphereSize();
      }, 100);
    };
    window.addEventListener("resize", onWindowResize);

    return () => {
      window.removeEventListener("resize", onWindowResize);
      container.removeEventListener("mousemove", onMouseMove);
      container.removeChild(renderer.domElement);
    };
  }, []);

  // Tooltip animations
  useEffect(() => {
    if (tooltipRef.current) {
      if (hoveredSkill) {
        gsap.to(tooltipRef.current, {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.35,
          ease: "power3.out",
          overwrite: true,
        });
      } else {
        gsap.to(tooltipRef.current, {
          opacity: 0,
          scale: 0.5,
          y: 20,
          duration: 0.2,
          ease: "power3.in",
          overwrite: true,
        });
      }
    }
  }, [hoveredSkill]);

  return (
    <div
      ref={containerRef}
      className="w-full h-[300px] md:h-[400px] lg:h-[500px] relative reveal-up"
    >
      <div
        ref={tooltipRef}
        className="absolute px-3 py-1 bg-black/80 text-white text-sm rounded-md backdrop-blur-sm transform -translate-y-full -translate-x-1/2 pointer-events-none opacity-0 scale-50"
        style={{
          left: `${tooltipPosition.x}px`,
          top: `${tooltipPosition.y}px`,
        }}
      >
        {hoveredSkill}
        <div className="absolute bottom-0 left-1/2 w-2 h-2 bg-black/80 transform -translate-x-1/2 translate-y-1 rotate-45" />
      </div>
    </div>
  );
};

export default SkillsSphere;
