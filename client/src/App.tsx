import * as React from "react";
import { Canvas } from "@react-three/fiber";

import AppInner from "./components/AppInner";

export default function App() {
  return (
    <Canvas>
      <color attach="background" args={["#0A0908"]} />
      <AppInner />
    </Canvas>
  );
}
