import { useLayoutEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import dots from "@/data/worldDots.json";
import { DESTINATIONS, RECRUITMENT_ORIGIN } from "@/data/content";

const toVec = (lat, lng, r = 1) => {
  const phi = ((90 - lat) * Math.PI) / 180;
  const th = ((lng + 180) * Math.PI) / 180;
  return new THREE.Vector3(-r * Math.sin(phi) * Math.cos(th), r * Math.cos(phi), r * Math.sin(phi) * Math.sin(th));
};

// rotation that brings (lat,lng) to face the camera (+z)
const facing = (lat, lng) => {
  const v = toVec(lat, lng);
  return { y: -Math.atan2(v.x, v.z), x: (lat * Math.PI) / 180 * 0.85 };
};

const GOLD = new THREE.Color("#D5A94F");

const Dots = () => {
  const geo = useMemo(() => {
    const pos = new Float32Array(dots.length * 3);
    const col = new Float32Array(dots.length * 3);
    const base = new THREE.Color("#5D6E84");
    const india = new THREE.Color("#E9EEF5");
    dots.forEach(([lat, lng, t], i) => {
      toVec(lat, lng, 1.002).toArray(pos, i * 3);
      (t === 2 ? GOLD : t === 1 ? india : base).toArray(col, i * 3);
    });
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    g.setAttribute("color", new THREE.BufferAttribute(col, 3));
    return g;
  }, []);
  return (
    <points geometry={geo}>
      <pointsMaterial size={0.018} vertexColors sizeAttenuation transparent opacity={0.95} />
    </points>
  );
};

const Arc = ({ to, delay }) => {
  const ref = useRef();
  const { geo, count } = useMemo(() => {
    const a = toVec(RECRUITMENT_ORIGIN.lat, RECRUITMENT_ORIGIN.lng, 1.005);
    const b = toVec(to.lat, to.lng, 1.005);
    const mid = a.clone().add(b).multiplyScalar(0.5);
    mid.normalize().multiplyScalar(1 + a.distanceTo(b) * 0.55);
    const pts = new THREE.QuadraticBezierCurve3(a, mid, b).getPoints(64);
    return { geo: new THREE.BufferGeometry().setFromPoints(pts), count: pts.length };
  }, [to]);
  useFrame(({ clock }) => {
    const t = (clock.elapsedTime * 0.35 + delay) % 1.6;
    const p = Math.min(t / 0.9, 1);
    ref.current.geometry.setDrawRange(0, Math.max(2, Math.floor(p * count)));
    ref.current.material.opacity = t > 1.2 ? Math.max(0, 1 - (t - 1.2) / 0.4) : 0.9;
  });
  return (
    <line ref={ref} geometry={geo}>
      <lineBasicMaterial color="#D5A94F" transparent opacity={0.9} />
    </line>
  );
};

const Marker = ({ lat, lng, color, size, active, ring }) => {
  const ref = useRef();
  const pos = useMemo(() => toVec(lat, lng, 1.01), [lat, lng]);
  const quat = useMemo(() => new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 0, 1), pos.clone().normalize()), [pos]);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const s = active ? 1.6 + Math.sin(clock.elapsedTime * 4) * 0.25 : 1;
    ref.current.scale.setScalar(s);
  });
  return (
    <group position={pos} quaternion={quat}>
      <mesh ref={ref}>
        <circleGeometry args={[size, 24]} />
        <meshBasicMaterial color={color} />
      </mesh>
      {ring && (
        <mesh>
          <ringGeometry args={[size * 1.9, size * 2.3, 32]} />
          <meshBasicMaterial color={color} transparent opacity={0.55} side={THREE.DoubleSide} />
        </mesh>
      )}
    </group>
  );
};

const Scene = ({ focus, drag, labelRef }) => {
  const group = useRef();
  const tmp = useMemo(() => new THREE.Vector3(), []);
  useLayoutEffect(() => {
    const t = facing(focus.lat, focus.lng);
    group.current.rotation.set(t.x, t.y, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useFrame(({ clock, camera, size }, delta) => {
    const g = group.current;
    const target = facing(focus.lat, focus.lng);
    const sway = drag.current.active ? 0 : Math.sin(clock.elapsedTime * 0.25) * 0.18;
    const ty = target.y + drag.current.y + sway;
    const tx = target.x + drag.current.x;
    const k = 1 - Math.exp(-Math.min(delta, 0.1) * 3);
    g.rotation.y += (ty - g.rotation.y) * k;
    g.rotation.x += (tx - g.rotation.x) * k;
    if (!drag.current.active) { drag.current.y *= 0.985; drag.current.x *= 0.985; }

    const el = labelRef.current;
    if (el) {
      tmp.copy(toVec(focus.lat, focus.lng, 1.02)).applyEuler(g.rotation);
      const visible = tmp.z > 0.15;
      tmp.project(camera);
      el.style.transform = `translate(${((tmp.x + 1) / 2) * size.width}px, ${((1 - tmp.y) / 2) * size.height}px)`;
      el.style.opacity = visible ? "1" : "0";
    }
  });
  const isFocus = (p) => p.lat === focus.lat && p.lng === focus.lng;
  return (
    <group ref={group}>
      <mesh>
        <sphereGeometry args={[0.995, 64, 64]} />
        <meshBasicMaterial color="#14263D" />
      </mesh>
      <Dots />
      {DESTINATIONS.map((d, i) => <Arc key={d.name} to={d} delay={i * 0.22} />)}
      {DESTINATIONS.map((d) => <Marker key={d.name} {...d} color="#D5A94F" size={0.014} ring active={isFocus(d)} />)}
    </group>
  );
};

export default function GlobeCanvas({ focus, labelRef }) {
  const drag = useRef({ active: false, x: 0, y: 0, px: 0, py: 0 });
  const onDown = (e) => { drag.current = { ...drag.current, active: true, px: e.clientX, py: e.clientY }; e.currentTarget.setPointerCapture(e.pointerId); };
  const onMove = (e) => {
    const d = drag.current;
    if (!d.active) return;
    d.y += (e.clientX - d.px) * 0.006;
    d.x = Math.max(-0.8, Math.min(0.8, d.x + (e.clientY - d.py) * 0.004));
    d.px = e.clientX; d.py = e.clientY;
  };
  const onUp = () => { drag.current.active = false; };
  return (
    <div
      className="absolute inset-0 cursor-grab touch-pan-y active:cursor-grabbing"
      onPointerDown={onDown}
      onPointerMove={onMove}
      onPointerUp={onUp}
      onPointerLeave={onUp}
      data-testid="globe-canvas"
    >
      <Canvas dpr={[1, 1.75]} camera={{ position: [0, 0, 3.7], fov: 38 }} gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}>
        <Scene focus={focus} drag={drag} labelRef={labelRef} />
      </Canvas>
    </div>
  );
}
