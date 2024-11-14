//LIBS
import { useFrame } from "@react-three/fiber";
import React, { useRef } from "react";
import * as io from "socket.io-client";
import { Models } from "./Models";
import { AmbientLight, BoxGeometry, Mesh, PointLight, Vector3 } from "three";
import { OrbitControls } from "@react-three/drei";

const socket = io.connect("http://localhost:3001");
socket.connect();

export const AppInner = () => {
  const boxRef = useRef<Mesh>(null!);
  const ambientLightRef = useRef<AmbientLight>(null!);
  const pointLightBlueRef = useRef<PointLight>(null!);

  //variables for animation
  let kickContour = 0;
  let hatContour = 0;

  //receive OSC messages in client
  socket.on("kick-on", () => {
    //console.log("kick-on received!");
    kickContour = 4;
  });

  socket.on("hat-contour", ({ value }) => {
    //console.log("synth received, value: ", value);

    hatContour = Math.pow(value, 0.2);
  });

  //example using OSC data to animate objects
  useFrame((state, delta) => {
    boxRef.current.rotation.x += delta;
    boxRef.current.rotation.y += delta / 2;
    boxRef.current.scale.x = hatContour;
    boxRef.current.scale.y = hatContour;
    boxRef.current.scale.z = hatContour;
    ambientLightRef.current.intensity = kickContour;
    pointLightBlueRef.current.intensity = kickContour;

    if (kickContour > 0) {
      kickContour -= delta + 0.2;
    }

    if (kickContour < 0) {
      kickContour = 0;
    }
  });

  return (
    <>
      <OrbitControls />
      {/* <Models /> */}
      <ambientLight ref={ambientLightRef} color="red" />

      <mesh ref={boxRef}>
        <boxGeometry />
        <meshStandardMaterial color="white" />
      </mesh>
      <pointLight ref={pointLightBlueRef} position={[-2, -2, 1]} color="blue" />
    </>
  );
};

export default AppInner;
