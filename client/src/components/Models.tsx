import React, { useRef } from "react";
import { useLoader } from "@react-three/fiber";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Mesh } from "three";
//import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    name: THREE.Mesh;
  };
  materials: {};
  //   animations: GLTFAction[];
};

export const Models = (props: JSX.IntrinsicElements["group"]) => {
  //add 3d models to scene with below code

  // const { nodes, materials } = useLoader(
  //   GLTFLoader,
  //   "./models/object.glb"
  // ) as GLTFResult;

  const nameRef = useRef<Mesh>(null!);

  const material = (
    <meshStandardMaterial color="#6f7987" metalness={0} roughness={0.4} />
  );

  //add following prop to <mesh> for each 3D model
  //geometry={nodes.<name>.geometry}

  return (
    <group {...props} dispose={null}>
      <mesh ref={nameRef} name="name">
        {material}
      </mesh>
    </group>
  );
};
